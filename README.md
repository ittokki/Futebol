<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Ranking dos Inimigos da Bola</title>
  <link href="https://fonts.googleapis.com/css?family=Montserrat:700,400&display=swap" rel="stylesheet">
  <link rel="icon" href="https://drive.google.com/uc?export=view&id=1x-iONhJrjibDu4QqkdJw0Y5SxyYLMJXT"/>
  <style>
    body {
      background: linear-gradient(135deg, #fff 0%, #b71c1c 100%);
      color: #b71c1c;
      font-family: 'Montserrat', Arial, sans-serif;
      margin: 0;
      padding-bottom: 80px;
    }
    .header {
      text-align: center;
      padding: 40px 10px 20px 10px;
    }
    .logo {
      width: 110px;
      margin-bottom: 10px;
      border-radius: 12px;
      box-shadow: 0 2px 16px #b71c1c44;
      background: #fff;
    }
    h1 {
      font-size: 2.1em;
      margin: 0;
      letter-spacing: 1px;
      color: #b71c1c;
      text-shadow: 1px 1px 0 #fff3;
    }
    .desc {
      margin-top: 8px;
      color: #b71c1c;
      font-size: 1.08em;
      font-weight: bold;
      text-shadow: 1px 1px 0 #fff7;
    }
    .rankings {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 35px;
      margin: 35px auto 0 auto;
      max-width: 1400px;
    }
    .ranking-table {
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 4px 24px #b71c1c22;
      padding: 22px 18px;
      min-width: 240px;
      max-width: 320px;
      margin-bottom: 15px;
      transition: 0.2s;
      border: 3px solid #b71c1c;
    }
    .ranking-table:hover {
      box-shadow: 0 8px 32px #b71c1c88;
      background: #fff5f5;
    }
    .ranking-table h2 {
      margin: 0 0 15px 0;
      font-size: 1.15em;
      color: #b71c1c;
      text-shadow: 1px 1px 0 #fff7;
      font-weight: bold;
    }
    .ranking-table table {
      width: 100%;
      border-collapse: collapse;
      font-size: 1em;
    }
    .ranking-table th, .ranking-table td {
      padding: 7px 3px;
    }
    .ranking-table th {
      background: #b71c1c;
      color: #fff !important;
      border-radius: 5px;
      font-weight: bold;
      letter-spacing: 0.5px;
      border: none;
    }
    .ranking-table td {
      color: #b71c1c !important;
      font-weight: 500;
      background: transparent;
      border-bottom: 1px solid #d32f2f22;
      cursor: pointer;
      position: relative;
    }
    .ranking-table tr.top-player td {
      background: linear-gradient(90deg, #f4433633 0%, #fff 100%);
      color: #d32f2f !important;
      font-weight: bold;
      border-left: 5px solid #f44336;
    }
    .ranking-table tr {
      transition: 0.1s;
    }
    .ranking-table tr:hover td {
      background: #f4433633;
    }
    .medal {
      font-size: 1.25em;
      vertical-align: middle;
      margin-right: 4px;
    }
    .loading {
      text-align: center;
      font-size: 1.5em;
      margin: 60px 0;
      color: #b71c1c;
      animation: blink 1.2s infinite;
    }
    @keyframes blink {
      50% { opacity: 0.6; }
    }
    footer {
      position: fixed;
      left: 0; right: 0; bottom: 0;
      background: #b71c1c;
      color: #fff;
      text-align: center;
      padding: 14px 0 10px 0;
      font-size: 1em;
      box-shadow: 0 -3px 20px #b71c1c44;
      letter-spacing: 0.5px;
    }
    a {
      color: #fff;
      text-decoration: underline;
    }
    @media (max-width: 900px) {
      .rankings { flex-direction: column; align-items: center;}
    }
    .modal-bg {
      display: none;
      position: fixed;
      z-index: 9000;
      left: 0; top: 0; width: 100vw; height: 100vh;
      background: rgba(183,28,28,0.70);
      justify-content: center;
      align-items: center;
    }
    .modal-bg.active { display: flex; }
    .modal {
      background: #fff;
      color: #b71c1c;
      border-radius: 16px;
      padding: 26px 32px;
      box-shadow: 0 8px 32px #b71c1c55;
      max-width: 350px;
      min-width: 270px;
      text-align: center;
      position: relative;
      font-size: 1.07em;
      animation: modal-in 0.2s;
    }
    @keyframes modal-in {
      0% { transform: scale(0.95); opacity: 0;}
      100% { transform: scale(1); opacity: 1;}
    }
    .modal .close-btn {
      position: absolute;
      top: 10px; right: 18px;
      font-size: 1.5em;
      color: #b71c1c;
      background: #fff;
      border: none;
      cursor: pointer;
      font-weight: bold;
      outline: none;
    }
    .modal .big {
      font-size: 1.35em;
      margin-bottom: 2px;
      font-weight: bold;
      color: #d32f2f;
    }
    .modal table {
      margin: 18px auto 0 auto;
      width: 90%;
      font-size: 1em;
      border-collapse: collapse;
    }
    .modal th, .modal td {
      padding: 7px 3px;
      color: #b71c1c;
      border-bottom: 1px solid #d32f2f22;
    }
    .modal tr:last-child td { border-bottom: none;}
    .modal .date-title {
      font-size: 1.15em;
      margin-bottom: 10px;
      font-weight: bold;
      color: #d32f2f;
    }
    .jogos-lista {
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 4px 24px #b71c1c22;
      padding: 22px 18px;
      margin-bottom: 20px;
      max-width: 350px;
      margin-left: auto;
      margin-right: auto;
    }
    .jogos-lista h2 {
      margin-bottom: 10px;
      font-size: 1.18em;
      color: #b71c1c;
      font-weight: bold;
      text-shadow: 1px 1px 0 #fff7;
    }
    .jogos-lista ul {
      list-style: none;
      margin: 0;
      padding: 0;
      font-size: 1.07em;
    }
    .jogos-lista li {
      padding: 8px 0;
      cursor: pointer;
      border-bottom: 1px solid #d32f2f22;
      transition: background 0.15s;
    }
    .jogos-lista li:last-child { border-bottom: none; }
    .jogos-lista li:hover {
      background: #f4433633;
    }
    .jogos-lista .date {
      font-weight: bold;
      color: #d32f2f;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="https://drive.google.com/uc?export=view&id=1x-iONhJrjibDu4QqkdJw0Y5SxyYLMJXT" class="logo" alt="logo"/>
    <h1>Ranking dos Inimigos da Bola</h1>
    <div class="desc">Atualizado automaticamente pela planilha do grupo!</div>
  </div>
  <div id="mainContent">
    <div class="loading">Carregando dados...</div>
  </div>
  <div class="modal-bg" id="modalBg">
    <div class="modal" id="modal">
      <button class="close-btn" id="modalClose">&times;</button>
      <div id="modalContent"></div>
    </div>
  </div>
  <footer>
    <small>
      Dashboard esportivo feito para o grupo!<br/>
      Dados puxados da <a href="https://docs.google.com/spreadsheets/d/1TvrVT8ksYYMlpw8gkKIFvpnnCf02J8uYTkhHc5c0vdo/edit?usp=sharing" target="_blank">Google Planilha</a>
    </small>
  </footer>
  <script>
    const apiKey = "AIzaSyCL19ds6YqVOv5v-zygBjeC-byy-rDPfM";
    const spreadsheetId = "1TvrVT8ksYYMlpw8gkKIFvpnnCf02J8uYTkhHc5c0vdo";
    const rangePagina1 = "Página1!A2:H100";
    const rangePagina2 = "Página2!A2:H300";
    const rankingIcons = {
      gols: "⚽️",
      assistencias: "🅰️",
      vitorias: "🏅",
      jogos: "🎽",
      golsTomados: "🛡️",
      aproveitamento: "📈",
      notaGeral: "⭐"
    };
    const medalhas = ['🥇','🥈','🥉'];
    const PESOS = {
      notaBase: 6.0,
      gols: 0.7,
      assistencias: 0.5,
      golsTomados: 0.2,
      golsContra: -0.5,
      vitoria: 0.3,
      pesoNotaADM: 1.2
    };
    function fixRow(row, len) {
      const fixed = [];
      for (let i = 0; i < len; i++) {
        fixed[i] = row[i] !== undefined && row[i] !== null ? row[i] : "";
      }
      return fixed;
    }
    function calcularAproveitamento(jogos, vitorias) {
      if (jogos === 0) return 0;
      return Math.round((vitorias / jogos) * 100);
    }
    function calcularNotaPartida(dados) {
      let nota = PESOS.notaBase
        + (Number(dados.gols) || 0) * PESOS.gols
        + (Number(dados.assistencias) || 0) * PESOS.assistencias
        + (Number(dados.golsTomados) || 0) * PESOS.golsTomados
        + (Number(dados.golsContra) || 0) * PESOS.golsContra
        + (dados.vitoria ? PESOS.vitoria : 0);
      const notaADM = Number(dados.notaADM) || PESOS.notaBase;
      nota = (nota * 2 + notaADM * PESOS.pesoNotaADM) / (2 + PESOS.pesoNotaADM);
      return Math.max(0, Math.min(10, Math.round(nota * 100) / 100));
    }
    async function fetchJogadores() {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${rangePagina1}?key=${apiKey}`;
      const resp = await fetch(url);
      const data = await resp.json();
      const arr = (data.values || []).map(row => {
        const [id, nome, jogos, vitorias, gols, assistencias, golsTomados, golsContra] = fixRow(row, 8);
        return {
          id: id,
          nome: nome,
          jogos: Number(jogos || 0),
          vitorias: Number(vitorias || 0),
          gols: Number(gols || 0),
          assistencias: Number(assistencias || 0),
          golsTomados: Number(golsTomados || 0),
          golsContra: Number(golsContra || 0),
          aproveitamento: calcularAproveitamento(Number(jogos || 0), Number(vitorias || 0)),
          notaGeral: 0
        };
      });
      return arr;
    }
    async function fetchPartidas() {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${rangePagina2}?key=${apiKey}`;
      const resp = await fetch(url);
      const data = await resp.json();
      return (data.values || []).map(row => {
        const [nome, gols, assistencias, golsTomados, golsContra, notaADM, dataJogo, vitoriaRaw] = fixRow(row, 8);
        if (!nome || !dataJogo) return null;
        const vitoria = (typeof vitoriaRaw === "string" && vitoriaRaw.trim().toLowerCase() === "sim") ? 1 : 0;
        const notaPartida = calcularNotaPartida({
          gols, assistencias, golsTomados, golsContra, vitoria, notaADM
        });
        return {
          nome,
          gols: Number(gols || 0),
          assistencias: Number(assistencias || 0),
          golsTomados: Number(golsTomados || 0),
          golsContra: Number(golsContra || 0),
          notaADM,
          dataJogo,
          vitoria,
          notaPartida
        };
      }).filter(x => x);
    }
    function calcularNotasGerais(jogadores, partidas) {
      const notasPorJogador = {};
      partidas.forEach(p => {
        if (!notasPorJogador[p.nome]) notasPorJogador[p.nome] = [];
        notasPorJogador[p.nome].push(p.notaPartida);
      });
      jogadores.forEach(jogador => {
        const notas = notasPorJogador[jogador.nome] || [];
        jogador.notaGeral = notas.length > 0
          ? Math.round((notas.reduce((a, b) => a + b, 0) / notas.length) * 100) / 100
          : PESOS.notaBase;
      });
    }
    function medalhaHTML(index) {
      return index < 3 ? `<span class="medal">${medalhas[index]}</span>` : '';
    }
    function makeRankingTable(jogadores, tipo, titulo, filterFn = null, sufixo = "") {
      let arr = jogadores;
      if (filterFn) arr = arr.filter(filterFn);
      if (tipo === "jogos") arr = arr.filter(j => Number(j.jogos) > 0);
      arr = [...arr].sort((a, b) => (
        tipo === "golsTomados"
          ? a[tipo] - b[tipo]
          : b[tipo] - a[tipo]
      ));
      let table = `<div class="ranking-table">
        <h2>${rankingIcons[tipo] || ""} ${titulo}</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>${titulo}${sufixo}</th>
            </tr>
          </thead>
          <tbody>
            ${arr.map((jogador, i) => `
              <tr${i === 0 ? ' class="top-player"' : ''}>
                <td>${i+1}</td>
                <td onclick="showModal('${encodeURIComponent(jogador.nome)}')">
                  ${medalhaHTML(i)}${jogador.nome}
                </td>
                <td>${tipo === "aproveitamento" ? jogador[tipo] + "%" : jogador[tipo]}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>`;
      return table;
    }
    window.showModal = function(playerName) {
      const nome = decodeURIComponent(playerName);
      const jogador = window.__JOGADORES__.find(j => j.nome === nome);
      if (!jogador) return;
      const partidas = window.__PARTIDAS__.filter(p => p.nome === nome);
      let partidasHtml = "";
      if (partidas.length) {
        partidasHtml = `<tr><th colspan="2" style="text-align:center;">Histórico de Partidas</th></tr>` +
          partidas.slice(-5).reverse().map(p => `
            <tr>
              <td>${p.dataJogo}</td>
              <td>Nota: ${p.notaPartida}</td>
            </tr>
          `).join('');
      }
      const modalContent = document.getElementById('modalContent');
      modalContent.innerHTML = `
        <div class="big">${jogador.nome}</div>
        <table>
          <tr><th>Jogos</th><td>${jogador.jogos}</td></tr>
          <tr><th>Vitórias</th><td>${jogador.vitorias}</td></tr>
          <tr><th>Gols</th><td>${jogador.gols}</td></tr>
          <tr><th>Assistências</th><td>${jogador.assistencias}</td></tr>
          <tr><th>Gols Tomados</th><td>${jogador.golsTomados}</td></tr>
          <tr><th>Gols Contra</th><td>${jogador.golsContra}</td></tr>
          <tr><th>Aproveitamento</th><td>${jogador.aproveitamento}%</td></tr>
          <tr><th>Nota Geral</th><td>${jogador.notaGeral}</td></tr>
          ${partidasHtml}
        </table>
      `;
      document.getElementById('modalBg').classList.add('active');
    }
    window.showJogoModal = function(dataJogo) {
      const partidas = window.__PARTIDAS__.filter(p => p.dataJogo === dataJogo);
      if (!partidas.length) return;
      let jogadoresHtml = partidas.map(p => `
        <tr>
          <td>${p.nome}</td>
          <td>${p.gols || ""}</td>
          <td>${p.assistencias || ""}</td>
          <td>${p.golsContra || ""}</td>
          <td>${p.golsTomados || ""}</td>
          <td>${p.vitoria ? "Sim" : "Não"}</td>
          <td>${p.notaPartida}</td>
        </tr>
      `).join('');
      const modalContent = document.getElementById('modalContent');
      modalContent.innerHTML = `
        <div class="date-title">${dataJogo}</div>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Gols</th>
              <th>Assist.</th>
              <th>Gols Contra</th>
              <th>Gols Tomados</th>
              <th>Vitória</th>
              <th>Nota</th>
            </tr>
          </thead>
          <tbody>
            ${jogadoresHtml}
          </tbody>
        </table>
      `;
      document.getElementById('modalBg').classList.add('active');
    }
    document.getElementById('modalClose').onclick = function() {
      document.getElementById('modalBg').classList.remove('active');
    }
    document.getElementById('modalBg').onclick = function(e) {
      if (e.target === this) this.classList.remove('active');
    }
    function renderJogosLista(partidas) {
      const datas = [...new Set(partidas.map(p => p.dataJogo))].sort((a, b) => {
        const dA = a.split('/').reverse().join('-');
        const dB = b.split('/').reverse().join('-');
        return dA > dB ? -1 : dA < dB ? 1 : 0;
      });
      return `
        <div class="jogos-lista">
          <h2>Jogos</h2>
          <ul>
            ${datas.map(dataJogo =>
              `<li onclick="showJogoModal('${dataJogo}')"><span class="date">${dataJogo}</span></li>`
            ).join('')}
          </ul>
        </div>
      `;
    }
    async function renderDashboard() {
      const main = document.getElementById("mainContent");
      main.innerHTML = `<div class="loading">Carregando dados...</div>`;
      try {
        const [jogadores, partidas] = await Promise.all([
          fetchJogadores(),
          fetchPartidas()
        ]);
        calcularNotasGerais(jogadores, partidas);
        window.__JOGADORES__ = jogadores;
        window.__PARTIDAS__ = partidas;
        main.innerHTML = `
          <div class="rankings">
            ${makeRankingTable(jogadores, "gols", "Goleadores")}
            ${makeRankingTable(jogadores, "assistencias", "Assistências")}
            ${makeRankingTable(jogadores, "vitorias", "Vitórias")}
            ${makeRankingTable(jogadores, "jogos", "Participação")}
            ${makeRankingTable(jogadores, "aproveitamento", "Aproveitamento", j => j.jogos > 0, " (%)")}
            ${makeRankingTable(jogadores, "notaGeral", "Nota Geral")}
            ${makeRankingTable(jogadores, "golsTomados", "Menos Gols Tomados (Goleiros)", j => j.nome.toLowerCase().includes("goleiro"))}
          </div>
          ${renderJogosLista(partidas)}
          <div style="text-align:center;font-size:1em;color:#b71c1c;margin-top:20px;">
            <b>Clique no nome do jogador para ver detalhes!<br>
            Clique na data do jogo para ver o resumo da partida!</b>
          </div>
        `;
      } catch(e) {
        main.innerHTML = `<div class="loading">Erro ao buscar dados. Verifique a planilha ou a internet.</div>`;
      }
    }
    renderDashboard();
  </script>
</body>
</html>
