window.onbeforeunload = function () {
	return "Scoreboard will reset. Are you sure you want to reload page?";
};

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
let points = [0, 0]; //0-O 1-X
let p1Name, p2Name
// function start(){
// 	let page = document.getElementById("main");
// 	page.style.display = "block";
// }


function start() {
	const startS = document.getElementById("start-screen");
	const mainS = document.getElementById("main");

	startS.style.display = "none";
	mainS.style.display = "block";
	document.getElementById("scoreboard").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("players");
	form.addEventListener("submit", function (event) {
		event.preventDefault(); // Prevent the default form submission
		const formData = new FormData(form);
		// Access individual form fields by name
		p1Name = formData.get("p-1");
		p2Name = formData.get("p-2");
		if (p1Name == "") {
			p1Name = "Player 1";
		}
		if (p2Name == "") {
			p2Name = "Player 2";
		}
		const player1Label = document.getElementById("player1-label");
		const player2Label = document.getElementById("player2-label");
		player1Label.textContent = `${p1Name} `;
		player2Label.textContent = `${p2Name} `;
		// console.log(p1Name);
		// console.log(p2Name);
		start();
	});
});

function retGame(){
	document.getElementById("leaderboard-container").style.display = "none";
	document.getElementById("start-screen").style.display = "block";
}

function reset() {
	//To reset cells and restart
	start();
	for (let i = 0; i < 9; i++) {
		let ele = document.getElementById("b" + (i + 1));
		ele.disabled = false;
		ele.value = "";
		ele.style.color = "white";
		flag = 1;
		document.getElementById("print").innerHTML = "";
		let winScn = document.getElementById("win-screen");
		winScn.style.display = "none";
		document.getElementById("scoreboard").style.display = "none";
	}
	b = ["", "", "", "", "", "", "", "", ""];
}

function scBd() {
	document.getElementById("win-screen").style.display = "none";
	document.getElementById("main").style.display = "none";
	let scoreboard = document.getElementById("scoreboard");
	scoreboard.style.display = "block";
	document.getElementById("nameP1").innerHTML = p1Name;
	document.getElementById("nameP2").innerHTML = p2Name;
	document.getElementById("pointsP1").innerHTML = points[1];
	document.getElementById("pointsP2").innerHTML = points[0];
}

function loadLeaderboard() {
	document.getElementById("start-screen").style.display = "none";
	document.getElementById("leaderboard-container").style.display = "block";

	fetch('leaderboard.json') // Replace 'leaderboard.json' with the path to your JSON file
		.then((response) => response.json())
		.then((data) => {
			const leaderboardTable = document.getElementById('leaderboard-body');

			// Clear the existing leaderboard
			leaderboardTable.innerHTML = '';

			// Sort the leaderboard data by score in descending order
			data.leaderboard.sort((a, b) => b.score - a.score);

			// Update the leaderboard in the HTML as a table
			data.leaderboard.forEach((entry, index) => {
				const row = leaderboardTable.insertRow();
				const rankCell = row.insertCell(0);
				const playerCell = row.insertCell(1);
				const scoreCell = row.insertCell(2);

				rankCell.textContent = index + 1;
				playerCell.textContent = entry.player;
				scoreCell.textContent = entry.score;
			});
		})
		.catch((error) => console.error('Error loading leaderboard data: ' + error));
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

	let winScn = document.getElementById("win-screen");

	if (Win(player)) {
		let winner = (player == "X") ? p1Name : p2Name;
		winScn.style.display = "block";
		winScn.innerHTML = winner + " won";
		winScn.innerHTML += '<br><button id="but" onclick="reset()">RESET</button>'
		winScn.innerHTML += '<br><button class="view-sb" onclick="scBd()">SCOREBOARD</button>'
		points[flag]++;
	} else if (checkTie()) {
		winScn.style.display = "block";
		winScn.innerHTML = "Match Tie";
		winScn.innerHTML += '<br><button id="but" onclick="reset()">RESET</button>'
		winScn.innerHTML += '<br><button class="view-sc" onclick="scBd()">SCOREBOARD</button>'
	}
	else
		flag = flag == 1 ? 0 : 1; //ALternate X and O
}
