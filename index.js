flag = 1;

const winningCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

let b = ["", "", "", "", "", "", "", "", ""]; //Array to store all cell values
let p1Name, p2Name;
let winCount = [0, 0]; //0-O 1-X
// function start(){
// 	let page = document.getElementById("main");
// 	page.style.display = "block";
// }

function start() {
	const startS = document.getElementById("start-screen");
	const mainS = document.getElementById("main");

	// Add a click event listener to the Start button
	startS.style.display = "none";
	mainS.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {

	const form = document.getElementById("players");

	form.addEventListener("players", function (event) {
		event.preventDefault(); // Prevent the default form submission
		const formData = new FormData(form);
		// Access individual form fields by name
		p1Name = formData.get("p-1");
		p2Name = formData.get("p-2");
		console.log(p1Name);
		console.log(p2Name);
	});

});

function reset() {
	//To reset cells and restart
	start();
	for (let i = 0; i < 9; i++) {
		let ele = document.getElementById("b" + (i + 1));
		ele.disabled = false;
		ele.value = "";
		ele.style.color = "black";
		flag = 1;  

	}
	b = ["", "", "", "", "", "", "", "", ""];
}

function lock(x, y, z) {
	//Function to disable cell once it is used
	for (let i = 0; i < 9; i++) {
		let btn = document.getElementById("b" + (i + 1));
		if (i != x && i != y && i != z) {
			btn.disabled = true;
		} else {
			btn.style.color = "red";
		}
	}
}


function Win(player) {
	//To check if any winning combination matches
	for (const combo of winningCombos) {
		let [x, y, z] = combo;
		if (b[x] === player && b[y] === player && b[z] === player) {
			lock(x, y, z);
			return true;
		}
	}
	return false;
}

function checkTie() {
	//To check if its a tie;
	for (let i = 0; i < 9; i++) {
		if (b[i] == "") {
			return false;
		}
	}
	return true;
}

function tic(n) {
	let ele = document.getElementById("b" + n);
	let player = (flag == 1) ? "X" : "O";
	ele.disabled = true; //lock the cell after value is put
	ele.value = player; //Put X or O in cell

	// Display winner or continue
	for (let i = 0; i < 9; i++) {
		b[i] = document.getElementById("b" + (i + 1)).value;
	}

	let display = document.getElementById("print");
	
	if (Win(player)) {
		display.innerHTML = "Player " + player + " won";
		winCount[flag]++;
	} else if (checkTie()) {
		display.innerHTML = "Match Tie";
	}
	flag = flag == 1 ? 0 : 1; //ALternate X and O
}
