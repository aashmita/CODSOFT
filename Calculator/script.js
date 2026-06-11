// Application Memory Arrays Module Elements Tracking
let activeInputString = "";
let selectedLanguage = "en";
let historicalLogs = [];

const mathConversionMatrix = {
    area: {
        units: { acres: "Acres", sqm: "Square Metres" },
        convert: (v, f, t) => f === t ? v : (f === "acres" ? v * 4046.856 : v / 4046.856)
    },
    length: {
        units: { km: "Kilometers", miles: "Miles" },
        convert: (v, f, t) => f === t ? v : (f === "km" ? v * 0.621371 : v / 0.621371)
    },
    temp: {
        units: { c: "Celsius", f: "Fahrenheit" },
        convert: (v, f, t) => f === t ? v : (f === "c" ? (v * 9/5) + 32 : (v - 32) * 5/9)
    }
};

// Text to Speech Voice Reader Engine Hook
function runAudioSpeechFeedback(phrase) {
    const speechActive = document.getElementById('audioToggle').checked;
    if (!speechActive) return;
    
    // Stop any ongoing announcement before starting a new one
    window.speechSynthesis.cancel();
    const voiceAnnouncer = new SpeechSynthesisUtterance(phrase);
    voiceAnnouncer.lang = (selectedLanguage === 'hi') ? 'hi-IN' : 'en-US';
    voiceAnnouncer.rate = 1.1;
    window.speechSynthesis.speak(voiceAnnouncer);
}

