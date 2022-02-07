/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/
let squares, turn, winner, turnCount, T

/*------------------------ Cached Element References ------------------------*/
const board = document.querySelector(".board")
const gameStatus = document.querySelector("#message")
const gameSquares = document.querySelectorAll(".square")
const resetButton = document.getElementById("reset-button");

/*----------------------------- Event Listeners -----------------------------*/
board.addEventListener("click", handleClick); 
resetButton.addEventListener("click", init);

/*-------------------------------- Functions --------------------------------*/

init();
function init() {
	squares = [
		null, null, null, 
		null, null, null, 
		null, null, null];
	message = "X Goes First"
	resetButton.setAttribute("hidden", true)	
	turn = 1
	turnCount = 0
	winner = null;
	render();
}
function handleClick(event) {	
	const index = event.target.id.replace('sq', '')
	if (winner) {
		return
	}
	if (squares[index] !== null) {
		return
	} 
	// X 5.2; 5.4; 5.5
	squares[index] = turn
	turn *= -1
	turnCount += 1
	resetButton.removeAttribute("hidden")
	getWinner()
	render()
}
function render() {
	gameStatus.textContent = message
	squares.forEach((square, idx) => {
		if (square === 1) {
			gameSquares[idx].textContent = 'X'
			gameSquares[idx].style.backgroundColor = '#F6D1D9';
		} else if (square === -1) {
			gameSquares[idx].textContent = '0'
			gameSquares[idx].style.backgroundColor = '#F7F0A8';
		} else if (square === null) {
			gameSquares[idx].textContent = ''
			gameSquares[idx].style.backgroundColor = '';
		}
	})
	if (winner === null) {
			message = turn === -1 ? "O's Turn" : "X's Turn"
	}	
} 
function getWinner(){
	winningCombos.forEach((combo) => {
	if (squares[combo[0]]+
			squares[combo[1]]+
			squares[combo[2]]=== 3) {
			winner = 1	
			message = 'X wins!'
			} else if (squares[combo[0]]+
				squares[combo[1]]+
				squares[combo[2]] === -3) {
				winner = -1	
				message = 'O Wins!'
			} else if (turnCount === 9) {
				winner = 'T'
				message = "This game is a tie!"
			}
			resetButton.removeAttribute("hidden")
		})
		
		render()
}
	

