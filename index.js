document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // ───────────────────────────────────────────────────────────────
    // MOBILE NAV DRAWER TOGGLE
    // ───────────────────────────────────────────────────────────────
    const menuToggle = document.getElementById('menuToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    let drawerOpen = false;

    if (menuToggle && mobileDrawer) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            drawerOpen = !drawerOpen;
            if (drawerOpen) {
                mobileDrawer.classList.add('active');
                menuToggle.innerHTML = '<i data-lucide="x"></i>';
            } else {
                mobileDrawer.classList.remove('active');
                menuToggle.innerHTML = '<i data-lucide="menu"></i>';
            }
            lucide.createIcons(); // Refresh icons inside button
        });

        // Close drawer on click outside
        document.addEventListener('click', (e) => {
            if (drawerOpen && !mobileDrawer.contains(e.target) && e.target !== menuToggle) {
                drawerOpen = false;
                mobileDrawer.classList.remove('active');
                menuToggle.innerHTML = '<i data-lucide="menu"></i>';
                lucide.createIcons();
            }
        });

        // Close drawer on link click
        const drawerLinks = mobileDrawer.querySelectorAll('.drawer-link');
        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                drawerOpen = false;
                mobileDrawer.classList.remove('active');
                menuToggle.innerHTML = '<i data-lucide="menu"></i>';
                lucide.createIcons();
            });
        });
    }

    // ───────────────────────────────────────────────────────────────
    // SCROLL NAVBAR STYLING
    // ───────────────────────────────────────────────────────────────
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.9rem 2rem';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
            navbar.style.background = 'rgba(7, 9, 19, 0.85)';
        } else {
            navbar.style.padding = '1.2rem 2rem';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.04)';
            navbar.style.background = 'rgba(7, 9, 19, 0.7)';
        }
    });

    // ───────────────────────────────────────────────────────────────
    // DYNAMIC PROJECT FILTERING
    // ───────────────────────────────────────────────────────────────
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs, add to clicked
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterValue = tab.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Add a smooth fade transition
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // ───────────────────────────────────────────────────────────────
    // COLLAPSIBLE DETAILS (ACCORDION)
    // ───────────────────────────────────────────────────────────────
    const detailsContainers = document.querySelectorAll('.collapsible-details');

    detailsContainers.forEach(container => {
        const toggleBtn = container.querySelector('.details-toggle');
        const content = container.querySelector('.details-content');

        if (toggleBtn && content) {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const isOpen = container.classList.contains('open');

                // Toggle class
                if (isOpen) {
                    container.classList.remove('open');
                } else {
                    container.classList.add('open');
                }
            });
        }
    });

    // ───────────────────────────────────────────────────────────────
    // MOUSE FOLLOW HOVER GLOW EFFECT
    // ───────────────────────────────────────────────────────────────
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
});
