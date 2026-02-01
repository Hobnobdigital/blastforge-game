---
name: inventory-optimizer
description: Compare vendor pricing for promotional products, swag, and custom-branded items (pens, tablecloths, apparel, etc.). Use when the user needs to order inventory and wants to compare prices across multiple vendors, especially for BCEHS-branded items. Handles both web-based pricing and email quote workflows, then generates professional Word comparison documents with BCEHS branding.
---

# Inventory Optimizer

Streamline vendor price comparison for promotional products and custom-branded inventory. This skill helps compare pricing across vendors, draft quote requests, parse responses, and generate professional comparison documents for decision-making.

## Primary Use Cases

1. **Compare vendor pricing** - Get quotes from multiple suppliers for the same product at different quantities
2. **Draft quote requests** - Generate professional emails requesting tiered pricing
3. **Parse quote responses** - Extract pricing data from vendor email responses
4. **Generate comparison docs** - Create branded Word documents with pricing tables for BCEHS Talent Acquisition

## Workflow

### Option A: Web-Based Pricing (Interactive Sites)

Many vendors have online pricing with dropdowns, sliders, or forms. Use browser automation:

1. Navigate to vendor product page using `browser` tool
2. Take snapshot to identify interactive elements
3. For each target quantity tier:
   - Interact with quantity selector (dropdown, slider, or input)
   - Wait for dynamic price update (500-1000ms)
   - Take fresh snapshot
   - Extract unit price, subtotal, shipping cost
   - Record any additional fees (setup, design, etc.)
4. Compile pricing data into structured format
5. Repeat for each vendor
6. Generate comparison document (see below)

**Browser automation guidance:**
- See `references/browser-automation.md` for detailed patterns
- **Dropdowns:** Use `act` with `kind: select`
- **Sliders:** Use JavaScript evaluation or drag interaction
- **Forms:** Fill fields sequentially, then submit
- **Dynamic prices:** Always wait after interaction, then re-snapshot

**Example vendors with interactive pricing:**
- SwagZone (cat-ca.swag-zone.com) - Slider-based quantity selection
- Many promotional product sites - Dropdown selectors

### Option B: Quote Request Workflow (most common)

For vendors like Creative Boulevard, Precision Graphics, and most promotional product suppliers:

1. **Draft quote request email** using `draft_quote_email.py`:
   ```bash
   python scripts/draft_quote_email.py "Vendor Name" "product type" [quantities...] [--notes "text"]
   ```
   
   Example:
   ```bash
   python scripts/draft_quote_email.py "Creative Boulevard" "branded pens" 100 500 1000 2500
   ```

2. **Send quote requests** to all target vendors (use `message` tool or ask user to send)

3. **Wait for responses** - Vendors typically respond within 24-48 hours

4. **Extract pricing** from quote responses:
   - Use LLM reasoning to extract quantities, unit costs, shipping, fees
   - Structure data into comparison format:
     ```json
     {
       "quantity": 1000,
       "unit_cost": 1.85,
       "shipping": 45.00
     }
     ```
   - See `parse_quote_response.py hints` for common patterns

5. **Generate comparison document** (next section)

### Option C: Budget-Constrained Ordering

When given a budget instead of specific quantities:

1. **Gather pricing tiers** from vendors (via Option A or B)

2. **Run budget optimizer:**
   ```bash
   python scripts/budget_optimizer.py optimize <budget> <pricing.json>
   ```
   
   Example:
   ```bash
   python scripts/budget_optimizer.py optimize 2500 vendor_pricing.json
   ```
   
   This finds:
   - Maximum quantity you can afford
   - Total cost including shipping
   - Cost per unit
   - Budget utilization percentage
   - Alternative quantities at lower budget utilization (90%, 80%, 70%)

3. **Compare vendors by budget:**
   ```bash
   python scripts/budget_optimizer.py compare <budget> <vendors.json>
   ```
   
   Shows which vendor provides most units within budget.

4. **Critical thinking for optimal quantities:**
   - Consider bulk discount breakpoints
   - Balance quantity vs remaining budget
   - Factor in storage/distribution logistics
   - Sometimes ordering slightly more at next tier is better value
   - Multiple smaller items vs fewer large items

5. Generate comparison document with recommended quantity

### Generate Comparison Document

Once you have pricing from 2+ vendors:

1. Structure data into comparison format:
   ```json
   {
     "product_name": "BCEHS Branded Pens",
     "date": "2026-01-30",
     "vendors": [
       {
         "name": "Creative Boulevard",
         "pricing": [
           {"quantity": 100, "unit_cost": 2.50, "shipping": 15.00},
           {"quantity": 500, "unit_cost": 2.10, "shipping": 25.00},
           {"quantity": 1000, "unit_cost": 1.85, "shipping": 35.00}
         ],
         "notes": "Setup fee: $50 (one-time). 2-3 week lead time."
       },
       {
         "name": "Precision Graphics",
         "pricing": [
           {"quantity": 100, "unit_cost": 2.75, "shipping": 10.00},
           {"quantity": 500, "unit_cost": 2.25, "shipping": 15.00}
         ],
         "notes": "Local Vancouver supplier. No setup fee for simple logo."
       }
     ]
   }
   ```

