import express from 'express';

import FakePerson from 'fake-person';

import cors from 'cors';

const app = express();
const player = new FakePerson();

const port = process.env.PORT || 5001

app.use(cors({
    origin: '*'
}));


app.get('/', (req, res) => {
    res.send("Choose rock, paper or scissors, and type it into the search bar in this format: /myChoice/rock. \n Once you get your score, type in results/yourscore after the original URL (with your score being the number you get after playing) to get a fortune!");
})

app.get('/myChoice/:key', (req, res) => {
    const aiChoice = player.playRockPaperScissors();

    let playerchoice = req.params.key;

    let resultArray = ["{computer: " + aiChoice + " | player: " + playerchoice + "}"]

    let counter = []; //to keep track of score
    let score = 0;

    let rock = "rock";
    let paper = "paper";
    let scissors = "scissors";

    //losing statement
    if(playerchoice==rock&&aiChoice==paper || playerchoice==paper&&aiChoice==scissors || playerchoice==scissors&&aiChoice==rock){
        score = score - 1;
        counter.push(score);
        res.send(`The score is ${counter} ` + resultArray );
    }

    //winning statement
    if(playerchoice==rock&&aiChoice==scissors || playerchoice==paper&&aiChoice==rock || playerchoice==scissors&&aiChoice==paper){
        score = score + 1;
        counter.push(score);
        res.send(`The score is ${counter} ` + resultArray);
    }

    //draw statement
    if(playerchoice == aiChoice){
        score = score;
        counter.push(score);
        res.send(`The score is ${counter} ` + resultArray);
    }

    //invalid
    if(playerchoice!==rock && playerchoice!==paper && playerchoice!==scissors){
        res.send("Error, please choose rock, paper or scissors");
    }
});


app.get('/results/:key', (req, res) =>{

    let score = req.params.key;

    if(score == 0){
        res.send("tied");
    }
    if(score == 1){
        res.send("win");
    }
    if(score == -1){
        res.send("lose");
    }
})

app.listen(port, () => {
    console.log(`Game starts on port ${port}`)
  });