# Browser Automation Patterns

This guide covers how to extract pricing from vendor websites with interactive elements (dropdowns, sliders, forms).

## Common Website Patterns

### Pattern 1: Dropdown Quantity Selectors

**Example sites:** Many promotional product sites

**Workflow:**
1. Navigate to product page
2. Take snapshot to identify dropdown element
3. Use `act` with `kind: select` to choose quantity
4. Wait briefly for price to update (dynamic sites)
5. Extract updated price, shipping info
6. Repeat for each target quantity

**Example:**
```javascript
// Snapshot first
browser.action=snapshot targetId=<tab_id>

// Select quantity from dropdown
browser.action=act request={
  "kind": "select",
  "ref": "e12",  // from snapshot
  "values": ["500"]
}

// Wait for price update
browser.action=act request={
  "kind": "wait",
  "timeMs": 1000
}

// Snapshot again to get updated prices
browser.action=snapshot targetId=<tab_id>
```

### Pattern 2: Quantity Slider/Range Input

**Example sites:** SwagZone, some custom merchandise sites

**Workflow:**
1. Navigate to product page
2. Snapshot to find slider element
3. Use `act` with `kind: "type"` or JavaScript evaluation to set slider value
4. Slider typically triggers price recalculation
5. Extract updated pricing
6. Repeat for each quantity tier

**Methods:**

**Option A: Direct input (if slider has text input)**
```javascript
browser.action=act request={
  "kind": "type",
  "ref": "e15",  // quantity input field
  "text": "500"
}
```

**Option B: JavaScript evaluation (for pure slider elements)**
```javascript
browser.action=act request={
  "kind": "evaluate",
  "fn": "document.querySelector('[type=\"range\"]').value = 500; document.querySelector('[type=\"range\"]').dispatchEvent(new Event('input'));"
}
```

**Option C: Drag slider (visual method)**
```javascript
browser.action=act request={
  "kind": "drag",
  "startRef": "e20",  // slider handle
  "endRef": "e21"     // target position or calculate offset
}
```

### Pattern 3: Multi-Step Forms

**Example:** Custom quote request forms with multiple fields

**Workflow:**
1. Navigate to form page
2. Snapshot to identify all form fields
3. Fill each field sequentially:
   - Product type
   - Quantity
   - Custom branding options
   - Contact info
4. Submit form
5. Wait for quote/pricing page
6. Extract pricing or quote reference

**Example:**
```javascript
// Fill product dropdown
browser.action=act request={
  "kind": "select",
  "ref": "e10",
  "values": ["Pens"]
}

// Fill quantity input
browser.action=act request={
  "kind": "type",
  "ref": "e11",
  "text": "1000"
}

// Check custom branding checkbox
browser.action=act request={
  "kind": "click",
  "ref": "e12"
}

// Submit form
browser.action=act request={
  "kind": "click",
  "ref": "e15",
  "submit": true
}
```

### Pattern 4: Add-to-Cart Pricing

**Example:** E-commerce style sites where you add to cart to see total

**Workflow:**
1. Navigate to product
2. Set quantity
3. Click "Add to Cart" or "Get Quote"
4. Navigate to cart/checkout
5. Extract total including shipping
6. Clear cart
7. Repeat for next quantity tier

**Important:** Always clear cart between tests to avoid price accumulation.

## Extracting Pricing Data

### Common Price Selectors

Look for elements containing:
- `$` or currency symbols
- "Price", "Total", "Cost" in class names or IDs
- Numbers with 2 decimal places (XX.XX)

**CSS selectors to try:**
```css
.price
.total-price
#unit-price
[data-price]
.product-price
.cart-total
.shipping-cost
```

### Dynamic Content

Many modern sites update prices via JavaScript without page reload.

**Indicators:**
- Price elements change without URL change
- Loading spinners appear when quantity changes
- AJAX requests in browser network tab

**Handling:**
1. After changing quantity, always wait 500-2000ms
2. Take fresh snapshot after wait
3. Compare snapshots to confirm price updated
4. Extract price from latest snapshot

### Parsing Price Text

Prices may appear in various formats:
- `$1,234.56`
- `1234.56 CAD`
- `Total: $1,234.56 (includes shipping)`

**Extraction pattern:**
```python
import re

def extract_price(text):
    # Remove currency symbols and commas
    cleaned = re.sub(r'[$,CAD USD]', '', text)
    # Find first number with optional decimals
    match = re.search(r'(\d+\.?\d*)', cleaned)
    if match:
        return float(match.group(1))
    return None
```

## Vendor-Specific Notes

### SwagZone (cat-ca.swag-zone.com)

**Type:** Slider-based quantity selection  
**Price Display:** Dynamic updates as slider moves  
**Shipping:** Usually shown separately from unit price  

**Steps:**
1. Browse to specific product page
2. Locate quantity slider (likely `input[type="range"]`)
3. Set slider value via JavaScript or drag interaction
4. Wait for price update (500-1000ms)
5. Extract displayed price
6. Note: May require account login for exact pricing

### Adding New Vendors

When encountering a new vendor site:

1. **Document the flow:**
   - How do you select quantity?
   - Where does pricing appear?
   - Are there separate shipping/setup fees?

2. **Note any quirks:**
   - Login required?
   - Must add to cart to see pricing?
   - Price ranges vs exact prices?

3. **Add to this file** for future reference

## Troubleshooting

**"Price not updating after quantity change"**
- Increase wait time after interaction
- Check if form submission is required
- Verify you're interacting with correct element

**"Can't find price element"**
- Take snapshot and visually inspect
- Try different CSS selectors
- Some sites hide prices until login/quote request

**"Slider not responding"**
- Try JavaScript evaluation method instead of drag
- Check if slider requires specific event triggers
- Some sliders need both 'input' and 'change' events

## Best Practices

1. **Always snapshot first** - See what you're working with
2. **Use ref IDs from snapshots** - More reliable than CSS selectors
3. **Add waits after interactions** - Let dynamic content load
4. **Clear state between tests** - Reset forms, clear carts
5. **Handle errors gracefully** - Some vendors may block automation
6. **Respect rate limits** - Don't hammer vendor sites
7. **Document vendor-specific patterns** - Add to this file for reuse
