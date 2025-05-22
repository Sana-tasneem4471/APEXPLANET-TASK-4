// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navList = document.querySelector('.nav-list');

  if (menuBtn && navList) {
    menuBtn.addEventListener('click', () => {
      navList.classList.toggle('active');
      
      // Toggle hamburger animation
      const spans = menuBtn.querySelectorAll('span');
      if (navList.classList.contains('active')) {
        spans[0].style.transform = 'translateY(8px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-list a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navList.classList.contains('active')) {
        navList.classList.remove('active');
        
        // Reset hamburger
        const spans = menuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  });

  // Header scroll effect
  const header = document.getElementById('header');
  if (header) {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 50) {
        header.style.boxShadow = 'var(--shadow-md)';
      } else {
        header.style.boxShadow = 'none';
      }
      
      lastScrollTop = scrollTop;
    });
  }

  // Add animation to elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .about-content > div, .skill-tag, .contact-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(element);
    });
  };
  
  // Run animation on load
  setTimeout(animateOnScroll, 100);
});

// Utility functions that might be used across pages
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const debounce = (func, delay = 300) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};