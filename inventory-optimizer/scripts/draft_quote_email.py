#!/usr/bin/env python3
"""
Generate professional quote request emails for vendors.
"""

import sys
import json
from datetime import datetime


def draft_quote_email(vendor_name, product_type, quantities, custom_branding=True, additional_notes=""):
    """
    Generate a professional quote request email.
    
    Args:
        vendor_name: Name of the vendor
        product_type: Type of product (e.g., "branded pens", "tablecloths")
        quantities: List of quantities to quote (e.g., [100, 500, 1000])
        custom_branding: Whether BCEHS branding is required
        additional_notes: Any additional requirements or questions
    
    Returns:
        Dict with 'subject' and 'body' keys
    """
    
    subject = f"Quote Request - {product_type.title()} for BCEHS"
    
    # Sort quantities
    quantities = sorted(quantities)
    
    # Build quantities list string
    if len(quantities) == 1:
        qty_text = f"{quantities[0]:,} units"
    elif len(quantities) == 2:
        qty_text = f"{quantities[0]:,} and {quantities[1]:,} units"
    else:
        qty_list = ", ".join(f"{q:,}" for q in quantities[:-1])
        qty_text = f"{qty_list}, and {quantities[-1]:,} units"
    
    body = f"""Hello,

I am reaching out on behalf of BC Emergency Health Services (BCEHS) Talent Acquisition to request a quote for {product_type}.

**Product Requirements:**
- Product Type: {product_type.title()}
- Quantities Needed: Please provide pricing for {qty_text}"""
    
    if custom_branding:
        body += """
- Custom Branding: Yes - BCEHS logo required (we can provide artwork)
- Please include setup/design fees if applicable"""
    
    body += """

**Shipping:**
- Delivery location: British Columbia, Canada
- Please include shipping costs in your quote

**Quote Details Needed:**
- Unit price at each quantity level
- Total cost including shipping
- Lead time from order to delivery
- Any minimum order requirements
- Payment terms"""
    
    if additional_notes:
        body += f"""

**Additional Requirements:**
{additional_notes}"""
    
    body += f"""

We would appreciate receiving your quote by [INSERT DEADLINE]. If you need any additional information to prepare the quote, please let me know.

Thank you for your time and assistance.

Best regards,
[YOUR NAME]
BCEHS Talent Acquisition
[YOUR EMAIL]
[YOUR PHONE]"""
    
    return {
        "subject": subject,
        "body": body,
        "vendor": vendor_name,
        "product": product_type,
        "quantities": quantities,
        "generated_date": datetime.now().isoformat()
    }


def main():
    """CLI entry point."""
    if len(sys.argv) < 4:
        print("Usage: python draft_quote_email.py <vendor_name> <product_type> <quantities...> [--notes 'text']")
        print("\nExample:")
        print("  python draft_quote_email.py 'Creative Boulevard' 'branded pens' 100 500 1000")
        print("  python draft_quote_email.py 'Precision Graphics' 'tablecloths' 50 100 --notes 'Need rush delivery'")
        sys.exit(1)
    
    vendor_name = sys.argv[1]
    product_type = sys.argv[2]
    
    # Parse quantities and notes
    quantities = []
    additional_notes = ""
    i = 3
    
    while i < len(sys.argv):
        if sys.argv[i] == '--notes' and i + 1 < len(sys.argv):
            additional_notes = sys.argv[i + 1]
            i += 2
        else:
            try:
                quantities.append(int(sys.argv[i]))
            except ValueError:
                print(f"Warning: Skipping non-numeric quantity: {sys.argv[i]}")
            i += 1
    
    if not quantities:
        print("Error: At least one quantity is required")
        sys.exit(1)
    
    email = draft_quote_email(vendor_name, product_type, quantities, additional_notes=additional_notes)
    
    print("=" * 70)
    print(f"SUBJECT: {email['subject']}")
    print("=" * 70)
    print(email['body'])
    print("=" * 70)
    print(f"\n✓ Quote email drafted for {vendor_name}")
    print(f"  Product: {product_type}")
    print(f"  Quantities: {', '.join(str(q) for q in quantities)}")


if __name__ == '__main__':
    main()
