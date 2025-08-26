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
        body {
            background: linear-gradient(135deg, #fff 0%, #b71c1c 100%);
            font-family: 'Montserrat', Arial, sans-serif;
            margin: 0;
            padding-bottom: 80px;
        }
        .navbar {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #fff;
            box-shadow: 0 2px 12px #b71c1c22;
            padding: 16px 0 0 0;
            position: sticky;
            top: 0;
            z-index: 100;
            border-bottom: 2px solid #b71c1c33;
        }
        .nav-btn {
            background: none;
            border: none;
            color: #b71c1c;
            font-size: 1.15em;
            font-weight: bold;
            margin: 0 24px;
            cursor: pointer;
            padding-bottom: 9px;
            border-bottom: 3px solid transparent;
            transition: border-bottom 0.18s, color 0.15s;
        }
        .nav-btn.active {
            border-bottom: 3px solid #f44336;
            color: #d32f2f;
        }
        .header {
            text-align: center;
            padding: 28px 10px 12px 10px;
            position: relative;
        }
        .logo {
            width: 120px; /* Increased from 98px */
            margin-bottom: 10px;
            border-radius: 11px;
            box-shadow: 0 2px 16px #b71c1c44;
            background: #fff;
        }
        h1 {
            font-size: 2em;
            margin: 0;
            letter-spacing: 1px;
            color: #b71c1c;
            text-shadow: 1px 1px 0 #fff3;
        }
        .desc {
            margin-top: 6px;
            color: #b71c1c;
            font-size: 1.03em;
            font-weight: bold;
            text-shadow: 1px 1px 0 #fff7;
        }
        .highlight-star {
            position: absolute;
            top: 12px;
            right: 24px; /* Moved further right from 12px */
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 12px #b71c1c33;
            padding: 10px 18px 10px 14px;
            font-size: 1.18em;
            color: #fbc02d;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 6px;
            z-index: 10;
        }
        .highlight-star .star-icon {
            font-size: 1.45em;
            color: #fbc02d;
            margin-right: 5px;
            vertical-align: middle;
        }
        .highlight-star .highlight-player {
            color: #d32f2f;
            font-weight: bold;
            margin-left: 7px;
            font-size: 1.07em;
        }
        .highlight-star .highlight-note {
            background: #fbc02d22;
            color: #b71c1c;
            border-radius: 8px;
            padding: 2px 9px;
            margin-left: 8px;
            font-size: 0.97em;
            font-weight: bold;
            border: 1px solid #fbc02d88;
        }
        .rankings {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 32px;
            margin: 28px auto 0 auto;
            max-width: 1340px;
        }
        .ranking-card {
            background: #fff;
            border-radius: 18px;
            box-shadow: 0 4px 24px #b71c1c22;
            padding: 18px 12px 18px 12px;
            min-width: 230px;
            max-width: 320px;
            margin-bottom: 15px;
            border: 2px solid #b71c1c;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            transition: box-shadow 0.18s;
        }
        .ranking-card:hover {
            box-shadow: 0 8px 32px #b71c1c44;
            background: #fff7f7;
        }
        .ranking-title {
            margin: 0 0 12px 0;
            font-size: 1.08em;
            color: #b71c1c;
            text-shadow: 1px 1px 0 #fff7;
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
            transition: background 0.12s;
        }
        .ranking-table tr.top-player td {
            background: linear-gradient(90deg, #f4433640 0%, #fff 100%);
            color: #d32f2f !important;
            font-weight: bold;
            border-left: 5px solid #f44336;
        }
        .ranking-table tr:hover td {
            background: #f4433633;
        }
        .medal {
            font-size: 1.16em;
            vertical-align: middle;
            margin-right: 3px;
        }
        .see-more-btn {
            background: #f44336;
            color: #fff;
            border: none;
            border-radius: 7px;
            font-size: 0.95em;
            font-weight: bold;
            padding: 6px 18px;
            cursor: pointer;
            margin-top: 10px;
            margin-bottom: 2px;
            transition: background 0.17s;
            box-shadow: 0 2px 8px #b71c1c19;
        }
        .see-more-btn:hover {
            background: #b71c1c;
        }
        .loading {
            text-align: center;
            font-size: 1.45em;
            margin: 42px 0;
            color: #b71c1c;
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
        @media (max-width: 950px) {
            .rankings { flex-direction: column; align-items: center;}
            .highlight-star { position: static; margin-bottom: 10px;}
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
            background: #fff;
            color: #b71c1c;
            border-radius: 16px;
            padding: 26px 32px;
            box-shadow: 0 8px 32px #b71c1c55;
            max-width: 95vw;
            min-width: 270px;
            text-align: center;
            position: relative;
            font-size: 1.07em;
            animation: modal-in 0.2s;
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
            width: 100%;
            font-size: 1em;
            border-collapse: collapse;
        }
        .modal th, .modal td {
            padding: 7px 3px;
            color: #b71c1c;
            border-bottom: 1px solid #d32f2f22;
        }
        .modal tr:last-child td {
            border-bottom: none;
        }
        .modal .date-title {
            font-size: 1.15em;
            margin-bottom: 10px;
            font-weight: bold;
            color: #d32f2f;
        }
        .modal .match-highlight {
            margin: 14px 0 8px 0;
            font-size: 1.15em;
            font-weight: bold;
            color: #fbc02d;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 9px;
        }
        .modal .match-highlight .star-icon {
            font-size: 1.35em;
            margin-right: 6px;
            color: #fbc02d;
            vertical-align: middle;
        }
        .modal .match-highlight .highlight-player {
            color: #d32f2f;
            font-weight: bold;
            margin-left: 7px;
            font-size: 1.1em;
        }
        .modal .match-highlight .highlight-note {
            background: #fbc02d22;
            color: #b71c1c;
            border-radius: 8px;
            padding: 2px 9px;
            margin-left: 8px;
            font-size: 0.97em;
            font-weight: bold;
            border: 1px solid #fbc02d88;
        }
        .jogos-lista {
            background: #fff;
            border-radius: 18px;
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
        .jogos-lista li:last-child {
            border-bottom: none;
        }
        .jogos-lista li:hover {
            background: #f4433633;
        }
        .jogos-lista .date {
            font-weight: bold;
            color: #d32f2f;
        }
        .pagination {
            display: flex;
            justify-content: center;
            margin-top: 10px;
        }
        .pagination button {
            background: #f44336;
            color: #fff;
            border: none;
            border-radius: 7px;
            font-size: 0.95em;
            font-weight: bold;
            padding: 6px 12px;
            cursor: pointer;
            margin: 0 5px;
            transition: background 0.17s;
        }
        .pagination button:hover {
            background: #b71c1c;
        }
        .pagination button:disabled {
            background: #ccc;
            cursor: not-allowed;
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
            color: #d32f2f;
            margin-bottom: 22px;
            letter-spacing: 1px;
        }
        .chart-container {
            margin: 0 auto 34px auto;
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 4px 24px #b71c1c22;
            padding: 22px 18px 10px 18px;
            max-width: 600px;
        }
        .chart-legend {
            margin-top: 7px;
            font-size: 0.98em;
            color: #b71c1c;
        }
        .comparison-section {
            background: #fff;
            border-radius: 18px;
            box-shadow: 0 4px 24px #b71c1c22;
            padding: 22px 18px;
            margin: 20px auto;
            max-width: 600px;
        }
        .comparison-section h2 {
            font-size: 1.18em;
            color: #b71c1c;
            font-weight: bold;
            margin-bottom: 15px;
        }
        .comparison-section select {
            width: 45%;
            padding: 8px;
            margin: 0 2.5% 10px 2.5%;
            border: 1px solid #b71c1c;
            border-radius: 5px;
            font-size: 1em;
        }
        .comparison-section button {
            background: #f44336;
            color: #fff;
            border: none;
            border-radius: 7px;
            font-size: 0.95em;
            font-weight: bold;
            padding: 6px 18px;
            cursor: pointer;
            transition: background 0.17s;
            display: block;
            margin: 10px auto;
        }
        .comparison-section button:hover {
            background: #b71c1c;
        }
        .comparison-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.98em;
        }
        .comparison-table th, .comparison-table td {
            padding: 7px 3px;
            border-bottom: 1px solid #d32f2f22;
            text-align: center;
        }
        .comparison-table th {
            background: #b71c1c;
            color: #fff;
        }
        .comparison-table .percent {
            font-weight: bold;
            color: #d32f2f;
        }
        .instruction-card {
            background: #fff;
            border-radius: 18px;
            box-shadow: 0 4px 24px #b71c1c22;
            padding: 18px;
            margin: 20px auto;
            max-width: 600px;
            text-align: center;
            font-size: 1em;
            color: #b71c1c;
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
    <script>
        const apiKey = "AIzaSyCL19ds6YqVOv5vV-zygBjeC-byy-rDPfM";
        const spreadsheetId = "1TvrVT8ksYYMlpw8gkKIFvpnnCf02J8uYTkhHc5c0vdo";
        const rangePagina1 = "Página1!A2:H100";
        const rangePagina2 = "Página2!A2:J300";
        const rankingIcons = { gols: "⚽️", assistencias: "🅰️", vitorias: "🏅", jogos: "🎽", golsTomados: "🛡️", aproveitamento: "📈", notaGeral: "⭐" };
        const medalhas = ['🥇','🥈','🥉'];

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
                const [nome, gols, assistencias, golsTomados, golsContra, notaADM, dataJogo, vitoriaRaw, time, resultado] = fixRow(row, 10);
                if (!nome || !dataJogo) return null;
                const vitoria = (typeof vitoriaRaw === "string" && vitoriaRaw.trim().toLowerCase() === "sim") ? 1 : 0;
                const notaInfo = calcularNotaPartida({ gols, assistencias, golsTomados, golsContra, vitoria, notaADM });
                return {
                    nome: nome.trim(),
                    gols, assistencias, golsTomados, golsContra, dataJogo, vitoria, notaADM,
                    notaPartida: notaInfo.nota,
                    isGoleiro: notaInfo.isGoleiro,
                    time: time ? time.trim() : '',
                    resultado: resultado ? parseNum(resultado) : 0
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
            let partidas = window.__PARTIDAS__.filter(p => p.dataJogo === dataJogo);
            if (!partidas.length) return;
            let destaque = { nome: "", nota: -1 };
            partidas.forEach(p => {
                if (p.notaPartida > destaque.nota) destaque = { nome: p.nome, nota: p.notaPartida };
            });
            // Ordenar por time
            partidas = [...partidas].sort((a, b) => (a.time || '').localeCompare(b.time || ''));
            // Obter times únicos
            const uniqueTimes = [...new Set(partidas.map(p => p.time).filter(Boolean))].sort();
            let matchTitle = dataJogo;
            if (uniqueTimes.length >= 2) {
                // Coletar resultados por time (apenas o primeiro preenchido)
                const placarPorTime = {};
                partidas.forEach(p => {
                    if (p.time && p.resultado && !placarPorTime[p.time]) {
                        placarPorTime[p.time] = p.resultado;
                    }
                });
                // Calcular gols por time
                const golsPorTime = {};
                uniqueTimes.forEach(t => golsPorTime[t] = 0);
                partidas.forEach(p => {
                    if (p.time) {
                        golsPorTime[p.time] += parseNum(p.gols);
                    }
                });
                // Usar placar fornecido ou calculado
                const placar1 = placarPorTime[uniqueTimes[0]] || golsPorTime[uniqueTimes[0]];
                const placar2 = placarPorTime[uniqueTimes[1]] || golsPorTime[uniqueTimes[1]];
                matchTitle = `${uniqueTimes[0]} ${placar1}x${placar2} ${uniqueTimes[1]}`;
            }
            // Dividir jogadores por time
            const jogadoresPorTime = {};
            uniqueTimes.forEach(time => {
                jogadoresPorTime[time] = partidas.filter(p => p.time === time);
            });
            // Gerar HTML para cada time
            let timesHtml = '';
            uniqueTimes.forEach((time) => {
                const jogadores = jogadoresPorTime[time];
                timesHtml += `
                    <div style="margin-bottom: 15px;">
                        <h3 style="color: #d32f2f; font-weight: bold; font-size: 1.1em; margin-bottom: 8px;">${time}</h3>
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
                                        <td>${parseNum(p.gols)}</td>
                                        <td>${parseNum(p.assistencias)}</td>
                                        <td>${parseNum(p.golsTomados)}</td>
                                        <td>${parseNum(p.golsContra)}</td>
                                        <td>${p.vitoria ? "Sim" : "Não"}</td>
                                        <td>${p.notaPartida.toLocaleString('pt-BR', { minimumFractionDigits: 1 })} (${p.isGoleiro ? 'Goleiro' : 'Linha'})</td>
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

            window.prevPage = function() { if (currentPage > 1) { currentPage--; window.renderPage(currentPage); } };
            window.nextPage = function() { if (currentPage * itemsPerPage < datas.length) { currentPage++; window.renderPage(currentPage); } };

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
                    <div style="margin-top:22px; font-size:1.07em; color:#b71c1c;">
                        <b>Gols totais no grupo:</b> <span style="color:#d32f2f">${totalGols}</span>
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
            const playerName = document.getElementById('playerEvolucao').value;
            if (!playerName) return;

            const partidasJogador = window.__PARTIDAS__.filter(p => normalizaNome(p.nome) === normalizaNome(playerName));
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
            document.getElementById('navRankings').classList.add('active');
            document.getElementById('navCharts').classList.remove('active');
            renderDashboard(window.__JOGADORES__, window.__PARTIDAS__);
        }

        document.getElementById('navCharts').onclick = function() {
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
