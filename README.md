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