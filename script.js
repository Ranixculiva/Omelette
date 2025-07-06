// Global variables
let menuData = null;

// DOM elements
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');
const categoriesContainer = document.getElementById('categories-container');
const setOptionsContainer = document.getElementById('set-options-container');
const drinksContainer = document.getElementById('drinks-container');
const contactContainer = document.getElementById('contact-container');
const notesContainer = document.getElementById('notes-container');

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadMenuData();
        populateHeader();
        populateCategories();
        populateSetOptions();
        populateDrinks();
        populateContact();
        populateNotes();
        setupNavigation();
    } catch (error) {
        console.error('Error loading menu data:', error);
        showError('無法載入菜單資料，請稍後再試。');
    }
});

// Load menu data from JSON file
async function loadMenuData() {
    try {
        const response = await fetch('data/omelette_menu_brunch.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        menuData = await response.json();
    } catch (error) {
        console.error('Error fetching menu data:', error);
        throw error;
    }
}

// Populate header information
function populateHeader() {
    if (menuData.menu_title) {
        document.title = menuData.menu_title;
        const titleElement = document.querySelector('.menu-title');
        if (titleElement) {
            titleElement.textContent = menuData.menu_title;
        }
    }
    
    // Supply time is no longer displayed in the new header design
    // if (menuData.supply_time && supplyTimeElement) {
    //     supplyTimeElement.textContent = menuData.supply_time;
    // }
}

// Populate categories section
function populateCategories() {
    if (!menuData.categories) return;
    
    categoriesContainer.innerHTML = '';
    
    menuData.categories.forEach(category => {
        const categoryElement = createCategoryElement(category);
        categoriesContainer.appendChild(categoryElement);
    });
}

// Create category element
function createCategoryElement(category) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category';
    
    // Category header
    const headerDiv = document.createElement('div');
    headerDiv.className = 'category-header';
    
    const titleDiv = document.createElement('div');
    titleDiv.className = 'category-title';
    titleDiv.textContent = category.title;
    
    const badgesDiv = document.createElement('div');
    badgesDiv.className = 'category-badges';
    
    if (category.is_new) {
        const newBadge = document.createElement('span');
        newBadge.className = 'badge new';
        newBadge.textContent = '新品';
        badgesDiv.appendChild(newBadge);
    }
    
    if (category.is_recommended) {
        const recommendedBadge = document.createElement('span');
        recommendedBadge.className = 'badge recommended';
        recommendedBadge.textContent = '推薦';
        badgesDiv.appendChild(recommendedBadge);
    }
    
    headerDiv.appendChild(titleDiv);
    headerDiv.appendChild(badgesDiv);
    
    // Menu items
    const itemsDiv = document.createElement('div');
    itemsDiv.className = 'menu-items';
    
    category.items.forEach(item => {
        const itemElement = createMenuItemElement(item);
        itemsDiv.appendChild(itemElement);
    });
    
    categoryDiv.appendChild(headerDiv);
    categoryDiv.appendChild(itemsDiv);
    
    // Side dish options
    if (category.side_dish_options && category.side_dish_options.length > 0) {
        const sideDishDiv = document.createElement('div');
        sideDishDiv.className = 'side-dish-options';
        
        const sideDishTitle = document.createElement('div');
        sideDishTitle.className = 'side-dish-title';
        sideDishTitle.textContent = '配餐選擇';
        
        const sideDishList = document.createElement('div');
        sideDishList.className = 'side-dish-list';
        
        category.side_dish_options.forEach(option => {
            const optionSpan = document.createElement('span');
            optionSpan.className = 'side-dish-item';
            optionSpan.textContent = option;
            sideDishList.appendChild(optionSpan);
        });
        
        sideDishDiv.appendChild(sideDishTitle);
        sideDishDiv.appendChild(sideDishList);
        categoryDiv.appendChild(sideDishDiv);
    }
    
    // Add-ons
    if (category.add_ons && category.add_ons.length > 0) {
        const addOnsDiv = document.createElement('div');
        addOnsDiv.className = 'add-ons';
        
        const addOnsTitle = document.createElement('div');
        addOnsTitle.className = 'add-ons-title';
        addOnsTitle.textContent = '加購選項';
        
        category.add_ons.forEach(addOn => {
            const addOnDiv = document.createElement('div');
            addOnDiv.className = 'add-on-item';
            
            const nameSpan = document.createElement('span');
            nameSpan.className = 'add-on-name';
            nameSpan.textContent = addOn.name;
            
            const priceSpan = document.createElement('span');
            priceSpan.className = 'add-on-price';
            priceSpan.textContent = `NT$ ${addOn.price}`;
            
            addOnDiv.appendChild(nameSpan);
            addOnDiv.appendChild(priceSpan);
            addOnsDiv.appendChild(addOnDiv);
        });
        
        addOnsDiv.insertBefore(addOnsTitle, addOnsDiv.firstChild);
        categoryDiv.appendChild(addOnsDiv);
    }
    
    // Notes
    if (category.note) {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'category-note';
        noteDiv.textContent = category.note;
        categoryDiv.appendChild(noteDiv);
    }
    
    return categoryDiv;
}

