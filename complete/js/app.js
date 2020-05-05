/* *****************************************************
  Variables
***************************************************** */
// Alert Notification Banner
const alert = document.getElementById('notification');
const closeIcon = document.querySelector('.close-icon');
// Projects list UL
const projectList = document.getElementById('projectList');

// Project form elements
const projectNameInput = document.getElementById('projectName');
const projectHTMLCheckbox = document.getElementById('html');
const projectCSSCheckbox = document.getElementById('css');
const projectJSCheckbox = document.getElementById('js');
const projectDetailsInput = document.getElementById('projectDetails');
const AddProjectButton = document.getElementById('addProjectButton');

// Student Invite form elements
const studentNameInput = document.getElementById('studentName');
const studentProjectSelect = document.getElementById('projectSelect');
const inviteStudentButton = document.getElementById('inviteStudentButton');

// Helper functions
const addProject = (name, langs, details) => {
  const project = document.createElement('li');
  project.className = 'project';
  const projectHeader = document.createElement('div');
  projectHeader.className = 'project-header flex';
  const projectName = document.createElement('h3');
  projectName.className = 'project-name';
  projectName.textContent = name;
  projectHeader.appendChild(projectName);
  const projectExpander = document.createElement('img');
  projectExpander.className = 'plus-icon pointer';
  projectExpander.src = 'icons/plus-icon.svg';
  projectExpander.alt = 'Plus Icon Expand Details';
  projectHeader.appendChild(projectExpander);
  const projectLangs = document.createElement('ul');
  projectLangs.className = 'project-langs flex';
  langs.forEach(language => {
    const lang = document.createElement('li');
    lang.className = 'project-lang';
    const langIcon = document.createElement('img');
    if (language === 'HTML') {
      langIcon.className = 'html';
      langIcon.src = 'icons/html5.svg';
      langIcon.alt = 'HTML5 Logo';
    } else if (language === 'CSS') {
      langIcon.className = 'css';
      langIcon.src = 'icons/css3.svg';
      langIcon.alt = 'CSS3 Logo';
    } else {
      langIcon.className = 'js';
      langIcon.src = 'icons/javascript.svg';
      langIcon.alt = 'JavaScript Logo';
    }
    lang.appendChild(langIcon);
    projectLangs.appendChild(lang);
  });
  projectHeader.appendChild(projectLangs);
  project.appendChild(projectHeader);
  const projectDetails = document.createElement('p');
  projectDetails.className = 'project-info hidden';
  projectDetails.textContent = details;
  project.appendChild(projectDetails);
  projectList.appendChild(project);
  addProjectToSelect(name);
}

const addProjectToSelect = projectName => {
  const project = document.createElement('option');
  project.text = projectName;
  studentProjectSelect.add(project);
}

const showAlert = (type, message) => {
  alert.classList.contains('success') ? alert.classList.remove('success') : alert.classList.remove('warning');
  type === 'success' ? alert.classList.add('success') : alert.classList.add('warning');
  alert.firstElementChild.firstElementChild.textContent = message;
  alert.classList.remove('hidden');
  alert.scrollIntoView();
}

const validateForm = form => {
  if (form === 'Add project') {
    const projectName = projectNameInput.value;
    const projectDetails = projectDetailsInput.value;
    const langsChecked = document.querySelectorAll('[type="checkbox"]:checked');
    const languages = [];
    if (projectName === '') {
      showAlert('warning', 'Please enter a name for the project.');
    } else if (projectDetails === '') {
      showAlert('warning', 'Please enter a description for the project.');
    } else if (langsChecked.length === 0) {
      showAlert('warning', 'Please select at least one language.');
    } else {
      langsChecked.forEach(lang => { languages.push(lang.value); });
      addProject(projectName, languages, projectDetails);
      showAlert('success', 'Your project was added successfully.');
      resetForm('Add project');
    }
  }
  if (form === 'Invite student') {
    const studentName = studentNameInput.value;
    const project = studentProjectSelect.value;
    if (studentName === '') {
      showAlert('warning', 'Please enter a student name to invite to a project.');
    } else if (project === undefined) {
      showAlert('warning', 'Please select a project to invite the student.');
    } else {
      showAlert('success', `${studentName} was added the the project: ${project}.`);
    }
  }
}

const resetForm = form => {
  if (form === 'Add project') {
    projectNameInput.value = '';
    projectHTMLCheckbox.checked = true;
    projectCSSCheckbox.checked = true;
    projectJSCheckbox.checked = false;
    projectDetailsInput.value = '';
  }
}

// Event Listeners
addProjectButton.addEventListener('click', e => {
  e.preventDefault();
  validateForm('Add project');
});

projectList.addEventListener('click', e => {
  if (e.target.classList.contains('plus-icon')) {
    const projectDetails = e.target.parentElement.parentElement.lastElementChild;
    projectDetails.classList.contains('hidden')
      ? projectDetails.classList.remove('hidden')
      : projectDetails.classList.add('hidden');
  }
});

inviteStudentButton.addEventListener('click', e => {
  e.preventDefault();
  validateForm('Invite student');
});

closeIcon.addEventListener('click', () => {
  alert.classList.add('hidden');
});