// Global Application State Properties Cache
let currentInput = "";
let currentLanguage = "en";
let calculationHistory = [];

const unitConversions = {
    area: {
        units: { acres: "Acres", sqm: "Square Metres" },
        convert: (val, from, to) => (from === to) ? val : (from === "acres" ? val * 4046.8564 : val / 4046.8564)
    },
    length: {
        units: { km: "Kilometers", miles: "Miles" },
        convert: (val, from, to) => (from === to) ? val : (from === "km" ? val * 0.621371 : val / 0.621371)
    },
    temp: {
        units: { c: "Celsius", f: "Fahrenheit" },
        convert: (val, from, to) => (from === to) ? val : (from === "c" ? (val * 9/5) + 32 : (val - 32) * 5/9)
    }
};

// Workspace Panel Navigation Module Core Changer
function switchMode(targetMode) {
    const container = document.querySelector('.dashboard-container');
    
    // Clear functional UI states cleanly
    container.classList.remove('mode-standard', 'mode-scientific');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    // View element visibilities toggler
    document.getElementById('calc-pad').classList.add('hidden');
    document.getElementById('unit-pad').classList.add('hidden');
    document.getElementById('history-pad').classList.add('hidden');

    document.getElementById(`tab-${targetMode}`).classList.add('active');

    // Headers translation mapping elements updates
    const titleHeader = document.getElementById('workspace-title');
    
    if (targetMode === 'standard') {
        container.classList.add('mode-standard');
        document.getElementById('calc-pad').classList.remove('hidden');
        titleHeader.setAttribute('data-en', 'Standard Deck');
        titleHeader.setAttribute('data-hi', 'साधारण डेक');
    } else if (targetMode === 'scientific') {
        container.classList.add('mode-scientific');
        document.getElementById('calc-pad').classList.remove('hidden');
        titleHeader.setAttribute('data-en', 'Scientific Engine');
        titleHeader.setAttribute('data-hi', 'वैज्ञानिक इंजन');
    } else if (targetMode === 'unit') {
        document.getElementById('unit-pad').classList.remove('hidden');
        titleHeader.setAttribute('data-en', 'Unit Cross Conversion');
        titleHeader.setAttribute('data-hi', 'इकाई क्रॉस परिवर्तन');
        updateUnitOptions();
    } else if (targetMode === 'history') {
        document.getElementById('history-pad').classList.remove('hidden');
        titleHeader.setAttribute('data-en', 'Analytical Logs');
        titleHeader.setAttribute('data-hi', 'विश्लेषणात्मक लॉग');
        renderHistory();
    }
    
    // Trigger localization map re-sync adjustments
    changeLanguage();
}

// Basic Inputs Core Execution Blocks 
function appendValue(val) {
    if (document.getElementById('main-display').value === "Error") clearDisplay();
    currentInput += val;
    updateDisplay();
}

