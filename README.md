# Omelette Brunch Menu Website

A beautiful, responsive website to display the Omelette brunch menu information from JSON data.

## Features

- **Modern Design**: Clean, professional design with smooth animations and hover effects
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Navigation**: Tab-based navigation between different sections
- **Dynamic Content**: All content is loaded from JSON data
- **Beautiful Typography**: Uses Noto Sans TC font for excellent Chinese text rendering
- **Smooth Animations**: Fade-in effects and hover animations for better user experience

## Sections

1. **菜單分類 (Menu Categories)**: Displays all menu categories with items, prices, and special badges
2. **套餐選項 (Set Options)**: Shows available set meal upgrade options
3. **飲品 (Drinks)**: Displays beverage menu with temperature and size options
4. **聯絡資訊 (Contact Information)**: Restaurant address, phone, and social media links

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript for data loading and interaction
├── data/
│   ├── omelette_menu_brunch.json    # Menu data
│   └── omelette_menu.schema.json    # JSON schema
└── README.md           # This file
```

## How to Use

1. **Open the website**: Simply open `index.html` in a web browser
2. **Navigate**: Use the navigation tabs to switch between different sections
3. **View Menu**: Browse through different menu categories and items
4. **Check Details**: View prices, options, and special notes for each item

## Technical Details

### Data Structure
The website loads data from `data/omelette_menu_brunch.json` which contains:
- Menu title and supply time
- Categories with items, prices, and special flags
- Set meal options with pricing
- Beverage menu with temperature and size options
- Contact information and social media links
- Restaurant notes and policies

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Dynamic content loading and interaction
- **Font Awesome**: Icons for better visual experience
- **Google Fonts**: Noto Sans TC for Chinese text

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Adding New Menu Items
To add new menu items, simply edit the `data/omelette_menu_brunch.json` file following the existing structure.

### Changing Colors
The color scheme can be modified in `styles.css` by updating the CSS custom properties and color values.

### Adding New Sections
To add new sections:
1. Add a new navigation button in `index.html`
2. Create a new section container
3. Add corresponding JavaScript functions in `script.js`
4. Style the new section in `styles.css`

## Features Included

- **Special Badges**: "新品" (New) and "推薦" (Recommended) badges for highlighted items
- **Responsive Grid**: Automatically adjusts layout based on screen size
- **Hover Effects**: Interactive elements with smooth transitions
- **Loading States**: Proper loading indicators and error handling
- **Accessibility**: Semantic HTML and keyboard navigation support

## Performance

- Optimized CSS with efficient selectors
- Minimal JavaScript for fast loading
- Responsive images and efficient layouts
- Smooth animations using CSS transforms

## License

This project is created for displaying menu information. Feel free to modify and use for your own restaurant menu needs.

## Generating Menu HTML for Figma Import

This project includes a Python script to automatically generate a styled brunch menu HTML file from structured JSON data. This is useful for keeping your menu up-to-date and for importing into Figma using html.to.design.

### Prerequisites
- Python 3.x installed

### Folder Structure
- `data/omelette_menu_brunch.json` — Menu data (edit this to update menu items)
- `template_for_figma/brunch.html` — HTML template (should only contain placeholders, not hardcoded menu data)
- `script/generate_menu_html.py` — Python script to generate the final HTML
- `html_for_figma/` — All generated HTML files will be placed here automatically

### Template Placeholders
In your template HTML file, add the following HTML comments where you want each section to appear:

- `<!--CATEGORIES-->` — All menu categories and items
- `<!--SET_OPTIONS-->` — Set meal options
- `<!--DRINKS-->` — Drinks menu
- `<!--CONTACT-->` — Contact and social info
- `<!--NOTES-->` — Restaurant notes and policies

Example:
```html
<body>
  ...
  <!--CATEGORIES-->
  ...
  <!--SET_OPTIONS-->
  ...
  <!--DRINKS-->
  ...
  <!--CONTACT-->
  ...
  <!--NOTES-->
</body>
```

### How to Generate the Menu HTML
1. Make sure your menu data in `data/omelette_menu_brunch.json` is up to date.
2. Ensure your template (e.g., `template_for_figma/brunch.html`) contains only the placeholders above and no hardcoded menu data.
3. Open a terminal in the project root.
4. Run the script:
   
   ```bash
   python3 script/generate_menu_html.py
   ```
   - If there are any `.html` files in `template_for_figma/`, you will be prompted to select one by number.
   - If there are no templates in that folder, you can enter a relative or absolute path to your template file.
5. The generated HTML will always be saved in the `html_for_figma/` directory, with the filename based on your template's basename and `_generated.html` appended (e.g., `brunch.html` → `html_for_figma/brunch_generated.html`).
6. You can now import this file into Figma using the html.to.design plugin.

### Notes
- Do not edit the generated HTML directly; always update the JSON or template and re-run the script.
- The script is modular and can be adapted for other menu JSON files or templates.
- The template file should not contain any hardcoded menu data, only the required placeholders.

---

For any issues or questions, please contact the project maintainer. 