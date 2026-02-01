# Inventory Optimizer Skill 📦

**Built for:** BCEHS Talent Acquisition  
**Purpose:** Compare vendor pricing for promotional products, swag, and custom-branded items

## What It Does

This skill automates your inventory ordering workflow:

✅ **Browser automation** for interactive vendor sites (dropdowns, sliders, forms)  
✅ **Draft professional quote request emails** for vendors  
✅ **Extract pricing** from vendor responses  
✅ **Compare pricing** across multiple vendors at different quantity tiers  
✅ **Budget optimization** - find optimal quantities within budget constraints  
✅ **Generate branded Word documents** with BCEHS colors and formatting  
✅ **Calculate cost-per-unit** and recommend best vendors by quantity  

## Installation

1. **Install the skill:**
   ```bash
   clawdbot skill add inventory-optimizer.skill
   ```

2. **Verify installation:**
   ```bash
   clawdbot skill list
   ```
   
   You should see `inventory-optimizer` in the list.

3. **Ensure python-docx is installed** (for Word document generation):
   ```bash
   pip3 install python-docx
   ```

## How to Use

### Example 1: Order Branded Pens

**You say:**
> "I need to order 500-1000 branded pens with the BCEHS logo. Can you get quotes from Creative Boulevard and Precision Graphics?"

**Clawdbot will:**
1. Draft professional quote request emails for both vendors
2. Show you the emails (you send them or ask Clawdbot to send via your email)
3. When quotes come back, extract the pricing data
4. Generate a Word comparison document with BCEHS branding
5. Tell you which vendor is cheapest at each quantity tier

### Example 2: Compare Multiple Quantities

**You say:**
> "Get quotes for tablecloths at 25, 50, and 100 quantities from our usual vendors"

**Clawdbot will:**
1. Draft quotes for all vendors in the vendor directory
2. Request pricing at all three quantity tiers
3. Generate comparison showing where bulk discounts kick in
4. Recommend optimal order quantity based on pricing

### Example 3: Budget-Constrained Ordering

**You say:**
> "I have a $2,500 budget for branded pens. What's the most I can order?"

**Clawdbot will:**
1. Get pricing tiers from your vendors
2. Run budget optimizer to find maximum affordable quantity
3. Show you alternatives at different budget utilization levels (90%, 80%, 70%)
4. Calculate cost-per-unit at each option
5. Recommend optimal quantity considering bulk discounts

### Example 4: Interactive Website Pricing (SwagZone, etc.)

**You say:**
> "Check SwagZone for pricing on tablecloths at 50, 100, and 250 quantities"

**Clawdbot will:**
1. Navigate to SwagZone product page
2. Use browser automation to interact with quantity slider
3. Extract pricing at each quantity tier
4. Include shipping costs
5. Generate comparison if checking multiple products

### Example 5: Multiple Items Within Budget

**You say:**
> "I have $5,000 budget. I need pens AND tablecloths. Figure out optimal quantities for both."

**Clawdbot will:**
1. Get pricing for both product types
2. Critically analyze budget allocation
3. Consider quantity break-points for bulk discounts
4. Recommend split (e.g., "2,000 pens + 100 tablecloths = $4,950")
5. Show alternative allocations

## What Gets Generated

### Quote Request Emails
- Professional format with BCEHS letterhead style
- Clear quantity tiers
- Mentions custom branding requirements
- Asks about shipping, lead time, and payment terms

### Comparison Documents (Word)
- **BCEHS branded** with official blue colors (#003366)
- **Pricing tables** for each vendor with:
  - Quantity tiers
  - Unit cost
  - Shipping
  - Total cost
- **Summary section** recommending best vendor per quantity
- **Professional formatting** ready for team comments and markup

## Key Features

### Browser Automation
- **Dropdowns:** Automatically select quantities from dropdown menus
- **Sliders:** Interact with range sliders (like SwagZone uses)
- **Forms:** Fill multi-step quote request forms
- **Dynamic pricing:** Handles AJAX/JavaScript price updates

See `references/browser-automation.md` for automation patterns.

### Budget Optimization
- **Find maximum quantity** within budget constraints
- **Compare vendors** to find best value for your budget
- **Alternative scenarios** at different budget utilization levels
- **Critical thinking** about optimal quantity vs price breaks
- **Multi-item budgeting** - allocate budget across multiple products

### Vendor Management
The skill comes pre-configured with:
- Creative Boulevard (quote-based)
- Precision Graphics (quote-based)
- SwagZone (interactive web pricing)

Easily add more vendors to `references/vendors.md`.

### BCEHS Branding
All documents use official BCEHS colors and styling guidelines stored in `references/bcehs-brand.md`.

### Flexible Quantities
Works with any quantity range - from 10 first aid kits to 10,000 pens.

### Smart Calculations
- Automatic cost-per-unit calculations
- Total cost including shipping and setup fees
- Identifies best value at each quantity tier
- Highlights where bulk discounts begin
- Budget utilization percentages

## Tips

- **Start with 3-4 quantity tiers** to give your team flexibility
- **Always mention custom branding** when requesting quotes
- **Factor in lead times** - sometimes the cheaper vendor isn't the fastest
- **Save comparison docs** - useful for future budget planning
- **Update vendor directory** as you discover new suppliers

## Technical Details

The skill includes:

**Scripts:**
- `scripts/draft_quote_email.py` - Generate quote request emails
- `scripts/generate_comparison_doc.py` - Create Word comparison documents
- `scripts/budget_optimizer.py` - Find optimal quantities within budget
- `scripts/parse_quote_response.py` - Helper for extracting pricing data

**References:**
- `references/vendors.md` - Vendor directory (add your suppliers here)
- `references/bcehs-brand.md` - BCEHS brand guidelines and colors
- `references/browser-automation.md` - Patterns for automating vendor websites

## Troubleshooting

**"python-docx not found"**
```bash
pip3 install python-docx
```

**"Vendor not found"**
Add the vendor to `references/vendors.md` in your workspace after installing the skill.

**"Can't generate Word doc"**
Make sure you have write permissions in the working directory.

## Next Steps

After installation:
1. Try ordering a test product to see the workflow
2. Add your frequently-used vendors to `references/vendors.md`
3. Customize `references/bcehs-brand.md` if brand guidelines change

---

**Questions?** Just ask Clawdbot: "How do I use the inventory optimizer skill?"
