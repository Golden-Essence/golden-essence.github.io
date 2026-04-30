document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================
    // 1. DEFINE HTML TEMPLATES
    // =========================================
    
    const headerContent = `
        <div class="logo">
            <a href="index.html" style="text-decoration: none; display: flex; align-items: center;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" width="250" height="60">
                    <defs>
                        <linearGradient id="goldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#AA8C2C" />
                            <stop offset="100%" stop-color="#D4AF37" />
                        </linearGradient>
                    </defs>
                    <g transform="translate(0, 5)">
                        <circle cx="45" cy="45" r="40" fill="#2C2A24" />
                        <path d="M 35 70 Q 25 45 35 25 Q 38 20 42 30 Q 37 50 43 70 Z" fill="url(#goldGrad)" />
                        <path d="M 45 70 Q 40 35 50 15 Q 54 10 57 20 Q 50 45 53 70 Z" fill="url(#goldGrad)" />
                        <path d="M 55 70 Q 60 45 65 32 Q 68 28 66 38 Q 62 55 60 70 Z" fill="url(#goldGrad)" />
                        <ellipse cx="45" cy="70" rx="16" ry="3" fill="#D4AF37" opacity="0.9" />
                    </g>
                    <text x="100" y="52" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="28" font-weight="bold" fill="#D4AF37" letter-spacing="1.5">GOLDEN ESSENCE</text>
                    <text x="104" y="75" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="12" font-weight="normal" fill="#FFFFFF" letter-spacing="4.5">PVT LTD</text>
                </svg>
            </a>
        </div>
        <nav>
            <ul id="nav-links">
                <li><a href="index.html" class="nav-link" data-page="index.html">Home</a></li>
                <li><a href="lab.html" class="nav-link" data-page="lab.html">Our Lab</a></li>
                <li><a href="shop.html" class="nav-link" data-page="shop.html">Shop</a></li>
                <li><a href="contact.html" class="nav-link" data-page="contact.html">Contact</a></li>
                <li class="cart-nav-item">
                    <a href="#" class="cart-icon-link" id="open-cart-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        <span id="cart-count" class="cart-badge">0</span>
                    </a>
                </li>
            </ul>
        </nav>
    `;

    const footerContent = `
        <p>&copy; 2026 Golden Essence Pvt Ltd. All rights reserved.</p>
    `;

    // Cart Drawer HTML
    const cartDrawerHTML = `
        <div id="cart-overlay" class="cart-overlay"></div>
        <div id="cart-drawer" class="cart-drawer">
            <div class="cart-header">
                <h2>Your Apothecary Cart</h2>
                <button id="close-cart-btn" class="close-cart">&times;</button>
            </div>
            <div id="cart-items-container" class="cart-items">
                <!-- Cart items will be injected here by JS -->
            </div>
            <div class="cart-footer">
                <div class="cart-total-row">
                    <span>Subtotal:</span>
                    <span id="cart-subtotal" class="cart-subtotal-price">$0.00</span>
                </div>
                <p class="cart-taxes-note">Taxes and shipping calculated at checkout.</p>
                <button class="btn btn-checkout">Proceed to Checkout</button>
            </div>
        </div>
    `;

    // =========================================
    // 2. INJECT HTML INTO PAGE
    // =========================================

    const headerElement = document.getElementById('main-header');
    if (headerElement) headerElement.innerHTML = headerContent;

    const footerElement = document.getElementById('main-footer');
    if (footerElement) footerElement.innerHTML = footerContent;

    // Inject Cart Drawer at the end of the body
    document.body.insertAdjacentHTML('beforeend', cartDrawerHTML);

    // Highlight Active Page Link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === currentPath) {
            link.classList.add('active');
        }
    });

    // =========================================
    // 3. CART LOGIC & INTERACTIVITY
    // =========================================
    
    let cart = JSON.parse(localStorage.getItem('goldenEssenceCart')) || [];

    // DOM Elements for Cart
    const cartOverlay = document.getElementById('cart-overlay');
    const cartDrawer = document.getElementById('cart-drawer');
    const openCartBtn = document.getElementById('open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const cartCountEl = document.getElementById('cart-count');

    // Open/Close Cart Functions
    function openCart(e) {
        if(e) e.preventDefault();
        cartOverlay.classList.add('active');
        cartDrawer.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevents background scrolling
    }

    function closeCart() {
        cartOverlay.classList.remove('active');
        cartDrawer.classList.remove('active');
        document.body.style.overflow = '';
    }

    if(openCartBtn) openCartBtn.addEventListener('click', openCart);
    if(closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if(cartOverlay) cartOverlay.addEventListener('click', closeCart);

    // Render Cart Contents
    function renderCart() {
        cartItemsContainer.innerHTML = ''; // Clear current items
        let subtotal = 0;
        let totalItems = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is currently empty.</p>';
        } else {
            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                totalItems += item.quantity;

                // Fallback image if older cart items don't have one saved
                const imgSrc = item.img || 'https://via.placeholder.com/80x80?text=Product';

                cartItemsContainer.innerHTML += `
                    <div class="cart-item" data-index="${index}">
                        <img src="${imgSrc}" alt="${item.title}" class="cart-item-img">
                        <div class="cart-item-details">
                            <h4 class="cart-item-title">${item.title}</h4>
                            <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                            
                            <div class="cart-qty-controls">
                                <button class="qty-btn minus-btn">-</button>
                                <span class="qty-display">${item.quantity}</span>
                                <button class="qty-btn plus-btn">+</button>
                                <button class="remove-btn">Remove</button>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        // Update Totals and Badge
        cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        if (cartCountEl) {
            cartCountEl.textContent = totalItems;
            cartCountEl.classList.remove('pop-animation');
            void cartCountEl.offsetWidth; // Trigger reflow
            cartCountEl.classList.add('pop-animation');
        }

        // Save to memory
        localStorage.setItem('goldenEssenceCart', JSON.stringify(cart));
    }

    // Initialize cart on load
    renderCart();

    // Event Delegation for Plus, Minus, and Remove buttons inside the Cart
    cartItemsContainer.addEventListener('click', function(e) {
        const itemElement = e.target.closest('.cart-item');
        if (!itemElement) return;

        const index = itemElement.getAttribute('data-index');

        if (e.target.classList.contains('plus-btn')) {
            cart[index].quantity += 1;
            renderCart();
        } 
        else if (e.target.classList.contains('minus-btn')) {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1); // Remove if qty drops below 1
            }
            renderCart();
        } 
        else if (e.target.classList.contains('remove-btn')) {
            cart.splice(index, 1);
            renderCart();
        }
    });

    // Add to Cart Button Logic (Shop Page)
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const card = e.target.closest('.product-card');
            
            const title = card.querySelector('h3').textContent;
            const priceText = card.querySelector('.price').textContent;
            const price = parseFloat(priceText.replace('$', ''));
            const img = card.querySelector('.product-img').src; // Grab image URL

            const existingItem = cart.find(item => item.title === title);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ title: title, price: price, quantity: 1, img: img });
            }

            renderCart();
            openCart(); // Automatically open drawer so user sees it added

            // Button Feedback
            const originalText = this.textContent;
            this.textContent = 'Added ✓';
            this.style.backgroundColor = 'var(--earth-dark)';
            this.style.color = 'var(--gold)';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
                this.style.color = '';
            }, 1500);
        });
    });
});
