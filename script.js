document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Define the Header (Logo + Menu + Cart)
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
                    <a href="#" class="cart-icon-link">
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

    // 2. Define the Footer
    const footerContent = `
        <p>&copy; 2026 Golden Essence Pvt Ltd. All rights reserved.</p>
    `;

    // 3. Inject the Header and Footer
    const headerElement = document.getElementById('main-header');
    if (headerElement) headerElement.innerHTML = headerContent;

    const footerElement = document.getElementById('main-footer');
    if (footerElement) footerElement.innerHTML = footerContent;

    // 4. Highlight Active Page Link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === currentPath) {
            link.classList.add('active');
        }
    });

    // =========================================
    // 5. CART LOGIC
    // =========================================
    
    // Load existing cart from browser memory (or create empty array)
    let cart = JSON.parse(localStorage.getItem('goldenEssenceCart')) || [];

    // Function to update the number on the cart icon
    function updateCartUI() {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            // Calculate total quantity of items
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCountElement.textContent = totalItems;
            
            // Add a quick animation class to make it "pop" when updated
            cartCountElement.classList.remove('pop-animation');
            void cartCountElement.offsetWidth; // Trigger reflow
            cartCountElement.classList.add('pop-animation');
        }
    }

    // Initialize the cart counter when page loads
    updateCartUI();

    // Attach click events to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Find the closest product card to the clicked button
            const card = e.target.closest('.product-card');
            
            // Extract product details from the HTML
            const title = card.querySelector('h3').textContent;
            const priceText = card.querySelector('.price').textContent;
            const price = parseFloat(priceText.replace('$', '')); // Convert "$45.00" to 45.00

            // Check if item is already in the cart
            const existingItem = cart.find(item => item.title === title);
            
            if (existingItem) {
                existingItem.quantity += 1; // Increase quantity
            } else {
                cart.push({ title: title, price: price, quantity: 1 }); // Add new item
            }

            // Save the updated cart back to browser memory
            localStorage.setItem('goldenEssenceCart', JSON.stringify(cart));
            
            // Update the header icon
            updateCartUI();

            // Button Visual Feedback (Changes to "Added ✓" temporarily)
            const originalText = this.textContent;
            this.textContent = 'Added ✓';
            this.style.backgroundColor = 'var(--earth-dark)';
            this.style.color = 'var(--gold)';
            this.style.borderColor = 'var(--earth-dark)';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
                this.style.color = '';
                this.style.borderColor = '';
            }, 1500);
        });
    });
});
