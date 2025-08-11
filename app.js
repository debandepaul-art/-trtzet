// Basic state
let TEAMS = [];
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

async function loadTeams() {
  const res = await fetch('data/teams.json');
  TEAMS = await res.json();
  const teamSelects = [$('#teamA'), $('#teamB'), $('#filterTeam')];
  teamSelects.forEach(sel => sel.innerHTML = '');
  for (const t of TEAMS) {
    const optA = new Option(t.name, t.id);
    const optB = new Option(t.name, t.id);
    $('#teamA').add(optA);
    $('#teamB').add(optB);
    const optF = new Option(t.name, t.id);
    $('#filterTeam').add(optF);
  }
  render();
}

function readStore() {
  try { return JSON.parse(localStorage.getItem('matches') || '[]'); }
  catch { return []; }
}

function writeStore(data) {
  localStorage.setItem('matches', JSON.stringify(data));
}

function fmtDate(ts) {
  const d = new Date(ts);
  return d.toLocaleString();
}

function getTeam(id) {
  return TEAMS.find(t => t.id === id) || {name:id, logo:''};
}

function render() {
  const list = $('#match-list');
  const all = readStore().sort((a,b)=>b.ts - a.ts);
  const q = $('#search').value.toLowerCase();
  const f = $('#filterTeam').value;
  const filtered = all.filter(m => {
    const tA = getTeam(m.teamA).name.toLowerCase();
    const tB = getTeam(m.teamB).name.toLowerCase();
    const note = (m.notes||'').toLowerCase();
    const matchesText = tA.includes(q) || tB.includes(q) || note.includes(q);
    const matchesTeam = !f || m.teamA === f || m.teamB === f;
    return matchesText && matchesTeam;
  });

  list.innerHTML = '';
  if (!filtered.length) {
    list.innerHTML = '<div class="empty">Aucun match pour le moment.</div>';
    return;
  }

  for (const m of filtered) {
    const tA = getTeam(m.teamA);
    const tB = getTeam(m.teamB);
    const li = document.createElement('li');
    li.className = 'item';
    li.innerHTML = `
      <div class="logo"><img src="${tA.logo}" alt="${tA.name}" width="36" height="36"></div>
      <div class="teams">
        <span>${tA.name}</span>
        <span class="badge">${m.scoreA} - ${m.scoreB}</span>
        <span>${tB.name}</span>
      </div>
      <div class="meta">
        <div class="badge">Bo${m.bo}</div>
        <div class="note">${m.notes ? m.notes : ''}</div>
        <div class="muted">${fmtDate(m.ts)}</div>
      </div>
    `;
    list.appendChild(li);
  }
}

$('#match-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const teamA = $('#teamA').value;
  const teamB = $('#teamB').value;
  const scoreA = parseInt($('#scoreA').value, 10);
  const scoreB = parseInt($('#scoreB').value, 10);
  const bo = parseInt($('#bo').value, 10);
  const notes = $('#notes').value.trim();

  if (teamA === teamB) {
    alert('Choisis deux équipes différentes.');
    return;
  }
  if (scoreA < 0 || scoreB < 0) {
    alert('Les scores doivent être positifs.');
    return;
  }
  if (scoreA > bo || scoreB > bo) {
    if (!confirm('Le score dépasse le format Bo sélectionné. Continuer ?')) return;
  }

  const match = { teamA, teamB, scoreA, scoreB, bo, notes, ts: Date.now() };
  const data = readStore();
  data.push(match);
  writeStore(data);
  e.target.reset();
  render();
});

$('#export').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(readStore(), null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'matches.json';
  a.click();
  URL.revokeObjectURL(url);
});

$('#clear').addEventListener('click', () => {
  if (confirm('Supprimer tout l\'historique ?')) {
    localStorage.removeItem('matches');
    render();
  }
});

$('#search').addEventListener('input', render);
$('#filterTeam').addEventListener('change', render);

loadTeams();