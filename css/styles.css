<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Siet Resume Builder — Next Level</title>

  <!-- Bootstrap 3 -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

  <!-- Google fonts -->
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500|Lora:400,700&display=swap" rel="stylesheet">

  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/style.css">

  <!-- small helper for print friendly -->
  <style media="print">
    @page { size: A4; margin: 10mm; }
    body * { visibility: visible; }
    .no-print, .no-print * { display: none !important; }
  </style>
</head>
<body>

<div class="app container-fluid">
  <div class="row">

    <!-- LEFT: Editor -->
    <aside id="editor" class="col-sm-4 no-print">
      <div class="editor-inner">
        <h3>Resume Editor</h3>

        <!-- Basic -->
        <div class="panel panel-default">
          <div class="panel-heading">Basic Info</div>
          <div class="panel-body">
            <div class="form-group">
              <label>Name</label>
              <input id="input-name" class="form-control" placeholder="Your Name" />
            </div>
            <div class="form-group">
              <label>Title / Tagline</label>
              <input id="input-title" class="form-control" placeholder="e.g. B.Tech CSE | Software Intern" />
            </div>
            <div class="form-group">
              <label>Contact (email / phone / link)</label>
              <input id="input-contact" class="form-control" placeholder="email • phone • location" />
            </div>
          </div>
        </div>

        <!-- Education -->
        <div class="panel panel-default">
          <div class="panel-heading">Education</div>
          <div class="panel-body">
            <div class="form-group">
              <label>Degree / Course</label>
              <input id="input-edu-degree" class="form-control" placeholder="B.Tech (CSE)" />
            </div>
            <div class="form-group">
              <label>Institute</label>
              <input id="input-edu-institute" class="form-control" placeholder="SIET Nilokheri" />
            </div>
            <div class="form-group">
              <label>Duration / Location</label>
              <input id="input-edu-duration" class="form-control" placeholder="2021 - 2025 • Nilokheri, Haryana" />
            </div>
          </div>
        </div>

        <!-- Skills (dynamic) -->
        <div class="panel panel-default">
          <div class="panel-heading">Skills
            <button id="btn-add-skill" class="btn btn-xs btn-primary pull-right">+ Add</button>
          </div>
          <div class="panel-body">
            <ul id="skills-list" class="list-group draggable-list">
              <!-- items injected by JS -->
            </ul>
          </div>
        </div>

        <!-- Projects (dynamic) -->
        <div class="panel panel-default">
          <div class="panel-heading">Projects
            <button id="btn-add-project" class="btn btn-xs btn-primary pull-right">+ Add</button>
          </div>
          <div class="panel-body">
            <ul id="projects-list" class="list-group draggable-list">
              <!-- items injected by JS -->
            </ul>
          </div>
        </div>

        <!-- Controls -->
        <div class="panel panel-default">
          <div class="panel-heading">Actions</div>
          <div class="panel-body">
            <div class="btn-group btn-block">
              <button id="save-btn" class="btn btn-success">Save</button>
              <button id="load-btn" class="btn btn-default">Load</button>
            </div>
            <div class="btn-group btn-block" style="margin-top:8px;">
              <button id="export-btn" class="btn btn-info">Export JSON</button>
              <label class="btn btn-info btn-file">Import JSON <input id="import-file" type="file" accept=".json" style="display:none"></label>
            </div>

            <div class="btn-group btn-block" style="margin-top:8px;">
              <select id="template-select" class="form-control">
                <option value="modern">Template — Modern</option>
                <option value="minimal">Template — Minimal</option>
                <option value="ats">Template — ATS-friendly</option>
              </select>
            </div>

            <div class="row" style="margin-top:8px;">
              <div class="col-xs-6">
                <button id="download-pdf" class="btn btn-primary btn-block">Download PDF</button>
              </div>
              <div class="col-xs-6">
                <button id="toggle-theme" class="btn btn-default btn-block">Dark Mode</button>
              </div>
            </div>

            <div class="text-muted small" style="margin-top:10px;">Tip: Drag skills & projects to reorder.</div>
          </div>
        </div>

      </div>
    </aside>

    <!-- RIGHT: Preview -->
    <main id="preview" class="col-sm-8">
      <div id="resume-root" class="resume template-modern theme-light paper">
        <header class="r-header">
          <h1 id="view-name">Your Name</h1>
          <div class="r-sub">
            <span id="view-title">Your Title / Tagline</span>
            <span class="dot">•</span>
            <span id="view-contact">email • phone • location</span>
          </div>
        </header>

        <section class="r-section" id="r-education">
          <h3>Education</h3>
          <div class="r-edu">
            <div class="r-edu-degree" id="view-edu-degree">B.Tech (CSE)</div>
            <div class="r-edu-institute" id="view-edu-institute">SIET Nilokheri</div>
            <div class="r-edu-duration" id="view-edu-duration">2021 - 2025 • Nilokheri, Haryana</div>
          </div>
        </section>

        <section class="r-section" id="r-skills">
          <h3>Skills</h3>
          <ul id="view-skills" class="r-list"></ul>
        </section>

        <section class="r-section" id="r-projects">
          <h3>Projects</h3>
          <div id="view-projects"></div>
        </section>

        <footer class="r-footer">
          <div>Generated with Siet Resume Builder</div>
        </footer>
      </div>
    </main>

  </div>
