const express = require('express');
const app = express();

app.use(express.json());

let squadre = {
    'Squadra A': 0,
    'Squadra B': 0
};

app.post('/addResult', (req, res) => {
    const { teamA, teamB, scoreA, scoreB } = req.body;

    if (squadre[teamA] !== undefined && squadre[teamB] !== undefined) {
        squadre[teamA] += scoreA;
        squadre[teamB] += scoreB;
        res.sendStatus(200);
    } else {
        res.status(400).send('Una delle squadre non esiste');
    }
});

app.get('/getClassifica', (req, res) => {
    const classifica = Object.keys(squadre).map(team => ({
        name: team,
        points: squadre[team]
    }));
    res.json(classifica);
});

app.listen(3000, () => {
    console.log('Server avviato sulla porta 3000');
});

