// script.js — wiring editor <-> preview
(function(){
  // default data
  const DEFAULT = {
    name: "Harsh Bhardwaj",
    title: "B.Tech CSE | State Institute of Engineering & Technology, Nilokheri",
    contact: "harsh@example.com • +91-XXXXXXXXXX",
    edu: {
      degree: "B.Tech (CSE)",
      institute: "Kurukshetra University",
      duration: "2021 - 2025 • Nilokheri, Haryana"
    },
    skills: ["HTML", "CSS", "JavaScript"],
    projects: [
      { title: "Resume Generator with ATS Score Checker", desc: "Built a web app to generate resumes with customizable templates and ATS compatibility." }
    ],
    template: "modern",
    theme: "light"
  };

  // elements
  const el = {
    name: document.getElementById('input-name'),
    title: document.getElementById('input-title'),
    contact: document.getElementById('input-contact'),
    eduDegree: document.getElementById('input-edu-degree'),
    eduInstitute: document.getElementById('input-edu-institute'),
    eduDuration: document.getElementById('input-edu-duration'),
    skillsList: document.getElementById('skills-list'),
    projectsList: document.getElementById('projects-list'),
    viewName: document.getElementById('view-name'),
    viewTitle: document.getElementById('view-title'),
    viewContact: document.getElementById('view-contact'),
    viewEduDegree: document.getElementById('view-edu-degree'),
    viewEduInstitute: document.getElementById('view-edu-institute'),
    viewEduDuration: document.getElementById('view-edu-duration'),
    viewSkills: document.getElementById('view-skills'),
    viewProjects: document.getElementById('view-projects'),
    templateSelect: document.getElementById('template-select'),
    downloadPdf: document.getElementById('download-pdf'),
    saveBtn: document.getElementById('save-btn'),
    loadBtn: document.getElementById('load-btn'),
    exportBtn: document.getElementById('export-btn'),
    importFile: document.getElementById('import-file'),
    addSkillBtn: document.getElementById('btn-add-skill'),
    addProjectBtn: document.getElementById('btn-add-project'),
    toggleThemeBtn: document.getElementById('toggle-theme'),
    resumeRoot: document.getElementById('resume-root')
  };

  // state
  let state = JSON.parse(localStorage.getItem('siet_resume')) || DEFAULT;

  // helpers: render preview from state
  function render() {
    el.viewName.textContent = state.name || '';
    el.viewTitle.textContent = state.title || '';
    