2. Save to temporary JSON file

3. Run document generator:
   ```bash
   python scripts/generate_comparison_doc.py comparison_data.json output.docx
   ```

4. The script creates a Word document with:
   - BCEHS branding (blue headers, proper colors)
   - Pricing tables for each vendor
   - Automatic cost-per-unit calculations
   - Total cost including shipping
   - Summary section recommending best vendor per quantity tier
   - Professional formatting for team review and comments

5. Deliver document to user

## Key Considerations

### BCEHS Branding Requirements

**Most orders require custom BCEHS logo** - Always ask vendors:
- Can they add custom branding?
- What's the setup/design fee?
- Do they need artwork files? (mention you can provide logo)
- Any restrictions on logo placement or colors?

See `references/bcehs-brand.md` for official brand colors and guidelines.

### Quantity Tiers

**Typical quantity ranges** to request quotes for:
- **Small orders:** 10, 25, 50, 100
- **Medium orders:** 250, 500, 1000
- **Large orders:** 2500, 5000, 10000+

Adjust based on product type:
- Pens: Often ordered in thousands
- First aid kits: Typically smaller quantities (10-100)
- Tablecloths: Medium quantities (50-500)
- Apparel: Varies widely (50-1000+)

### Shipping Costs

**Always factor shipping** - Can significantly affect total cost, especially for:
- Small quantities
- Bulky items (tablecloths, displays)
- Rush orders
- Cross-border shipping

### Hidden Costs to Watch For

- **Setup fees** - One-time charge for custom branding (typically $25-$100)
- **Design fees** - If vendor creates artwork
- **Rush fees** - Expedited production
- **Shipping upgrades** - Express/overnight
- **Minimum order quantities** - Some vendors require minimums

### Lead Times

**Factor in production + shipping time:**
- Standard: 2-3 weeks typical
- Rush: 5-10 days (often with premium pricing)
- Custom/complex items: 4-6 weeks

Ask about lead times in quote requests.

## Vendor Directory

See `references/vendors.md` for:
- Known vendor contact info
- Vendor specialties
- Quote request guidance
- Notes on pricing structures

Add new vendors to this file as you discover them.

## Scripts Reference

### draft_quote_email.py

Generate professional quote request emails.

**Usage:**
```bash
python scripts/draft_quote_email.py <vendor> <product> <qty1> [qty2...] [--notes "text"]
```

**Output:** Formatted email with subject and body ready to send.

### generate_comparison_doc.py

Create branded Word comparison document.

**Usage:**
```bash
python scripts/generate_comparison_doc.py <comparison.json> <output.docx>
```

**Features:**
- BCEHS blue headers and brand colors
- Professional table formatting
- Alternating row colors for readability
- Automatic cost calculations
- Best-price recommendations by quantity
- Ready for team comments/markup

### budget_optimizer.py

Find optimal quantities within a budget constraint.

**Usage:**
```bash
# Optimize single vendor pricing
python scripts/budget_optimizer.py optimize <budget> <pricing.json>

# Compare multiple vendors by budget
python scripts/budget_optimizer.py compare <budget> <vendors.json>
```

**Features:**
- Finds maximum affordable quantity
- Shows budget utilization percentage
- Provides alternative quantity options
- Compares vendors to find best value (most units for budget)
- Accounts for setup fees and shipping

### parse_quote_response.py

Helper for extracting pricing from vendor responses.

**Usage:**
```bash
python scripts/parse_quote_response.py hints
```

Shows common pricing patterns to look for in quote emails.

## Example Interaction

**User:** "I need to order 1000 branded pens with the BCEHS logo. Can you compare pricing from Creative Boulevard and Precision Graphics?"

**Your response:**
1. Draft quote requests for both vendors
2. Show user the email drafts
3. Send emails (or ask user to send)
4. When quotes come back, extract pricing
5. Generate comparison Word doc
6. Present findings: "Creative Boulevard is $1,850 total for 1000 pens, while Precision Graphics is $2,250. Creative Boulevard is cheaper at this quantity, though they have a $50 setup fee."

**User:** "Great! Can you also check 500 and 2500 quantities?"

**Your response:**
1. Request additional quotes at those quantities
2. Update comparison document with new tiers
3. Show where the price-per-unit improves at higher volumes

## Tips

- **Start with 3-4 quantity tiers** - Gives team flexibility in ordering
- **Note lead times** - May affect vendor choice beyond just price
- **Ask about bulk discounts** - Some vendors negotiate on large orders
- **Keep vendor notes** - Quality, past experience matters beyond price
- **Update vendor directory** - Add new suppliers and notes for future use
- **Save comparison docs** - Historical pricing helps with future budgeting
