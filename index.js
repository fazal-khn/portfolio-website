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
            navbar.style.borderBottom = '1px solid var(--card-border-hover)';
            navbar.style.background = 'var(--navbar-bg)';
        } else {
            navbar.style.padding = '1.2rem 2rem';
            navbar.style.borderBottom = '1px solid var(--navbar-border)';
            navbar.style.background = 'var(--navbar-bg)';
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

    // ───────────────────────────────────────────────────────────────
    // FIGMA DESIGN GALLERY & LIGHTBOX
    // ───────────────────────────────────────────────────────────────
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    if (galleryItems.length > 0 && lightboxModal) {
        let activeGalleryIndex = 0;

        function openLightbox(index) {
            activeGalleryIndex = index;
            const activeItem = galleryItems[activeGalleryIndex];
            const src = activeItem.getAttribute('data-src');
            const caption = activeItem.getAttribute('data-caption');

            lightboxImage.style.opacity = '0';
            setTimeout(() => {
                lightboxImage.src = src;
                lightboxCaption.textContent = caption;
                lightboxImage.style.opacity = '1';
            }, 150);

            lightboxModal.classList.add('active');
            lightboxModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Stop background scroll
        }

        function closeLightbox() {
            lightboxModal.classList.remove('active');
            lightboxModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Restore background scroll
        }

        function showNextImage() {
            activeGalleryIndex = (activeGalleryIndex + 1) % galleryItems.length;
            openLightbox(activeGalleryIndex);
        }

        function showPrevImage() {
            activeGalleryIndex = (activeGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
            openLightbox(activeGalleryIndex);
        }

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                openLightbox(index);
            });
        });

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                showPrevImage();
            });
        }
        if (lightboxNext) {
            lightboxNext.addEventListener('click', (e) => {
                e.stopPropagation();
                showNextImage();
            });
        }

        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (!lightboxModal.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            }
        });
    }

    // ───────────────────────────────────────────────────────────────
    // DARK / LIGHT THEME TOGGLE (Default is Light)
    // ───────────────────────────────────────────────────────────────
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeToggleBtnMobile = document.getElementById('themeToggleMobile');
    
    function toggleTheme() {
        const isDark = document.body.classList.toggle('theme-dark');
        
        // Update both desktop & mobile icons
        const iconHTML = isDark ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
        if (themeToggleBtn) themeToggleBtn.innerHTML = iconHTML;
        if (themeToggleBtnMobile) themeToggleBtnMobile.innerHTML = iconHTML;
        
        // Re-initialize icons
        lucide.createIcons();
        
        // Save user preference
        localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    }

    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
    if (themeToggleBtnMobile) themeToggleBtnMobile.addEventListener('click', toggleTheme);

    // Load saved preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('theme-dark');
        if (themeToggleBtn) themeToggleBtn.innerHTML = '<i data-lucide="sun"></i>';
        if (themeToggleBtnMobile) themeToggleBtnMobile.innerHTML = '<i data-lucide="sun"></i>';
        lucide.createIcons();
    }
});
