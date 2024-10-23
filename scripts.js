document.addEventListener('DOMContentLoaded', () => {
    // Scroll Event Listener for Header Shrink Effect
    window.addEventListener('scroll', () => {
      const logo = document.querySelector('.logo');
      const header = document.querySelector('#main-header');
  
      if (window.scrollY > 50) {
        logo.classList.add('shrink');
        header.style.padding = "10px";
      } else {
        logo.classList.remove('shrink');
        header.style.padding = "20px";
      }
    });
  
    // Enhanced Hamburger Menu Functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const submenuItems = document.querySelectorAll('.dropdown');
  
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
      navMenu.setAttribute('aria-hidden', isExpanded);
    });
  
    // Dropdown Submenu Toggle
    submenuItems.forEach(item => {
      const toggle = item.querySelector('.dropdown-toggle');
      toggle.addEventListener('click', () => {
        const submenu = item.querySelector('.submenu');
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !isExpanded);
        submenu.classList.toggle('show');
        submenu.setAttribute('aria-hidden', isExpanded);
      });
    });
  
    // Keyboard Navigation for Accessibility
    const menuItems = document.querySelectorAll('.nav-item');
    menuItems.forEach(item => {
      item.setAttribute('tabindex', '0'); // Make items focusable
  
      item.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          item.click(); // Trigger click event
        }
      });
    });
  
    // Search Input Functionality
    let timer;
    const input = document.querySelector('.search-input');
    const suggestionsBox = document.querySelector('.suggestions');
    const clearButton = document.querySelector('.clear-button');
  
    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const query = input.value.trim();
        if (query) {
          fetchSuggestions(query).then(displaySuggestions);
          clearButton.style.display = 'block'; // Show clear button
        } else {
          suggestionsBox.innerHTML = ''; // Clear suggestions if input is empty
          clearButton.style.display = 'none'; // Hide clear button
        }
      }, 300); // Debounce time in milliseconds
    });
  
    clearButton.addEventListener('click', () => {
      input.value = ''; // Clear input
      suggestionsBox.innerHTML = ''; // Clear suggestions
      clearButton.style.display = 'none'; // Hide clear button
    });
  
    // Function to Fetch Suggestions
    async function fetchSuggestions(query) {
      const response = await fetch(`/api/suggestions?q=${query}`);
      return response.json();
    }
  
    // Function to Display Suggestions
    function displaySuggestions(suggestions) {
      suggestionsBox.innerHTML = ''; // Clear previous suggestions
      suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion; // Assuming suggestion is a string
        li.setAttribute('role', 'option'); // Set ARIA role
        li.tabIndex = 0; // Make option focusable
        li.addEventListener('click', () => {
          input.value = suggestion; // Fill input with clicked suggestion
          suggestionsBox.innerHTML = ''; // Clear suggestions
          clearButton.style.display = 'block'; // Show clear button
        });
        suggestionsBox.appendChild(li);
      });
    }
  
    // Advanced JavaScript for Animating Hero Section
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const ctaButton = document.querySelector('.cta-button');
  
    // GSAP animations for text
    gsap.from(heroTitle, { duration: 1, y: -50, opacity: 0, delay: 0.5, ease: "power3.out" });
    gsap.from(heroSubtitle, { duration: 1, y: -50, opacity: 0, delay: 1, ease: "power3.out" });
    gsap.from(ctaButton, { duration: 1, y: 20, opacity: 0, delay: 1.5, ease: "power3.out" });
  
    // Accessibility for the CTA button
    ctaButton.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        window.location.href = ctaButton.getAttribute('href'); // Navigate on key press
      }
    });
  
    // Initialize Lottie Animation
    const lottieContainer = document.querySelector('.lottie-animation');
  
    const animation = lottie.loadAnimation({
      container: lottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: false, // Start on hover or button click
      path: 'path/to/your/animation.json' // Update with your Lottie JSON file path
    });
  
    // Play the animation on hover over the CTA button
    ctaButton.addEventListener('mouseenter', () => {
      animation.play();
    });
  
    ctaButton.addEventListener('mouseleave', () => {
      animation.stop();
    });
  
    // Optional: Pause animation on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        animation.stop();
      }
    });
  
    // Accessibility: Ensure the animation can be paused
    document.addEventListener('keydown', (event) => {
      if (event.key === ' ') { // Spacebar to pause/play
        if (animation.isPaused) {
          animation.play();
        } else {
          animation.pause();
        }
      }
    });
  
    // Theme Toggle Functionality
    const themeToggleBtn = document.querySelector('#theme-toggle'); // Ensure this ID is set in your HTML
  
    // Load saved theme or use default
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(currentTheme);
  
    // Apply theme to header and nav
    const updateTheme = (theme) => {
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(theme);
  
      const header = document.querySelector('#main-header');
      const navMenu = document.querySelector('.nav-menu');
      if (theme === 'dark') {
        header.classList.add('dark-header');
        navMenu.classList.add('dark-nav');
      } else {
        header.classList.remove('dark-header');
        navMenu.classList.remove('dark-nav');
      }
    };
  
    themeToggleBtn.addEventListener('click', () => {
      const isLightTheme = document.body.classList.contains('light');
      const newTheme = isLightTheme ? 'dark' : 'light';
  
      updateTheme(newTheme);
      localStorage.setItem('theme', newTheme); // Save the theme preference
    });
  
    // Initialize theme on load
    updateTheme(currentTheme);
  });
  
  // For the theme toggle switch
  const themeToggle = document.querySelector('.theme-toggle input');
  
  themeToggle.addEventListener('change', () => {
    document.body.dataset.theme = themeToggle.checked ? 'dark' : 'light';
  });
  
  // About section 
  document.addEventListener("DOMContentLoaded", function () {
    const typewriterElements = document.querySelectorAll(".typewriter");
    const cardsContainer = document.querySelector(".cards-container");
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    function fadeIn() {
        cardsContainer.style.opacity = 1;
    }

    function typeWriter(element) {
        const text = element.getAttribute("data-text");
        element.textContent = "";
        let index = 0;

        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100); // Adjust typing speed here
            }
        }

        type();
    }

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fadeIn();
                const titles = entry.target.querySelectorAll('.typewriter');
                titles.forEach(title => typeWriter(title));
            } else {
                const titles = entry.target.querySelectorAll('.typewriter');
                titles.forEach(title => title.textContent = "");
                cardsContainer.style.opacity = 0;
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const aboutSection = document.getElementById('about');
    observer.observe(aboutSection);
});

