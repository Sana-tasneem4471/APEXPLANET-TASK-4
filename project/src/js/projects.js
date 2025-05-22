// Projects filter functionality
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  // Filter projects by category
  const filterProjects = (category) => {
    projectCards.forEach(card => {
      const cardCategories = card.dataset.category.split(' ');
      
      if (category === 'all' || cardCategories.includes(category)) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  };
  
  // Add click event to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Filter projects based on category
      const filterValue = button.dataset.filter;
      filterProjects(filterValue);
    });
  });
  
  // Initialize with "all" filter active
  filterProjects('all');
});