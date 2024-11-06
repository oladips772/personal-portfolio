// Load the JSON data
fetch('projectsData.json')
  .then((response) => response.json())
  .then((data) => initializePortfolio(data));


  fetch('aboutMeData.json')
  .then((response) => response.json()).then((data) =>{
  const aboutMe = document.getElementById('aboutMe');
    aboutMe.innerHTML = `
    <p>${data.aboutMe}</p>
    <div class="headshotContainer">
    <img src=${data.headshot} />
    </div>
    `
  })
  


// Main function to initialize the portfolio with project data
function initializePortfolio(projects) {
  const projectList = document.getElementById('projectList');
  const projectSpotlight = document.getElementById('spotlightTitles');

  // Populate project list
  projects.forEach((project) => {
    const projectCard = document.createElement('div');
    projectCard.classList.add('projectCard');
    projectCard.id = project.project_id;
    projectCard.style.backgroundImage = `url('${project.card_image}')`;
    projectCard.innerHTML = `
      <h3>${project.project_name}</h3>
      <p>${project.short_description || ''}</p>
    `;
    projectList.appendChild(projectCard);

    // Add click event to update the spotlight
    projectCard.addEventListener('click', () => updateSpotlight(project));
  });

  // Set initial spotlight to the first project
  updateSpotlight(projects[0]);

  // Navigation arrows functionality
  const arrowLeft = document.querySelector('.arrow-left');
  const arrowRight = document.querySelector('.arrow-right');
  
  arrowLeft.addEventListener('click', () => scrollProjects('left'));
  arrowRight.addEventListener('click', () => scrollProjects('right'));
}

// Update the spotlight with selected project data
function updateSpotlight(project) {
  const projectSpotlight = document.getElementById('spotlightTitles');
  projectSpotlight.innerHTML = `
    <h3>${project.project_name}</h3>
    <p>${project.long_description || ''}</p>
    <a href="${project.url || '#'}" target="_blank">Learn more</a>
  `;
}

// Scroll project list horizontally or vertically based on screen size
function scrollProjects(direction) {
  const projectList = document.getElementById('projectList');
  const scrollAmount = projectList.clientWidth / 2; // adjust this as needed

  if (window.innerWidth < 768) { // mobile: horizontal scroll
    projectList.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  } else { // desktop: vertical scroll
    projectList.scrollBy({
      top: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }
}

// Form Validation
const contactForm = document.getElementById('formSection');
contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const emailInput = document.getElementById('contactEmail');
  const messageInput = document.getElementById('contactMessage');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const charactersLeft = document.getElementById('charactersLeft');

  // Regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const invalidCharRegex = /[^a-zA-Z0-9@._-]/;

  // Email validation
  if (!emailRegex.test(emailInput.value)) {
    emailError.textContent = 'Please enter a valid email address.';
    emailInput.classList.add('invalid');
  } else if (invalidCharRegex.test(emailInput.value)) {
    emailError.textContent = 'Email contains invalid characters.';
    emailInput.classList.add('invalid');
  } else {
    emailError.textContent = '';
    emailInput.classList.remove('invalid');
  }

  // Message validation
  if (messageInput.value.length > 300) {
    messageError.textContent = 'Message exceeds 300 characters.';
    messageInput.classList.add('invalid');
  } else if (invalidCharRegex.test(messageInput.value)) {
    messageError.textContent = 'Message contains invalid characters.';
    messageInput.classList.add('invalid');
  } else {
    messageError.textContent = '';
    messageInput.classList.remove('invalid');
  }

  // Update characters left
  charactersLeft.textContent = `Characters: ${messageInput.value.length}/300`;

  // If form is valid, clear the fields and submit
  if (!emailError.textContent && !messageError.textContent) {
    alert('Form submitted successfully!');
    emailInput.value = '';
    messageInput.value = '';
    charactersLeft.textContent = 'Characters: 0/300';
  }
});

// Live character count for message input
document.getElementById('contactMessage').addEventListener('input', function () {
  const maxLength = 300;
  const charactersLeft = document.getElementById('charactersLeft');
  charactersLeft.textContent = `Characters: ${this.value.length}/${maxLength}`;
});
