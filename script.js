// Aggiorna ora e data
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('time').textContent = `${hours}:${minutes}`;
    const days = ['domenica','lunedì','martedì','mercoledì','giovedì','venerdì','sabato'];
    const months = ['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'];
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    document.getElementById('date').textContent = `${day} ${date} ${month}`;
}
setInterval(updateTime, 1000);
updateTime();

// Ricerca aziende
const searchInput = document.getElementById('searchInput');
const companyList = document.getElementById('companyList');
if (searchInput && companyList) {
    searchInput.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        Array.from(companyList.children).forEach(item => {
            const name = item.querySelector('.company-name').textContent.toLowerCase();
            item.style.display = name.includes(value) ? '' : 'none';
        });
    });
}

const calculatorForm = document.getElementById('platingCalculator');
if (calculatorForm) {
    const FARADAY = 96485;
    const massResult = document.getElementById('massResult');
    const chargeResult = document.getElementById('chargeResult');
    const currentResult = document.getElementById('currentResult');
    const timeResult = document.getElementById('timeResult');

    const formatNumber = (value, unit) => {
        if (!Number.isFinite(value)) {
            return '—';
        }
        return `${value.toLocaleString('it-IT', { maximumFractionDigits: 2 })} ${unit}`;
    };

    const formatDuration = (hours) => {
        if (!Number.isFinite(hours)) {
            return '—';
        }
        const totalMinutes = Math.round(hours * 60);
        const h = Math.floor(totalMinutes / 60);
        const m = totalMinutes % 60;
        if (h === 0) {
            return `${m} min`;
        }
        return `${h} h ${m} min`;
    };

    calculatorForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const area = Number(document.getElementById('area').value);
        const thickness = Number(document.getElementById('thickness').value);
        const density = Number(document.getElementById('density').value);
        const atomicWeight = Number(document.getElementById('atomicWeight').value);
        const valence = Number(document.getElementById('valence').value);
        const efficiencyPercent = Number(document.getElementById('efficiency').value);
        const currentInput = Number(document.getElementById('current').value);
        const currentDensity = Number(document.getElementById('currentDensity').value);

        const areaCm2 = area * 100;
        const thicknessCm = thickness * 1e-4;
        const volumeCm3 = areaCm2 * thicknessCm;
        const mass = density * volumeCm3;

        const efficiency = efficiencyPercent / 100;
        const charge = (mass * valence * FARADAY) / (atomicWeight * efficiency);
        const current = currentInput > 0 ? currentInput : (currentDensity > 0 ? currentDensity * area : 0);
        const timeHours = current > 0 ? (charge / current) / 3600 : NaN;

        massResult.textContent = formatNumber(mass, 'g');
        chargeResult.textContent = formatNumber(charge / 3600, 'Ah');
        currentResult.textContent = current > 0 ? formatNumber(current, 'A') : '—';
        timeResult.textContent = formatDuration(timeHours);
    });
}
