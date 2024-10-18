document.getElementById('result-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const teamA = document.getElementById('teamA').value;
    const teamB = document.getElementById('teamB').value;
    const scoreA = parseInt(document.getElementById('scoreA').value);
    const scoreB = parseInt(document.getElementById('scoreB').value);

    const response = await fetch('/addResult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamA, teamB, scoreA, scoreB })
    });

    if (response.ok) {
        alert('Risultato inserito con successo!');
        loadClassifica();
    } else {
        alert('Errore nell\'inserimento del risultato');
    }
});

async function loadClassifica() {
    const response = await fetch('/getClassifica');
    const classifica = await response.json();

    const classificaDiv = document.getElementById('classifica');
    classificaDiv.innerHTML = '';
    classifica.forEach(team => {
        const teamDiv = document.createElement('div');
        teamDiv.innerText = `${team.name}: ${team.points} punti`;
        classificaDiv.appendChild(teamDiv);
    });
}

loadClassifica();

