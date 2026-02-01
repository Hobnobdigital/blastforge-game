#!/usr/bin/env python3
"""
Budget optimizer - Find optimal quantities within a given budget.
Helps determine how many units you can afford and at what quantity tiers.
"""

import sys
import json
from typing import List, Dict, Tuple


def calculate_cost(quantity: int, unit_cost: float, shipping: float, setup_fee: float = 0) -> float:
    """Calculate total cost for a given quantity."""
    return (quantity * unit_cost) + shipping + setup_fee


def find_breakpoints(pricing_tiers: List[Dict], setup_fee: float = 0) -> List[Dict]:
    """
    Find quantity breakpoints where unit cost changes.
    
    Args:
        pricing_tiers: List of dicts with 'quantity', 'unit_cost', 'shipping'
        setup_fee: One-time setup fee to include
    
    Returns:
        List of breakpoints with quantity ranges and costs
    """
    breakpoints = []
    
    sorted_tiers = sorted(pricing_tiers, key=lambda x: x['quantity'])
    
    for i, tier in enumerate(sorted_tiers):
        qty = tier['quantity']
        unit = tier['unit_cost']
        shipping = tier.get('shipping', 0)
        
        total = calculate_cost(qty, unit, shipping, setup_fee)
        cost_per_unit = total / qty
        
        # Determine range this tier applies to
        min_qty = tier['quantity']
        max_qty = sorted_tiers[i + 1]['quantity'] - 1 if i + 1 < len(sorted_tiers) else None
        
        breakpoints.append({
            'min_quantity': min_qty,
            'max_quantity': max_qty,
            'unit_cost': unit,
            'shipping': shipping,
            'total_at_min': total,
            'cost_per_unit_at_min': cost_per_unit,
            'value_rating': 'Best' if i == len(sorted_tiers) - 1 else 'Standard'
        })
    
    return breakpoints


def optimize_for_budget(budget: float, pricing_tiers: List[Dict], setup_fee: float = 0) -> Dict:
    """
    Find the best quantity to order given a budget constraint.
    
    Args:
        budget: Maximum budget available
        pricing_tiers: List of pricing tiers from vendor
        setup_fee: One-time setup/design fee
    
    Returns:
        Dict with optimal quantity, expected cost, and alternatives
    """
    sorted_tiers = sorted(pricing_tiers, key=lambda x: x['quantity'])
    
    results = {
        'budget': budget,
        'setup_fee': setup_fee,
        'optimal': None,
        'alternatives': [],
        'max_quantity_possible': None
    }
    
    # Find the highest quantity we can afford
    for tier in reversed(sorted_tiers):
        qty = tier['quantity']
        unit = tier['unit_cost']
        shipping = tier.get('shipping', 0)
        total = calculate_cost(qty, unit, shipping, setup_fee)
        
        if total <= budget:
            cost_per_unit = total / qty
            results['optimal'] = {
                'quantity': qty,
                'total_cost': total,
                'unit_cost': unit,
                'cost_per_unit': cost_per_unit,
                'shipping': shipping,
                'remaining_budget': budget - total,
                'budget_utilization': (total / budget) * 100
            }
            break
    
    # If we can't afford any tier, find max quantity at lowest tier pricing
    if not results['optimal'] and sorted_tiers:
        lowest_tier = sorted_tiers[0]
        max_affordable = int((budget - setup_fee - lowest_tier.get('shipping', 0)) / lowest_tier['unit_cost'])
        
        if max_affordable > 0:
            results['max_quantity_possible'] = {
                'quantity': max_affordable,
                'unit_cost': lowest_tier['unit_cost'],
                'shipping': lowest_tier.get('shipping', 0),
                'total_cost': calculate_cost(max_affordable, lowest_tier['unit_cost'], 
                                            lowest_tier.get('shipping', 0), setup_fee),
                'note': 'Below minimum quantity tier - may require vendor negotiation'
            }
    
    # Find alternative quantity options (90%, 80%, 70% of budget utilization)
    if results['optimal']:
        for utilization_pct in [90, 80, 70]:
            target_budget = budget * (utilization_pct / 100)
            
            for tier in reversed(sorted_tiers):
                qty = tier['quantity']
                unit = tier['unit_cost']
                shipping = tier.get('shipping', 0)
                total = calculate_cost(qty, unit, shipping, setup_fee)
                
                if total <= target_budget:
                    results['alternatives'].append({
                        'quantity': qty,
                        'total_cost': total,
                        'cost_per_unit': total / qty,
                        'budget_utilization': (total / budget) * 100,
                        'savings': budget - total
                    })
                    break
    
    return results


