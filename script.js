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
    el.viewContact.textContent = state.contact || '';
    el.viewEduDegree.textContent = (state.edu && state.edu.degree) || '';
    el.viewEduInstitute.textContent = (state.edu && state.edu.institute) || '';
    el.viewEduDuration.textContent = (state.edu && state.edu.duration) || '';

    // skills
    el.viewSkills.innerHTML = '';
    (state.skills || []).forEach(s => {
      const li = document.createElement('li');
      li.textContent = s;
      el.viewSkills.appendChild(li);
    });

    // projects
    el.viewProjects.innerHTML = '';
    (state.projects || []).forEach(p => {
      const d = document.createElement('div');
      d.className = 'r-project';
      const t = document.createElement('div');
      t.className = 'p-title';
      t.textContent = p.title;
      const desc = document.createElement('div');
      desc.className = 'p-desc';
      desc.textContent = p.desc;
      d.appendChild(t);
      d.appendChild(desc);
      el.viewProjects.appendChild(d);
    });

    // template switch
    el.resumeRoot.classList.remove('template-modern','template-minimal','template-ats');
    el.resumeRoot.classList.add('template-'+(state.template || 'modern'));

    // theme
    if(state.theme === 'dark') {
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.remove('theme-dark');
    }
  }

  // helpers: render editor inputs from state
  function fillEditor() {
    el.name.value = state.name || '';
    el.title.value = state.title || '';
    el.contact.value = state.contact || '';
    el.eduDegree.value = (state.edu && state.edu.degree) || '';
    el.eduInstitute.value = (state.edu && state.edu.institute) || '';
    el.eduDuration.value = (state.edu && state.edu.duration) || '';
    el.templateSelect.value = state.template || 'modern';
    el.toggleThemeBtn.textContent = (state.theme === 'dark') ? 'Light Mode' : 'Dark Mode';
  }

  // sync when user types
  function attachInputs() {
    el.name.addEventListener('input', e => { state.name = e.target.value; render(); });
    el.title.addEventListener('input', e => { state.title = e.target.value; render(); });
    el.contact.addEventListener('input', e => { state.contact = e.target.value; render(); });
    el.eduDegree.addEventListener('input', e => { state.edu.degree = e.target.value; render(); });
    el.eduInstitute.addEventListener('input', e => { state.edu.institute = e.target.value; render(); });
    el.eduDuration.addEventListener('input', e => { state.edu.duration = e.target.value; render(); });

    el.templateSelect.addEventListener('change', e => { state.template = e.target.value; render(); });
    el.toggleThemeBtn.addEventListener('click', () => {
      state.theme = (state.theme === 'dark') ? 'light' : 'dark';
      el.toggleThemeBtn.textContent = (state.theme === 'dark') ? 'Light Mode' : 'Dark Mode';
      render();
    });
  }

  // dynamic skills/projects (editor lists)
  function refreshEditorLists(){
    // skills editor list
    el.skillsList.innerHTML = '';
    (state.skills || []).forEach((s, idx) => {
      const li = document.createElement('li');
      li.className = 'list-item list-group-item';
      li.innerHTML = `<span class="drag-handle">☰</span>
        <input class="form-control input-sm skill-input" data-idx="${idx}" value="${s}" />
        <button class="btn btn-xs btn-danger btn-remove-skill" data-idx="${idx}">✕</button>`;
      el.skillsList.appendChild(li);
    });

    // projects editor list
    el.projectsList.innerHTML = '';
    (state.projects || []).forEach((p, idx) => {
      const li = document.createElement('li');
      li.className = 'list-item list-group-item';
      li.innerHTML = `<span class="drag-handle">☰</span>
        <input class="form-control input-sm project-title" data-idx="${idx}" value="${escapeHtml(p.title)}" placeholder="Project title" />
        <textarea class="form-control input-sm project-desc" data-idx="${idx}" placeholder="Short description">${escapeHtml(p.desc)}</textarea>
        <div style="margin-top:6px;text-align:right;">
          <button class="btn btn-xs btn-danger btn-remove-project" data-idx="${idx}">Remove</button>
        </div>`;
      el.projectsList.appendChild(li);
    });

    // attach listeners for dynamic controls
    el.skillsList.querySelectorAll('.skill-input').forEach(inp => {
      inp.addEventListener('input', e => {
        const i = +e.target.dataset.idx;
        state.skills[i] = e.target.value;
        render();
      });
    });
    el.skillsList.querySelectorAll('.btn-remove-skill').forEach(b => {
      b.addEventListener('click', e => {
        const i = +e.target.dataset.idx;
        state.skills.splice(i,1);
        refreshEditorLists();
        render();
        bindSortables(); // re-bind indexes
      });
    });

    el.projectsList.querySelectorAll('.project-title').forEach(inp => {
      inp.addEventListener('input', e => {
        const i = +e.target.dataset.idx;
        state.projects[i].title = e.target.value;
        render();
      });
    });
    el.projectsList.querySelectorAll('.project-desc').forEach(inp => {
      inp.addEventListener('input', e => {
        const i = +e.target.dataset.idx;
        state.projects[i].desc = e.target.value;
        render();
      });
    });
    el.projectsList.querySelectorAll('.btn-remove-project').forEach(b => {
      b.addEventListener('click', e => {
        const i = +e.target.dataset.idx;
        state.projects.splice(i,1);
        refreshEditorLists();
        render();
        bindSortables();
      });
    });
  }

  // add skill/project actions
  el.addSkillBtn.addEventListener('click', () => {
    state.skills = state.skills || [];
    state.skills.push('New Skill');
    refreshEditorLists();
    render();
    bindSortables();
  });
  el.addProjectBtn.addEventListener('click', () => {
    state.projects = state.projects || [];
    state.projects.push({title:'New Project', desc:'Short description'});
    refreshEditorLists();
    render();
    bindSortables();
  });

  // save/load export/import
  el.saveBtn.addEventListener('click', () => {
    localStorage.setItem('siet_resume', JSON.stringify(state));
    alert('Saved to browser (localStorage).');
  });
  el.loadBtn.addEventListener('click', () => {
    const saved = localStorage.getItem('siet_resume');
    if(!saved) { alert('No saved resume found.'); return; }
    state = JSON.parse(saved);
    fillEditor();
    refreshEditorLists();
    render();
  });
  el.exportBtn.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'resume-data.json'; document.body.appendChild(a); a.click();
    a.remove(); URL.revokeObjectURL(url);
  });
  el.importFile.addEventListener('change', e => {
    const f = e.target.files[0];
    if(!f) return;
    const r = new FileReader();
    r.onload = function(ev){
      try {
        const imported = JSON.parse(ev.target.result);
        state = imported;
        fillEditor();
        refreshEditorLists();
        render();
        alert('Imported successfully.');
      } catch(err) {
        alert('Invalid JSON file.');
      }
    };
    r.readAsText(f);
    e.target.value = '';
  });

  // PDF download
  el.downloadPdf.addEventListener('click', () => {
    // ensure styles applied and A4 settings
    const element = document.getElementById('resume-root');
    const opt = {
      margin:       10,
      filename:     (state.name || 'resume') + '.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    // temporarily remove box-shadow for clean print
    const oldShadow = element.style.boxShadow;
    element.style.boxShadow = 'none';
    html2pdf().set(opt).from(element).save().then(()=> {
      element.style.boxShadow = oldShadow;
    });
  });

  // Sortable bindings
  let sortSkills, sortProjects;
  function bindSortables() {
    if(sortSkills) sortSkills.destroy();
    if(sortProjects) sortProjects.destroy();

    sortSkills = Sortable.create(el.skillsList, {
      handle: '.drag-handle',
      animation: 150,
      onEnd: function(evt){
        const from = evt.oldIndex, to = evt.newIndex;
        if(from === to) return;
        const item = state.skills.splice(from,1)[0];
        state.skills.splice(to,0,item);
        refreshEditorLists();
        render();
      }
    });

    sortProjects = Sortable.create(el.projectsList, {
      handle: '.drag-handle',
      animation: 150,
      onEnd: function(evt){
        const from = evt.oldIndex, to = evt.newIndex;
        if(from === to) return;
        const item = state.projects.splice(from,1)[0];
        state.projects.splice(to,0,item);
        refreshEditorLists();
        render();
      }
    });
  }

  // escape helper
  function escapeHtml(s){ return s===undefined? '': String(s); }

  // initialize
  function init(){
    // seed default if empty
    if(!localStorage.getItem('siet_resume')) {
      localStorage.setItem('siet_resume', JSON.stringify(DEFAULT));
    }
    state = JSON.parse(localStorage.getItem('siet_resume')) || DEFAULT;

    fillEditor();
    attachInputs();
    refreshEditorLists();
    bindSortables();
    render();
  }

  // run
  init();

})();