function clearDisplay() {
    currentInput = "";
    document.getElementById('expression-preview').innerText = "";
    document.getElementById('main-display').value = "0";
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function toggleSign() {
    if (!currentInput) return;
    currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
    updateDisplay();
}

function updateDisplay() {
    const mainDisp = document.getElementById('main-display');
    const previewDisp = document.getElementById('expression-preview');
    
    mainDisp.value = currentInput.replace(/\*/g, '×').replace(/\//g, '÷') || "0";
    
    // Continuous Real-Time Preview evaluation execution block 
    if (currentInput && !['+', '-', '*', '/', '%', '.'].includes(currentInput.slice(-1))) {
        try {
            let runningVal = new Function(`return ${currentInput.replace(/π/g, 'Math.PI')}`)();
            if (isFinite(runningVal) && runningVal !== undefined && String(runningVal) !== currentInput) {
                previewDisp.innerText = "= " + runningVal;
            } else { previewDisp.innerText = ""; }
        } catch(e) { previewDisp.innerText = ""; }
    } else { previewDisp.innerText = ""; }
}

function inputSci(type) {
    currentInput += `Math.${type}(`;
    updateDisplay();
}

function calculate() {
    if (!currentInput) return;
    const mainDisp = document.getElementById('main-display');
    try {
        let cleanExpr = currentInput.replace(/π/g, 'Math.PI').replace(/(\d+)%/g, "($1/100)");
        let outputEval = new Function(`return ${cleanExpr}`)();
        
        if (!isFinite(outputEval)) { mainDisp.value = "Error"; return; }

        calculationHistory.unshift({ 
            expr: currentInput.replace(/\*/g, '×').replace(/\//g, '÷'), 
            result: outputEval 
        });
        
        currentInput = String(outputEval);
        mainDisp.value = outputEval;
        document.getElementById('expression-preview').innerText = "";
    } catch (err) { mainDisp.value = "Error"; }
}

// Multi Theme Framework Switcher
function changeTheme() {
    document.body.className = document.getElementById('themeSelect').value;
}

// Global Two-way Text Translator Localization Module Engine
function changeLanguage() {
    currentLanguage = document.getElementById('languageSelect').value;
    document.querySelectorAll('[data-en]').forEach(el => {
        el.innerText = el.getAttribute(`data-${currentLanguage}`);
    });
}

// Conversion Calculation Panel Drivers
function updateUnitOptions() {
    const category = document.getElementById('unitCategory').value;
    const fromSelect = document.getElementById('unitFrom');
    const toSelect = document.getElementById('unitTo');
    
    fromSelect.innerHTML = ""; toSelect.innerHTML = "";
    
    Object.entries(unitConversions[category].units).forEach(([key, val]) => {
        fromSelect.options.add(new Option(val, key));
        toSelect.options.add(new Option(val, key));
    });
    if (toSelect.options.length > 1) toSelect.selectedIndex = 1;
    performUnitConversion();
}

function performUnitConversion() {
    const category = document.getElementById('unitCategory').value;
    const fromUnit = document.getElementById('unitFrom').value;
    const toUnit = document.getElementById('unitTo').value;
    const valueInput = parseFloat(document.getElementById('unitInput').value) || 0;
    
    const outputValue = unitConversions[category].convert(valueInput, fromUnit, toUnit);
    document.getElementById('unitOutput').innerText = outputValue.toLocaleString(undefined, { maximumFractionDigits: 5 });
}

// Persistent Calculation Deck Loggers Rendering
function renderHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = "";
    
    if (!calculationHistory.length) {
        historyList.innerHTML = `<div style="text-align:center;color:var(--text-muted);padding-top:20px;">${currentLanguage === 'hi' ? 'कोई इतिहास उपलब्ध नहीं है।' : 'No logs recorded.'}</div>`;
        return;
    }
    calculationHistory.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = "history-card-item";
        itemCard.innerHTML = `<span class="h-expr">${item.expr}</span><span class="h-res">=${item.result}</span>`;
        historyList.appendChild(itemCard);
    });
}

function clearHistory() { calculationHistory = []; renderHistory(); }

function copyResult() {
    navigator.clipboard.writeText(document.getElementById('main-display').value);
}

// Hardware Physical Key Tracking Mapping Listeners
document.addEventListener('keydown', (e) => {
    if (!document.getElementById('calc-pad').classList.contains('hidden')) {
        if (e.key >= '0' && e.key <= '9') appendValue(e.key);
        else if (e.key === '.') appendValue('.');
        else if (e.key === '+') appendValue('+');
        else if (e.key === '-') appendValue('-');
        else if (e.key === '*') appendValue('*');
        else if (e.key === '/') appendValue('/');
        else if (e.key === '%') appendValue('%');
        else if (e.key === 'Backspace') backspace();
        else if (e.key === 'Escape') clearDisplay();
        else if (e.key === 'Enter' || e.key === '=') { e.preventDefault(); calculate(); }
    }
});

// HTML5 Web Speech Dictation Parsing Matrix Module Engine
function startVoiceRecognition() {
    const WebKitRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!WebKitRecognition) return alert("Web Dictation features are unsupported on this client.");
    
    const contextRecognizer = new WebKitRecognition();
    contextRecognizer.lang = (currentLanguage === 'hi') ? 'hi-IN' : 'en-US';
    
    const speechMicIndicator = document.getElementById('voiceBtn');
    speechMicIndicator.style.background = "rgba(239, 68, 68, 0.2)";
    
    contextRecognizer.start();
    
    contextRecognizer.onresult = (e) => {
        let transcriptString = e.results[0][0].transcript.toLowerCase();
        
        // Match mathematical phonetics context patterns
        let mathematicalExpression = transcriptString
            .replace(/plus|and|और|प्लस|जोड़/g, '+')
            .replace(/minus|घटाओ|माइनस/g, '-')
            .replace(/times|into|multiplied by|गुना|गुणा/g, '*')
            .replace(/divided by|divide|भाग/g, '/')
            .replace(/[^0-9\+\-\*\/\%\(\)\.]/g, '');
            
        if (mathematicalExpression) {
            currentInput = mathematicalExpression;
            updateDisplay();
            calculate();
        }
    };
    contextRecognizer.onend = () => speechMicIndicator.style.background = "var(--key-num)";
}

// Application Init Setup Launcher
switchMode('standard');