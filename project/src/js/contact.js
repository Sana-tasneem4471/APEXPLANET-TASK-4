// Contact form validation and submission
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const resetFormBtn = document.getElementById('resetForm');
  
  // Input fields
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  
  // Error message elements
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');
  
  // Validation functions
  const validateName = () => {
    if (!nameInput.value.trim()) {
      nameError.textContent = 'Name is required';
      return false;
    } else if (nameInput.value.trim().length < 2) {
      nameError.textContent = 'Name must be at least 2 characters';
      return false;
    } else {
      nameError.textContent = '';
      return true;
    }
  };
  
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      emailError.textContent = 'Email is required';
      return false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email address';
      return false;
    } else {
      emailError.textContent = '';
      return true;
    }
  };
  
  const validateSubject = () => {
    if (!subjectInput.value.trim()) {
      subjectError.textContent = 'Subject is required';
      return false;
    } else if (subjectInput.value.trim().length < 5) {
      subjectError.textContent = 'Subject must be at least 5 characters';
      return false;
    } else {
      subjectError.textContent = '';
      return true;
    }
  };
  
  const validateMessage = () => {
    if (!messageInput.value.trim()) {
      messageError.textContent = 'Message is required';
      return false;
    } else if (messageInput.value.trim().length < 10) {
      messageError.textContent = 'Message must be at least 10 characters';
      return false;
    } else {
      messageError.textContent = '';
      return true;
    }
  };
  
  // Add event listeners for real-time validation
  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  subjectInput.addEventListener('blur', validateSubject);
  messageInput.addEventListener('blur', validateMessage);
  
  // Form submission
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();
    
    // If all validations pass
    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
      // In a real application, you would send the form data to a server here
      // For demonstration purposes, we'll just simulate a successful submission
      
      // Show success message
      formSuccess.classList.add('active');
      
      // Reset form
      contactForm.reset();
    }
  });
  
  // Reset form button
  if (resetFormBtn) {
    resetFormBtn.addEventListener('click', () => {
      formSuccess.classList.remove('active');
    });
  }
});