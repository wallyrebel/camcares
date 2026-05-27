/*
   CAM CARES FOUNDATION - OFFICIAL INTERACTIVE LOGIC
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- NAVIGATION LOGIC ---
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    // Sticky Header and Active Section Highlighting
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Section Scroll Spy
        const scrollPosition = window.scrollY + 150;
        document.querySelectorAll('section').forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPosition >= top && scrollPosition < top + height) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    const link = item.querySelector('a');
                    if (link && link.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    });

    // Mobile Hamburger Toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close Mobile Menu on Link Click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });


    // --- REVEAL ON SCROLL ANIMATIONS ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once initially


    // --- MODAL CONTROLS ---
    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock background scroll
        }
    };

    const closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Unlock scroll
        }
    };

    // Close Modal on Overlay Click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay.id);
            }
        });
    });

    // Bind Close Buttons
    document.getElementById('modal-scholarship-close').addEventListener('click', () => closeModal('modal-scholarship'));
    document.getElementById('modal-popup-close').addEventListener('click', () => closeModal('modal-popup'));
    document.getElementById('modal-donate-close').addEventListener('click', () => closeModal('modal-donate'));

    // Bind Open Buttons
    document.getElementById('btn-scholarship-info').addEventListener('click', () => openModal('modal-scholarship'));
    document.getElementById('btn-popup-info').addEventListener('click', () => openModal('modal-popup'));
    document.getElementById('btn-donate-modal').addEventListener('click', () => {
        const sliderValue = document.getElementById('donation-slider').value;
        document.getElementById('modal-donation-val').innerText = sliderValue;
        
        // Dynamically set subject for email based on donation amount
        const emailLink = document.getElementById('btn-confirm-donation-mail');
        emailLink.setAttribute('href', `mailto:camcaresfoundation@gmail.com?subject=Donation of $${sliderValue} Support Inquiry&body=Hi Cam,%0D%0A%0D%0AI would like to donate $${sliderValue} to support the Cam Cares Foundation. Please provide instructions on how to complete this transfer.`);
        
        // Dynamically append the amount to the Cash App donation link for convenience
        const cashappLink = document.getElementById('modal-cashapp-link');
        if (cashappLink) {
            cashappLink.setAttribute('href', `https://cash.app/$CamCaresFoundation/${sliderValue}`);
        }
        
        openModal('modal-donate');
    });


    // --- IMPACT CALCULATOR LOGIC ---
    const slider = document.getElementById('donation-slider');
    const valDisplay = document.getElementById('slider-val');
    const impactAmountLabel = document.getElementById('impact-amount-label');
    const impactDesc = document.getElementById('impact-desc');
    const presets = document.querySelectorAll('.preset-btn');

    const updateCalculator = (val) => {
        valDisplay.innerText = val;
        impactAmountLabel.innerText = `$${val} Donation`;

        // Update Slider position if not triggered by slider drag
        if (slider.value != val) {
            slider.value = val;
        }

        // Adjust Presets active state
        presets.forEach(btn => {
            if (parseInt(btn.getAttribute('data-val')) === val) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Dynamic Text descriptions for impact levels
        if (val < 150) {
            impactDesc.innerText = "Funds a complete community outreach basket with fresh groceries, hygiene essentials, and seasonal items for a local family.";
        } else if (val >= 150 && val < 400) {
            impactDesc.innerText = "Funds a complete college textbook set and preparatory study materials for one Ripley High School Senior Scholar.";
        } else if (val >= 400 && val < 800) {
            impactDesc.innerText = "Funds materials, marketing, and fee waivers for a youth entrepreneur booth at our Town Square Pop-Up, helping them launch a business.";
        } else if (val >= 800 && val < 1500) {
            impactDesc.innerText = "Sponsors a partial academic scholarship award for a Ripley Senior, funding their first semester collegiate supplies.";
        } else {
            impactDesc.innerText = "Sponsors a full annual collegiate academic scholarship for an outstanding Ripley High School Senior Scholar.";
        }
    };

    // Slider Event
    slider.addEventListener('input', (e) => {
        updateCalculator(parseInt(e.target.value));
    });

    // Preset Clicks
    presets.forEach(btn => {
        btn.addEventListener('click', () => {
            const val = parseInt(btn.getAttribute('data-val'));
            updateCalculator(val);
        });
    });

    // Run initial calculator update
    updateCalculator(250);


    // --- FACEBOOK LIVE LOADER WITH AD-BLOCKER DETECTION FALLBACK ---
    const fbIframe = document.getElementById('fb-iframe');
    const fbFallback = document.getElementById('fb-fallback');
    const fbLoading = document.getElementById('fb-loading');
    
    let fbLoaded = false;

    // Detect if iframe loads
    fbIframe.addEventListener('load', () => {
        fbLoaded = true;
        fbLoading.style.display = 'none';
        fbIframe.style.display = 'block';
        fbFallback.style.display = 'none';
    });

    // Safety timeout: If facebook doesn't report loaded in 2.8 seconds, fallback
    setTimeout(() => {
        if (!fbLoaded) {
            fbLoading.style.display = 'none';
            fbIframe.style.display = 'none';
            fbFallback.style.display = 'flex';
            console.log("Facebook Page Plugin iframe load timed out or was blocked. Loading beautiful fallback feed cards instead.");
        }
    }, 2800);


    // --- PAST EVENTS FILTER LOGIC ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');

    if (filterButtons.length > 0 && eventCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                eventCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'flex';
                        // Force layout reflow to ensure display change registers before transitioning
                        void card.offsetWidth;
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        
                        // Set display to none after transition completes
                        const handleTransitionEnd = (e) => {
                            if (e.propertyName === 'opacity') {
                                card.style.display = 'none';
                                card.removeEventListener('transitionend', handleTransitionEnd);
                            }
                        };
                        card.addEventListener('transitionend', handleTransitionEnd);
                        
                        // Safety timeout in case transitionend event is missed
                        setTimeout(() => {
                            if (getComputedStyle(card).opacity === '0') {
                                card.style.display = 'none';
                            }
                        }, 350);
                    }
                });
            });
        });
    }

});

