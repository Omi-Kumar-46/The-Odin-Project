function getComputerChoice() {
    const choice = Math.floor(Math.random() * 3);
    return (choice === 0) ? "Rock" : (choice === 1) ? "Paper" : "Scissor";
}

function getUserChoice() {
    const userChoice = prompt("Type Rock, Paper or Scissor to start playing: ");
    return userChoice;
}

function playGame() {
    let userScore = 0, computerScore = 0;

    function playRound(userChoice, computerChoice) {
        userChoice = userChoice.toLowerCase();
        computerChoice = computerChoice.toLowerCase();

        if (userChoice === computerChoice) {
            console.log("It's a Tie! You both chose " + userChoice);
            console.log("You: " + userScore + " | " + "Computer: " + computerScore);
        }

        else if ((userChoice === "rock" && computerChoice === "scissor") || (userChoice === "paper" && computerChoice === "rock") || (userChoice === "scissor" && computerChoice === "paper")) {
            userScore += 1;
            console.log("You Win! Your " + userChoice + " beats Computer's " + computerChoice);
            console.log("You: " + userScore + " | " + "Computer: " + computerScore);
        }
        else {
            computerScore += 1;
            console.log("You Lose! Computer's " + computerChoice + " beats your " + userChoice);
            console.log("You: " + userScore + " | " + "Computer: " + computerScore);
        }
    }

    let i = 1;

    while (i < 6) {
        console.log("Round " + i);
        userInput = getUserChoice();
        computerInput = getComputerChoice();

        playRound(userInput, computerInput);
        i++;
    }

    const finalResult = (userScore > computerScore)
        ? ("You Won :) by " + userScore + " : " + computerScore)
        : (computerScore > userScore)
            ? ("You Lost :( by " + userScore + " : " + computerScore)
            : "It's a Tie! No one won the overall match.";

    console.log(finalResult);
}

playGame();
