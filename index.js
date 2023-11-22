import express from 'express';

import FakePerson from 'fake-person';

const app = express();
const player = new FakePerson();

const port = process.env.PORT || 5001


app.get('/', (req, res) => {
    res.send("Choose rock, paper or scissors, and type it into the search bar in this format: /myChoice/rock");
})

app.get('/myChoice/:key', (req, res) => {
    const aiChoice = player.playRockPaperScissors();

    let playerchoice = req.params.key;

    res.send({computer: aiChoice, playerchoice});

    let counter = []; //to keep track of score
    let score = 0;

    let rock = "rock";
    let paper = "paper";
    let scissors = "scissors";

    //losing statement
    if(playerchoice==rock&&aiChoice==paper || playerchoice==paper&&aiChoice==scissors || playerchoice==scissors&&aiChoice==rock){
        score = score - 1;
        counter.push(score);
        console.log(`The score is ${counter}`);
    }

    //winning statement
    if(playerchoice==rock&&aiChoice==scissors || playerchoice==paper&&aiChoice==rock || playerchoice==scissors&&aiChoice==paper){
        score = score + 1;
        counter.push(score);
        console.log(`The score is ${counter}`);
    }

    //draw statement
    if(playerchoice == aiChoice){
        score = score;
        counter.push(score);
        console.log(`The score is ${counter}`);
    }

    //invalid
    if(playerchoice!==rock && playerchoice!==paper && playerchoice!==scissors){
        console.log("Error, please choose rock, paper or scissors");
    }
});


//work on results page and link to score (global variable?)
// app.get('/results', (req, res) =>{
//     if(score == 0){
//         console.log("tied");
//     }
//     if(score == 1){
//         console.log("win");
//     }
//     if(score == -1){
//         console.log("lose");
//     }
// })

app.listen(port, () => {
    console.log(`Game starts on port ${port}`)
  });