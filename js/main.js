const $reset = document.getElementById("reset__btn")
const $rock = document.getElementById("rock__btn");
const $paper = document.getElementById("paper__btn");
const $scissors = document.getElementById("scissors__btn");
const $play = document.getElementById("play__btn");

const $player = document.getElementById("player-img");
const $bot = document.getElementById("bot-img");

const $playerScore = document.getElementById("player-score");
const $botScore = document.getElementById("bot-score");

const notification = {
    won: document.getElementById("notification__won"),
    lost: document.getElementById("notification__lost"),
    draw: document.getElementById("notification__draw"),
    error: document.getElementById("notification__error"),
    reset: document.getElementById("notification__reset")
}

let playerCount = 0;
let botCount = 0;
let rounds = 1;

$reset.addEventListener("click", () => {
    notification.reset.style.display = "block";

    playerCount = 0;
    botCount = 0;
    rounds = 1;

    $rock.removeAttribute("disabled")
    $paper.removeAttribute("disabled")
    $scissors.removeAttribute("disabled")
    $play.removeAttribute("disabled")

    $playerScore.textContent = 0;
    $botScore.textContent = 0;

    setTimeout(() => {
        notification.reset.style.display = "none"
    }, 3000)
})

const imgs = [
    ["rock", "img/rock.png"],
    ["paper", "img/paper.png"],
    ["scissors", "img/scissors.png"]
];

$rock.addEventListener("click", () => {
    $player.setAttribute("src", imgs[0][1])
    $player.setAttribute("alt", imgs[0][0])
});

$paper.addEventListener("click", () => {
    $player.setAttribute("src", imgs[1][1])
    $player.setAttribute("alt", imgs[1][0])
});

$scissors.addEventListener("click", () => {
    $player.setAttribute("src", imgs[2][1])
    $player.setAttribute("alt", imgs[2][0])
});

const score_game = () => {
    if (playerCount > botCount) {
        $playerScore.style.color = "#4cd137";
        $botScore.style.color = "#e84118";
    }

    else if (playerCount < botCount) {
        $playerScore.style.color = "#e84118";
        $botScore.style.color = "#4cd137";
    }

    else {
        $playerScore.style.color = "#fbc531";
        $botScore.style.color = "#fbc531";
    }
};

const whoWon = () => {
    if (playerCount === 5) {
        rounds = 10
        $playerScore.textContent = "WON"
        $botScore.textContent = "LOST"
    }

    else if (botCount === 5) {
        rounds = 10
        $playerScore.textContent = "LOST"
        $botScore.textContent = "WON"
    }

}

const endGame = () => {
    $rock.setAttribute("disabled", "");
    $paper.setAttribute("disabled", "");
    $scissors.setAttribute("disabled", "")
    $play.setAttribute("disabled", "")
}

$play.addEventListener("click", () => {

    const getAttribute_player = $player.getAttribute("alt");

    if (getAttribute_player === "rock" || getAttribute_player === "paper" || getAttribute_player === "scissors") {

        $rock.setAttribute("disabled", "");
        $paper.setAttribute("disabled", "");
        $scissors.setAttribute("disabled", "");
        $play.setAttribute("disabled", "");

        const generatingBotNumber = Math.floor((Math.random() * imgs.length) + 1)

        if (generatingBotNumber === 1) {
            $bot.setAttribute("src", imgs[0][1]);
            $bot.setAttribute("alt", imgs[0][0]);
        }

        else if (generatingBotNumber === 2) {
            $bot.setAttribute("src", imgs[1][1]);
            $bot.setAttribute("alt", imgs[1][0]);
        }

        else {
            $bot.setAttribute("src", imgs[2][1]);
            $bot.setAttribute("alt", imgs[2][0]);
        }

        if ( (getAttribute_player === "rock" && generatingBotNumber === 3) || (getAttribute_player === "paper" && generatingBotNumber === 1) || (getAttribute_player === "scissors" && generatingBotNumber === 2)) {
            notification.won.style.display = "block"
            playerCount++
            $playerScore.textContent = playerCount
            rounds++
        }

        else if ( (generatingBotNumber === 1 && getAttribute_player === "scissors") || (generatingBotNumber === 2 && getAttribute_player === "rock") || (generatingBotNumber === 3 && getAttribute_player === "paper")) {
            notification.lost.style.display = "block"
            botCount++
            $botScore.textContent = botCount
            rounds++
        }

        else {
            notification.draw.style.display = "block"
        }

        score_game()
        whoWon()

        const newRound = setTimeout(() => {
            notification.won.style.display = "none";
            notification.lost.style.display = "none";
            notification.draw.style.display = "none";

            $player.setAttribute("src", "img/user.png");
            $player.setAttribute("alt", "player");
            $bot.setAttribute("src", "img/user.png");
            $bot.setAttribute("alt", "bot");

            $rock.removeAttribute("disabled");
            $paper.removeAttribute("disabled");
            $scissors.removeAttribute("disabled");
            $play.removeAttribute("disabled")

            if (rounds === 10) {
                endGame()
                clearTimeout(newRound)
            }
        },3000)
    }

    else {
        notification.error.style.display = "block"
        setTimeout(() => {
            notification.error.style.display = "none"
        }, 3000)
    }

});

