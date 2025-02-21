// Core element queries
const output = document.querySelector('.output');
const input = document.querySelector('.command-input');
const terminalWindow = document.getElementById('terminal-window');
const photosWindow = document.getElementById('photos-window');
const notepadWindow = document.getElementById('notepad-window');
const calculatorWindow = document.getElementById('calculator-window');
const paintWindow = document.getElementById('paint-window');
const pongWindow = document.getElementById('pong-window');
const calcDisplay = document.getElementById('calc-display');
const paintCanvas = document.getElementById('paint-canvas');
const pongCanvas = document.getElementById('pong-canvas');
const paintCtx = paintCanvas ? paintCanvas.getContext('2d') : null;
const pongCtx = pongCanvas ? pongCanvas.getContext('2d') : null;
let commandHistory = JSON.parse(localStorage.getItem('commandHistory')) || [];
let historyIndex = -1;

// Initial debugging logs
console.log('Script loaded.');
console.log('Terminal window:', terminalWindow ? 'Found' : 'Not found');
console.log('Photos window:', photosWindow ? 'Found' : 'Not found');
console.log('Notepad window:', notepadWindow ? 'Found' : 'Not found');
console.log('Calculator window:', calculatorWindow ? 'Found' : 'Not found');
console.log('Paint window:', paintWindow ? 'Found' : 'Not found');
console.log('Pong window:', pongWindow ? 'Found' : 'Not found');
console.log('Output:', output ? 'Found' : 'Not found');
console.log('Input:', input ? 'Found' : 'Not found');
console.log('Calc display:', calcDisplay ? 'Found' : 'Not found');
console.log('Paint canvas:', paintCanvas ? 'Found' : 'Not found');
console.log('Pong canvas:', pongCanvas ? 'Found' : 'Not found');

const promptText = '> ';
const projectsData = [
    { title: 'Trezure', desc: 'A Daily Fantasy Sports mobile app built with Flutter', link: 'playtrezure.com' },
    { title: 'Discord Crypto Bot', desc: 'Coming soon...', link: '' },
    { title: 'Exc Dashboard', desc: 'Coming soon...', link: 'ourusernroject3' }
];

function typeText(text, callback) {
    console.log('Typing text:', text);
    if (!output) {
        console.error('Output element missing');
        return;
    }
    let i = 0;
    const interval = setInterval(() => {
        output.textContent += text[i];
        i++;
        if (i === text.length) {
            clearInterval(interval);
            output.innerHTML += '<br>';
            callback?.();
            output.scrollTop = output.scrollHeight;
        }
    }, 30);
}

function displayOutput(text) {
    console.log('Displaying output:', text);
    if (output) {
        output.innerHTML += `<span style="color: inherit">${text}</span><br>`;
        output.scrollTop = output.scrollHeight;
    } else {
        console.error('Output element not found');
    }
}

function shakeTerminal() {
    console.log('Shaking terminal');
    if (terminalWindow) {
        terminalWindow.style.animation = 'shake 0.3s';
        setTimeout(() => terminalWindow.style.animation = '', 300);
    } else {
        console.error('Terminal window not found');
    }
}

function bootSequence(callback) {
    console.log('Starting boot sequence');
    if (!terminalWindow || !output) {
        console.error('Boot sequence failed: Terminal or output missing');
        return;
    }
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let phase = 0;

    const sequence = setInterval(() => {
        if (phase === 0) {
            terminalWindow.style.display = 'block';
            output.textContent = 'BIOS v1.0.0\nChecking hardware...\nMemory: OK\nCPU: OK\nGPU: OK';
            phase++;
        } else if (phase < 6) {
            output.textContent = Array(40).fill().map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
            phase++;
        } else if (phase < 16) {
            const progress = (phase - 6) * 10;
            output.textContent = `Booting JoshOS... [${'#'.repeat(progress / 4)}${'-'.repeat(25 - progress / 4)}] ${progress}%`;
            phase++;
        } else if (phase === 16) {
            output.innerHTML = '<span style="animation: flash 0.5s 3;">Welcome to Josh Garcia\'s Windows</span><br>';
            phase++;
        } else if (phase < 21) {
            phase++;
        } else {
            clearInterval(sequence);
            output.innerHTML = '';
            typeText('System Boot Complete: Josh Garcia Portfolio', callback);
        }
    }, 100);
}

function openTerminal() {
    console.log('Opening terminal');
    if (terminalWindow) {
        terminalWindow.style.display = 'block';
        if (input) input.focus();
        else console.error('Input element not found');
    } else {
        console.error('Terminal window not found');
    }
}

function openPhotos() {
    console.log('Opening photos');
    if (photosWindow) photosWindow.style.display = 'block';
    else console.error('Photos window not found');
}

function openNotepad() {
    console.log('Opening notepad');
    if (notepadWindow) {
        notepadWindow.style.display = 'block';
        const notepadContent = notepadWindow.querySelector('.notepad-content');
        if (notepadContent) {
            notepadContent.value = "Whatever happens around you, don't take it personally... Nothing other people do is because of you. It is because of themselves.";
            console.log('Notepad text set');
        } else {
            console.error('Notepad content not found');
        }
    } else {
        console.error('Notepad window not found');
    }
}

