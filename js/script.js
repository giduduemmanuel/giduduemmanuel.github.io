// ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const navbarToggler = document.querySelector('.navbar-toggler');
                navbarToggler.click();
            }
        }
    });
});

// ===== NAVBAR BACKGROUND ON SCROLL =====
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 102, 255, 0.3)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 102, 255, 0.15)';
    }
});

// ===== FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Basic form validation
        if (!name || !email || !subject || !message) {
            showAlert('Please fill in all fields', 'warning');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('Please enter a valid email address', 'warning');
            return;
        }

        // Show success message
        showAlert('Thank you for your message! I will get back to you soon.', 'success');

        // Reset form
        contactForm.reset();

        // Optionally, you can send the form data to a server endpoint
        // sendFormData(name, email, subject, message);
    });
}

// ===== ALERT FUNCTION =====
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Insert alert at the top of the contact form
    const contactSection = document.getElementById('contact');
    contactSection.insertBefore(alertDiv, contactSection.firstChild);

    // Auto-remove alert after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// ===== ANIMATED COUNTER FOR STATS =====
function animateCounter(element, target) {
    const increment = target / 100;
    let current = 0;

    const updateCount = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = target + '+';
        }
    };

    updateCount();
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate stats when they come into view
            if (entry.target.classList.contains('stat-box')) {
                const statNumber = entry.target.querySelector('h4');
                const targetValue = parseInt(statNumber.textContent);
                animateCounter(statNumber, targetValue);
            }

            // Add animation class to other elements
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card, .course-card, .stat-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== ENHANCED TESTIMONIALS ANIMATIONS =====
function addTestimonialAnimations() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach((card, index) => {
        // Add stagger animation
        card.style.animationDelay = `${index * 0.15}s`;
        
        // Add hover effect listener
        card.addEventListener('mouseenter', function() {
            // Animate stars on hover
            const stars = this.querySelectorAll('.stars i');
            stars.forEach((star, starIndex) => {
                star.style.animation = `none`;
                setTimeout(() => {
                    star.style.animation = `popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${starIndex * 0.1}s`;
                }, 10);
            });
        });

        // Add glow effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', x + 'px');
            this.style.setProperty('--mouse-y', y + 'px');
        });
    });
}

// Call animation function when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addTestimonialAnimations);
} else {
    addTestimonialAnimations();
}

// ===== COURSE FILTER FUNCTIONALITY =====
function initializeCourseFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseItems = document.querySelectorAll('.course-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter courses
            courseItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// Initialize filters when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCourseFilters);
} else {
    initializeCourseFilters();
}

// ===== FAQ ACCORDION ANIMATIONS =====
function initializeFaqAnimations() {
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isExpanding = this.classList.contains('collapsed');
            
            if (isExpanding) {
                // Add pulse effect when expanding
                this.style.animation = 'none';
                setTimeout(() => {
                    this.style.animation = '';
                }, 10);
            }
        });
    });
}

// Initialize FAQ when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFaqAnimations);
} else {
    initializeFaqAnimations();
}

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
            link.style.color = '#ffb6d9';
        }
    });
});

// ===== BUTTON RIPPLE EFFECT =====
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    // Remove existing ripples
    const ripples = button.querySelectorAll('.ripple');
    ripples.forEach(r => r.remove());

    button.appendChild(ripple);
}

// Add ripple effect to buttons
document.querySelectorAll('button, .btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// ===== MOBILE MENU CLOSE ON LINK CLICK =====
const navbarLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
});

// ===== LOAD EVENT ANIMATION =====
window.addEventListener('load', () => {
    // Add fade-in animation when page loads
    const elements = document.querySelectorAll('section');
    elements.forEach((el, index) => {
        el.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s both`;
    });
});

// ===== KEYBOARD ACCESSIBILITY =====
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            document.querySelector('.navbar-toggler').click();
        }
    }
});

// ===== PERFORMANCE: LAZY LOAD IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ===== SCROLL TO TOP BUTTON =====
const scrollTopButton = document.createElement('button');
scrollTopButton.id = 'scrollTopBtn';
scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopButton.className = 'btn-scroll-top';
document.body.appendChild(scrollTopButton);

// Add CSS for scroll top button
const style = document.createElement('style');
style.textContent = `
    .btn-scroll-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #0066ff 0%, #ff1493 100%);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);
    }

    .btn-scroll-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 102, 255, 0.4);
    }

    .btn-scroll-top.show {
        display: flex;
    }

    @media (max-width: 768px) {
        .btn-scroll-top {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
        }
    }
`;
document.head.appendChild(style);

// Show/hide scroll top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopButton.classList.add('show');
    } else {
        scrollTopButton.classList.remove('show');
    }
});

// Scroll to top when clicked
scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== FORM FIELD VALIDATION FEEDBACK =====
const formInputs = document.querySelectorAll('.form-control');
formInputs.forEach(input => {
    input.addEventListener('blur', function () {
        if (this.value.trim() === '') {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
        }
    });

    input.addEventListener('input', function () {
        if (this.value.trim() !== '') {
            this.classList.remove('is-invalid');
        }
    });
});

// ===== UTILITY: SEND FORM DATA TO BACKEND (OPTIONAL) =====
async function sendFormData(name, email, subject, message) {
    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, subject, message })
        });

        const data = await response.json();
        if (data.success) {
            console.log('Email sent successfully');
        } else {
            console.log('Failed to send email');
        }
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// ===== PREFETCH LINKS FOR FASTER NAVIGATION =====
const links = document.querySelectorAll('a[href^="http"]');
links.forEach(link => {
    link.rel = 'prefetch';
});

console.log('Portfolio script loaded successfully!');
