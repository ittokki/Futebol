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
    /* Modal styles */
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

  <!-- Modal para dados individuais -->
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
    // Configuração da planilha
    const apiKey = "AIzaSyCL19ds6YqVOv5vV-zygBjeC-byy-rDPfM";
    const spreadsheetId = "1TvrVT8ksYYMlpw8gkKIFvpnnCf02J8uYTkhHc5c0vdo";
    const range = "Página1!A2:G19";
    const rankingIcons = {
      gols: "⚽️",
      assistencias: "🅰️",
      vitorias: "🏅",
      jogos: "🎽",
      golsTomados: "🛡️",
      aproveitamento: "📈",
      nota: "⭐"
    };
    const medalhas = ['🥇','🥈','🥉'];

    function fixRow(row) {
      const fixed = [];
      for (let i = 0; i < 7; i++) {
        fixed[i] = row[i] !== undefined && row[i] !== null ? row[i] : "";
      }
      return fixed;
    }
    function calcularAproveitamento(jogos, vitorias) {
      if (jogos === 0) return 0;
      return Math.round((vitorias / jogos) * 100);
    }

    // Nota de 0 a 10, normalizada pelos maiores valores
    function calcularNota(jogador, jogadores) {
      const maxGols = Math.max(...jogadores.map(j => j.gols));
      const maxAssist = Math.max(...jogadores.map(j => j.assistencias));
      const maxVitorias = Math.max(...jogadores.map(j => j.vitorias));
      const maxAproveitamento = Math.max(...jogadores.map(j => j.aproveitamento));
      // Pesos personalizáveis
      const pesoGols = 2;
      const pesoAssist = 1.5;
      const pesoVitorias = 1;
      const pesoAproveitamento = 0.5;
      const notaGols = maxGols ? (jogador.gols / maxGols) * pesoGols : 0;
      const notaAssist = maxAssist ? (jogador.assistencias / maxAssist) * pesoAssist : 0;
      const notaVitorias = maxVitorias ? (jogador.vitorias / maxVitorias) * pesoVitorias : 0;
      const notaAproveitamento = maxAproveitamento ? (jogador.aproveitamento / maxAproveitamento) * pesoAproveitamento : 0;
      const somaPesos = pesoGols + pesoAssist + pesoVitorias + pesoAproveitamento;
      let nota = ((notaGols + notaAssist + notaVitorias + notaAproveitamento) / somaPesos) * 10;
      return Math.round(nota * 100) / 100;
    }

    async function fetchJogadores() {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
      const resp = await fetch(url);
      const data = await resp.json();
      const arr = (data.values || []).map(row => {
        const [id, nome, jogos, vitorias, gols, assistencias, golsTomados] = fixRow(row);
        const jogosNum = Number(jogos || 0);
        const vitoriasNum = Number(vitorias || 0);
        const golsNum = Number(gols || 0);
        const assistenciasNum = Number(assistencias || 0);
        const golsTomadosNum = Number(golsTomados || 0);
        return {
          id: id,
          nome: nome,
          jogos: jogosNum,
          vitorias: vitoriasNum,
          gols: golsNum,
          assistencias: assistenciasNum,
          golsTomados: golsTomadosNum,
          aproveitamento: calcularAproveitamento(jogosNum, vitoriasNum)
        };
      });
      arr.forEach(jogador => {
        jogador.nota = calcularNota(jogador, arr);
      });
      return arr;
    }
    function medalhaHTML(index) {
      return index < 3 ? `<span class="medal">${medalhas[index]}</span>` : '';
    }
    function makeRankingTable(jogadores, tipo, titulo, filterFn = null, sufixo = "") {
      let arr = jogadores;
      if (filterFn) arr = arr.filter(filterFn);
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
      const modalContent = document.getElementById('modalContent');
      modalContent.innerHTML = `
        <div class="big">${jogador.nome}</div>
        <table>
          <tr><th>Jogos</th><td>${jogador.jogos}</td></tr>
          <tr><th>Vitórias</th><td>${jogador.vitorias}</td></tr>
          <tr><th>Gols</th><td>${jogador.gols}</td></tr>
          <tr><th>Assistências</th><td>${jogador.assistencias}</td></tr>
          <tr><th>Gols Tomados</th><td>${jogador.golsTomados}</td></tr>
          <tr><th>Aproveitamento</th><td>${jogador.aproveitamento}%</td></tr>
          <tr><th>Nota Geral</th><td>${jogador.nota}</td></tr>
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
    async function renderDashboard() {
      const main = document.getElementById("mainContent");
      main.innerHTML = `<div class="loading">Carregando dados...</div>`;
      try {
        const jogadores = await fetchJogadores();
        window.__JOGADORES__ = jogadores;
        main.innerHTML = `
          <div class="rankings">
            ${makeRankingTable(jogadores, "gols", "Goleadores")}
            ${makeRankingTable(jogadores, "assistencias", "Assistências")}
            ${makeRankingTable(jogadores, "vitorias", "Vitórias")}
            ${makeRankingTable(jogadores, "jogos", "Participação")}
            ${makeRankingTable(jogadores, "aproveitamento", "Aproveitamento", j => j.jogos > 0, " (%)")}
            ${makeRankingTable(jogadores, "nota", "Nota Geral")}
            ${makeRankingTable(jogadores, "golsTomados", "Menos Gols Tomados (Goleiros)", j => j.nome.toLowerCase().includes("goleiro"))}
          </div>
          <div style="text-align:center;font-size:1em;color:#b71c1c;margin-top:20px;">
            <b>Clique no nome do jogador para ver detalhes!</b>
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