def compare_vendors_by_budget(budget: float, vendors: List[Dict]) -> Dict:
    """
    Compare multiple vendors within a budget constraint.
    
    Args:
        budget: Available budget
        vendors: List of vendor dicts with 'name', 'pricing', 'setup_fee'
    
    Returns:
        Comparison showing best value from each vendor within budget
    """
    comparison = {
        'budget': budget,
        'vendors': []
    }
    
    for vendor in vendors:
        result = optimize_for_budget(
            budget,
            vendor['pricing'],
            vendor.get('setup_fee', 0)
        )
        
        if result['optimal']:
            comparison['vendors'].append({
                'name': vendor['name'],
                'quantity': result['optimal']['quantity'],
                'total_cost': result['optimal']['total_cost'],
                'cost_per_unit': result['optimal']['cost_per_unit'],
                'remaining_budget': result['optimal']['remaining_budget']
            })
    
    # Sort by quantity (highest first)
    comparison['vendors'].sort(key=lambda x: x['quantity'], reverse=True)
    
    # Identify best value (most units)
    if comparison['vendors']:
        comparison['best_value'] = comparison['vendors'][0]['name']
    
    return comparison


def main():
    """CLI entry point."""
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python budget_optimizer.py optimize <budget> <pricing_json>")
        print("  python budget_optimizer.py compare <budget> <vendors_json>")
        print("\nExamples:")
        print("  python budget_optimizer.py optimize 1000 pricing.json")
        print("  python budget_optimizer.py compare 5000 vendors.json")
        print("\nPricing JSON structure:")
        print(json.dumps([
            {"quantity": 100, "unit_cost": 2.50, "shipping": 15.00},
            {"quantity": 500, "unit_cost": 2.00, "shipping": 25.00}
        ], indent=2))
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == 'optimize':
        if len(sys.argv) < 4:
            print("Error: optimize requires <budget> <pricing_json>")
            sys.exit(1)
        
        budget = float(sys.argv[2])
        pricing_file = sys.argv[3]
        
        with open(pricing_file, 'r') as f:
            pricing = json.load(f)
        
        setup_fee = pricing.get('setup_fee', 0) if isinstance(pricing, dict) else 0
        pricing_tiers = pricing.get('pricing', pricing) if isinstance(pricing, dict) else pricing
        
        result = optimize_for_budget(budget, pricing_tiers, setup_fee)
        
        print("\n" + "="*60)
        print(f"BUDGET OPTIMIZATION")
        print("="*60)
        print(f"Available Budget: ${budget:,.2f}")
        
        if result['optimal']:
            opt = result['optimal']
            print(f"\n✓ OPTIMAL ORDER:")
            print(f"  Quantity: {opt['quantity']:,} units")
            print(f"  Total Cost: ${opt['total_cost']:,.2f}")
            print(f"  Cost per Unit: ${opt['cost_per_unit']:.2f}")
            print(f"  Remaining Budget: ${opt['remaining_budget']:,.2f}")
            print(f"  Budget Used: {opt['budget_utilization']:.1f}%")
            
            if result['alternatives']:
                print(f"\n  ALTERNATIVE OPTIONS:")
                for alt in result['alternatives']:
                    print(f"    • {alt['quantity']:,} units for ${alt['total_cost']:,.2f} "
                          f"({alt['budget_utilization']:.0f}% budget, saves ${alt['savings']:.2f})")
        
        elif result['max_quantity_possible']:
            max_q = result['max_quantity_possible']
            print(f"\n⚠ Budget too low for standard tiers")
            print(f"  Maximum possible: {max_q['quantity']:,} units")
            print(f"  Estimated cost: ${max_q['total_cost']:,.2f}")
            print(f"  {max_q['note']}")
        
        else:
            print(f"\n✗ Budget insufficient for any quantity")
        
        print("="*60 + "\n")
    
    elif command == 'compare':
        if len(sys.argv) < 4:
            print("Error: compare requires <budget> <vendors_json>")
            sys.exit(1)
        
        budget = float(sys.argv[2])
        vendors_file = sys.argv[3]
        
        with open(vendors_file, 'r') as f:
            vendors = json.load(f)
        
        result = compare_vendors_by_budget(budget, vendors.get('vendors', vendors))
        
        print("\n" + "="*60)
        print(f"VENDOR COMPARISON - Budget: ${budget:,.2f}")
        print("="*60)
        
        for vendor in result['vendors']:
            print(f"\n{vendor['name']}:")
            print(f"  Quantity: {vendor['quantity']:,} units")
            print(f"  Total: ${vendor['total_cost']:,.2f}")
            print(f"  Per Unit: ${vendor['cost_per_unit']:.2f}")
            print(f"  Remaining: ${vendor['remaining_budget']:,.2f}")
        
        if result.get('best_value'):
            print(f"\n✓ Best Value: {result['best_value']} (most units)")
        
        print("="*60 + "\n")
    
    else:
        print(f"Unknown command: {command}")
        sys.exit(1)


if __name__ == '__main__':
    main()
