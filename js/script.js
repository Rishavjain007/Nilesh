/**
 * Nilesh Construction - Main JavaScript File
 * Author: Construction Web Development Team
 * Version: 2.0
 * Date: 2026-01-09
 */

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    setCurrentYear();
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize form validation and submission
    initForms();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize active menu highlighting
    highlightActiveMenu();
    
    // Initialize project filtering
    initProjectFilter();
    
    // Initialize FAQ accordion
    initFAQAccordion();
});

// ===== UTILITY FUNCTIONS =====

/**
 * Sets the current year in the footer copyright notice
 */
function setCurrentYear() {
    const yearElements = document.querySelectorAll('#currentYear');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

/**
 * Initializes mobile navigation menu toggle
 */
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

/**
 * Highlights the active menu item based on current page
 */
function highlightActiveMenu() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Check if this link corresponds to the current page
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===== FORM HANDLING =====

/**
 * Initializes form validation and submission for all forms
 */
function initForms() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Add input validation styling
    initFormValidation();
}

/**
 * Initializes form validation with real-time feedback
 */
function initFormValidation() {
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        // Add focus styling
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            validateField(this);
        });
        
        // Validate on input change for immediate feedback
        input.addEventListener('input', function() {
            validateField(this);
        });
    });
}

/**
 * Validates a single form field
 * @param {HTMLElement} field - The form field to validate
 */
function validateField(field) {
    const fieldWrapper = field.parentElement;
    const errorElement = fieldWrapper.querySelector('.error-message');
    
    // Skip validation if field is not required and empty
    if (!field.required && field.value.trim() === '') {
        return true;
    }
    
    let isValid = true;
    let errorMessage = '';
    
    // Check required fields
    if (field.required && field.value.trim() === '') {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Validate email format
    else if (field.type === 'email' && field.value.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value.trim())) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Validate phone number (basic validation for Indian numbers)
    else if (field.type === 'tel' && field.value.trim() !== '') {
        const phoneRegex = /^[\d\s\-\+\(\)]{10,15}$/;
        if (!phoneRegex.test(field.value.trim())) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Apply validation result
    if (!isValid && errorElement) {
        errorElement.textContent = errorMessage;
    } else if (errorElement) {
        errorElement.textContent = '';
    }
    
    return isValid;
}

/**
 * Handles form submission
 * @param {Event} event - The form submission event
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const formMessage = document.getElementById('formMessage');
    
    // Validate all fields
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showFormMessage(formMessage, 'Please correct the errors in the form.', 'error');
        return;
    }
    
    // Simulate form submission (in a real app, this would be an AJAX call)
    showFormMessage(formMessage, 'Sending your message...', 'info');
    
    setTimeout(() => {
        // In a real application, you would send data to a server here
        // For this demo, we'll simulate a successful submission
        
        const submissionData = {};
        formData.forEach((value, key) => {
            submissionData[key] = value;
        });
        
        console.log('Form submission:', submissionData);
        
        // Show success message
        showFormMessage(formMessage, 'Thank you for your message! We will respond to your inquiry within 24 hours.', 'success');
        
        // Reset form
        form.reset();
        
        // Scroll to the message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 1500);
}

/**
 * Displays a form submission message
 * @param {HTMLElement} element - The message container element
 * @param {string} message - The message text
 * @param {string} type - The message type (success, error, info)
 */
function showFormMessage(element, message, type) {
    if (!element) return;
    
    element.textContent = message;
    element.className = 'form-message';
    
    switch (type) {
        case 'success':
            element.classList.add('success');
            break;
        case 'error':
            element.classList.add('error');
            break;
        case 'info':
            // Default styling for info messages
            element.style.backgroundColor = 'rgba(33, 33, 33, 0.1)';
            element.style.color = '#212121';
            element.style.border = '1px solid #212121';
            break;
    }
}

// ===== PROJECT FILTERING =====

/**
 * Initializes project filtering functionality
 */
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length === 0 || projectItems.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== FAQ ACCORDION =====

/**
 * Initializes FAQ accordion functionality
 */
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle active class on question
            this.classList.toggle('active');
            
            // Get the answer element
            const answer = this.nextElementSibling;
            
            // Toggle answer visibility
            if (answer.classList.contains('active')) {
                answer.classList.remove('active');
                answer.style.maxHeight = null;
            } else {
                answer.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
            
            // Close other answers
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this && otherQuestion.classList.contains('active')) {
                    otherQuestion.classList.remove('active');
                    const otherAnswer = otherQuestion.nextElementSibling;
                    otherAnswer.classList.remove('active');
                    otherAnswer.style.maxHeight = null;
                }
            });
        });
    });
}

// ===== SCROLL ANIMATIONS =====

/**
 * Initializes scroll animations for page elements
 */
function initScrollAnimations() {
    // Only run animations if page is not too heavy on mobile
    if (window.innerWidth > 768) {
        // Add scroll event listener
        window.addEventListener('scroll', handleScrollAnimations);
        
        // Trigger once on load
        handleScrollAnimations();
    }
}

/**
 * Handles scroll-triggered animations
 */
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .advantage-card, .benefit-item, .other-material-card');
    
    animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// ===== ADDITIONAL ENHANCEMENTS =====

/**
 * Smooth scroll to anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Add loading="lazy" to all images for better performance
 */
document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
    }
});

/**
 * Handle table overflow on mobile
 */
function handleTableOverflow() {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-wrapper';
        wrapper.style.overflowX = 'auto';
        
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });
}

// Call table overflow handling on load
window.addEventListener('load', handleTableOverflow);

// ===== PERFORMANCE OPTIMIZATION =====

// Debounce scroll events for better performance
let scrollTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(handleScrollAnimations, 100);
});

// Log page load performance (for debugging)
window.addEventListener('load', function() {
    console.log('Nilesh Construction website loaded successfully.');
    console.log('Performance optimized for modern browsers.');
});