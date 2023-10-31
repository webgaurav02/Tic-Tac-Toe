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

function reset() { //To reset cells and restart
	location.reload();
	b = ["", "", "", "", "", "", "", "", ""];
}

function lock(x, y, z) { //Function to disable cell once it is used
	for (let i = 0; i < 9; i++) {
		let btn = document.getElementById("b" + (i + 1));
		if (i != x && i != y && i != z) {
			btn.disabled = true;
		} else {
			btn.style.color = "red";
		}
	}
}

function Win(player) { //To check if any winning combination matches
	for (const combo of winningCombos) {
		let [x, y, z] = combo;
		if (b[x] === player && b[y] === player && b[z] === player) {
			lock(x, y, z);
			return true;
		}
	}
	return false;
}

function checkTie() { //To check if its a tie;
	for (let i = 0; i < 9; i++) {
		if (b[i] == "") {
			return false;
		}
	}
	return true;
}


flag = 1;
function tic(n) {
	let ele = document.getElementById("b" + n);
	let player = (flag == 1) ? 'X' : 'O';
	flag = (flag == 1) ? 0 : 1; //ALternate X and O
	ele.disabled = true; //lock the cell after value is put
	ele.value = player; //Put X or O in cell

	// Display winner or continue
	for (let i = 0; i < 9; i++) {
		b[i] = document.getElementById("b" + (i + 1)).value;
	}

	let display = document.getElementById("print")
	
	if (Win(player)) {
		display.innerHTML = "Player "+player+" won";
	} 
	else if (checkTie()) {
		display.innerHTML = "Match Tie";
	} 
	else {
		display.innerHTML = "Player "+player+" Turn";
	}
}