// our services
/* Background Animation Script */
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

// Resize canvas to fill the screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

// Create particles
function createParticles() {
    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1
        });
    }
}

// Animate particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    });

    requestAnimationFrame(animateParticles);
}

createParticles();
animateParticles();

// Resize canvas on window resize
window.addEventListener('resize', resizeCanvas);



// Filter Courses
document.addEventListener('DOMContentLoaded', () => {
  const categoryFilter = document.getElementById('category-filter');
  const difficultyFilter = document.getElementById('difficulty-filter');
  const resetFilters = document.getElementById('reset-filters');
  const courseList = document.getElementById('course-list');
  const courseContainer = document.getElementById('course-container');
  const toggleCoursesButton = document.getElementById('toggle-courses');

  // Collect course cards from the DOM
  const courseCards = Array.from(courseList.children).filter(card => card.classList.contains('course-card'));

  // Initially hide the course container and set the button text
  courseContainer.style.display = 'none'; // Hide course container by default
  toggleCoursesButton.textContent = 'Show Available Courses'; // Set initial button text

  // Hide all course details initially
  courseCards.forEach(card => {
      const details = card.querySelector('.course-details');
      if (details) {
          details.style.display = 'none'; // Hide course details by default
      }
  });

  // Function to filter courses based on selected category and difficulty
  function filterCourses() {
      const selectedCategory = categoryFilter.value;
      const selectedDifficulty = difficultyFilter.value;

      let showAnyCourses = false; // Track if any courses are shown

      // Filter course cards based on selected category and difficulty
      courseCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          const cardDifficulty = card.getAttribute('data-difficulty');

          const matchesCategory = !selectedCategory || cardCategory === selectedCategory;
          const matchesDifficulty = !selectedDifficulty || cardDifficulty === selectedDifficulty;

          // Show or hide the card based on the filter
          if (matchesCategory && matchesDifficulty) {
              card.style.display = 'block'; // Show the course card
              showAnyCourses = true; // Mark that at least one course is shown
          } else {
              card.style.display = 'none'; // Hide the course card
          }
      });

      // Adjust the display of the course container based on any visible courses
      courseContainer.style.display = showAnyCourses ? 'block' : 'none';
  }

  // Function to reset filters
  function resetFiltersFunc() {
      categoryFilter.value = "";
      difficultyFilter.value = "";
      filterCourses(); // Reset to show all courses
  }

  // Function to toggle course details visibility
  function toggleCourseDetails(event) {
      const details = event.target.closest('.course-card').querySelector('.course-details'); // Find the details within the same course card
      if (details) {
          if (details.style.display === 'none' || details.style.display === '') {
              details.style.display = 'block';
              event.target.textContent = 'Hide Details';
          } else {
              details.style.display = 'none';
              event.target.textContent = 'Show Details';
          }
      }
  }

  // Function to toggle visibility of available courses
  function toggleAvailableCourses() {
      if (courseContainer.style.display === 'none' || courseContainer.style.display === '') {
          // If the container is hidden, show it
          courseContainer.style.display = 'block';
          toggleCoursesButton.textContent = 'Hide Available Courses';
      } else {
          // If the container is visible, hide it
          courseContainer.style.display = 'none';
          toggleCoursesButton.textContent = 'Show Available Courses';
      }
  }

  // Event listeners for filters
  categoryFilter.addEventListener('change', () => {
      filterCourses();
      courseContainer.style.display = 'block'; // Show the courses container when filtering
      toggleCoursesButton.textContent = 'Hide Available Courses'; // Change button text to indicate courses are shown
  });

  difficultyFilter.addEventListener('change', () => {
      filterCourses();
      courseContainer.style.display = 'block'; // Show the courses container when filtering
      toggleCoursesButton.textContent = 'Hide Available Courses'; // Change button text to indicate courses are shown
  });

  resetFilters.addEventListener('click', resetFiltersFunc);

  // Event listeners for toggling course details
  const toggleButtons = document.querySelectorAll('.toggle-details');
  toggleButtons.forEach(button => {
      button.addEventListener('click', toggleCourseDetails);
  });

  // Event listener for toggling available courses
  toggleCoursesButton.addEventListener('click', toggleAvailableCourses);

  // Initial display of all courses (hidden by default)
  filterCourses();
});


