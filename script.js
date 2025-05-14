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
searchInput.addEventListener('input', function() {
    const value = this.value.toLowerCase();
    Array.from(companyList.children).forEach(item => {
        const name = item.querySelector('.company-name').textContent.toLowerCase();
        item.style.display = name.includes(value) ? '' : 'none';
    });
});