// Create menu item element
function createMenuItemElement(item) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'menu-item';
    
    const infoDiv = document.createElement('div');
    infoDiv.className = 'item-info';
    
    const nameDiv = document.createElement('div');
    nameDiv.className = 'item-name';
    nameDiv.textContent = item.name;
    
    infoDiv.appendChild(nameDiv);
    
    if (item.options && item.options.length > 0) {
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'item-options';
        optionsDiv.textContent = `(${item.options.join(' / ')})`;
        infoDiv.appendChild(optionsDiv);
    }
    
    const priceDiv = document.createElement('div');
    priceDiv.className = 'item-price';
    priceDiv.textContent = `NT$ ${item.price}`;
    
    const badgesDiv = document.createElement('div');
    badgesDiv.className = 'item-badges';
    
    if (item.is_new) {
        const newBadge = document.createElement('span');
        newBadge.className = 'badge new';
        newBadge.textContent = '新品';
        badgesDiv.appendChild(newBadge);
    }
    
    if (item.is_recommended) {
        const recommendedBadge = document.createElement('span');
        recommendedBadge.className = 'badge recommended';
        recommendedBadge.textContent = '推薦';
        badgesDiv.appendChild(recommendedBadge);
    }
    
    itemDiv.appendChild(infoDiv);
    itemDiv.appendChild(priceDiv);
    
    if (badgesDiv.children.length > 0) {
        itemDiv.appendChild(badgesDiv);
    }
    
    return itemDiv;
}

// Populate set options section
function populateSetOptions() {
    if (!menuData.set_options) return;
    
    const gridDiv = document.createElement('div');
    gridDiv.className = 'set-options-grid';
    
    menuData.set_options.items.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'set-option';
        
        const nameDiv = document.createElement('div');
        nameDiv.className = 'set-option-name';
        nameDiv.textContent = `套餐 ${option.name}`;
        
        const priceDiv = document.createElement('div');
        priceDiv.className = 'set-option-price';
        priceDiv.textContent = `+NT$ ${option.extra_price}`;
        
        const contentList = document.createElement('ul');
        contentList.className = 'set-option-content';
        
        option.content.forEach(content => {
            const li = document.createElement('li');
            li.textContent = content;
            contentList.appendChild(li);
        });
        
        const saveDiv = document.createElement('div');
        saveDiv.className = 'set-option-save';
        saveDiv.textContent = `省 NT$ ${option.save}`;
        
        optionDiv.appendChild(nameDiv);
        optionDiv.appendChild(priceDiv);
        optionDiv.appendChild(contentList);
        optionDiv.appendChild(saveDiv);
        
        gridDiv.appendChild(optionDiv);
    });
    
    setOptionsContainer.appendChild(gridDiv);
    
    // Add notes if available
    if (menuData.set_options.notes && menuData.set_options.notes.length > 0) {
        const notesDiv = document.createElement('div');
        notesDiv.className = 'category-note';
        notesDiv.style.marginTop = '2rem';
        
        const notesList = document.createElement('ul');
        notesList.style.marginLeft = '1rem';
        
        menuData.set_options.notes.forEach(note => {
            const li = document.createElement('li');
            li.textContent = note;
            notesList.appendChild(li);
        });
        
        notesDiv.appendChild(notesList);
        setOptionsContainer.appendChild(notesDiv);
    }
}