// Progress feature for each course
const progressBars = {
    webDevelopment: document.getElementById("progress-bar-web-dev"),
    databaseDesign: document.getElementById("progress-bar-database-design"),
    machineLearning: document.getElementById("progress-bar-machine-learning"),
    dataScience: document.getElementById("progress-bar-data-science"),
    networking: document.getElementById("progress-bar-networking"),
};

// Click event listeners for each "Start Course" button
const startCourseButtons = document.querySelectorAll(".start-course");
startCourseButtons.forEach((button, index) => {
    let progress = 0;
    let intervalId = null;
    let progressBar = null;

    // Get the course type based on index
    switch (index) {
        case 0:
            progressBar = progressBars.webDevelopment;
            break;
        case 1:
            progressBar = progressBars.databaseDesign;
            break;
        case 2:
            progressBar = progressBars.machineLearning;
            break;
        case 3:
            progressBar = progressBars.dataScience;
            break;
        case 4:
            progressBar = progressBars.networking;
            break;
    }

    button.addEventListener("click", function () {
        if (intervalId) {
            clearInterval(intervalId); // Stop the existing interval if running
        }

        // Start a new interval to increase the progress
        intervalId = setInterval(() => {
            if (progress < 100) {
                progress++;
                progressBar.style.width = `${progress}%`;
            } else {
                clearInterval(intervalId); // Stop at 100%
            }
        }, 100); // Adjust the speed of the progress increase

        // Stop progress when not clicking
        button.addEventListener("mouseleave", () => {
            clearInterval(intervalId);
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll('.star');
    const reviewInputs = document.querySelectorAll('.review-input');
    const submitButtons = document.querySelectorAll('.submit-review');

    stars.forEach(star => {
        star.addEventListener('click', (e) => {
            const ratingContainer = e.target.closest('.rating-container');
            const courseId = ratingContainer.getAttribute('data-course-id');
            const selectedRating = e.target.getAttribute('data-value');

            // Set selected rating visually
            const starElements = ratingContainer.querySelectorAll('.star');
            starElements.forEach((starElem, index) => {
                starElem.style.color = index < selectedRating ? 'gold' : '#ccc';
            });

            // Store the rating in local storage
            localStorage.setItem(courseId + '-rating', selectedRating);
        });
    });

    submitButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const ratingContainer = button.closest('.rating-container');
            const courseId = ratingContainer.getAttribute('data-course-id');
            const reviewText = reviewInputs[index].value;

            // Create a review item
            const reviewItem = document.createElement('div');
            reviewItem.classList.add('review-item');
            reviewItem.textContent = reviewText;
            ratingContainer.querySelector('.review-list').appendChild(reviewItem);

            // Clear the textarea
            reviewInputs[index].value = '';
        });
    });
});