// Swaps functional working sub-views containers panels tabs
function changeTab(tabName) {
    const mainBox = document.querySelector('.app-container');
    
    mainBox.classList.remove('mode-standard', 'mode-scientific');
    document.querySelectorAll('.menu-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById('math-grid').classList.add('hidden');
    document.getElementById('converter-panel').classList.add('hidden');
    document.getElementById('history-panel').classList.add('hidden');

    document.getElementById(`btn-${tabName}`).classList.add('active');
    const headerTitle = document.getElementById('view-title');

    if (tabName === 'standard') {
        mainBox.classList.add('mode-standard');
        document.getElementById('math-grid').classList.remove('hidden');
        headerTitle.setAttribute('data-en', 'Standard Mode');
        headerTitle.setAttribute('data-hi', 'साधारण मोड');
    } else if (tabName === 'scientific') {
        mainBox.classList.add('mode-scientific');
        document.getElementById('math-grid').classList.remove('hidden');
        headerTitle.setAttribute('data-en', 'Scientific Engine');
        headerTitle.setAttribute('data-hi', 'वैज्ञानिक इंजन');
    } else if (tabName === 'converter') {
        document.getElementById('converter-panel').classList.remove('hidden');
        headerTitle.setAttribute('data-en', 'Unit Converter');
        headerTitle.setAttribute('data-hi', 'इकाई परिवर्तक');
        setupUnitDropdowns();
    } else if (tabName === 'history') {
        document.getElementById('history-panel').classList.remove('hidden');
        headerTitle.setAttribute('data-en', 'Calculations History');
        headerTitle.setAttribute('data-hi', 'इतिहास रिकॉर्ड');
        buildHistoryListView();
    }
    
    updateLanguage();
}

// Custom Key Input Sequences Logic Processing Block
function appendInput(val, audioLabel) {
    if (document.getElementById('calc-screen').value === "Error") clearAll();
    activeInputString += val;
    refreshScreenElements();
    
    if (audioLabel) {
        runAudioSpeechFeedback(audioLabel);
    }
}

function clearAll() {
    activeInputString = "";
    document.getElementById('preview-screen').innerText = "";
    document.getElementById('calc-screen').value = "0";
    runAudioSpeechFeedback(selectedLanguage === 'hi' ? "साफ़" : "Clear");
}

function dropLastChar() {
    activeInputString = activeInputString.slice(0, -1);
    refreshScreenElements();
    runAudioSpeechFeedback(selectedLanguage === 'hi' ? "हटाया" : "Backspace");
}

function negateInput() {
    if (!activeInputString) return;
    activeInputString = activeInputString.startsWith('-') ? activeInputString.slice(1) : '-' + activeInputString;
    refreshScreenElements();
}

function addSciOp(type) {
    activeInputString += `Math.${type}(`;
    refreshScreenElements();
    runAudioSpeechFeedback(type);
}

// UI Refresh Loop
function refreshScreenElements() {
    const monitor = document.getElementById('calc-screen');
    const preMonitor = document.getElementById('preview-screen');
    
    monitor.value = activeInputString.replace(/\*/g, '×').replace(/\//g, '÷') || "0";
    
    if (activeInputString && !['+', '-', '*', '/', '.'].includes(activeInputString.slice(-1))) {
        try {
            let evalOutput = new Function(`return ${activeInputString}`)();
            if (isFinite(evalOutput) && evalOutput !== undefined && String(evalOutput) !== activeInputString) {
                preMonitor.innerText = "= " + evalOutput;
            } else { preMonitor.innerText = ""; }
        } catch(err) { preMonitor.innerText = ""; }
    } else { preMonitor.innerText = ""; }
}

function evaluateExpression() {
    if (!activeInputString) return;
    const monitor = document.getElementById('calc-screen');
    try {
        let outputVal = new Function(`return ${activeInputString}`)();
        
        if (!isFinite(outputVal)) { monitor.value = "Error"; return; }

        historicalLogs.unshift({ 
            expr: activeInputString.replace(/\*/g, '×').replace(/\//g, '÷'), 
            result: outputVal 
        });
        
        activeInputString = String(outputVal);
        monitor.value = outputVal;
        document.getElementById('preview-screen').innerText = "";
        
        runAudioSpeechFeedback(`${selectedLanguage === 'hi' ? 'बराबर है' : 'equals'} ${outputVal}`);
    } catch (e) { monitor.value = "Error"; }
}

// Clean Theme Profile Swapper Mapping
function updateTheme() {
    const chosenTheme = document.getElementById('themeMenu').value;
    document.body.className = (chosenTheme === 'light') ? "light-mode" : "dark-mode";
}

function updateLanguage() {
    selectedLanguage = document.getElementById('langMenu').value;
    document.querySelectorAll('[data-en]').forEach(node => {
        node.innerText = node.getAttribute(`data-${selectedLanguage}`);
    });
}

// Unit Converters Block Logic
function setupUnitDropdowns() {
    const cat = document.getElementById('unitType').value;
    const fSelect = document.getElementById('fromUnit');
    const tSelect = document.getElementById('toUnit');
    
    fSelect.innerHTML = ""; tSelect.innerHTML = "";
    Object.entries(mathConversionMatrix[cat].units).forEach(([k, v]) => {
        fSelect.options.add(new Option(v, k));
        tSelect.options.add(new Option(v, k));
    });
    if (tSelect.options.length > 1) tSelect.selectedIndex = 1;
    runConversion();
}

function runConversion() {
    const cat = document.getElementById('unitType').value;
    const fUnit = document.getElementById('fromUnit').value;
    const tUnit = document.getElementById('toUnit').value;
    const valIn = parseFloat(document.getElementById('fromAmount').value) || 0;
    
    const outputRes = mathConversionMatrix[cat].convert(valIn, fUnit, tUnit);
    document.getElementById('toAmount').innerText = outputRes.toLocaleString(undefined, { maximumFractionDigits: 4 });
}

// Dynamic Calculation Logs View Builders Node Items
function buildHistoryListView() {
    const frame = document.getElementById('history-container');
    frame.innerHTML = "";
    
    if (!historicalLogs.length) {
        frame.innerHTML = `<div style="text-align:center;color:var(--text-muted);padding-top:15px;">${selectedLanguage === 'hi' ? 'कोई इतिहास रिकॉर्ड नहीं है।' : 'No historical logs found.'}</div>`;
        return;
    }
    historicalLogs.forEach(entry => {
        const row = document.createElement('div');
        row.className = "history-item";
        row.innerHTML = `<span class="expr">${entry.expr}</span><span class="res">=${entry.result}</span>`;
        frame.appendChild(row);
    });
}
function flushLogs() { historicalLogs = []; buildHistoryListView(); }

function copyToClipboard() {
    navigator.clipboard.writeText(document.getElementById('calc-screen').value);
}

// Hardware Keys Mapping Events Listeners
document.addEventListener('keydown', (evt) => {
    if (!document.getElementById('math-grid').classList.contains('hidden')) {
        if (evt.key >= '0' && evt.key <= '9') appendInput(evt.key, evt.key);
        else if (evt.key === '.') appendInput('.', 'point');
        else if (evt.key === '+') appendInput('+', 'plus');
        else if (evt.key === '-') appendInput('-', 'minus');
        else if (evt.key === '*') appendInput('*', 'multiplied by');
        else if (evt.key === '/') appendInput('/', 'divided by');
        else if (evt.key === 'Backspace') dropLastChar();
        else if (evt.key === 'Escape') clearAll();
        else if (evt.key === 'Enter' || evt.key === '=') { evt.preventDefault(); evaluateExpression(); }
    }
});

// REAL-TIME Web Audio Voice Dictation Streaming Processing Loop Interface Engine
function handleVoiceInput() {
    const SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechAPI) return alert("Web Audio Speech Dictation features are unsupported on this browser platform version.");
    
    const processorInstance = new SpeechAPI();
    // Enable continuous tracking so intermediate results stream actively in real time
    processorInstance.continuous = true;
    processorInstance.interimResults = true;
    processorInstance.lang = (selectedLanguage === 'hi') ? 'hi-IN' : 'en-US';
    
    const statusMsg = document.getElementById('app-status');
    const previewBox = document.getElementById('preview-screen');
    const micIndicator = document.getElementById('mic-btn');
    
    statusMsg.innerText = (selectedLanguage === 'hi') ? "सुन रहा हूँ... बोलिए" : "Listening... Speak now";
    statusMsg.style.color = "#ef4444";
    micIndicator.style.background = "rgba(239, 68, 68, 0.15)";
    
    processorInstance.start();
    
    processorInstance.onresult = (event) => {
        let liveTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            liveTranscript += event.results[i][0].transcript;
        }
        
        // DISPLAY THE EXACT INPUT WORDS IN REAL TIME INSIDE PREVIEW FRAME
        previewBox.innerText = `[Live Voice]: "${liveTranscript}"`;
        
        // Clean phonetics text syntax string characters strings maps
        let filteredMathFormula = liveTranscript.toLowerCase()
            .replace(/plus|and|और|प्लस|जोड़/g, '+')
            .replace(/minus|घटाओ|माइनस/g, '-')
            .replace(/times|into|multiplied by|गुना|गुणा/g, '*')
            .replace(/divided by|divide|भाग/g, '/')
            .replace(/[^0-9\+\-\*\/\(\)\.]/g, '');
            
        if (filteredMathFormula && event.results[event.results.length - 1].isFinal) {
            activeInputString = filteredMathFormula;
            refreshScreenElements();
            // Evaluate right after sentence is finalized
            setTimeout(() => {
                evaluateExpression();
                processorInstance.stop();
            }, 500);
        }
    };
    
    processorInstance.onend = () => {
        statusMsg.style.color = "var(--text-muted)";
        statusMsg.innerText = (selectedLanguage === 'hi') ? "तैयार" : "Ready";
        micIndicator.style.background = "var(--key-bg)";
    };
}

// Bootstrap Initialization Standard Interface
changeTab('standard');