</div>

<!-- libs -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<!-- Sortable (drag & drop) -->
<script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js"></script>

<!-- html2pdf for PDF export -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

<!-- Custom JS -->
<script src="js/script.js"></script>
</body>
</html>


---

2) css/style.css

/* style.css — modern, clean and print-friendly */
:root{
  --bg:#f4f6f9;
  --panel:#0b1220;
  --accent:#0d6efd;
  --muted:#6c757d;
  --paper:#ffffff;
}

body { font-family: 'Roboto', sans-serif; background:var(--bg); color:#222; margin:0; padding:18px; }

/* Editor (left) */
#editor { padding:0 12px; }
.editor-inner { position:sticky; top:12px; }
#editor h3 { color:var(--panel); margin-top:0; margin-bottom:12px; font-weight:600; }

/* Preview */
#preview { padding:0 20px; }
.resume { max-width:900px; margin:20px auto; background:var(--paper); border-radius:8px; box-shadow:0 10px 30px rgba(30,30,30,0.08); padding:28px; }
.paper { background: #fff; }

/* templates */
.template-modern { --accent:#1976d2; }
.template-minimal { --accent:#333; }
.template-ats { --accent:#0b6623; font-family: Arial, Helvetica, sans-serif; font-size:13px; }

.resume .r-header { border-bottom:4px solid rgba(0,0,0,0.05); padding-bottom:10px; margin-bottom:14px; }
.resume h1 { font-family: 'Lora', serif; margin:0; font-size:28px; color:var(--accent); }
.r-sub { color:var(--muted); margin-top:6px; font-size:14px; }
.r-sub .dot { margin:0 6px; color:var(--muted); }

.r-section { margin-bottom:16px; }
.r-section h3 { margin:0 0 8px 0; color:var(--accent); font-size:16px; border-bottom:1px solid rgba(0,0,0,0.04); padding-bottom:6px; }

.r-list { list-style:disc; margin:8px 0 0 20px; padding:0; }
.r-project { margin-bottom:8px; }
.r-project .p-title { font-weight:600; }
.r-project .p-desc { color:#333; margin-top:4px; }

/* small footer */
.r-footer { border-top:1px dashed rgba(0,0,0,0.06); padding-top:10px; margin-top:16px; color:var(--muted); font-size:12px; }

/* draggable-list (editor side) */
.draggable-list { min-height:40px; }
.draggable-list .list-item { display:flex; align-items:center; justify-content:space-between; padding:6px 8px; margin-bottom:6px; border-radius:6px; background:#fff; box-shadow:0 1px 3px rgba(0,0,0,0.03); }
.draggable-list .drag-handle { cursor:grab; margin-right:8px; color:var(--muted); }

/* editor actionable styles */
.btn-file { position:relative; overflow:hidden; }
.btn-file input[type=file] { position:absolute; top:0; right:0; min-width:100%; min-height:100%; font-size:100px; text-align:right; filter:alpha(opacity=0); opacity:0; outline:none; cursor:pointer; }

/* small responsive tweaks */
@media (max-width:991px) {
  #editor { margin-bottom:20px; }
  .resume { padding:20px; }
}

/* dark theme */
.theme-dark { background:#121417; color:#ddd; }
.theme-dark .resume { background:#0e1114; color:#ddd; }
.theme-dark .r-section h3, .theme-dark h1 { color:#66b2ff; }


---

3) js/script.js

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
