#!/usr/bin/env python3
"""
Helper script to extract pricing data from vendor quote responses.
This is meant to be used by Codex with LLM-based extraction, not as a standalone parser.
"""

import sys
import json
import re


def extract_pricing_hints(text):
    """
    Provide hints for extracting pricing from unstructured quote text.
    Returns patterns commonly found in quotes.
    """
    
    hints = {
        "common_patterns": {
            "quantity": r"(\d+[\d,]*)\s*(pcs|pieces|units|ea|each)",
            "unit_price": r"\$?\s*(\d+\.?\d*)\s*(?:per|/|each|ea|unit)",
            "total": r"total[:\s]*\$?\s*(\d+[,\d]*\.?\d*)",
            "shipping": r"shipping[:\s]*\$?\s*(\d+[,\d]*\.?\d*)",
            "setup_fee": r"setup[:\s]*\$?\s*(\d+[,\d]*\.?\d*)",
        },
        "extraction_tips": [
            "Look for tables or structured lists with quantity tiers",
            "Unit prices often follow quantity specifications",
            "Total cost may be broken down as: (quantity × unit) + shipping + setup",
            "Watch for 'setup fee', 'design fee', 'one-time charge' - these may need to be added",
            "Bulk discounts usually show decreasing unit prices at higher quantities",
            "Some quotes show 'net' (before shipping) vs 'total' (including shipping)"
        ],
        "normalization": {
            "remove_commas": "Remove commas from numbers: 1,000 → 1000",
            "currency": "Strip $ signs for numeric comparison",
            "quantity_units": "Convert 'k' notation: 10k → 10000"
        }
    }
    
    return hints


def structure_quote_data(vendor_name, product_type, raw_pricing_data):
    """
    Convert extracted pricing into structured format for comparison document.
    
    Args:
        vendor_name: Name of vendor
        product_type: Product being quoted
        raw_pricing_data: List of dicts with keys: quantity, unit_cost, shipping, notes
    
    Returns:
        Structured dict ready for generate_comparison_doc.py
    """
    
    return {
        "vendor": vendor_name,
        "pricing": raw_pricing_data,
        "notes": ""
    }


def main():
    """
    CLI to help structure manually-extracted quote data.
    """
    if len(sys.argv) < 2:
        print("Usage: python parse_quote_response.py <command>")
        print("\nCommands:")
        print("  hints     - Show patterns for extracting pricing from text")
        print("  structure - Convert pricing data to comparison format")
        print("\nNote: This script provides guidance. Actual extraction is best done")
        print("by Codex using LLM-based understanding of the quote content.")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "hints":
        hints = extract_pricing_hints("")
        print(json.dumps(hints, indent=2))
    
    elif command == "structure":
        print("Enter quote data as JSON:")
        print('Example: {"vendor": "Creative Boulevard", "pricing": [{"quantity": 100, "unit_cost": 2.50, "shipping": 15.00}]}')
        
    else:
        print(f"Unknown command: {command}")
        sys.exit(1)


if __name__ == '__main__':
    main()
