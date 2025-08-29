<html lang="pt">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Ranking dos Inimigos da Bola</title>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-WKVNPFFGZB"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-WKVNPFFGZB');
    </script>
    <link href="https://fonts.googleapis.com/css?family=Montserrat:700,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="icon" href="https://raw.githubusercontent.com/ittokki/Futebol/ba59ab86cf2095d4e9214bd5e24e21ac8aeaf33a/inimigos%20da%20bola.jpg"/>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        :root {
            --primary: #333333;
            --accent: #00A1D6;
            --boca-blue: #003366;
            --boca-yellow: #FFD700;
            --river-red: #DA291C;
            --river-white: #FFFFFF;
            --neutral: #F5F5F5;
            --text: #333;
            --shadow: rgba(0, 0, 0, 0.2);
            --bg-light: #fff;
        }

        body {
            background: linear-gradient(135deg, var(--neutral) 0%, var(--primary) 100%);
            font-family: 'Montserrat', Arial, sans-serif;
            margin: 0;
            padding-bottom: 80px;
            color: var(--text);
            overflow-x: hidden;
            transition: background 0.3s ease;
        }

        body.dark {
            --neutral: #1A1A1A;
            --text: #E0E0E0;
            --bg-light: #2C2C2C;
            --shadow: rgba(0, 161, 214, 0.3);
            --primary: #4A4A4A;
            --accent: #00C4FF;
            --table-hover: rgba(0, 161, 214, 0.3);
        }

        .navbar {
            display: flex;
            justify-content: center;
            align-items: center;
            background: var(--bg-light);
            box-shadow: 0 2px 12px var(--shadow);
            padding: 16px;
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .nav-btn {
            background: none;
            border: none;
            color: var(--primary);
            font-size: 1.15em;
            font-weight: bold;
            margin: 0 24px;
            cursor: pointer;
            padding-bottom: 9px;
            border-bottom: 3px solid transparent;
            transition: all 0.2s ease;
        }

        .nav-btn.active {
            border-bottom: 3px solid var(--accent);
            color: var(--primary);
        }

        .nav-btn:hover {
            transform: scale(1.05);
        }

        .header {
            text-align: center;
            padding: 20px 10px;
            position: relative;
        }

        .search-bar {
            margin: 10px auto;
            max-width: 300px;
        }

        .search-bar input {
            width: 100%;
            padding: 8px;
            border: 1px solid var(--primary);
            border-radius: 5px;
            font-size: 1em;
            background: var(--bg-light);
            color: var(--text);
        }

        .theme-toggle {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            font-size: 1.5em;
            cursor: pointer;
            color: var(--text);
        }

        .logo {
            width: 100px;
            border-radius: 50%;
            box-shadow: 0 2px 16px var(--shadow);
            background: var(--bg-light);
            transition: transform 0.3s ease;
        }

        .logo:hover {
            transform: rotate(360deg);
        }

        h1 {
            font-size: 1.8em;
            margin: 5px 0;
            color: var(--primary);
        }

        .desc {
            font-size: 1em;
            color: var(--primary);
            font-weight: bold;
        }

        .highlight-star {
            background: var(--bg-light);
            border-radius: 10px;
            box-shadow: 0 2px 12px var(--shadow);
            padding: 10px;
            font-size: 1.1em;
            color: var(--accent);
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 6px;
            margin: 10px auto;
            width: fit-content;
            transition: all 0.2s ease;
        }

        .highlight-star:hover {
            transform: scale(1.05);
        }

        .highlight-star .star-icon {
            font-size: 1.3em;
        }

        .highlight-star .highlight-player {
            color: var(--primary);
        }

        .highlight-star .highlight-note {
            background: rgba(0, 161, 214, 0.2);
            color: var(--primary);
            border-radius: 8px;
            padding: 2px 8px;
            font-size: 0.9em;
        }

        .rankings {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 20px auto;
            max-width: 1340px;
            padding: 0 16px;
            animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .ranking-card {
            background: var(--bg-light);
            border-radius: 20px;
            box-shadow: 0 4px 24px var(--shadow);
            padding: 15px;
            border: 2px solid var(--primary);
            transition: all 0.3s ease;
            min-width: 280px; /* Increased min-width to accommodate progress bars */
        }

        .ranking-card:hover {
            box-shadow: 0 8px 32px var(--shadow);
            transform: translateY(-4px);
        }

        .ranking-title {
            font-size: 1.1em;
            color: var(--primary);
            font-weight: bold;
            text-align: center;
            margin-bottom: 10px;
        }

        .ranking-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.95em;
        }

        .ranking-table th, .ranking-table td {
            padding: 8px;
        }

        .ranking-table th {
            background: var(--primary);
            color: var(--accent) !important;
            border-radius: 5px;
            font-weight: bold;
        }

        .ranking-table td {
            color: var(--primary) !important;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            cursor: pointer;
        }

        .ranking-table tr:nth-child(even) {
            background: rgba(0, 0, 0, 0.05);
        }

        .ranking-table tr.top-player td {
            background: linear-gradient(90deg, rgba(0, 161, 214, 0.2) 0%, var(--bg-light) 100%);
            color: var(--primary) !important;
            font-weight: bold;
        }

        .ranking-table tr:hover td {
            background: var(--table-hover);
        }

        .badge {
            background: var(--accent);
            color: var(--primary);
            padding: 2px 8px;
            border-radius: 5px;
            font-size: 0.8em;
            margin-left: 5px;
            position: relative;
        }

        .badge:hover::after {
            content: attr(data-tooltip);
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: var(--primary);
            color: var(--accent);
            padding: 5px;
            border-radius: 5px;
            font-size: 0.8em;
            white-space: nowrap;
            z-index: 10;
        }

        .progress {
            height: 10px;
            background: var(--accent);
            border-radius: 5px;
            margin-top: 2px;
            max-width: 100px; /* Adjusted to prevent overflow */
            display: inline-block;
        }

        .progress-text {
            margin-left: 5px;
            font-weight: bold;
        }

        .see-more-btn {
            background: var(--primary);
            color: var(--accent);
            border: none;
            border-radius: 8px;
            font-size: 0.95em;
            font-weight: bold;
            padding: 8px 16px;
            cursor: pointer;
            margin-top: 10px;
            transition: all 0.2s ease;
        }

        .see-more-btn:hover {
            background: #222222;
            transform: scale(1.05);
        }

        .loading {
            text-align: center;
            font-size: 1.3em;
            margin: 40px 0;
            color: var(--primary);
            animation: blink 1.2s infinite;
        }

        @keyframes blink {
            50% { opacity: 0.6; }
        }

        footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: var(--primary);
            color: var(--accent);
            text-align: center;
            padding: 10px;
            font-size: 0.9em;
        }

        .modal-bg {
            display: none;
            position: fixed;
            z-index: 9000;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.7);
            justify-content: center;
            align-items: center;
        }

        .modal-bg.active {
            display: flex;
        }

        .modal {
            background: var(--bg-light);
            color: var(--primary);
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 8px 32px var(--shadow);
            max-width: 95vw;
            min-width: 270px;
            text-align: center;
            font-size: 1em;
            animation: modal-in 0.2s ease;
            overflow-y: auto;
            max-height: 90vh;
        }

        .modal .close-btn {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 1.5em;
            color: var(--primary);
            background: none;
            border: none;
            cursor: pointer;
        }

        .modal .big {
            font-size: 1.3em;
            font-weight: bold;
            color: var(--primary);
            margin-bottom: 10px;
        }

        .modal table {
            margin: 15px auto;
            width: 100%;
            border-collapse: collapse;
        }

        .modal th, .modal td {
            padding: 8px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .modal .date-title {
            font-size: 1.2em;
            font-weight: bold;
            color: var(--primary);
        }

        .modal .match-highlight {
            font-size: 1.1em;
            color: var(--accent);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin: 10px 0;
        }

        .team-boca h3 {
            background: var(--boca-blue);
            color: var(--boca-yellow);
            padding: 8px;
            border-radius: 8px;
        }

        .team-boca th {
            background: var(--boca-blue);
            color: var(--boca-yellow);
        }

        .team-boca td {
            background: rgba(0, 51, 102, 0.1);
            color: var(--primary);
        }

        .team-river h3 {
            background: var(--river-red);
            color: var(--river-white);
            padding: 8px;
            border-radius: 8px;
        }

        .team-river th {
            background: var(--river-red);
            color: var(--river-white);
        }

        .team-river td {
            background: rgba(218, 41, 28, 0.1);
            color: var(--primary);
        }

        .team-boca td.stat, .team-river td.stat {
            color: var(--primary); /* Changed from var(--accent) to var(--primary) for black text */
            font-weight: bold;
        }

        .jogos-lista {
            background: var(--bg-light);
            border-radius: 20px;
            box-shadow: 0 4px 24px var(--shadow);
            padding: 15px;
            margin: 20px auto;
            max-width: 350px;
        }

        .jogos-lista h2 {
            font-size: 1.2em;
            color: var(--primary);
            font-weight: bold;
        }

        .jogos-lista li {
            padding: 8px 0;
            cursor: pointer;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            transition: background 0.15s ease;
        }

        .jogos-lista li:hover {
            background: rgba(0, 161, 214, 0.15);
        }

        .jogos-lista .date {
            color: var(--primary);
            font-weight: bold;
        }

        .pagination button {
            background: var(--primary);
            color: var(--accent);
            border: none;
            border-radius: 8px;
            padding: 8px 12px;
            cursor: pointer;
            margin: 0 5px;
        }

        .pagination button:hover {
            background: #222222;
        }

        .charts-page {
            max-width: 900px;
            margin: 0 auto;
            padding: 20px 10px;
        }

        .charts-title {
            font-size: 1.3em;
            color: var(--primary);
            font-weight: bold;
        }

        .chart-container {
            background: var(--bg-light);
            border-radius: 16px;
            box-shadow: 0 4px 24px var(--shadow);
            padding: 15px;
            margin-bottom: 20px;
        }

        .comparison-section {
            background: var(--bg-light);
            border-radius: 16px;
            box-shadow: 0 4px 24px var(--shadow);
            padding: 15px;
        }

        .comparison-section select {
            width: 45%;
            padding: 8px;
            border: 1px solid var(--primary);
            border-radius: 5px;
            background: var(--bg-light);
            color: var(--text);
        }

        .comparison-section button {
            background: var(--primary);
            color: var(--accent);
            border: none;
            border-radius: 8px;
            padding: 8px 16px;
        }

        .comparison-table th {
            background: var(--primary);
            color: var(--accent);
        }

        .comparison-table td {
            color: var(--primary);
        }

        .instruction-card {
            background: var(--bg-light);
            border-radius: 16px;
            box-shadow: 0 4px 24px var(--shadow);
            padding: 15px;
            margin: 20px auto;
            max-width: 600px;
            color: var(--primary);
        }

        @media (max-width: 950px) {
            .rankings { grid-template-columns: 1fr; }
            .highlight-star { margin: 10px auto; }
        }

        @media (max-width: 600px) {
            .nav-btn { font-size: 1em; margin: 0 12px; }
            h1 { font-size: 1.5em; }
            .logo { width: 80px; }
            .rankings { gap: 15px; padding: 0 10px; }
            .comparison-section select { width: 100%; margin-bottom: 10px; }
        }

        @media (max-width: 400px) {
            .ranking-table, .modal table, .comparison-table {
                display: block;
            }
            .ranking-table thead, .modal thead, .comparison-table thead { display: none; }
            .ranking-table tr, .modal tr, .comparison-table tr {
                display: block;
                margin-bottom: 10px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            }
            .ranking-table td, .modal td, .comparison-table td {
                display: block;
                text-align: left;
                padding: 5px;
            }
            .ranking-table td:before, .modal td:before, .comparison-table td:before {
                content: attr(data-label);
                font-weight: bold;
                display: inline-block;
                width: 50%;
            }
        }
    </style>
</head>
<body>
    <div class="navbar">
        <button class="nav-btn active" id="navRankings">Rankings</button>
        <button class="nav-btn" id="navCharts">Gráficos</button>
        <button class="theme-toggle" id="themeToggle">🌙</button>
    </div>
    <div class="header">
        <img src="https://raw.githubusercontent.com/ittokki/Futebol/ba59ab86cf2095d4e9214bd5e24e21ac8aeaf33a/inimigos%20da%20bola.jpg" class="logo" alt="logo"/>
        <h1>Ranking dos Inimigos da Bola</h1>
        <div class="desc">Atualizado automaticamente pela planilha do grupo!</div>
        <div class="search-bar">
            <input type="text" id="searchInput" placeholder="Buscar jogador..." onkeyup="filterRankings()">
        </div>
        <div class="highlight-star" id="mainHighlightStar" style="display:none;">
            <span class="star-icon">⭐</span> Maior destaque: <span class="highlight-player" id="mainHighlightPlayer"></span>
            <span class="highlight-note" id="mainHighlightNote"></span>
        </div>
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
        <small>Dashboard esportivo feito para o grupo! <button onclick="exportCSV()">Exportar Rankings</button></small>
    </footer>
    <audio id="clickSound" src="https://raw.githubusercontent.com/ittokki/Futebol/5cc70b08d51f09dae0341672e52b2a435a276c05/PES%202013%20Select%20Game%20Main%20Menu%20Sound%20Effect%20(mp3cut.net).mp3"></audio>
    <script>
        const apiKey = "AIzaSyCL19ds6YqVOv5vV-zygBjeC-byy-rDPfM";
        const spreadsheetId = "1TvrVT8ksYYMlpw8gkKIFvpnnCf02J8uYTkhHc5c0vdo";
        const rangePagina1 = "Página1!A2:H100";
        const rangePagina2 = "Página2!A2:K300";
        const rankingIcons = { gols: '<i class="fas fa-futbol"></i>', assistencias: '<i class="fas fa-pass"></i>', vitorias: '<i class="fas fa-trophy"></i>', jogos: '<i class="fas fa-running"></i>', golsTomados: '<i class="fas fa-shield-alt"></i>', aproveitamento: '<i class="fas fa-chart-line"></i>', notaGeral: '<i class="fas fa-star"></i>', pontosMVP: '<i class="fas fa-crown"></i>' };
        const medalhas = ['🥇','🥈','🥉'];

        function playClickSound() {
            const sound = document.getElementById('clickSound');
            sound.currentTime = 0;
            sound.play().catch(e => console.log("Sound play failed:", e));
        }

        function parseNum(val) {
            if (typeof val === "number") return val;
            if (!val) return 0;
            return Number(val.toString().replace(',','.').replace(' ','').trim()) || 0;
        }

        function normalizaNome(nome) {
            return nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim().toUpperCase();
        }

        function fixRow(row, len) {
            const fixed = [];
            for (let i = 0; i < len; i++) fixed[i] = row[i] !== undefined && row[i] !== null ? row[i] : "";
            return fixed;
        }

        function calcularAproveitamento(jogos, vitorias, empates) {
            if (jogos === 0) return 0;
            const pontos = vitorias + (empates * 0.5);
            return Math.round((pontos / jogos) * 100);
        }

        function calcularNotaPartida(dados) {
            let notaADM = parseNum(dados.notaADM);
            let gols = parseNum(dados.gols);
            let assistencias = parseNum(dados.assistencias);
            let golsTomados = parseNum(dados.golsTomados);
            let golsContra = parseNum(dados.golsContra);
            let vitoria = parseNum(dados.vitoria);
            const isGoleiro = golsTomados > 0;

            let PESO_ADM = 5;
            let PESO_GOLS = isGoleiro ? 0.3 : 0.7;
            let PESO_ASSIST = isGoleiro ? 0.2 : 0.5;
            let PESO_GOLS_TOMADOS = isGoleiro ? 0.5 : 0.2;
            let PESO_GOLS_CONTRA = -0.5;
            let PESO_VITORIA = vitoria === 1 ? 0.3 : vitoria === 0.5 ? 0.15 : 0;
            let NOTA_BASE = 6.0;

            let notaTecnica = NOTA_BASE + gols * PESO_GOLS + assistencias * PESO_ASSIST + golsTomados * PESO_GOLS_TOMADOS + golsContra * PESO_GOLS_CONTRA + PESO_VITORIA;
            let notaFinal = (notaTecnica + notaADM * PESO_ADM) / (1 + PESO_ADM);
            notaFinal = Math.max(0, Math.min(10, Math.round(notaFinal * 10) / 10));
            return { nota: notaFinal, isGoleiro };
        }

        async function fetchPartidas() {
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${rangePagina2}?key=${apiKey}`;
            const resp = await fetch(url);
            const data = await resp.json();
            return (data.values || []).map(row => {
                const [nome, gols, assistencias, golsTomados, golsContra, notaADM, dataJogo, vitoriaRaw, time, resultado, jogoAconteceuRaw] = fixRow(row, 11);
                if (!nome || !dataJogo) return null;
                const vitoriaStatus = (typeof vitoriaRaw === "string" ? vitoriaRaw.trim().toLowerCase() : "");
                const vitoria = vitoriaStatus === "sim" ? 1 : vitoriaStatus === "empate" ? 0.5 : 0;
                const notaInfo = calcularNotaPartida({ gols, assistencias, golsTomados, golsContra, vitoria, notaADM });
                return {
                    nome: nome.trim(),
                    gols, assistencias, golsTomados, golsContra, dataJogo, vitoria, notaADM,
                    notaPartida: notaInfo.nota,
                    isGoleiro: notaInfo.isGoleiro,
                    time: time ? time.trim() : '',
                    resultado: resultado ? parseNum(resultado) : 0,
                    jogoAconteceu: (typeof jogoAconteceuRaw === "string" && jogoAconteceuRaw.trim().toLowerCase() === "sim")
                };
            }).filter(x => x);
        }

        async function fetchJogadores() {
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${rangePagina1}?key=${apiKey}`;
            const resp = await fetch(url);
            const data = await resp.json();
            const nomesSet = new Set();
            const jogadores = [];
            const partidas = await fetchPartidas();
            const partidasPorJogador = {};

            partidas.forEach(p => {
                if (!p.jogoAconteceu) return;
                const nomeNorm = normalizaNome(p.nome);
                if (!partidasPorJogador[nomeNorm]) partidasPorJogador[nomeNorm] = [];
                partidasPorJogador[nomeNorm].push(p);
            });

            (data.values || []).forEach(row => {
                const [id, nome, jogos, vitorias, gols, assistencias, golsTomados, golsContra] = fixRow(row, 8);
                if (!nome || nomesSet.has(nome.trim())) return;
                nomesSet.add(nome.trim());
                const nomeNorm = normalizaNome(nome);
                const partidasJogador = partidasPorJogador[nomeNorm] || [];
                const empates = partidasJogador.filter(p => p.vitoria === 0.5).length;
                jogadores.push({
                    id: id,
                    nome: nome.trim(),
                    jogos: parseNum(jogos),
                    vitorias: parseNum(vitorias),
                    empates: empates,
                    gols: parseNum(gols),
                    assistencias: parseNum(assistencias),
                    golsTomados: parseNum(golsTomados),
                    golsContra: parseNum(golsContra),
                    aproveitamento: calcularAproveitamento(parseNum(jogos), parseNum(vitorias), empates),
                    notaGeral: 0,
                    notaGeralGoleiro: 0,
                    notaGeralLinha: 0,
                    jogosGoleiro: 0,
                    jogosLinha: 0,
                    pontosMVP: 0,
                    nivel: 'Iniciante'
                });
            });
            return jogadores;
        }

        function calcularNotasGerais(jogadores, partidas) {
            const notasPorJogador = {};
            partidas.forEach(p => {
                if (!p.jogoAconteceu) return;
                const nomeNorm = normalizaNome(p.nome);
                if (!notasPorJogador[nomeNorm]) notasPorJogador[nomeNorm] = { todas: [], goleiro: [], linha: [] };
                notasPorJogador[nomeNorm].todas.push(p.notaPartida);
                if (p.isGoleiro) notasPorJogador[nomeNorm].goleiro.push(p.notaPartida);
                else notasPorJogador[nomeNorm].linha.push(p.notaPartida);
            });
            jogadores.forEach(j => {
                const nomeNorm = normalizaNome(j.nome);
                const notas = notasPorJogador[nomeNorm] || { todas: [], goleiro: [], linha: [] };
                j.notaGeral = notas.todas.length > 0 ? Math.round((notas.todas.reduce((a, b) => a + b, 0) / notas.todas.length) * 10) / 10 : 0;
                j.notaGeralGoleiro = notas.goleiro.length > 0 ? Math.round((notas.goleiro.reduce((a, b) => a + b, 0) / notas.goleiro.length) * 10) / 10 : 0;
                j.notaGeralLinha = notas.linha.length > 0 ? Math.round((notas.linha.reduce((a, b) => a + b, 0) / notas.linha.length) * 10) / 10 : 0;
                j.jogosGoleiro = notas.goleiro.length;
                j.jogosLinha = notas.linha.length;
                j.pontosMVP = j.jogos > 0 ? Math.round(((j.gols * 3 + j.assistencias * 2 + j.vitorias * 5 - j.golsContra * 2) / j.jogos) * 10) : 0;
                j.nivel = j.pontosMVP > 60 ? 'Lenda' : j.pontosMVP > 30 ? 'Craque' : 'Iniciante';
            });
        }

        function getMaiorDestaque(jogadores) {
            let maior = { nome: "", nota: 0 };
            jogadores.forEach(j => {
                if (j.notaGeral > maior.nota) maior = { nome: j.nome, nota: j.notaGeral };
            });
            return maior;
        }

        function showMaiorDestaque(jogadores) {
            const destaque = getMaiorDestaque(jogadores);
            const mainStar = document.getElementById('mainHighlightStar');
            if (destaque.nota > 0) {
                document.getElementById('mainHighlightPlayer').textContent = destaque.nome;
                document.getElementById('mainHighlightNote').textContent = destaque.nota.toLocaleString('pt-BR', { minimumFractionDigits: 1 });
                mainStar.style.display = "flex";
            } else {
                mainStar.style.display = "none";
            }
        }

        function medalhaHTML(index) {
            return index < 3 ? `<span class="medal">${medalhas[index]}</span>` : '';
        }

        function makeRankingCard(jogadores, tipo, titulo, filterFn = null, sufixo = "") {
            let arr = jogadores;
            if (filterFn) arr = arr.filter(filterFn);
            if (tipo === "jogos") arr = arr.filter(j => Number(j.jogos) > 0);
            
            arr = [...arr].sort((a, b) => {
                const valA = tipo === "golsTomados" ? a[tipo] : b[tipo];
                const valB = tipo === "golsTomados" ? b[tipo] : a[tipo];
                if (valA !== valB) return valA - valB;
                if (a.jogos !== b.jogos) return a.jogos - b.jogos;
                return a.nome.localeCompare(b.nome);
            });

            const maxDefault = 10;
            const tableId = "table_" + tipo;
            const btnId = "btn_" + tipo;

            function buildRows(limit) {
                let rows = '';
                let currentPos = 1;
                let prevValue = null;
                arr.slice(0, limit).forEach((jogador, i) => {
                    const value = tipo === "golsTomados" ? jogador[tipo] : jogador[tipo];
                    if (i > 0 && value !== prevValue) currentPos = i + 1;
                    prevValue = value;
                    const tooltip = tipo === "pontosMVP" ? (jogador.nivel === 'Lenda' ? 'Lenda: >60 pontos/jogo' : jogador.nivel === 'Craque' ? 'Craque: 30-60 pontos/jogo' : 'Iniciante: ≤30 pontos/jogo') : '';
                    rows += `
                        <tr${i === 0 ? ' class="top-player"' : ''}>
                            <td data-label="Posição">${currentPos}</td>
                            <td data-label="Nome" onclick="showModal('${encodeURIComponent(jogador.nome)}')">
                                ${medalhaHTML(currentPos - 1)}${jogador.nome}${tipo === "pontosMVP" ? ` <span class="badge" data-tooltip="${tooltip}">${jogador.nivel}</span>` : ''}
                            </td>
                            <td data-label="${titulo}">${tipo === "aproveitamento" ? `<div class="progress" style="width: ${Math.min(jogador[tipo], 100)}%;"></div><span class="progress-text">${jogador[tipo]}%</span>` : 
                            (tipo === "notaGeral" || tipo === "pontosMVP" ? jogador[tipo].toLocaleString('pt-BR', { minimumFractionDigits: 1 }) : jogador[tipo])}</td>
                        </tr>
                    `;
                });
                return rows;
            }

            let btnHtml = arr.length > maxDefault ? `<button class="see-more-btn" id="${btnId}" onclick="toggleTable('${tableId}','${btnId}',${arr.length},${maxDefault})">Ver Mais</button>` : "";
            return `
                <div class="ranking-card">
                    <div class="ranking-title">${rankingIcons[tipo] || ""} ${titulo}</div>
                    <table class="ranking-table" id="${tableId}">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>${titulo}${sufixo}</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${buildRows(maxDefault)}
                        </tbody>
                    </table>
                    ${btnHtml}
                </div>
            `;
        }

        window.toggleTable = function(tableId, btnId, total, limit) {
            playClickSound();
            const table = document.getElementById(tableId);
            const btn = document.getElementById(btnId);
            const tipo = tableId.replace('table_','');
            const arr = window.__RANKING_DATA__[tipo];
            const expanded = btn.getAttribute("data-expanded") === "true";
            let rowsHtml = "";
            if (!expanded) {
                let currentPos = 1;
                let prevValue = null;
                arr.forEach((jogador, i) => {
                    const value = tipo === "golsTomados" ? jogador[tipo] : jogador[tipo];
                    if (i > 0 && value !== prevValue) currentPos = i + 1;
                    prevValue = value;
                    const tooltip = tipo === "pontosMVP" ? (jogador.nivel === 'Lenda' ? 'Lenda: >60 pontos/jogo' : jogador.nivel === 'Craque' ? 'Craque: 30-60 pontos/jogo' : 'Iniciante: ≤30 pontos/jogo') : '';
                    rowsHtml += `
                        <tr${i === 0 ? ' class="top-player"' : ''}>
                            <td data-label="Posição">${currentPos}</td>
                            <td data-label="Nome" onclick="showModal('${encodeURIComponent(jogador.nome)}')">
                                ${medalhaHTML(currentPos - 1)}${jogador.nome}${tipo === "pontosMVP" ? ` <span class="badge" data-tooltip="${tooltip}">${jogador.nivel}</span>` : ''}
                            </td>
                            <td data-label="${tipo === "aproveitamento" ? 'Aproveitamento' : tipo === "notaGeral" ? 'Nota Geral' : tipo === "pontosMVP" ? 'Pontos MVP' : tipo}">
                                ${tipo === "aproveitamento" ? `<div class="progress" style="width: ${Math.min(jogador[tipo], 100)}%;"></div><span class="progress-text">${jogador[tipo]}%</span>` : 
                                (tipo === "notaGeral" || tipo === "pontosMVP" ? jogador[tipo].toLocaleString('pt-BR', { minimumFractionDigits: 1 }) : jogador[tipo])}
                            </td>
                        </tr>
                    `;
                });
                btn.textContent = "Ver Menos";
                btn.setAttribute("data-expanded", "true");
            } else {
                let currentPos = 1;
                let prevValue = null;
                arr.slice(0, limit).forEach((jogador, i) => {
                    const value = tipo === "golsTomados" ? jogador[tipo] : jogador[tipo];
                    if (i > 0 && value !== prevValue) currentPos = i + 1;
                    prevValue = value;
                    const tooltip = tipo === "pontosMVP" ? (jogador.nivel === 'Lenda' ? 'Lenda: >60 pontos/jogo' : jogador.nivel === 'Craque' ? 'Craque: 30-60 pontos/jogo' : 'Iniciante: ≤30 pontos/jogo') : '';
                    rowsHtml += `
                        <tr${i === 0 ? ' class="top-player"' : ''}>
                            <td data-label="Posição">${currentPos}</td>
                            <td data-label="Nome" onclick="showModal('${encodeURIComponent(jogador.nome)}')">
                                ${medalhaHTML(currentPos - 1)}${jogador.nome}${tipo === "pontosMVP" ? ` <span class="badge" data-tooltip="${tooltip}">${jogador.nivel}</span>` : ''}
                            </td>
                            <td data-label="${tipo === "aproveitamento" ? 'Aproveitamento' : tipo === "notaGeral" ? 'Nota Geral' : tipo === "pontosMVP" ? 'Pontos MVP' : tipo}">
                                ${tipo === "aproveitamento" ? `<div class="progress" style="width: ${Math.min(jogador[tipo], 100)}%;"></div><span class="progress-text">${jogador[tipo]}%</span>` : 
                                (tipo === "notaGeral" || tipo === "pontosMVP" ? jogador[tipo].toLocaleString('pt-BR', { minimumFractionDigits: 1 }) : jogador[tipo])}
                            </td>
                        </tr>
                    `;
                });
                btn.textContent = "Ver Mais";
                btn.setAttribute("data-expanded", "false");
            }
            table.querySelector("tbody").innerHTML = rowsHtml;
        }

        window.showModal = function(playerName) {
            playClickSound();
            const nome = decodeURIComponent(playerName);
            const jogador = window.__JOGADORES__.find(j => j.nome === nome);
            if (!jogador) return;
            const partidas = window.__PARTIDAS__.filter(p => normalizaNome(p.nome) === normalizaNome(jogador.nome));
            const mediaGols = window.__JOGADORES__.reduce((sum, j) => sum + j.gols, 0) / window.__JOGADORES__.length;
            const partidasJogador = partidas.filter(p => p.jogoAconteceu);
            const datas = partidasJogador.map(p => p.dataJogo).sort((a, b) => a.split('/').reverse().join('-') > b.split('/').reverse().join('-') ? 1 : -1);
            const notas = partidasJogador.sort((a, b) => a.dataJogo.split('/').reverse().join('-') > b.dataJogo.split('/').reverse().join('-') ? 1 : -1).map(p => p.notaPartida);
            const tooltip = jogador.nivel === 'Lenda' ? 'Lenda: >60 pontos/jogo' : jogador.nivel === 'Craque' ? 'Craque: 30-60 pontos/jogo' : 'Iniciante: ≤30 pontos/jogo';
            let partidasHtml = partidas.length ? `<tr><th colspan="2">Histórico de Partidas</th></tr>` + 
                partidas.slice(-5).reverse().map(p => `
                    <tr>
                        <td data-label="Data">${p.dataJogo}</td>
                        <td data-label="Detalhes">Nota: ${p.notaPartida.toLocaleString('pt-BR', { minimumFractionDigits: 1 })} (${p.isGoleiro ? 'Goleiro' : 'Linha'}, ${p.vitoria === 1 ? 'Vitória' : p.vitoria === 0.5 ? 'Empate' : 'Derrota'})</td>
                    </tr>
                `).join('') : "";
            const modalContent = document.getElementById('modalContent');
            modalContent.innerHTML = `
                <div class="big">${jogador.nome} <span class="badge" data-tooltip="${tooltip}">${jogador.nivel}</span></div>
                <table>
                    <tr><th>Jogos</th><td data-label="Jogos">${jogador.jogos}</td></tr>
                    <tr><th>Vitórias</th><td data-label="Vitórias">${jogador.vitorias}</td></tr>
                    <tr><th>Aproveitamento</th><td data-label="Aproveitamento"><div class="progress" style="width: ${jogador.aproveitamento}%"></div></td></tr>
                    <tr><th>Gols</th><td data-label="Gols">${jogador.gols} (Média grupo: ${mediaGols.toFixed(1)})</td></tr>
                    <tr><th>Assistências</th><td data-label="Assistências">${jogador.assistencias}</td></tr>
                    <tr><th>Nota Geral</th><td data-label="Nota Geral">${jogador.notaGeral.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}</td></tr>
                    ${partidasHtml}
                </table>
                <div class="chart-container">
                    <canvas id="modalChart"></canvas>
                    <div class="chart-legend">Evolução de Notas</div>
                </div>
            `;
            document.getElementById('modalBg').classList.add('active');
            new Chart(document.getElementById('modalChart'), {
                type: 'line',
                data: {
                    labels: datas,
                    datasets: [{
                        label: `Notas de ${nome}`,
                        data: notas,
                        borderColor: 'var(--accent)',
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true, max: 10 } }
                }
            });
        }

        window.showJogoModal = function(dataJogo) {
            playClickSound();
            let partidas = window.__PARTIDAS__.filter(p => p.dataJogo === dataJogo);
            if (!partidas.length) return;
            let destaque = { nome: "", nota: -1 };
            partidas.forEach(p => {
                if (p.notaPartida > destaque.nota) destaque = { nome: p.nome, nota: p.notaPartida };
            });
            partidas = [...partidas].sort((a, b) => (a.time || '').localeCompare(b.time || ''));
            const uniqueTimes = [...new Set(partidas.map(p => p.time).filter(Boolean))].sort();
            let matchTitle = dataJogo;
            let isEmpate = false;

            if (uniqueTimes.length >= 2) {
                const placarPorTime = {};
                partidas.forEach(p => {
                    if (p.time && p.resultado && !placarPorTime[p.time]) placarPorTime[p.time] = p.resultado;
                });
                const golsPorTime = {};
                uniqueTimes.forEach(t => golsPorTime[t] = 0);
                partidas.forEach(p => {
                    if (p.time) golsPorTime[p.time] += parseNum(p.gols);
                });
                const placar1 = placarPorTime[uniqueTimes[0]] || golsPorTime[uniqueTimes[0]];
                const placar2 = placarPorTime[uniqueTimes[1]] || golsPorTime[uniqueTimes[1]];
                matchTitle = `${uniqueTimes[0]} ${placar1}x${placar2} ${uniqueTimes[1]}`;
                isEmpate = placar1 === placar2;
            }

            const jogadoresPorTime = {};
            uniqueTimes.forEach(time => {
                jogadoresPorTime[time] = partidas.filter(p => p.time === time);
            });
            let timesHtml = '';
            uniqueTimes.forEach((time) => {
                const jogadores = jogadoresPorTime[time];
                timesHtml += `
                    <div class="team-${time.toLowerCase()}" style="margin-bottom: 15px;">
                        <h3>${time}</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Gols</th>
                                    <th>Assistências</th>
                                    <th>Nota</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${jogadores.map(p => `
                                    <tr>
                                        <td data-label="Nome">${p.nome}</td>
                                        <td data-label="Gols" class="stat">${parseNum(p.gols)}</td>
                                        <td data-label="Assistências" class="stat">${parseNum(p.assistencias)}</td>
                                        <td data-label="Nota" class="stat">${p.notaPartida.toLocaleString('pt-BR', { minimumFractionDigits: 1 })} (${p.isGoleiro ? 'Goleiro' : 'Linha'})</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
            });
            const modalContent = document.getElementById('modalContent');
            modalContent.innerHTML = `
                <div class="date-title">${matchTitle}${isEmpate ? ' (Empate)' : ''}</div>
                <div class="match-highlight">
                    <span class="star-icon">⭐</span> Melhor da Partida: <span class="highlight-player">${destaque.nome}</span>
                    <span class="highlight-note">${destaque.nota.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}</span>
                </div>
                ${timesHtml}
            `;
            document.getElementById('modalBg').classList.add('active');
        }

        document.getElementById('modalClose').onclick = function() {
            playClickSound();
            document.getElementById('modalBg').classList.remove('active');
        }

        document.getElementById('modalBg').onclick = function(e) {
            if (e.target === this) {
                playClickSound();
                this.classList.remove('active');
            }
        }

        window.filterRankings = function() {
            const input = document.getElementById('searchInput').value.toUpperCase();
            document.querySelectorAll('.ranking-table tbody tr').forEach(row => {
                const name = row.querySelector('td:nth-child(2)').textContent.toUpperCase();
                row.style.display = name.includes(input) ? '' : 'none';
            });
        };

        window.exportCSV = function() {
            const csv = 'Nome,Gols,Assistencias,Vitorias,PontosMVP,Nivel\n' + 
                        window.__JOGADORES__.map(j => `${j.nome},${j.gols},${j.assistencias},${j.vitorias},${j.pontosMVP},${j.nivel}`).join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a'); a.href = url; a.download = 'rankings.csv'; a.click();
        };

        function renderJogosLista(partidas) {
            const datas = [...new Set(partidas.map(p => p.dataJogo))].sort((a, b) => {
                const dA = a.split('/').reverse().join('-');
                const dB = b.split('/').reverse().join('-');
                return dA > dB ? -1 : dA < dB ? 1 : 0;
            });
            const itemsPerPage = 10;
            let currentPage = 1;

            window.renderPage = function(page) {
                const start = (page - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                const pageDatas = datas.slice(start, end);
                const ul = document.getElementById('jogosListaUl');
                ul.innerHTML = pageDatas.map(dataJogo => `<li onclick="showJogoModal('${dataJogo}')"><span class="date">${dataJogo}</span></li>`).join('');
                const prevBtn = document.getElementById('prevPage');
                const nextBtn = document.getElementById('nextPage');
                if (prevBtn) prevBtn.disabled = page === 1;
                if (nextBtn) nextBtn.disabled = page * itemsPerPage >= datas.length;
            };

            window.prevPage = function() {
                if (currentPage > 1) {
                    currentPage--;
                    playClickSound();
                    window.renderPage(currentPage);
                }
            };
            window.nextPage = function() {
                if (currentPage * itemsPerPage < datas.length) {
                    currentPage++;
                    playClickSound();
                    window.renderPage(currentPage);
                }
            };

            return `
                <div class="jogos-lista">
                    <h2><i class="fas fa-calendar-alt"></i> Jogos</h2>
                    <ul id="jogosListaUl"></ul>
                    <div class="pagination">
                        <button id="prevPage" onclick="prevPage()">Anterior</button>
                        <button id="nextPage" onclick="nextPage()">Próxima</button>
                    </div>
                </div>
            `;
        }

        function renderCharts(jogadores, partidas) {
            let topNotas = [...jogadores].sort((a,b) => b.notaGeral - a.notaGeral).slice(0,2);
            let player1Default = topNotas[0] ? topNotas[0].nome : "";
            let player2Default = topNotas[1] ? topNotas[1].nome : "";
            let topGoleadores = [...jogadores].sort((a,b) => b.gols - a.gols).slice(0,10);
            let nomesGoleadores = topGoleadores.map(j => j.nome);
            let golsGoleadores = topGoleadores.map(j => j.gols);
            let topAssistidores = [...jogadores].sort((a,b) => b.assistencias - a.assistencias).slice(0,10);
            let nomesAssistidores = topAssistidores.map(j => j.nome);
            let assistenciasAssistidores = topAssistidores.map(j => j.assistencias);
            let topJogos = [...jogadores].sort((a,b) => b.jogos - a.jogos).slice(0,10);
            let nomesJogos = topJogos.map(j => j.nome);
            let jogosJogos = topJogos.map(j => j.jogos);
            let topAproveitamento = [...jogadores].filter(j => j.jogos > 0).sort((a,b) => b.aproveitamento - a.aproveitamento).slice(0,10);
            let nomesAproveitamento = topAproveitamento.map(j => j.nome);
            let aproveitamentoVals = topAproveitamento.map(j => j.aproveitamento);
            let topContribuicao = [...jogadores].sort((a,b) => (b.gols + b.assistencias) - (a.gols + a.assistencias)).slice(0,10);
            let nomesContribuicao = topContribuicao.map(j => j.nome);
            let contribuicaoVals = topContribuicao.map(j => j.gols + j.assistencias);
            let totalGols = jogadores.reduce((a,b) => a + b.gols, 0);
            const playerNames = jogadores.map(j => j.nome).sort();
            const ultimaData = [...new Set(partidas.map(p => p.dataJogo))].sort((a, b) => b.split('/').reverse().join('-') > a.split('/').reverse().join('-') ? 1 : -1)[0];
            const datesThisMonth = [...new Set(partidas.map(p => p.dataJogo))].filter(d => {
                const [day, month, year] = d.split('/').map(Number);
                const today = new Date();
                return year === today.getFullYear() && month === today.getMonth() + 1;
            });
            const destaqueMes = datesThisMonth.reduce((max, date) => {
                const bestOfDate = partidas.filter(p => p.dataJogo === date).reduce((maxP, p) => p.notaPartida > maxP.nota ? { nome: p.nome, nota: p.notaPartida } : maxP, { nome: "", nota: -1 });
                return bestOfDate.nota > max.nota ? bestOfDate : max;
            }, { nome: "", nota: -1 });

            return `
                <div class="charts-page">
                    <div class="charts-title">Gráficos Gerais do Grupo</div>
                    <div class="highlight-star">
                        <span class="star-icon">⭐</span> Destaque do Mês: <span class="highlight-player">${destaqueMes.nome}</span>
                        <span class="highlight-note">${destaqueMes.nota.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}</span>
                    </div>
                    <div class="chart-container">
                        <canvas id="chartGoleadores"></canvas>
                        <div class="chart-legend">Top 10 Goleadores</div>
                    </div>
                    <div class="chart-container">
                        <canvas id="chartAssistidores"></canvas>
                        <div class="chart-legend">Top 10 Assistidores</div>
                    </div>
                    <div class="chart-container">
                        <canvas id="chartParticipacao"></canvas>
                        <div class="chart-legend">Top 10 Participação (Jogos)</div>
                    </div>
                    <div class="chart-container">
                        <canvas id="chartAproveitamento"></canvas>
                        <div class="chart-legend">Top 10 Aproveitamento (%)</div>
                    </div>
                    <div class="chart-container">
                        <canvas id="chartContribuicao"></canvas>
                        <div class="chart-legend">Top 10 Contribuição (Gols + Assistências)</div>
                    </div>
                    <div style="margin-top:20px; font-size:1.1em; color:var(--primary);">
                        <b>Gols totais no grupo:</b> <span style="color:var(--accent)">${totalGols}</span>
                    </div>
                    <div class="comparison-section">
                        <h2>Comparar Jogadores</h2>
                        <select id="player1">
                            <option value="">Selecione Jogador 1</option>
                            ${playerNames.map(name => `<option value="${name}" ${name === player1Default ? 'selected' : ''}>${name}</option>`).join('')}
                        </select>
                        <select id="player2">
                            <option value="">Selecione Jogador 2</option>
                            ${playerNames.map(name => `<option value="${name}" ${name === player2Default ? 'selected' : ''}>${name}</option>`).join('')}
                        </select>
                        <button onclick="comparePlayers()">Comparar</button>
                        <div id="comparisonResult"></div>
                    </div>
                </div>
            `;
        }

        function drawCharts(jogadores, partidas) {
            let topGoleadores = [...jogadores].sort((a,b) => b.gols - a.gols).slice(0,10);
            let nomesGoleadores = topGoleadores.map(j => j.nome);
            let golsGoleadores = topGoleadores.map(j => j.gols);
            let topAssistidores = [...jogadores].sort((a,b) => b.assistencias - a.assistencias).slice(0,10);
            let nomesAssistidores = topAssistidores.map(j => j.nome);
            let assistenciasAssistidores = topAssistidores.map(j => j.assistencias);
            let topJogos = [...jogadores].sort((a,b) => b.jogos - a.jogos).slice(0,10);
            let nomesJogos = topJogos.map(j => j.nome);
            let jogosJogos = topJogos.map(j => j.jogos);
            let topAproveitamento = [...jogadores].filter(j => j.jogos > 0).sort((a,b) => b.aproveitamento - a.aproveitamento).slice(0,10);
            let nomesAproveitamento = topAproveitamento.map(j => j.nome);
            let aproveitamentoVals = topAproveitamento.map(j => j.aproveitamento);
            let topContribuicao = [...jogadores].sort((a,b) => (b.gols + b.assistencias) - (a.gols + a.assistencias)).slice(0,10);
            let nomesContribuicao = topContribuicao.map(j => j.nome);
            let contribuicaoVals = topContribuicao.map(j => j.gols + j.assistencias);

            new Chart(document.getElementById('chartGoleadores'), {
                type: 'bar',
                data: {
                    labels: nomesGoleadores,
                    datasets: [{ label: 'Gols', data: golsGoleadores, backgroundColor: 'var(--accent)' }]
                },
                options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
            });

            new Chart(document.getElementById('chartAssistidores'), {
                type: 'bar',
                data: {
                    labels: nomesAssistidores,
                    datasets: [{ label: 'Assistências', data: assistenciasAssistidores, backgroundColor: '#4caf50' }]
                },
                options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
            });

            new Chart(document.getElementById('chartParticipacao'), {
                type: 'bar',
                data: {
                    labels: nomesJogos,
                    datasets: [{ label: 'Jogos', data: jogosJogos, backgroundColor: 'var(--primary)' }]
                },
                options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
            });

            new Chart(document.getElementById('chartAproveitamento'), {
                type: 'bar',
                data: {
                    labels: nomesAproveitamento,
                    datasets: [{ label: 'Aproveitamento (%)', data: aproveitamentoVals, backgroundColor: 'var(--accent)' }]
                },
                options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
            });

            new Chart(document.getElementById('chartContribuicao'), {
                type: 'bar',
                data: {
                    labels: nomesContribuicao,
                    datasets: [{ label: 'Gols + Assistências', data: contribuicaoVals, backgroundColor: 'var(--primary)' }]
                },
                options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
            });
        }

        window.comparePlayers = function() {
            playClickSound();
            const player1Name = document.getElementById('player1').value;
            const player2Name = document.getElementById('player2').value;
            if (!player1Name || !player2Name) {
                alert('Selecione dois jogadores para comparar!');
                return;
            }
            const player1 = window.__JOGADORES__.find(j => j.nome === player1Name);
            const player2 = window.__JOGADORES__.find(j => j.nome === player2Name);
            if (!player1 || !player2) return;
            const totalJogosGrupo = window.__JOGADORES__.reduce((sum, j) => sum + j.jogos, 0);
            const derrotas1 = player1.jogos - player1.vitorias - player1.empates;
            const derrotas2 = player2.jogos - player2.vitorias - player2.empates;
            const totalGolsGrupo = window.__JOGADORES__.reduce((sum, j) => sum + j.gols, 0);
            const percGols1 = totalGolsGrupo > 0 ? Math.round((player1.gols / totalGolsGrupo) * 100) : 0;
            const percGols2 = totalGolsGrupo > 0 ? Math.round((player2.gols / totalGolsGrupo) * 100) : 0;
            const totalAssistGrupo = window.__JOGADORES__.reduce((sum, j) => sum + j.assistencias, 0);
            const percAssist1 = totalAssistGrupo > 0 ? Math.round((player1.assistencias / totalAssistGrupo) * 100) : 0;
            const percAssist2 = totalAssistGrupo > 0 ? Math.round((player2.assistencias / totalAssistGrupo) * 100) : 0;

            const comparisonHtml = `
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>Estatística</th>
                            <th>${player1.nome}</th>
                            <th>${player2.nome}</th>
                            <th>Diferença</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Jogos</td><td>${player1.jogos}</td><td>${player2.jogos}</td><td>${player1.jogos - player2.jogos}</td></tr>
                        <tr><td>Vitórias</td><td>${player1.vitorias}</td><td>${player2.vitorias}</td><td>${player1.vitorias - player2.vitorias}</td></tr>
                        <tr><td>Empates</td><td>${player1.empates}</td><td>${player2.empates}</td><td>${player1.empates - player2.empates}</td></tr>
                        <tr><td>Derrotas</td><td>${derrotas1}</td><td>${derrotas2}</td><td>${derrotas1 - derrotas2}</td></tr>
                        <tr><td>Aproveitamento</td><td class="percent">${player1.aproveitamento}%</td><td class="percent">${player2.aproveitamento}%</td><td>${player1.aproveitamento - player2.aproveitamento}%</td></tr>
                        <tr><td>Gols</td><td>${player1.gols}</td><td>${player2.gols}</td><td>${player1.gols - player2.gols}</td></tr>
                        <tr><td>% Gols do Grupo</td><td class="percent">${percGols1}%</td><td class="percent">${percGols2}%</td><td>${percGols1 - percGols2}%</td></tr>
                        <tr><td>Assistências</td><td>${player1.assistencias}</td><td>${player2.assistencias}</td><td>${player1.assistencias - player2.assistencias}</td></tr>
                        <tr><td>% Assistências do Grupo</td><td class="percent">${percAssist1}%</td><td class="percent">${percAssist2}%</td><td>${percAssist1 - percAssist2}%</td></tr>
                        <tr><td>Nota Geral</td><td>${player1.notaGeral.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}</td><td>${player2.notaGeral.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}</td><td>${(player1.notaGeral - player2.notaGeral).toLocaleString('pt-BR', { minimumFractionDigits: 1 })}</td></tr>
                    </tbody>
                </table>
            `;
            document.getElementById('comparisonResult').innerHTML = comparisonHtml;
        }

        document.getElementById('navRankings').onclick = function() {
            playClickSound();
            document.getElementById('navRankings').classList.add('active');
            document.getElementById('navCharts').classList.remove('active');
            renderDashboard(window.__JOGADORES__, window.__PARTIDAS__);
        }

        document.getElementById('navCharts').onclick = function() {
            playClickSound();
            document.getElementById('navRankings').classList.remove('active');
            document.getElementById('navCharts').classList.add('active');
            renderChartsPage(window.__JOGADORES__, window.__PARTIDAS__);
        }

        document.getElementById('themeToggle').onclick = function() {
            playClickSound();
            document.body.classList.toggle('dark');
            localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
        };

        if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');

        async function mainLoader() {
            const main = document.getElementById("mainContent");
            main.innerHTML = `<div class="loading">Carregando dados...</div>`;
            try {
                const [partidas, jogadores] = await Promise.all([fetchPartidas(), fetchJogadores()]);
                calcularNotasGerais(jogadores, partidas);
                window.__JOGADORES__ = jogadores;
                window.__PARTIDAS__ = partidas;
                showMaiorDestaque(jogadores);
                renderDashboard(jogadores, partidas);
            } catch (e) {
                console.error("Erro ao carregar dados:", e);
                main.innerHTML = `<div class="loading">Erro: ${e.message || "Falha ao carregar dados. Verifique sua conexão ou a planilha."}</div>`;
            }
        }

        function renderDashboard(jogadores, partidas) {
            const main = document.getElementById("mainContent");
            window.__RANKING_DATA__ = {
                gols: [...jogadores].sort((a,b) => b.gols - a.gols),
                assistencias: [...jogadores].sort((a,b) => b.assistencias - a.assistencias),
                vitorias: [...jogadores].sort((a,b) => b.vitorias - a.vitorias),
                jogos: [...jogadores].filter(j => Number(j.jogos) > 0).sort((a,b) => b.jogos - a.jogos),
                aproveitamento: [...jogadores].filter(j => j.jogos > 0).sort((a,b) => b.aproveitamento - a.aproveitamento),
                notaGeral: [...jogadores].sort((a,b) => b.notaGeral - a.notaGeral),
                golsTomados: [...jogadores].filter(j => j.golsTomados > 0).sort((a,b) => a.golsTomados - b.golsTomados),
                pontosMVP: [...jogadores].sort((a,b) => b.pontosMVP - a.pontosMVP)
            };
            main.innerHTML = `
                <div class="rankings">
                    ${makeRankingCard(jogadores, "pontosMVP", "MVP Geral")}
                    ${makeRankingCard(jogadores, "gols", "Goleadores")}
                    ${makeRankingCard(jogadores, "assistencias", "Assistências")}
                    ${makeRankingCard(jogadores, "vitorias", "Vitórias")}
                    ${makeRankingCard(jogadores, "jogos", "Participação")}
                    ${makeRankingCard(jogadores, "aproveitamento", "Aproveitamento", j => j.jogos > 0, " (%)")}
                    ${makeRankingCard(jogadores, "notaGeral", "Nota Geral")}
                    ${makeRankingCard(jogadores, "golsTomados", "Menos Gols Tomados", j => j.golsTomados > 0)}
                </div>
                ${renderJogosLista(partidas)}
                <div class="instruction-card">
                    Clique no nome do jogador para ver detalhes!<br>
                    Clique na data do jogo para ver o resumo da partida!
                </div>
            `;
            if (document.getElementById('jogosListaUl')) {
                window.renderPage(1);
            }
        }

        function renderChartsPage(jogadores, partidas) {
            const main = document.getElementById("mainContent");
            main.innerHTML = renderCharts(jogadores, partidas);
            setTimeout(() => drawCharts(jogadores, partidas), 150);
        }

        mainLoader();
    </script>
</body>
</html>