function openCalculator() {
    console.log('Opening calculator');
    if (calculatorWindow && calcDisplay) {
        calculatorWindow.style.display = 'block';
        calcDisplay.value = '';
    } else {
        console.error('Calculator window or display not found');
    }
}

function openPaint() {
    console.log('Opening paint');
    if (paintWindow && paintCanvas && paintCtx) {
        paintWindow.style.display = 'block';
        initPaint();
    } else {
        console.error('Paint window, canvas, or context not found');
    }
}

function openPong() {
    console.log('Opening pong');
    if (pongWindow && pongCanvas && pongCtx) {
        pongWindow.style.display = 'block';
        initPong();
    } else {
        console.error('Pong window, canvas, or context not found');
    }
}

function closeWindow(windowId) {
    console.log('Closing window:', windowId);
    const window = document.getElementById(windowId);
    if (window) {
        window.style.display = 'none';
        if (windowId === 'paint-window') cleanupPaint();
        if (windowId === 'pong-window') stopPong();
    } else {
        console.error('Window not found:', windowId);
    }
}

function appendToCalc(value) {
    console.log('Appending to calculator:', value);
    if (calcDisplay) calcDisplay.value += value;
    else console.error('calcDisplay not found');
}

function calculate() {
    console.log('Calculating');
    if (calcDisplay) {
        try {
            calcDisplay.value = eval(calcDisplay.value);
        } catch {
            calcDisplay.value = 'Error';
        }
    } else {
        console.error('calcDisplay not found');
    }
}

function clearCalc() {
    console.log('Clearing calculator');
    if (calcDisplay) calcDisplay.value = '';
    else console.error('calcDisplay not found');
}

let paintStartPosition, paintEndPosition, paintDraw;
function initPaint() {
    console.log('Initializing paint');
    if (!paintCanvas || !paintCtx) {
        console.error('Paint canvas or context missing');
        return;
    }
    paintCanvas.width = paintWindow.offsetWidth - 20;
    paintCanvas.height = paintWindow.offsetHeight - 50;
    paintCtx.fillStyle = '#FFF';
    paintCtx.fillRect(0, 0, paintCanvas.width, paintCanvas.height);

    let painting = false;
    paintStartPosition = (e) => { painting = true; paintDraw(e); };
    paintEndPosition = () => { painting = false; paintCtx.beginPath(); };
    paintDraw = (e) => {
        if (!painting) return;
        paintCtx.lineWidth = 5;
        paintCtx.lineCap = 'round';
        paintCtx.strokeStyle = '#000';
        const rect = paintCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        paintCtx.lineTo(x, y);
        paintCtx.stroke();
        paintCtx.beginPath();
        paintCtx.moveTo(x, y);
    };

    paintCanvas.addEventListener('mousedown', paintStartPosition);
    paintCanvas.addEventListener('mouseup', paintEndPosition);
    paintCanvas.addEventListener('mousemove', paintDraw);
    paintCanvas.addEventListener('mouseleave', paintEndPosition);
    paintWindow.dataset.listenersAdded = 'true';
}

function cleanupPaint() {
    console.log('Cleaning up paint');
    if (paintWindow.dataset.listenersAdded && paintCanvas) {
        paintCanvas.removeEventListener('mousedown', paintStartPosition);
        paintCanvas.removeEventListener('mouseup', paintEndPosition);
        paintCanvas.removeEventListener('mousemove', paintDraw);
        paintCanvas.removeEventListener('mouseleave', paintEndPosition);
        delete paintWindow.dataset.listenersAdded;
    }
}

