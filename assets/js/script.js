// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Smooth Scrolling
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

// Air Quality Index Calculator (for air-quality.html page)
/* function checkAirQuality() {
    const locationInput = document.getElementById('location-input');
    const aqiResult = document.getElementById('aqi-result');
    
    if (!locationInput || !aqiResult) return;
    
    const location = locationInput.value.trim();
    
    if (!location) {
        alert('Please enter a location');
        return;
    }
    
    // Simulate AQI data (in real implementation, this would call an API)
    const simulatedAQI = Math.floor(Math.random() * 300) + 1;
    
    displayAQI(simulatedAQI, location);
} */

function displayAQI(aqi, location) {
    const aqiResult = document.getElementById('aqi-result');
    const aqiValue = document.getElementById('aqi-value');
    const aqiCategory = document.getElementById('aqi-category');
    const aqiDescription = document.getElementById('aqi-description');
    const locationName = document.getElementById('location-name');
    
    let category, description, bgColor, textColor;
    
    if (aqi <= 50) {
        category = 'Good';
        description = 'Air quality is satisfactory, and air pollution poses little or no risk.';
        bgColor = '#68D391';
        textColor = '#22543D';
    } else if (aqi <= 100) {
        category = 'Moderate';
        description = 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.';
        bgColor = '#F6E05E';
        textColor = '#744210';
    } else if (aqi <= 150) {
        category = 'Unhealthy for Sensitive Groups';
        description = 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.';
        bgColor = '#FC8181';
        textColor = '#742A2A';
    } else if (aqi <= 200) {
        category = 'Unhealthy';
        description = 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.';
        bgColor = '#F56565';
        textColor = '#742A2A';
    } else if (aqi <= 300) {
        category = 'Very Unhealthy';
        description = 'Health alert: The risk of health effects is increased for everyone.';
        bgColor = '#C53030';
        textColor = '#FFFFFF';
    } else {
        category = 'Hazardous';
        description = 'Health warning of emergency conditions: everyone is more likely to be affected.';
        bgColor = '#742A2A';
        textColor = '#FFFFFF';
    }
    
    aqiValue.textContent = aqi;
    aqiCategory.textContent = category;
    aqiDescription.textContent = description;
    locationName.textContent = location;
    
    aqiResult.style.backgroundColor = bgColor;
    aqiResult.style.color = textColor;
    aqiResult.classList.add('active');
    
    // Scroll to result
    aqiResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.info-card, .action-item, .stat-card, .tip-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Active navigation highlighting
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Run on page load
setActiveNav();

// Form validation (if forms are added later)
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#FC8181';
            } else {
                input.style.borderColor = '#E2E8F0';
            }
        });
        
        if (isValid) {
            // Form is valid, submit it
            console.log('Form submitted successfully');
            form.reset();
        }
    });
}
