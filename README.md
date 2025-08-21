<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Dashboard do Grupo de Futebol</title>
  <!-- Tailwind via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            pitch: {
              900: '#0a1f0d',
              700: '#0e3313',
              500: '#165a22',
              300: '#1f8a34',
            },
          }
        }
      }
    }
  </script>
  <style>
    .card { @apply rounded-2xl shadow-xl bg-white/90 dark:bg-slate-900/80 backdrop-blur border border-slate-200/40 dark:border-slate-700/40; }
    .pill { @apply text-xs font-medium px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800; }
    .title { @apply text-lg font-semibold; }
  </style>
</head>
<body class="min-h-screen bg-gradient-to-b from-pitch-900 via-pitch-700 to-pitch-900 text-slate-900 dark:text-slate-100">
  <div class="max-w-6xl mx-auto p-4 sm:p-8">
    <!-- Header -->
    <header class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
      <div>
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">🏆 Dashboard do Grupo de Futebol</h1>
        <p class="text-slate-200/90">Estatísticas automáticas a partir do Google Planilhas.</p>
      </div>
      <div class="flex gap-2">
        <button id="refreshBtn" class="px-4 py-2 rounded-xl bg-white/90 hover:bg-white text-pitch-700 font-semibold shadow">Atualizar</button>
        <button id="toggleTheme" class="px-4 py-2 rounded-xl bg-transparent border border-white/60 text-white hover:bg-white/10">🌙/☀️</button>
      </div>
    </header>

    <!-- Status / Última atualização -->
    <div class="mb-6 text-white/90">
      <span class="pill">Origem: Google Planilhas</span>
      <span id="lastUpdated" class="pill">Última atualização: —</span>
    </div>

    <!-- Painel superior: números gerais -->
    <section id="kpis" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"></section>

    <!-- Rankings -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card p-4">
        <div class="flex items-center justify-between mb-3">
          <h2 class="title">🥅 Artilharia (Gols)</h2>
          <span class="pill">Top 10</span>
        </div>
        <div id="rank-gols" class="overflow-auto"></div>
      </div>

      <div class="card p-4">
        <div class="flex items-center justify-between mb-3">
          <h2 class="title">🎯 Assistências</h2>
          <span class="pill">Top 10</span>
        </div>
        <div id="rank-assists" class="overflow-auto"></div>
      </div>

      <div class="card p-4">
        <div class="flex items-center justify-between mb-3">
          <h2 class="title">✅ Vitórias</h2>
          <span class="pill">Top 10</span>
        </div>
        <div id="rank-wins" class="overflow-auto"></div>
      </div>

      <div class="card p-4">
        <div class="flex items-center justify-between mb-3">
          <h2 class="title">📅 Jogos Jogados</h2>
          <span class="pill">Top 10</span>
        </div>
        <div id="rank-games" class="overflow-auto"></div>
      </div>
    </section>

    <!-- Tabela completa -->
    <section class="card p-4 mt-6">
      <div class="flex items-center justify-between mb-3">
        <h2 class="title">📋 Tabela Completa</h2>
        <div class="text-sm text-slate-500 dark:text-slate-400">Clique nos cabeçalhos para ordenar</div>
      </div>
      <div class="overflow-x-auto">
        <table id="mainTable" class="min-w-full text-sm">
          <thead class="text-left">
            <tr id="tableHeader"></tr>
          </thead>
          <tbody id="tableBody"></tbody>
        </table>
      </div>
    </section>

    <footer class="mt-10 text-center text-slate-300 text-xs">
      Feito com ❤ para o grupo. Hospede este arquivo no GitHub Pages e garanta que a planilha esteja pública para leitura (Somente leitura).
    </footer>
  </div>

  <script>
    // ======= CONFIGURAÇÃO (coloquei tua chave e planilha) =======
    const API_KEY = 'AIzaSyCL19ds6YqVOv5vV-zygBjeC-byy-rDPfM';
    // Corrigi o link (faltava o 'h' em https) e extraí o ID:
    const SPREADSHEET_ID = '1TvrVT8ksYYMlpw8gkKIFvpnnCf02J8uYTkhHc5c0vdo';

    // ======= HELPERS =======
    const qs = (s, el=document) => el.querySelector(s);
    const qsa = (s, el=document) => [...el.querySelectorAll(s)];
    const fmt = (v) => Number.isFinite(v) ? v.toLocaleString('pt-BR') : '-';

    function normalizeHeader(h) {
      return String(h || '')
        .trim()
        .toLowerCase()
        .normalize('NFD').replace(/\p{Diacritic}/gu, '') // remove acentos
        .replace(/\s+/g, ' ');
    }

    function toNumber(v) {
      if (v === null || v === undefined) return 0;
      // troca vírgula por ponto se vier como texto brasileiro
      const s = String(v).trim().replace(',', '.');
      const n = parseFloat(s);
      return Number.isFinite(n) ? n : 0;
    }

    function sortBy(arr, key, desc=true) {
      return [...arr].sort((a,b) => {
        const av = toNumber(a[key]);
        const bv = toNumber(b[key]);
        return desc ? (bv - av) : (av - bv);
      });
    }

    function createTable(rows, container, opts={}) {
      const {limit=null, columns=null} = opts;
      const data = limit ? rows.slice(0, limit) : rows;
      if (!data.length) { container.innerHTML = '<div class="text-slate-500">Sem dados</div>'; return; }
      const cols = columns || Object.keys(data[0]);

      const html = `
        <table class="min-w-full text-sm">
          <thead>
            <tr class="border-b border-slate-200 dark:border-slate-700">
              ${cols.map(c => `<th class="py-2 pr-3 font-semibold text-slate-700 dark:text-slate-200">${c}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${data.map((r, i) => `
              <tr class="border-b border-slate-100/70 dark:border-slate-800/60">
                ${cols.map((c, j) => `<td class="py-1.5 pr-3 ${j===0?'font-medium':''}">${r[c] ?? ''}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>`;
      container.innerHTML = html;
    }

    function renderKPIs(players) {
      const totalJogos = players.reduce((s,p)=> s + toNumber(p['JOGOS JOGADOS']||p['jogos']), 0);
      const totalGols = players.reduce((s,p)=> s + toNumber(p['GOLS']||p['gols']), 0);
      const totalAssists = players.reduce((s,p)=> s + toNumber(p['ASSISTENCIAS']||p['assistencias']), 0);
      const totalVitorias = players.reduce((s,p)=> s + toNumber(p['VITORIAS']||p['vitorias']), 0);

      const items = [
        {label:'Gols da temporada', value: totalGols, emoji:'🥅'},
        {label:'Assistências', value: totalAssists, emoji:'🎯'},
        {label:'Vitórias somadas', value: totalVitorias, emoji:'✅'},
        {label:'Jogos registrados', value: totalJogos, emoji:'📅'},
      ];

      qs('#kpis').innerHTML = items.map(it => `
        <div class="card p-4 flex items-center gap-3">
          <div class="text-3xl">${it.emoji}</div>
          <div>
            <div class="text-2xl font-extrabold">${fmt(it.value)}</div>
            <div class="text-slate-500 dark:text-slate-400">${it.label}</div>
          </div>
        </div>
      `).join('');
    }

    function headerMap(headers) {
      const map = {};
      headers.forEach((h, idx) => {
        map[normalizeHeader(h)] = { name: String(h).trim(), idx };
      });
      return map;
    }

    function rowsToObjects(values) {
      if (!values || !values.length) return [];
      const headers = values[0];
      const map = headerMap(headers);
      const out = [];
      for (let i=1; i<values.length; i++) {
        const row = values[i];
        const obj = {};
        headers.forEach((h, c) => {
          obj[String(h).trim()] = row[c] ?? '';
        });
        // normalizações úteis (aliases):
        obj.id = obj['ID'] || obj['Id'] || obj['id'] || '';
        obj.nome = obj['NOME'] || obj['Nome'] || obj['nome'] || '';
        obj['JOGOS JOGADOS'] = obj['JOGOS JOGADOS'] || obj['Jogos Jogados'] || obj['jogos'] || '0';
        obj['VITORIAS'] = obj['VITÓRIAS'] || obj['VITORIAS'] || obj['Vitórias'] || obj['vitorias'] || '0';
        obj['GOLS'] = obj['GOLS'] || obj['Gols'] || obj['gols'] || '0';
        obj['ASSISTENCIAS'] = obj['Assistencias'] || obj['ASSISTÊNCIAS'] || obj['assistencias'] || '0';
        obj['GOLS TOMADOS'] = obj['Gols tomados'] || obj['gols tomados'] || obj['GOLS TOMADOS'] || '0';
        out.push(obj);
      }
      return out;
    }

    function renderMainTable(players) {
      // Cabeçalhos fixos na ordem desejada
      const columns = ['ID','NOME','JOGOS JOGADOS','VITORIAS','GOLS','ASSISTENCIAS','GOLS TOMADOS'];
      const thead = qs('#tableHeader');
      const tbody = qs('#tableBody');

      thead.innerHTML = columns.map((c, i)=>`<th data-col="${c}" class="py-2 pr-3 font-semibold cursor-pointer select-none">${c} ⬍</th>`).join('');

      function drawRows(rows) {
        tbody.innerHTML = rows.map(r => `
          <tr class="border-b border-slate-100/70 dark:border-slate-800/60">
            <td class="py-1.5 pr-3">${r['ID'] || r.id || ''}</td>
            <td class="py-1.5 pr-3 font-medium">${r['NOME'] || r.nome || ''}</td>
            <td class="py-1.5 pr-3">${fmt(toNumber(r['JOGOS JOGADOS']))}</td>
            <td class="py-1.5 pr-3">${fmt(toNumber(r['VITORIAS']))}</td>
            <td class="py-1.5 pr-3">${fmt(toNumber(r['GOLS']))}</td>
            <td class="py-1.5 pr-3">${fmt(toNumber(r['ASSISTENCIAS']))}</td>
            <td class="py-1.5 pr-3">${fmt(toNumber(r['GOLS TOMADOS']))}</td>
          </tr>
        `).join('');
      }

      drawRows(players);

      // Ordenação clicável
      qsa('th[data-col]').forEach(th => {
        let desc = true;
        th.addEventListener('click', () => {
          const col = th.getAttribute('data-col');
          const sorted = [...players].sort((a,b)=>{
            const av = toNumber(a[col]);
            const bv = toNumber(b[col]);
            return desc ? (bv - av) : (av - bv);
          });
          desc = !desc;
          drawRows(sorted);
        });
      });
    }

    function renderRankings(players) {
      const goals = sortBy(players, 'GOLS');
      const assists = sortBy(players, 'ASSISTENCIAS');
      const wins = sortBy(players, 'VITORIAS');
      const games = sortBy(players, 'JOGOS JOGADOS');

      createTable(goals.map((p,i)=>({Pos: i+1, Nome: p['NOME']||p.nome, Gols: toNumber(p['GOLS'])})), qs('#rank-gols'), {limit: 10});
      createTable(assists.map((p,i)=>({Pos: i+1, Nome: p['NOME']||p.nome, 'Assistências': toNumber(p['ASSISTENCIAS'])})), qs('#rank-assists'), {limit: 10});
      createTable(wins.map((p,i)=>({Pos: i+1, Nome: p['NOME']||p.nome, 'Vitórias': toNumber(p['VITORIAS'])})), qs('#rank-wins'), {limit: 10});
      createTable(games.map((p,i)=>({Pos: i+1, Nome: p['NOME']||p.nome, 'Jogos': toNumber(p['JOGOS JOGADOS'])})), qs('#rank-games'), {limit: 10});
    }

    async function fetchFirstSheetName() {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}?key=${API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Falha ao obter metadados da planilha');
      const data = await res.json();
      const sheet = data.sheets?.[0]?.properties?.title || 'Sheet1';
      return sheet;
    }

    async function fetchValues(range) {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(range)}?key=${API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Falha ao obter valores (verifique se a planilha é pública).');
      const data = await res.json();
      return data.values || [];
    }

    async function loadData() {
      qs('#lastUpdated').textContent = 'Carregando…';
      try {
        const sheetName = await fetchFirstSheetName();
        // Pega um range largo para cobrir as colunas/linhas informadas
        const values = await fetchValues(`${sheetName}!A1:Z1000`);
        const players = rowsToObjects(values)
          .filter(p => (p['NOME'] || p.nome));

        renderKPIs(players);
        renderRankings(players);
        renderMainTable(players);

        const now = new Date();
        qs('#lastUpdated').textContent = `Última atualização: ${now.toLocaleString('pt-BR')}`;
      } catch (err) {
        console.error(err);
        qs('#lastUpdated').textContent = 'Erro ao carregar. Verifique permissões da planilha.';
      }
    }

    // Tema claro/escuro
    (function initTheme(){
      const root = document.documentElement;
      const saved = localStorage.getItem('theme') || 'dark';
      if (saved === 'dark') root.classList.add('dark');
      document.getElementById('toggleTheme').addEventListener('click', ()=>{
        root.classList.toggle('dark');
        localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
      });
    })();

    document.getElementById('refreshBtn').addEventListener('click', loadData);
    loadData();
  </script>
</body>
</html>
