// To-Do List App with localStorage functionality
document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const todoForm = document.getElementById('todoForm');
  const todoInput = document.getElementById('todoInput');
  const taskCategory = document.getElementById('taskCategory');
  const todoList = document.getElementById('todoList');
  const emptyState = document.getElementById('emptyState');
  const taskCounter = document.getElementById('taskCounter');
  const currentFilter = document.getElementById('currentFilter');
  const clearCompletedBtn = document.getElementById('clearCompletedBtn');
  const filterButtons = document.querySelectorAll('.filter-item');
  const categoryButtons = document.querySelectorAll('.category-item');
  
  // Current filter and category state
  let activeFilter = 'all';
  let activeCategory = null;
  
  // Task class
  class Task {
    constructor(id, text, category, completed = false) {
      this.id = id;
      this.text = text;
      this.category = category;
      this.completed = completed;
      this.createdAt = new Date();
    }
  }
  
  // Task manager
  const TaskManager = {
    tasks: [],
    
    // Load tasks from localStorage
    loadTasks() {
      const savedTasks = localStorage.getItem('tasks');
      this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
      this.renderTasks();
      this.updateTaskCounter();
    },
    
    // Save tasks to localStorage
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.updateTaskCounter();
    },
    
    // Add a new task
    addTask(text, category) {
      const id = Date.now().toString();
      const newTask = new Task(id, text, category);
      this.tasks.push(newTask);
      this.saveTasks();
      this.renderTasks();
      
      return newTask;
    },
    
    // Remove a task
    removeTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.saveTasks();
      this.renderTasks();
    },
    
    // Toggle task completion
    toggleTaskCompletion(id) {
      this.tasks = this.tasks.map(task => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      this.saveTasks();
      this.renderTasks();
    },
    
    // Clear completed tasks
    clearCompletedTasks() {
      this.tasks = this.tasks.filter(task => !task.completed);
      this.saveTasks();
      this.renderTasks();
    },
    
    // Filter tasks
    filterTasks() {
      let filteredTasks = [...this.tasks];
      
      // Apply status filter
      if (activeFilter === 'completed') {
        filteredTasks = filteredTasks.filter(task => task.completed);
      } else if (activeFilter === 'pending') {
        filteredTasks = filteredTasks.filter(task => !task.completed);
      }
      
      // Apply category filter
      if (activeCategory) {
        filteredTasks = filteredTasks.filter(task => task.category === activeCategory);
      }
      
      return filteredTasks;
    },
    
    // Render tasks based on current filter
    renderTasks() {
      const filteredTasks = this.filterTasks();
      
      // Clear current list
      todoList.innerHTML = '';
      
      // Show empty state if no tasks
      if (filteredTasks.length === 0) {
        emptyState.classList.add('active');
      } else {
        emptyState.classList.remove('active');
      }
      
      // Create task elements
      filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'todo-item';
        taskItem.innerHTML = `
          <label class="todo-checkbox">
            <input type="checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
            <span class="checkmark"></span>
          </label>
          <div class="todo-text ${task.completed ? 'completed' : ''}">${task.text}</div>
          <span class="todo-category-label ${task.category}">${task.category}</span>
          <div class="todo-actions">
            <button class="todo-action-btn delete" data-id="${task.id}">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        `;
        
        todoList.appendChild(taskItem);
      });
      
      // Add event listeners to new elements
      this.addTaskEventListeners();
    },
    
    // Add event listeners to task elements
    addTaskEventListeners() {
      // Checkbox change event
      const checkboxes = todoList.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
          const taskId = checkbox.dataset.id;
          this.toggleTaskCompletion(taskId);
        });
      });
      
      // Delete button click event
      const deleteButtons = todoList.querySelectorAll('.delete');
      deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
          const taskId = button.dataset.id;
          this.removeTask(taskId);
        });
      });
    },
    
    // Update task counter
    updateTaskCounter() {
      const count = this.tasks.length;
      const text = count === 1 ? '1 task' : `${count} tasks`;
      taskCounter.textContent = text;
    }
  };
  
  // Initialize task manager
  TaskManager.loadTasks();
  
  // Form submission
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const taskText = todoInput.value.trim();
    const category = taskCategory.value;
    
    if (taskText) {
      TaskManager.addTask(taskText, category);
      todoInput.value = '';
      todoInput.focus();
    }
  });
  
  // Clear completed tasks
  clearCompletedBtn.addEventListener('click', () => {
    TaskManager.clearCompletedTasks();
  });
  
  // Filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all filter buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Update active filter
      activeFilter = button.dataset.filter;
      
      // Update filter title
      currentFilter.textContent = button.querySelector('span').textContent;
      
      // Re-render tasks with new filter
      TaskManager.renderTasks();
    });
  });
  
  // Category buttons
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle active state
      if (button.classList.contains('active')) {
        button.classList.remove('active');
        activeCategory = null;
      } else {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        activeCategory = button.dataset.category;
      }
      
      // Re-render tasks with new category filter
      TaskManager.renderTasks();
    });
  });
});