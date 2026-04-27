document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');

    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the target page ID from the data-target attribute
            const targetId = btn.getAttribute('data-target');
            
            // Remove active class from all pages and nav links
            pages.forEach(page => page.classList.remove('active'));
            navButtons.forEach(nav => nav.classList.remove('active'));

            // Add active class to the clicked button and corresponding page
            document.getElementById(targetId).classList.add('active');
            
            // Highlight the nav bar links specifically (ignoring CTA buttons)
            if(btn.tagName === 'A') {
                btn.classList.add('active');
            } else {
                // If it was a button (like the 'Explore Our Lab' button), highlight the correct nav link
                const correspondingNavLink = document.querySelector(`nav a[data-target="${targetId}"]`);
                if(correspondingNavLink) correspondingNavLink.classList.add('active');
            }
            
            // Scroll to top of the page smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
});