let pongAnimationId, movePaddleHandler;
function initPong() {
    console.log('Initializing pong');
    if (!pongCanvas || !pongCtx) {
        console.error('Pong canvas or context missing');
        return;
    }
    pongCanvas.width = pongWindow.offsetWidth - 20;
    pongCanvas.height = pongWindow.offsetHeight - 50;
    pongCtx.fillStyle = '#FFF';
    pongCtx.fillRect(0, 0, pongCanvas.width, pongCanvas.height);

    const paddleWidth = 10, paddleHeight = 60, ballSize = 10;
    let playerY = (pongCanvas.height - paddleHeight) / 2;
    let computerY = (pongCanvas.height - paddleHeight) / 2;
    let ballX = pongCanvas.width / 2, ballY = pongCanvas.height / 2;
    let ballSpeedX = 5, ballSpeedY = 5;

    const drawPaddle = (x, y) => { pongCtx.fillStyle = '#000'; pongCtx.fillRect(x, y, paddleWidth, paddleHeight); };
    const drawBall = (x, y) => { pongCtx.fillStyle = '#000'; pongCtx.beginPath(); pongCtx.arc(x, y, ballSize / 2, 0, Math.PI * 2); pongCtx.fill(); };
    const moveComputer = () => {
        if (computerY + paddleHeight / 2 < ballY) computerY += 4;
        if (computerY + paddleHeight / 2 > ballY) computerY -= 4;
        computerY = Math.max(0, Math.min(computerY, pongCanvas.height - paddleHeight));
    };
    const updateBall = () => {
        ballX += ballSpeedX;
        ballY += ballSpeedY;
        if (ballY - ballSize / 2 < 0 || ballY + ballSize / 2 > pongCanvas.height) ballSpeedY = -ballSpeedY;
        if (ballX - ballSize / 2 < paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) ballSpeedX = -ballSpeedX;
        if (ballX + ballSize / 2 > pongCanvas.width - paddleWidth && ballY > computerY && ballY < computerY + paddleHeight) ballSpeedX = -ballSpeedX;
        if (ballX < 0 || ballX > pongCanvas.width) { ballX = pongCanvas.width / 2; ballY = pongCanvas.height / 2; ballSpeedX = -ballSpeedX; }
    };

    movePaddleHandler = (e) => {
        const rect = pongCanvas.getBoundingClientRect();
        playerY = Math.max(0, Math.min(e.clientY - rect.top - paddleHeight / 2, pongCanvas.height - paddleHeight));
    };

    const draw = () => {
        pongCtx.fillStyle = '#FFF';
        pongCtx.fillRect(0, 0, pongCanvas.width, pongCanvas.height);
        drawPaddle(0, playerY);
        drawPaddle(pongCanvas.width - paddleWidth, computerY);
        drawBall(ballX, ballY);
        moveComputer();
        updateBall();
        pongAnimationId = requestAnimationFrame(draw);
    };

    pongCanvas.addEventListener('mousemove', movePaddleHandler);
    pongWindow.dataset.listenersAdded = 'true';
    draw();
}

function stopPong() {
    console.log('Stopping pong');
    cancelAnimationFrame(pongAnimationId);
    if (pongWindow.dataset.listenersAdded && pongCanvas) {
        pongCanvas.removeEventListener('mousemove', movePaddleHandler);
        delete pongWindow.dataset.listenersAdded;
    }
}

const commands = {
    help: () => {
        displayOutput(`${promptText}Commands:`);
        displayOutput(`${promptText}about (Displays bio)`);
        displayOutput(`${promptText}projects (Lists projects)`);
        displayOutput(`${promptText}skills (Lists skills)`);
        displayOutput(`${promptText}contact (Shows contact info)`);
        displayOutput(`${promptText}clear (Clears terminal)`);
        displayOutput(`${promptText}whoami (Hidden surprise)`);
        displayOutput(`${promptText}theme [dark|neon|light|retro] (Changes terminal theme)`);
    },
    about: () => {
        displayOutput(`${promptText}I’m a creative who codes, designs, and thinks big.`);
        displayOutput(`${promptText}I’m building Trezure, a daily fantasy sports app, and I design websites professionally.`);
        displayOutput(`${promptText}I’ve solved 100+ Python coding problems, love data, and enjoy exploring real estate, crypto, and strategy games.`);
    },
    projects: () => {
        displayOutput(`${promptText}My Projects:`);
        projectsData.forEach((p, i) => displayOutput(`${promptText}${i + 1}. ${p.title} - ${p.desc} - [${p.link}]`));
    },
    skills: () => displayOutput(`${promptText}Skills: JavaScript, Python, CSS, React`),
    contact: () => displayOutput(`${promptText}Email: [joshgarcia@playtrezure.com]`),
    clear: () => output.innerHTML = '',
    whoami: () => displayOutput(`${promptText}You’re awesome for finding this!`),
    theme: (args) => {
        const theme = args[1]?.toLowerCase();
        const validThemes = ['dark', 'neon', 'light', 'retro'];
        if (!theme || !validThemes.includes(theme)) {
            displayOutput(`${promptText}Usage: theme [dark|neon|light|retro]`);
            return;
        }
        terminalWindow.className = 'window';
        if (theme !== 'dark') terminalWindow.classList.add(`theme-${theme}`);
        displayOutput(`${promptText}Terminal theme set to ${theme}`);
    }
};

input.addEventListener('keydown', (e) => {
    console.log('Key pressed:', e.key);
    if (e.key === 'Enter') {
        const inputValue = input.value.trim().toLowerCase();
        const args = inputValue.split(' ');
        const command = args[0];
        console.log('Command entered:', inputValue);
        commandHistory.push(inputValue);
        localStorage.setItem('commandHistory', JSON.stringify(commandHistory));
        historyIndex = commandHistory.length;

        output.innerHTML += `<span style="color: inherit">${promptText}${inputValue}</span><br>`;
        
        if (commands[command]) commands[command](args);
        else {
            displayOutput(`<span style="color: #FF007A">${promptText}Command not recognized. Try "help" for options.</span>`);
            shakeTerminal();
        }
        input.value = '';
    } else if (e.key === 'ArrowUp' && historyIndex > 0) {
        historyIndex--;
        input.value = commandHistory[historyIndex];
    } else if (e.key === 'ArrowDown' && historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex];
    } else if (e.ctrlKey && e.key === 't') openTerminal();
});

window.onload = () => {
    console.log('Page loaded, starting boot sequence');
    bootSequence(() => {});
};