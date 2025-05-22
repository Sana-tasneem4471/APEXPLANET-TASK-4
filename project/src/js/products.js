// Product Listing with Filtering and Sorting
document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const productsGrid = document.getElementById('productsGrid');
  const productCount = document.getElementById('productCount');
  const noProductsFound = document.getElementById('noProductsFound');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  const clearFiltersBtn = document.getElementById('clearFiltersBtn');
  const priceRange = document.getElementById('priceRange');
  const priceValue = document.getElementById('priceValue');
  const sortSelect = document.getElementById('sortOrder');
  const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
  const ratingRadios = document.querySelectorAll('input[name="rating"]');
  
  // Product data
  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      category: 'electronics',
      price: 199.99,
      originalPrice: 249.99,
      discount: 20,
      rating: 4.5,
      reviews: 128,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 2,
      name: 'Smartphone Pro Max',
      category: 'electronics',
      price: 999.99,
      originalPrice: 1099.99,
      discount: 9,
      rating: 4.8,
      reviews: 356,
      image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 3,
      name: 'Fitness Smartwatch',
      category: 'electronics',
      price: 149.99,
      originalPrice: 179.99,
      discount: 16,
      rating: 4.3,
      reviews: 94,
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 4,
      name: 'Designer T-Shirt',
      category: 'clothing',
      price: 39.99,
      originalPrice: 49.99,
      discount: 20,
      rating: 4.1,
      reviews: 87,
      image: 'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 5,
      name: 'Premium Jeans',
      category: 'clothing',
      price: 79.99,
      originalPrice: 99.99,
      discount: 20,
      rating: 4.6,
      reviews: 152,
      image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 6,
      name: 'Winter Jacket',
      category: 'clothing',
      price: 129.99,
      originalPrice: 159.99,
      discount: 18,
      rating: 4.4,
      reviews: 76,
      image: 'https://images.pexels.com/photos/7764611/pexels-photo-7764611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 7,
      name: 'Bestselling Novel',
      category: 'books',
      price: 14.99,
      originalPrice: 19.99,
      discount: 25,
      rating: 4.7,
      reviews: 215,
      image: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 8,
      name: 'Cooking Cookbook',
      category: 'books',
      price: 24.99,
      originalPrice: 29.99,
      discount: 16,
      rating: 4.2,
      reviews: 63,
      image: 'https://images.pexels.com/photos/1305064/pexels-photo-1305064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 9,
      name: 'Business Strategy Guide',
      category: 'books',
      price: 34.99,
      originalPrice: 39.99,
      discount: 12,
      rating: 3.9,
      reviews: 42,
      image: 'https://images.pexels.com/photos/5834422/pexels-photo-5834422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 10,
      name: 'Coffee Maker',
      category: 'home',
      price: 89.99,
      originalPrice: 119.99,
      discount: 25,
      rating: 4.6,
      reviews: 187,
      image: 'https://images.pexels.com/photos/6316065/pexels-photo-6316065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 11,
      name: 'Bedding Set',
      category: 'home',
      price: 69.99,
      originalPrice: 89.99,
      discount: 22,
      rating: 4.3,
      reviews: 109,
      image: 'https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 12,
      name: 'Kitchen Knife Set',
      category: 'home',
      price: 49.99,
      originalPrice: 69.99,
      discount: 28,
      rating: 4.5,
      reviews: 92,
      image: 'https://images.pexels.com/photos/3209101/pexels-photo-3209101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];
  
  // Product Manager
  const ProductManager = {
    // Filter and sort products
    getFilteredProducts() {
      let filteredProducts = [...products];
      
      // Get current filter values
      const selectedCategories = Array.from(categoryCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
      
      const maxPrice = parseInt(priceRange.value);
      const minRating = parseInt(document.querySelector('input[name="rating"]:checked').value) || 0;
      
      // Apply category filter
      if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
          selectedCategories.includes(product.category)
        );
      }
      
      // Apply price filter
      filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
      
      // Apply rating filter
      if (minRating > 0) {
        filteredProducts = filteredProducts.filter(product => product.rating >= minRating);
      }
      
      // Apply sorting
      const sortOrder = sortSelect.value;
      
      switch(sortOrder) {
        case 'price-asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating-desc':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'name-asc':
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default: // 'featured'
          // Already in featured order
          break;
      }
      
      return filteredProducts;
    },
    
    // Render products to the grid
    renderProducts() {
      const filteredProducts = this.getFilteredProducts();
      
      // Clear current grid
      productsGrid.innerHTML = '';
      
      // Update product count
      productCount.textContent = `Showing ${filteredProducts.length} products`;
      
      // Show no products message if none found
      if (filteredProducts.length === 0) {
        noProductsFound.classList.add('active');
      } else {
        noProductsFound.classList.remove('active');
      }
      
      // Create product cards
      filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // Generate star rating HTML
        const stars = this.generateStars(product.rating);
        
        productCard.innerHTML = `
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            ${product.discount ? `<span class="product-discount">-${product.discount}%</span>` : ''}
          </div>
          <div class="product-content">
            <div class="product-category">${product.category}</div>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-rating">
              <div class="product-stars">${stars}</div>
              <span class="product-reviews">(${product.reviews})</span>
            </div>
            <div class="product-price">
              <span class="current-price">$${product.price.toFixed(2)}</span>
              ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            <div class="product-actions">
              <button class="btn btn-primary btn-small">Add to Cart</button>
            </div>
          </div>
        `;
        
        productsGrid.appendChild(productCard);
      });
    },
    
    // Generate star rating HTML
    generateStars(rating) {
      const fullStars = Math.floor(rating);
      const halfStar = rating % 1 >= 0.5;
      const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
      
      let starsHtml = '';
      
      // Add full stars
      for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fas fa-star"></i>';
      }
      
      // Add half star if needed
      if (halfStar) {
        starsHtml += '<i class="fas fa-star-half-alt"></i>';
      }
      
      // Add empty stars
      for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="far fa-star"></i>';
      }
      
      return starsHtml;
    },
    
    // Reset all filters to default
    resetFilters() {
      // Reset price range
      priceRange.value = 1000;
      priceValue.textContent = '$1000';
      
      // Reset categories
      categoryCheckboxes.forEach(checkbox => {
        checkbox.checked = true;
      });
      
      // Reset rating
      document.querySelector('input[name="rating"][value="0"]').checked = true;
      
      // Reset sort
      sortSelect.value = 'featured';
      
      // Re-render products
      this.renderProducts();
    }
  };
  
  // Initialize product display
  ProductManager.renderProducts();
  
  // Event Listeners
  
  // Price range slider
  priceRange.addEventListener('input', () => {
    const value = priceRange.value;
    priceValue.textContent = `$${value}`;
    ProductManager.renderProducts();
  });
  
  // Category checkboxes
  categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      ProductManager.renderProducts();
    });
  });
  
  // Rating radios
  ratingRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      ProductManager.renderProducts();
    });
  });
  
  // Sort select
  sortSelect.addEventListener('change', () => {
    ProductManager.renderProducts();
  });
  
  // Reset filters button
  resetFiltersBtn.addEventListener('click', () => {
    ProductManager.resetFilters();
  });
  
  // Clear filters button
  clearFiltersBtn.addEventListener('click', () => {
    ProductManager.resetFilters();
  });
});