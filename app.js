let playerTurn = document.querySelector("#player-turn");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#NewGame-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;
let count = 0;

const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const resetGame = () => {
    turn0 = true;
    count = 0;
    playerTurn.innerText = "Player 0's turn";
    msgContainer.classList.add("hide");
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "#E4E6C3";
    });
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (msgContainer.classList.contains("hide")) {
            box.innerText = turn0 ? "0" : "X";
            playerTurn.innerText = turn0 ? "Player X's turn" : "Player 0's turn";
            turn0 = !turn0;
            box.disabled = true;
            count++;

            const winningPattern = checkWinner();
            if (winningPattern) {
                msg.innerText = `Congratulations! Winner is "${box.innerText}"`;
                msgContainer.classList.remove("hide");
                highlightWinningBoxes(winningPattern);
            } else if (count === 9) {
                msg.innerText = "Game is a Draw!";
                msgContainer.classList.remove("hide");
            }
        }
    });
});

const checkWinner = () => {
    for (let pattern of winPattern) {
        const [a, b, c] = pattern;
        if (
            boxes[a].innerText &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[b].innerText === boxes[c].innerText
        ) {
            return pattern;
        }
    }
    return null;
};

const highlightWinningBoxes = (pattern) => {
    pattern.forEach((index) => {
        boxes[index].style.backgroundColor = "#ffeb3b";
    });
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
