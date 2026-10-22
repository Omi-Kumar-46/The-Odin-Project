function getComputerChoice() {
    const choice = Math.floor(Math.random() * 3);
    return (choice === 0) ? "Rock" : (choice === 1) ? "Paper" : "Scissor";
}

const userButtons = document.querySelectorAll(".play-btn");
userButtons.forEach((buttons) => {
    buttons.addEventListener('click', (e) => {
        const userChoice = e.target.id;
        playRound(userChoice, getComputerChoice());
    })
})

let userScore = 0, computerScore = 0;

const resultDiv = document.querySelector('#results');
let displayMssg = "";

function playRound(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        displayMssg = "It's a Tie! You both chose " + userChoice;
    }

    else if ((userChoice === "Rock" && computerChoice === "Scissor") || (userChoice === "Paper" && computerChoice === "Rock") || (userChoice === "scissor" && computerChoice === "paper")) {
        userScore += 1;
        displayMssg = "You Win! Your " + userChoice + " beats Computer's " + computerChoice;
    }

    else {
        computerScore += 1;
        displayMssg = "You Lose! Computer's " + computerChoice + " beats your " + userChoice;
    }

    if (userScore === 5) {
        displayMssg = "You are the Champion 🏆";
        userScore = 0;
        computerScore = 0;
    }
    else if (computerScore === 5) {
        displayMssg = "Wasted, Computer Won the Game! 🤖";
        userScore = 0;
        computerScore = 0;
    }

    displayMssg += "<br>Score : You: " + userScore + " | " + "Computer: " + computerScore;

    resultDiv.innerHTML = displayMssg;
}