// Populate drinks section
function populateDrinks() {
    if (!menuData.drinks) return;
    
    const gridDiv = document.createElement('div');
    gridDiv.className = 'drinks-grid';
    
    menuData.drinks.forEach(drink => {
        const drinkDiv = document.createElement('div');
        drinkDiv.className = 'drink-item';
        
        const nameDiv = document.createElement('div');
        nameDiv.className = 'drink-name';
        nameDiv.textContent = drink.name;
        
        const temperaturesDiv = document.createElement('div');
        temperaturesDiv.className = 'drink-temperatures';
        
        drink.temperature.forEach(temp => {
            const tempSpan = document.createElement('span');
            tempSpan.className = 'temperature-tag';
            tempSpan.textContent = temp;
            temperaturesDiv.appendChild(tempSpan);
        });
        
        const sizesDiv = document.createElement('div');
        sizesDiv.className = 'drink-sizes';
        
        drink.size.forEach(size => {
            const sizeDiv = document.createElement('div');
            sizeDiv.className = 'size-option';
            
            const labelDiv = document.createElement('div');
            labelDiv.className = 'size-label';
            labelDiv.textContent = size.label;
            
            const priceDiv = document.createElement('div');
            priceDiv.className = 'size-price';
            priceDiv.textContent = `NT$ ${size.price}`;
            
            sizeDiv.appendChild(labelDiv);
            sizeDiv.appendChild(priceDiv);
            sizesDiv.appendChild(sizeDiv);
        });
        
        drinkDiv.appendChild(nameDiv);
        drinkDiv.appendChild(temperaturesDiv);
        drinkDiv.appendChild(sizesDiv);
        
        if (drink.notes) {
            const notesDiv = document.createElement('div');
            notesDiv.className = 'drink-notes';
            notesDiv.textContent = drink.notes;
            drinkDiv.appendChild(notesDiv);
        }
        
        gridDiv.appendChild(drinkDiv);
    });
    
    drinksContainer.appendChild(gridDiv);
}

// Populate contact section
function populateContact() {
    if (!menuData.contact) return;
    
    const containerDiv = document.createElement('div');
    containerDiv.className = 'contact-container';
    
    // Address card
    const addressCard = document.createElement('div');
    addressCard.className = 'contact-card';
    
    const addressIcon = document.createElement('div');
    addressIcon.className = 'contact-icon';
    addressIcon.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
    
    const addressTitle = document.createElement('div');
    addressTitle.className = 'contact-title';
    addressTitle.textContent = '地址';
    
    const addressInfo = document.createElement('div');
    addressInfo.className = 'contact-info';
    addressInfo.textContent = menuData.contact.address;
    
    addressCard.appendChild(addressIcon);
    addressCard.appendChild(addressTitle);
    addressCard.appendChild(addressInfo);
    
    // Phone card
    const phoneCard = document.createElement('div');
    phoneCard.className = 'contact-card';
    
    const phoneIcon = document.createElement('div');
    phoneIcon.className = 'contact-icon';
    phoneIcon.innerHTML = '<i class="fas fa-phone"></i>';
    
    const phoneTitle = document.createElement('div');
    phoneTitle.className = 'contact-title';
    phoneTitle.textContent = '電話';
    
    const phoneInfo = document.createElement('div');
    phoneInfo.className = 'contact-info';
    phoneInfo.textContent = menuData.contact.phone;
    
    phoneCard.appendChild(phoneIcon);
    phoneCard.appendChild(phoneTitle);
    phoneCard.appendChild(phoneInfo);
    
    containerDiv.appendChild(addressCard);
    containerDiv.appendChild(phoneCard);
    
    // Social links
    if (menuData.social && menuData.social.length > 0) {
        const socialDiv = document.createElement('div');
        socialDiv.className = 'social-links';
        
        menuData.social.forEach(social => {
            const socialLink = document.createElement('a');
            socialLink.className = 'social-link';
            socialLink.href = '#';
            socialLink.target = '_blank';
            
            const icon = document.createElement('i');
            if (social.platform.toLowerCase() === 'facebook') {
                icon.className = 'fab fa-facebook';
            } else if (social.platform.toLowerCase() === 'instagram') {
                icon.className = 'fab fa-instagram';
            } else {
                icon.className = 'fas fa-link';
            }
            
            const nameSpan = document.createElement('span');
            nameSpan.textContent = social.name;
            
            socialLink.appendChild(icon);
            socialLink.appendChild(nameSpan);
            socialDiv.appendChild(socialLink);
        });
        
        containerDiv.appendChild(socialDiv);
    }
    
    contactContainer.appendChild(containerDiv);
}

// Populate notes section
function populateNotes() {
    if (!menuData.notes) return;
    
    const notesList = document.createElement('ul');
    notesList.className = 'notes-list';
    
    menuData.notes.forEach(note => {
        const noteItem = document.createElement('li');
        noteItem.className = 'note-item';
        noteItem.textContent = note;
        notesList.appendChild(noteItem);
    });
    
    notesContainer.appendChild(notesList);
}

// Setup navigation
function setupNavigation() {
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.getAttribute('data-section');
            
            // Update active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update active section
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetSection).classList.add('active');
        });
    });
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #dc3545;
        color: white;
        padding: 2rem;
        border-radius: 10px;
        text-align: center;
        z-index: 1000;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    `;
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Add smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading state
function showLoading(container) {
    container.innerHTML = '<div class="loading">載入中...</div>';
}

// Add fade-in animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all category elements for animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.category, .set-option, .drink-item, .contact-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }, 100);
}); 