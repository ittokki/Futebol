<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Dashboard Futebol - Ranking de Jogadores</title>
  <link href="https://fonts.googleapis.com/css?family=Montserrat:700,400&display=swap" rel="stylesheet">
  <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/861/861512.png"/>
  <style>
    body {
      background: radial-gradient(circle, #37d8ff 0%, #0c2e59 100%);
      color: #fff;
      font-family: 'Montserrat', Arial, sans-serif;
      margin: 0;
      padding-bottom: 80px;
    }
    .header {
      text-align: center;
      padding: 40px 10px 20px 10px;
    }
    .logo {
      width: 80px;
      margin-bottom: 10px;
    }
    h1 {
      font-size: 2.1em;
      margin: 0;
      letter-spacing: 1px;
    }
    .desc {
      margin-top: 8px;
      color: #ffe000;
      font-size: 1.08em;
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
      background: #fff8;
      border-radius: 16px;
      box-shadow: 0 4px 24px #0c2e5928;
      padding: 22px 18px;
      min-width: 240px;
      max-width: 320px;
      margin-bottom: 15px;
      transition: 0.2s;
    }
    .ranking-table:hover {
      box-shadow: 0 8px 32px #37d8ff80;
      background: #eafcff;
    }
    .ranking-table h2 {
      margin: 0 0 15px 0;
      font-size: 1.15em;
      color: #0c2e59;
      text-shadow: 1px 1px 0 #fff7;
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
      background: #0c2e59;
      color: #fff;
      border-radius: 5px;
      font-weight: bold;
    }
    .ranking-table tr.top-player {
      background: linear-gradient(90deg, #ffe00088 0%, #37d8ff33 100%);
      font-weight: bold;
      border-left: 5px solid #ffe000;
    }
    .ranking-table tr {
      transition: 0.1s;
    }
    .ranking-table tr:hover {
      background: #37d8ff22;
    }
    .loading {
      text-align: center;
      font-size: 1.5em;
      margin: 60px 0;
      animation: blink 1.2s infinite;
    }
    @keyframes blink {
      50% { opacity: 0.6; }
    }
    footer {
      position: fixed;
      left: 0; right: 0; bottom: 0;
      background: #0c2e59;
      color: #37d8ff;
      text-align: center;
      padding: 14px 0 10px 0;
      font-size: 1em;
      box-shadow: 0 -3px 20px #2227;
      letter-spacing: 0.5px;
    }
    a {
      color: #ffd700;
      text-decoration: underline;
    }
    @media (max-width: 900px) {
      .rankings { flex-direction: column; align-items: center;}
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="https://cdn-icons-png.flaticon.com/512/861/861512.png" class="logo" alt="logo"/>
    <h1>🏆 Dashboard Futebol - Ranking de Jogadores</h1>
    <div class="desc">Atualizado automaticamente pela planilha do grupo!</div>
  </div>
  <div id="mainContent">
    <div class="loading">Carregando dados...</div>
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

    // Corrige linhas faltando colunas
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

    // Fórmula da nota: vitórias*1 + gols*2 + assistências*1.5 + aproveitamento*0.5
    function calcularNota(jogador) {
      let nota = 0;
      nota += jogador.vitorias * 1;
      nota += jogador.gols * 2;
      nota += jogador.assistencias * 1.5;
      nota += calcularAproveitamento(jogador.jogos, jogador.vitorias) * 0.5;
      return Math.round(nota * 100) / 100;
    }

    async function fetchJogadores() {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
      const resp = await fetch(url);
      const data = await resp.json();
      return (data.values || []).map(row => {
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
          aproveitamento: calcularAproveitamento(jogosNum, vitoriasNum),
          nota: calcularNota({
            jogos: jogosNum,
            vitorias: vitoriasNum,
            gols: golsNum,
            assistencias: assistenciasNum
          })
        };
      });
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
                <td>${jogador.nome}</td>
                <td>${tipo === "aproveitamento" ? jogador[tipo] + "%" : jogador[tipo]}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>`;
      return table;
    }

    async function renderDashboard() {
      const main = document.getElementById("mainContent");
      main.innerHTML = `<div class="loading">Carregando dados...</div>`;
      try {
        const jogadores = await fetchJogadores();
        main.innerHTML = `
          <div class="rankings">
            ${makeRankingTable(jogadores, "gols", "Goleadores")}
            ${makeRankingTable(jogadores, "assistencias", "Assistências")}
            ${makeRankingTable(jogadores, "vitorias", "Vitórias")}
            ${makeRankingTable(jogadores, "jogos", "Jogos Jogados")}
            ${makeRankingTable(jogadores, "aproveitamento", "Aproveitamento", j => j.jogos > 0, " (%)")}
            ${makeRankingTable(jogadores, "nota", "Nota Geral")}
            ${makeRankingTable(jogadores, "golsTomados", "Menos Gols Tomados (Goleiros)", j => j.nome.toLowerCase().includes("goleiro"))}
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
