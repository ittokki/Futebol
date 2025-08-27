<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Ranking dos Inimigos da Bola</title>
    <link href="https://fonts.googleapis.com/css?family=Montserrat:700,400&display=swap" rel="stylesheet">
    <link rel="icon" href="https://raw.githubusercontent.com/ittokki/Futebol/ba59ab86cf2095d4e9214bd5e24e21ac8aeaf33a/inimigos%20da%20bola.jpg"/>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        :root {
            --primary-red: #b71c1c;
            --secondary-red: #d32f2f;
            --accent-gold: #fbc02d;
            --text-dark: #333;
            --bg-light: #fff;
            --shadow-color: rgba(183, 28, 28, 0.2);
            --boca-blue: #001F5B;
            --boca-gold: #F3B61F;
            --boca-light-blue: rgba(0, 31, 91, 0.1);
            --river-red: #DA291C;
            --river-white: #fff;
            --river-light-red: rgba(218, 41, 28, 0.1);
            --stat-gold: #FFD700;
        }

        body {
            background: linear-gradient(135deg, var(--bg-light) 0%, var(--primary-red) 100%);
            font-family: 'Montserrat', Arial, sans-serif;
            margin: 0;
            padding-bottom: 80px;
            color: var(--text-dark);
            overflow-x: hidden;
        }

        .navbar {
            display: flex;
            justify-content: center;
            align-items: center;
            background: var(--bg-light);
            box-shadow: 0 2px 12px var(--shadow-color);
            padding: 16px 0 0 0;
            position: sticky;
            top: 0;
            z-index: 100;
            border-bottom: 2px solid rgba(183, 28, 28, 0.2);
        }

        .nav-btn {
            background: none;
            border: none;
            color: var(--primary-red);
            font-size: 1.15em;
            font-weight: bold;
            margin: 0 24px;
            cursor: pointer;
            padding-bottom: 9px;
            border-bottom: 3px solid transparent;
            transition: border-bottom 0.18s ease, color 0.15s ease, transform 0.2s ease;
        }

        .nav-btn.active {
            border-bottom: 3px solid #f44336;
            color: var(--secondary-red);
        }

        .nav-btn:hover {
            transform: scale(1.05);
        }

        .header {
            text-align: center;
            padding: 28px 10px 12px 10px;
            position: relative;
        }

        .logo {
            width: 120px;
            margin-bottom: 10px;
            border-radius: 50%;
            box-shadow: 0 2px 16px var(--shadow-color);
            background: var(--bg-light);
            transition: transform 0.3s ease;
        }

        .logo:hover {
            transform: rotate(360deg);
        }

        h1 {
            font-size: 2em;
            margin: 0;
            letter-spacing: 1px;
            color: var(--primary-red);
            text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.2);
        }

        .desc {
            margin-top: 6px;
            color: var(--primary-red);
            font-size: 1.03em;
            font-weight: bold;
            text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.45);
        }

        .highlight-star {
            position: absolute;
            top: 12px;
            right: 24px;
            background: var(--bg-light);
            border-radius: 10px;
            box-shadow: 0 2px 12px var(--shadow-color);
            padding: 10px 18px 10px 14px;
            font-size: 1.18em;
            color: var(--accent-gold);
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 6px;
            z-index: 10;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .highlight-star:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 16px var(--shadow-color);
        }

        .highlight-star .star-icon {
            font-size: 1.45em;
            color: var(--accent-gold);
            margin-right: 5px;
            vertical-align: middle;
        }

        .highlight-star .highlight-player {
            color: var(--secondary-red);
            font-weight: bold;
            margin-left: 7px;
            font-size: 1.07em;
        }

        .highlight-star .highlight-note {
            background: rgba(251, 192, 45, 0.13);
            color: var(--primary-red);
            border-radius: 8px;
            padding: 2px 9px;
            margin-left: 8px;
            font-size: 0.97em;
            font-weight: bold;
            border: 1px solid rgba(251, 192, 45, 0.53);
        }

        .rankings {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 32px;
            margin: 28px auto 0 auto;
            max-width: 1340px;
            padding: 0 16px;
        }

        .ranking-card {
            background: var(--bg-light);
            border-radius: 18px;
            box-shadow: 0 4px 24px var(--shadow-color);
            padding: 18px 12px;
            border: 2px solid var(--primary-red);
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            transition: box-shadow 0.3s ease, transform 0.3s ease;
        }

        .ranking-card:hover {
            box-shadow: 0 8px 32px rgba(183, 28, 28, 0.27);
            background: #fff7f7;
            transform: translateY(-4px);
        }

        .ranking-title {
            margin: 0 0 12px 0;
            font-size: 1.08em;
            color: var(--primary-red);
            text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.45);
            font-weight: bold;
            text-align: center;
            letter-spacing: 0.5px;
        }

        .ranking-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.98em;
            margin-bottom: 8px;
        }

        .ranking-table th, .ranking-table td {
            padding: 7px 3px;
        }

        .ranking-table th {
            background: var(--primary-red);
            color: var(--bg-light) !important;
            border-radius: 5px;
            font-weight: bold;
            letter-spacing: 0.5px;
            border: none;
        }

        .ranking-table td {
            color: var(--primary-red) !important;
            font-weight: 500;
            background: transparent;
            border-bottom: 1px solid rgba(211, 47, 47, 0.13);
            cursor: pointer;
            position: relative;
            transition: background 0.12s ease;
        }

        .ranking-table tr.top-player td {
            background: linear-gradient(90deg, rgba(244, 67, 54, 0.25) 0%, var(--bg-light) 100%);
            color: var(--secondary-red) !important;
            font-weight: bold;
            border-left: 5px solid #f44336;
        }

        .ranking-table tr:hover td {
            background: rgba(244, 67, 54, 0.2);
        }

        .medal {
            font-size: 1.16em;
            vertical-align: middle;
            margin-right: 3px;
        }

        .see-more-btn {
            background: #f44336;
            color: var(--bg-light);
            border: none;
            border-radius: 7px;
            font-size: 0.95em;
            font-weight: bold;
            padding: 6px 18px;
            cursor: pointer;
            margin-top: 10px;
            margin-bottom: 2px;
            transition: background 0.17s ease, transform 0.17s ease;
            box-shadow: 0 2px 8px rgba(183, 28, 28, 0.1);
        }

        .see-more-btn:hover {
            background: var(--primary-red);
            transform: scale(1.05);
        }

        .loading {
            text-align: center;
            font-size: 1.45em;
            margin: 42px 0;
            color: var(--primary-red);
            animation: blink 1.2s infinite;
        }

        @keyframes blink {
            50% { opacity: 0.6; }
        }

        footer {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--primary-red);
            color: var(--bg-light);
            text-align: center;
            padding: 14px 0 10px 0;
            font-size: 1em;
            box-shadow: 0 -3px 20px var(--shadow-color);
            letter-spacing: 0.5px;
        }

        a {
            color: var(--bg-light);
            text-decoration: underline;
        }

        @media (max-width: 950px) {
            .rankings { grid-template-columns: 1fr; }
            .highlight-star { position: static; margin: 10px auto; width: fit-content; }
        }

        @media (max-width: 600px) {
            .ranking-card, .modal, .comparison-section, .jogos-lista, .chart-container {
                overflow-x: auto;
            }

            .ranking-table, .modal table, .comparison-table {
                min-width: 300px;
            }

            .navbar {
                flex-wrap: wrap;
            }

            .nav-btn {
                margin: 0 12px;
                font-size: 1em;
            }

            h1 {
                font-size: 1.6em;
            }

            .logo {
                width: 100px;
            }

            .rankings {
                gap: 20px;
                padding: 0 10px;
            }

            .ranking-card {
                padding: 15px 10px;
            }

            .charts-page {
                padding: 20px 5px;
            }

            .chart-container {
                max-width: 100%;
                padding: 15px 10px;
            }

            .comparison-section select {
                width: 100%;
                margin: 5px 0;
            }
        }

        .modal-bg {
            display: none;
            position: fixed;
            z-index: 9000;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(183,28,28,0.70);
            justify-content: center;
            align-items: center;
        }

        .modal-bg.active {
            display: flex;
        }

        .modal {
            background: var(--bg-light);
            color: var(--primary-red);
            border-radius: 16px;
            padding: 26px 32px;
            box-shadow: 0 8px 32px rgba(183,28,28,0.33);
            max-width: 95vw;
            min-width: 270px;
            text-align: center;
            position: relative;
            font-size: 1.07em;
            animation: modal-in 0.2s ease;
            overflow-y: auto;
            max-height: 90vh;
        }

        @keyframes modal-in {
            0% { transform: scale(0.95); opacity: 0;}
            100% { transform: scale(1); opacity: 1;}
        }

        .modal .close-btn {
            position: absolute;
            top: 10px;
            right: 18px;
            font-size: 1.5em;
            color: var(--primary-red);
            background: var(--bg-light);
            border: none;
            cursor: pointer;
            font-weight: bold;
            outline: none;
            transition: color 0.2s ease;
        }

        .modal .close-btn:hover {
            color: var(--secondary-red);
        }

        .modal .big {
            font-size: 1.35em;
            margin-bottom: 2px;
            font-weight: bold;
            color: var(--secondary-red);
        }

        .modal table {
            margin: 18px auto 0 auto;
            width: 100%;
            font-size: 1em;
            border-collapse: collapse;
        }

        .modal th, .modal td {
            padding: 7px 3px;
            color: var(--primary-red);
            border-bottom: 1px solid rgba(211, 47, 47, 0.13);
        }

        .modal tr:last-child td {
            border-bottom: none;
        }

        .modal .date-title {
            font-size: 1.15em;
            margin-bottom: 10px;
            font-weight: bold;
            color: var(--secondary-red);
        }

        .modal .match-highlight {
            margin: 14px 0 8px 0;
            font-size: 1.15em;
            font-weight: bold;
            color: var(--accent-gold);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 9px;
        }

        .modal .match-highlight .star-icon {
            font-size: 1.35em;
            margin-right: 6px;
            color: var(--accent-gold);
            vertical-align: middle;
        }

        .modal .match-highlight .highlight-player {
            color: var(--secondary-red);
            font-weight: bold;
            margin-left: 7px;
            font-size: 1.1em;
        }

        .modal .match-highlight .highlight-note {
            background: rgba(251, 192, 45, 0.13);
            color: var(--primary-red);
            border-radius: 8px;
            padding: 2px 9px;
            margin-left: 8px;
            font-size: 0.97em;
            font-weight: bold;
            border: 1px solid rgba(251, 192, 45, 0.53);
        }

        .team-boca h3 {
            background-color: var(--boca-blue);
            color: var(--boca-gold);
            padding: 8px;
            border-radius: 8px;
            font-size: 1.1em;
            margin-bottom: 10px;
        }

        .team-boca th {
            background-color: var(--boca-blue);
            color: var(--boca-gold);
        }

        .team-boca tbody tr td {
            background: var(--boca-light-blue);
            color: var(--boca-blue);
        }

        .team-boca tbody tr:hover td {
            background: rgba(0, 31, 91, 0.2);
        }

        .team-river h3 {
            background-color: var(--river-red);
            color: var(--river-white);
            padding: 8px;
            border-radius: 8px;
            font-size: 1.1em;
            margin-bottom: 10px;
        }

        .team-river th {
            background-color: var(--river-red);
            color: var(--river-white);
        }

        .team-river tbody tr td {
            background: var(--river-light-red);
            color: var(--river-red);
        }

        .team-river tbody tr:hover td {
            background: rgba(218, 41, 28, 0.2);
        }

        .team-boca td.stat, .team-river td.stat {
            color: var(--stat-gold);
            font-weight: bold;
        }

        .jogos-lista {
            background: var(--bg-light);
            border-radius: 18px;
            box-shadow: 0 4px 24px var(--shadow-color);
            padding: 22px 18px;
            margin-bottom: 20px;
            max-width: 350px;
            margin-left: auto;
            margin-right: auto;
        }

        .jogos-lista h2 {
            margin-bottom: 10px;
            font-size: 1.18em;
            color: var(--primary-red);
            font-weight: bold;
            text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.45);
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
            border-bottom: 1px solid rgba(211, 47, 47, 0.13);
            transition: background 0.15s ease;
        }

        .jogos-lista li:last-child {
            border-bottom: none;
        }

        .jogos-lista li:hover {
            background: rgba(244, 67, 54, 0.2);
        }

        .jogos-lista .date {
            font-weight: bold;
            color: var(--secondary-red);
        }

        .pagination {
            display: flex;
            justify-content: center;
            margin-top: 10px;
        }

        .pagination button {
            background: #f44336;
            color: var(--bg-light);
            border: none;
            border-radius: 7px;
            font-size: 0.95em;
            font-weight: bold;
            padding: 6px 12px;
            cursor: pointer;
            margin: 0 5px;
            transition: background 0.17s ease, transform 0.17s ease;
        }

        .pagination button:hover {
            background: var(--primary-red);
            transform: scale(1.05);
        }

        .pagination button:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
        }

        .charts-page {
            max-width: 900px;
            margin: 0 auto;
            padding: 25px 10px 0 10px;
            text-align: center;
        }

        .charts-title {
            font-size: 1.4em;
            font-weight: bold;
            color: var(--secondary-red);
            margin-bottom: 22px;
            letter-spacing: 1px;
        }

        .chart-container {
            margin: 0 auto 34px auto;
            background: var(--bg-light);
            border-radius: 16px;
            box-shadow: 0 4px 24px var(--shadow-color);
            padding: 22px 18px 10px 18px;
            max-width: 600px;
        }

        .chart-legend {
            margin-top: 7px;
            font-size: 0.98em;
            color: var(--primary-red);
        }

        .comparison-section {
            background: var(--bg-light);
            border-radius: 18px;
            box-shadow: 0 4px 24px var(--shadow-color);
            padding: 22px 18px;
            margin: 20px auto;
            max-width: 600px;
        }

        .comparison-section h2 {
            font-size: 1.18em;
            color: var(--primary-red);
            font-weight: bold;
            margin-bottom: 15px;
        }

        .comparison-section select {
            width: 45%;
            padding: 8px;
            margin: 0 2.5% 10px 2.5%;
            border: 1px solid var(--primary-red);
            border-radius: 5px;
            font-size: 1em;
        }

        .comparison-section button {
            background: #f44336;
            color: var(--bg-light);
            border: none;
            border-radius: 7px;
            font-size: 0.95em;
            font-weight: bold;
            padding: 6px 18px;
            cursor: pointer;
            transition: background 0.17s ease, transform 0.17s ease;
            display: block;
            margin: 10px auto;
        }

        .comparison-section button:hover {
            background: var(--primary-red);
            transform: scale(1.05);
        }

        .comparison-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.98em;
        }

        .comparison-table th, .comparison-table td {
            padding: 7px 3px;
            border-bottom: 1px solid rgba(211, 47, 47, 0.13);
            text-align: center;
        }

        .comparison-table th {
            background: var(--primary-red);
            color: var(--bg-light);
        }

        .comparison-table .percent {
            font-weight: bold;
            color: var(--secondary-red);
        }

        .instruction-card {
            background: var(--bg-light);
            border-radius: 18px;
            box-shadow: 0 4px 24px var(--shadow-color);
            padding: 18px;
            margin: 20px auto;
            max-width: 600px;
            text-align: center;
            font-size: 1em;
            color: var(--primary-red);
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="navbar">
        <button class="nav-btn active" id="navRankings" aria-label="Exibir Rankings">Rankings</button>
        <button class="nav-btn" id="navCharts" aria-label="Exibir Gráficos">Gráficos</button>
    </div>
    <div class="header">
        <img src="https://raw.githubusercontent.com/ittokki/Futebol/ba59ab86cf2095d4e9214bd5e24e21ac8aeaf33a/inimigos%20da%20bola.jpg" class="logo" alt="logo"/>
        <h1>Ranking dos Inimigos da Bola</h1>
        <div class="desc">Atualizado automaticamente pela planilha do grupo!</div>
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
            <button class="close-btn" id="modalClose" aria-label="Fechar modal">&times;</button>
            <div id="modalContent"></div>
        </div>
    </div>
    <footer>
        <small>Dashboard esportivo feito para o grupo!</small>
    </footer>
    <audio id="clickSound" src="https://raw.githubusercontent.com/ittokki/Futebol/5cc70b08d51f09dae0341672e52b2a435a276c05/PES%202013%20Select%20Game%20Main%20Menu%20Sound%20Effect%20(mp3cut.net).mp3"></audio>
    <script>
        const apiKey = "AIzaSyCL19ds6YqVOv5vV-zygBjeC-byy-rDPfM";
        const spreadsheetId = "1TvrVT8ksYYMlpw8gkKIFvpnnCf02J8uYTkhHc5c0vdo";
        const rangePagina1 = "Página1!A2:H100";
        const rangePagina2 = "Página2!A2:K300"; // Atualizado para incluir coluna K (jogo aconteceu)
        const rankingIcons = { gols: "⚽️", assistencias: "🅰️", vitorias: "🏅", jogos: "🎽", golsTomados: "🛡️", aproveitamento: "📈", notaGeral: "⭐" };
        const medalhas = ['🥇','🥈','🥉'];

        // Function to play the click sound
        function playClickSound() {
            const sound = document.getElementById('clickSound');
            sound.currentTime = 0; // Reset to start
            sound.play().catch(e => console.log("Sound play failed:", e)); // Handle autoplay restrictions
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
            let notaADM = parseNum(dados.notaADM);
            let gols = parseNum(dados.gols);
            let assistencias = parseNum(dados.assistencias);
            let golsTomados = parseNum(dados.golsTomados);
            let golsContra = parseNum(dados.golsContra);
            let vitoria = dados.vitoria ? 1 : 0;
            const isGoleiro = golsTomados > 0;

            let PESO_ADM = 5;
            let PESO_GOLS = isGoleiro ? 0.3 : 0.7;
            let PESO_ASSIST = isGoleiro ? 0.2 : 0.5;
            let PESO_GOLS_TOMADOS = isGoleiro ? 0.5 : 0.2;
            let PESO_GOLS_CONTRA = -0.5;
            let PESO_VITORIA = 0.3;
            let NOTA_BASE = 6.0;

            let notaTecnica = NOTA_BASE + gols * PESO_GOLS + assistencias * PESO_ASSIST + golsTomados * PESO_GOLS_TOMADOS + golsContra * PESO_GOLS_CONTRA + vitoria * PESO_VITORIA;
            let notaFinal = (notaTecnica + notaADM * PESO_ADM) / (1 + PESO_ADM);

            notaFinal = Math.max(0, Math.min(10, Math.round(notaFinal * 10) / 10));
            return {nota: notaFinal, isGoleiro};
        }

        async function fetchPartidas() {
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${rangePagina2}?key=${apiKey}`;
            const resp = await fetch(url);
            const data = await resp.json();
            return (data.values || []).map(row => {
                const [nome, gols, assistencias, golsTomados, golsContra, notaADM, dataJogo, vitoriaRaw, time, resultado, jogoAconteceuRaw] = fixRow(row, 11);
                if (!nome || !dataJogo) return null;
                const vitoria = (typeof vitoriaRaw === "string" && vitoriaRaw.trim().toLowerCase() === "sim") ? 1 : 0;
                const notaInfo = calcularNotaPartida({ gols, assistencias, golsTomados, golsContra, vitoria, notaADM });
                return {
                    nome: nome.trim(),
                    gols, assistencias, golsTomados, golsContra, dataJogo, vitoria, notaADM,
                    notaPartida: notaInfo.nota,
                    isGoleiro: notaInfo.isGoleiro,
                    time: time ? time.trim() : '',
                    resultado: resultado ? parseNum(resultado) : 0,
                    jogoAconteceu: (typeof jogoAconteceuRaw === "string" && jogoAconteceuRaw.trim().toLowerCase() === "sim") // Novo: flag para jogo acontecido
                };
            }).filter(x => x);
        }

        async function fetchJogadores() {
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${rangePagina1}?key=${apiKey}`;
            const resp = await fetch(url);
            const data = await resp.json();
            const nomesSet = new Set();
            const jogadores = [];
            (data.values || []).forEach(row => {
                const [id, nome, jogos, vitorias, gols, assistencias, golsTomados, golsContra] = fixRow(row, 8);
                if (!nome || nomesSet.has(nome.trim())) return;
                nomesSet.add(nome.trim());
                jogadores.push({
                    id: id,
                    nome: nome.trim(),
                    jogos: parseNum(jogos),
                    vitorias: parseNum(vitorias),
                    gols: parseNum(gols),
                    assistencias: parseNum(assistencias),
                    golsTomados: parseNum(golsTomados),
                    golsContra: parseNum(golsContra),
                    aproveitamento: calcularAproveitamento(parseNum(jogos), parseNum(vitorias)),
                    notaGeral: 0,
                    notaGeralGoleiro: 0,
                    notaGeralLinha: 0,
                    jogosGoleiro: 0,
                    jogosLinha: 0
                });
            });
            return jogadores;
        }

        function calcularNotasGerais(jogadores, partidas) {
            const notasPorJogador = {};
            partidas.forEach(p => {
                if (!p.jogoAconteceu) return; // Ignorar partidas que não aconteceram ainda
                const nomeNorm = normalizaNome(p.nome);
                if (!notasPorJogador[nomeNorm]) notasPorJogador[nomeNorm] = { todas: [], goleiro: [], linha: [] };
                notasPorJogador[nomeNorm].todas.push(p.notaPartida);
                if (p.isGoleiro) {
                    notasPorJogador[nomeNorm].goleiro.push(p.notaPartida);
                } else {
                    notasPorJogador[nomeNorm].linha.push(p.notaPartida);
                }
            });
            jogadores.forEach(jogador => {
                const nomeNorm = normalizaNome(jogador.nome);
                const notas = notasPorJogador[nomeNorm] || { todas: [], goleiro: [], linha: [] };
                jogador.notaGeral = notas.todas.length > 0 ? Math.round((notas.todas.reduce((a, b) => a + b, 0) / notas.todas.length) * 10) / 10 : 0;
                jogador.notaGeralGoleiro = notas.goleiro.length > 0 ? Math.round((notas.goleiro.reduce((a, b) => a + b, 0) / notas.goleiro.length) * 10) / 10 : 0;
                jogador.notaGeralLinha = notas.linha.length > 0 ? Math.round((notas.linha.reduce((a, b) => a + b, 0) / notas.linha.length) * 10) / 10 : 0;
                jogador.jogosGoleiro = notas.goleiro.length;
                jogador.jogosLinha = notas.linha.length;
            });
        }

        function getMaiorDestaque(jogadores) {
            let maior = { nome: "", nota: 0 };
            jogadores.forEach(j => {
                if (j.notaGeral > maior.nota) {
                    maior = { nome: j.nome, nota: j.notaGeral };
                }
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
            arr = [...arr].sort((a, b) => (
                tipo === "golsTomados" ? a[tipo] - b[tipo] : b[tipo] - a[tipo]
            ));
            const maxDefault = 10;
            const tableId = "table_" + tipo;
            const btnId = "btn_" + tipo;

            function buildRows(limit) {
                return arr.slice(0, limit).map((jogador, i) => `
                    <tr${i === 0 ? ' class="top-player"' : ''}>
                        <td>${i+1}</td>
                        <td onclick="showModal('${encodeURIComponent(jogador.nome)}')">
                            ${medalhaHTML(i)}${jogador.nome}
                        </td>
                        <td>${tipo === "aproveitamento" ? jogador[tipo].toLocaleString('pt-BR') + "%" :
                        (tipo === "notaGeral" ? jogador[tipo].toLocaleString('pt-BR', { minimumFractionDigits: 1 }) : jogador[tipo])}</td>
                    </tr>
                `).join('');
            }

            let btnHtml = "";
            if (arr.length > maxDefault) {
                btnHtml = `<button class="see-more-btn" id="${btnId}" aria-label="Ver mais itens do ranking" onclick="toggleTable('${tableId}','${btnId}',${arr.length},${maxDefault})">Ver Mais</button>`;
            }

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
            playClickSound(); // Play sound on "Ver Mais"/"Ver Menos" click
            const table = document.getElementById(tableId);
            const btn = document.getElementById(btnId);
            const tipo = tableId.replace('table_','');
            const arr = window.__RANKING_DATA__[tipo];
            const expanded = btn.getAttribute("data-expanded") === "true";
            let rowsHtml = "";
            if (!expanded) {
                rowsHtml = arr.map((jogador, i) => `
                    <tr${i === 0 ? ' class="top-player"' : ''}>
                        <td>${i+1}</td>
                        <td onclick="showModal('${encodeURIComponent(jogador.nome)}')">
                            ${medalhaHTML(i)}${jogador.nome}
                        </td>
                        <td>${tipo === "aproveitamento" ? jogador[tipo].toLocaleString('pt-BR') + "%" :
                        (tipo === "notaGeral" ? jogador[tipo].toLocaleString('pt-BR', { minimumFractionDigits: 1 }) : jogador[tipo])}</td>
                    </tr>
                `).join('');
                btn.textContent = "Ver Menos";
                btn.setAttribute("data-expanded", "true");
            } else {
                rowsHtml = arr.slice(0,limit).map((jogador, i) => `
                    <tr${i === 0 ? ' class="top-player"' : ''}>
                        <td>${i+1}</td>
                        <td onclick="showModal('${encodeURIComponent(jogador.nome)}')">
                            ${medalhaHTML(i)}${jogador.nome}
                        </td>
                        <td>${tipo === "aproveitamento" ? jogador[tipo].toLocaleString('pt-BR') + "%" :
                        (tipo === "notaGeral" ? jogador[tipo].toLocaleString('pt-BR', { minimumFractionDigits: 1 }) : jogador[tipo])}</td>
                    </tr>
                `).join('');
                btn.textContent = "Ver Mais";
                btn.setAttribute("data-expanded", "false");
            }
            table.querySelector("tbody").innerHTML = rowsHtml;
        }

        window.showModal = function(playerName) {
            playClickSound(); // Play sound on player name click
            const nome = decodeURIComponent(playerName);
            const jogador = window.__JOGADORES__.find(j => j.nome === nome);
            if (!jogador) return;
            const partidas = window.__PARTIDAS__.filter(p => normalizaNome(p.nome) === normalizaNome(jogador.nome));
            let partidasHtml = "";
            if (partidas.length) {
                partidasHtml = `<tr><th colspan="2" style="text-align:center;">Histórico de Partidas</th></tr>` + 
                    partidas.slice(-5).reverse().map(p => `
                        <tr>
                            <td>${p.dataJogo}</td>
                            <td>Nota: ${p.notaPartida.toLocaleString('pt-BR', { minimumFractionDigits: 1 })} (${p.isGoleiro ? 'Goleiro' : 'Linha'})</td>
                        </tr>
                    `).join('');
            }
            const modalContent = document.getElementById('modalContent');
            modalContent.innerHTML = `
                <div class="big">${jogador.nome}</div>
                <table>
                    <tr><th>Jogos</th><td>${jogador.jogos}</td></tr>
                    <tr><th>Jogos como Goleiro</th><td>${jogador.jogosGoleiro}</td></tr>
                    <tr><th>Jogos na Linha</th><td>${jogador.jogosLinha}</td></tr>
                    <tr><th>Vitórias</th><td>${jogador.vitorias}</td></tr>
                    <tr><th>Gols</th><td>${jogador.gols}</td></tr>
                    <tr><th>Assistências</th><td>${jogador.assistencias}</td></tr>
                    <tr><th>Gols Tomados</th><td>${jogador.golsTomados}</td></tr>
                    <tr><th>Gols Contra</th><td>${jogador.golsContra}</td></tr>
                    <tr><th>Aproveitamento</th><td>${jogador.aproveitamento}%</td></tr>
                    <tr><th>Nota Geral</th><td>${jogador.notaGeral.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}</td></tr>
                    <tr><th>Nota Geral como Goleiro</th><td>${jogador.notaGeralGoleiro.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}</td></tr>
                    <tr><th>Nota Geral na Linha</th><td>${jogador.notaGeralLinha.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}</td></tr>
                    ${partidasHtml}
                </table>
            `;
            document.getElementById('modalBg').classList.add('active');
        }

        window.showJogoModal = function(dataJogo) {
            playClickSound(); // Play sound on game date click
            let partidas = window.__PARTIDAS__.filter(p => p.dataJogo === dataJogo);
            if (!partidas.length) return;
            let destaque = { nome: "", nota: -1 };
            partidas.forEach(p => {
                if (p.notaPartida > destaque.nota) destaque = { nome: p.nome, nota: p.notaPartida };
            });
            partidas = [...partidas].sort((a, b) => (a.time || '').localeCompare(b.time || ''));
            const uniqueTimes = [...new Set(partidas.map(p => p.time).filter(Boolean))].sort();
            let matchTitle = dataJogo;
            if (uniqueTimes.length >= 2) {
                const placarPorTime = {};
                partidas.forEach(p => {
                    if (p.time && p.resultado && !placarPorTime[p.time]) {
                        placarPorTime[p.time] = p.resultado;
                    }
                });
                const golsPorTime = {};
                uniqueTimes.forEach(t => golsPorTime[t] = 0);
                partidas.forEach(p => {
                    if (p.time) {
                        golsPorTime[p.time] += parseNum(p.gols);
                    }
                });
                const placar1 = placarPorTime[uniqueTimes[0]] || golsPorTime[uniqueTimes[0]];
                const placar2 = placarPorTime[uniqueTimes[1]] || golsPorTime[uniqueTimes[1]];
                matchTitle = `${uniqueTimes[0]} ${placar1}x${placar2} ${uniqueTimes[1]}`;
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
                                    <th>Gols Tomados</th>
                                    <th>Gols Contra</th>
                                    <th>Vitória</th>
                                    <th>Nota (Posição)</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${jogadores.map(p => `
                                    <tr>
                                        <td>${p.nome}</td>
                                        <td class="stat">${parseNum(p.gols)}</td>
                                        <td class="stat">${parseNum(p.assistencias)}</td>
                                        <td class="stat">${parseNum(p.golsTomados)}</td>
                                        <td class="stat">${parseNum(p.golsContra)}</td>
                                        <td class="stat">${p.vitoria ? "Sim" : "Não"}</td>
                                        <td class="stat">${p.notaPartida.toLocaleString('pt-BR', { minimumFractionDigits: 1 })} (${p.isGoleiro ? 'Goleiro' : 'Linha'})</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
            });
            const modalContent = document.getElementById('modalContent');
            modalContent.innerHTML = `
                <div class="date-title">${matchTitle}</div>
                <div class="match-highlight">
                    <span class="star-icon">⭐</span> Destaque da partida: <span class="highlight-player">${destaque.nome}</span>
                    <span class="highlight-note">${destaque.nota.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}</span>
                </div>
                ${timesHtml}
            `;
            document.getElementById('modalBg').classList.add('active');
        }

        document.getElementById('modalClose').onclick = function() {
            playClickSound(); // Play sound on modal close
            document.getElementById('modalBg').classList.remove('active');
        }

        document.getElementById('modalBg').onclick = function(e) {
            if (e.target === this) {
                playClickSound(); // Play sound on modal background click
                this.classList.remove('active');
            }
        }

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
                    playClickSound(); // Play sound on previous page
                    window.renderPage(currentPage);
                }
            };
            window.nextPage = function() {
                if (currentPage * itemsPerPage < datas.length) {
                    currentPage++;
                    playClickSound(); // Play sound on next page
                    window.renderPage(currentPage);
                }
            };

            return `
                <div class="jogos-lista">
                    <h2>Jogos</h2>
                    <ul id="jogosListaUl"></ul>
                    <div class="pagination">
                        <button id="prevPage" aria-label="Página anterior" onclick="prevPage()">Anterior</button>
                        <button id="nextPage" aria-label="Próxima página" onclick="nextPage()">Próxima</button>
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
            let totalGols = jogadores.reduce((a,b) => a + b.gols, 0);
            const playerNames = jogadores.map(j => j.nome).sort();

            return `
                <div class="charts-page">
                    <div class="charts-title">Gráficos Gerais do Grupo</div>
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
                        <select id="playerEvolucao" aria-label="Selecionar jogador para evolução de notas" onchange="updateEvolucaoChart()">
                            <option value="">Selecione um jogador</option>
                            ${playerNames.map(name => `<option value="${name}">${name}</option>`).join('')}
                        </select>
                        <canvas id="chartEvolucaoNotas"></canvas>
                        <div class="chart-legend">Evolução de Notas do Jogador</div>
                    </div>
                    <div style="margin-top:22px; font-size:1.07em; color:var(--primary-red);">
                        <b>Gols totais no grupo:</b> <span style="color:var(--secondary-red)">${totalGols}</span>
                    </div>
                    <div class="comparison-section">
                        <h2>Comparar Jogadores</h2>
                        <select id="player1" aria-label="Selecionar primeiro jogador">
                            <option value="">Selecione Jogador 1</option>
                            ${playerNames.map(name => `<option value="${name}" ${name === player1Default ? 'selected' : ''}>${name}</option>`).join('')}
                        </select>
                        <select id="player2" aria-label="Selecionar segundo jogador">
                            <option value="">Selecione Jogador 2</option>
                            ${playerNames.map(name => `<option value="${name}" ${name === player2Default ? 'selected' : ''}>${name}</option>`).join('')}
                        </select>
                        <button aria-label="Comparar jogadores selecionados" onclick="comparePlayers()">Comparar</button>
                        <div id="comparisonResult"></div>
                    </div>
                </div>
            `;
        }

        let evolucaoChart = null;

        window.updateEvolucaoChart = function() {
            playClickSound(); // Play sound on player selection for evolution chart
            const playerName = document.getElementById('playerEvolucao').value;
            if (!playerName) return;

            const partidasJogador = window.__PARTIDAS__.filter(p => normalizaNome(p.nome) === normalizaNome(playerName) && p.jogoAconteceu); // Filtrar apenas jogos que aconteceram
            const datas = partidasJogador.map(p => p.dataJogo).sort((a, b) => a.split('/').reverse().join('-') > b.split('/').reverse().join('-') ? 1 : -1);
            const notas = partidasJogador.sort((a, b) => a.dataJogo.split('/').reverse().join('-') > b.dataJogo.split('/').reverse().join('-') ? 1 : -1).map(p => p.notaPartida);

            if (evolucaoChart) evolucaoChart.destroy();

            evolucaoChart = new Chart(document.getElementById('chartEvolucaoNotas'), {
                type: 'line',
                data: {
                    labels: datas,
                    datasets: [{
                        label: `Notas de ${playerName}`,
                        data: notas,
                        borderColor: '#f44336',
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: false }, tooltip: { enabled: true } },
                    scales: { y: { beginAtZero: true, max: 10 } }
                }
            });
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

            new Chart(document.getElementById('chartGoleadores'), {
                type: 'bar',
                data: {
                    labels: nomesGoleadores,
                    datasets: [{
                        label: 'Gols',
                        data: golsGoleadores,
                        backgroundColor: '#f44336'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: false }, tooltip: { enabled: true } },
                    scales: { y: { beginAtZero: true } }
                }
            });

            new Chart(document.getElementById('chartAssistidores'), {
                type: 'bar',
                data: {
                    labels: nomesAssistidores,
                    datasets: [{
                        label: 'Assistências',
                        data: assistenciasAssistidores,
                        backgroundColor: '#4caf50'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: false }, tooltip: { enabled: true } },
                    scales: { y: { beginAtZero: true } }
                }
            });

            new Chart(document.getElementById('chartParticipacao'), {
                type: 'bar',
                data: {
                    labels: nomesJogos,
                    datasets: [{
                        label: 'Jogos',
                        data: jogosJogos,
                        backgroundColor: '#b71c1c'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: false }, tooltip: { enabled: true } },
                    scales: { y: { beginAtZero: true } }
                }
            });

            new Chart(document.getElementById('chartAproveitamento'), {
                type: 'bar',
                data: {
                    labels: nomesAproveitamento,
                    datasets: [{
                        label: 'Aproveitamento (%)',
                        data: aproveitamentoVals,
                        backgroundColor: '#ffd600'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: false }, tooltip: { enabled: true } },
                    scales: { y: { beginAtZero: true } }
                }
            });
        }

        window.comparePlayers = function() {
            playClickSound(); // Play sound on compare button click
            const player1Name = document.getElementById('player1').value;
            const player2Name = document.getElementById('player2').value;
            if (!player1Name || !player2Name) {
                alert('Selecione dois jogadores para comparar!');
                return;
            }
            const player1 = window.__JOGADORES__.find(j => j.nome === player1Name);
            const player2 = window.__JOGADORES__.find(j => j.nome === player2Name);
            if (!player1 || !player2) return;

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
                        <tr>
                            <td>Jogos</td>
                            <td>${player1.jogos}</td>
                            <td>${player2.jogos}</td>
                            <td>${player1.jogos - player2.jogos}</td>
                        </tr>
                        <tr>
                            <td>Vitórias</td>
                            <td>${player1.vitorias}</td>
                            <td>${player2.vitorias}</td>
                            <td>${player1.vitorias - player2.vitorias}</td>
                        </tr>
                        <tr>
                            <td>Aproveitamento</td>
                            <td class="percent">${player1.aproveitamento}%</td>
                            <td class="percent">${player2.aproveitamento}%</td>
                            <td>${player1.aproveitamento - player2.aproveitamento}%</td>
                        </tr>
                        <tr>
                            <td>Gols</td>
                            <td>${player1.gols}</td>
                            <td>${player2.gols}</td>
                            <td>${player1.gols - player2.gols}</td>
                        </tr>
                        <tr>
                            <td>% Gols do Grupo</td>
                            <td class="percent">${percGols1}%</td>
                            <td class="percent">${percGols2}%</td>
                            <td>${percGols1 - percGols2}%</td>
                        </tr>
                        <tr>
                            <td>Assistências</td>
                            <td>${player1.assistencias}</td>
                            <td>${player2.assistencias}</td>
                            <td>${player1.assistencias - player2.assistencias}</td>
                        </tr>
                        <tr>
                            <td>% Assistências do Grupo</td>
                            <td class="percent">${percAssist1}%</td>
                            <td class="percent">${percAssist2}%</td>
                            <td>${percAssist1 - percAssist2}%</td>
                        </tr>
                        <tr>
                            <td>Gols Tomados</td>
                            <td>${player1.golsTomados}</td>
                            <td>${player2.golsTomados}</td>
                            <td>${player1.golsTomados - player2.golsTomados}</td>
                        </tr>
                        <tr>
                            <td>Nota Geral</td>
                            <td>${player1.notaGeral.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}</td>
                            <td>${player2.notaGeral.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}</td>
                            <td>${(player1.notaGeral - player2.notaGeral).toLocaleString('pt-BR', { minimumFractionDigits: 1 })}</td>
                        </tr>
                    </tbody>
                </table>
            `;
            document.getElementById('comparisonResult').innerHTML = comparisonHtml;
        }

        document.getElementById('navRankings').onclick = function() {
            playClickSound(); // Play sound on Rankings nav click
            document.getElementById('navRankings').classList.add('active');
            document.getElementById('navCharts').classList.remove('active');
            renderDashboard(window.__JOGADORES__, window.__PARTIDAS__);
        }

        document.getElementById('navCharts').onclick = function() {
            playClickSound(); // Play sound on Charts nav click
            document.getElementById('navRankings').classList.remove('active');
            document.getElementById('navCharts').classList.add('active');
            renderChartsPage(window.__JOGADORES__, window.__PARTIDAS__);
        }

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
                golsTomados: [...jogadores].filter(j => j.golsTomados > 0).sort((a,b) => a.golsTomados - b.golsTomados)
            };
            main.innerHTML = `
                <div class="rankings">
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
                window.renderPage(1); // Renderiza a primeira página diretamente
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
