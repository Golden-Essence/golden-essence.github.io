document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Define the Header (Logo + Menu)
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
            </ul>
        </nav>
    `;

    // 2. Define the Footer
    const footerContent = `
        <p>&copy; 2026 Golden Essence Pvt Ltd. All rights reserved.</p>
    `;

    // 3. Inject the Header into the page
    const headerElement = document.getElementById('main-header');
    if (headerElement) {
        headerElement.innerHTML = headerContent;
    }

    // 4. Inject the Footer into the page
    const footerElement = document.getElementById('main-footer');
    if (footerElement) {
        footerElement.innerHTML = footerContent;
    }

    // 5. Automatically highlight the correct menu link based on the page you are on
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === currentPath) {
            link.classList.add('active');
        }
    });
});
