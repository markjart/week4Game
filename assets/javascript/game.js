$(document).ready(function() {

//Global variables
var charSelect = false;
var oppSelect = false;
var gameOver = false;
var opponentsDefeated = 0;
var player;
var opponent;
var characters = [];
var idFed = ["#kirk", "#spock", "#uhura"];
var idNonFed = ["#gorn", "#khan", "#kor"];

// functions
function endGame() {
	gameOver = true;
	$("#restart").removeClass("invisible");
}

function noOpponentsLeft() {
	var noneRemaining = true;
	var allOpponents = $("#opponentBox > span");
	console.log({allOpponents});
	for (var i = 0; i < allOpponents.length; i++) {
		if ($(allOpponents[i]).hasClass("hesDeadJim")){
		}
		else {
			noneRemaining = false;
		}
	}
	console.log({noneRemaining});
	return noneRemaining;
}

function restartGame() {
// reset everything
}

/*Character object constructor declared here - this rabbit hole was deep and kept me from finishing the game.
	*if you select a federation character the others should be removed but don't.
	*if you select a nonFederation character, the others hide, but then the character selected remains
	*restart button never worked and i never got it working. */
function Character(name, htmlID, alive, life, base, side, imgHTML) {
	this.name = name;
	this.htmlID = htmlID
	this.alive = alive;
	this.life = life;
	this.basePower = base;
	this.power = base;
	this.ctrPower = base;
	this.side = side; //fed or nonFeb
	this.imgHTML = imgHTML;

	var combat = this; 

	this.attack = function () {
		$("#alert").html("You have attacked " + opponent.name + " for " + combat.power + " damage!");
	};
	this.increasePower = function () {
		combat.power += Math.floor(combat.basePower); 
		console.log("my new power is " + combat.power);
	};
	this.ctrAttack = function () {
		$("#alert").append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + opponent.name + " has attacked you for " + combat.ctrPower + " damage!");
		console.log("basePower: " + combat.basePower);
	};
	this.takeDmg = function (damage) {
		combat.life -= damage;
		console.log("my life is: " + combat.life);
	}
	this.death = function () {
    this.alive = false;
		console.log(this.alive);
	};
}

function createChar(name) {
	switch (name) {
		case "kirk" :
			var kirk = new Character("Kirk", "kirk", true, 110, 9, "fed", '<img src="assets/images/captKirk.png" height="100%" width="100%">');
			console.log(kirk);
			charSelect = true;
			return kirk;
			break;
		case "spock" :
			var spock = new Character("Spock", "spock", true, 120, 10, "fed", '<img src="assets/images/spock.png" height="100%" width="100%">');
			console.log(spock);
			charSelect = true;
			return spock;
			break;
		case "uhura" :
			var uhura = new Character("Uhura", "uhura", true, 105, 8, "fed", '<img src="assets/images/uhura.png" height="100%" width="100%">');
			console.log(uhura);
			charSelect = true;
			return uhura;
			break;

		case "gorn" :
			var gorn = new Character("The Gorn", "gorn", true, 150, 15, "nonFed", '<img src="assets/images/gorn.png" height="100%" width="100%">');
			console.log(gorn);
			charSelect = true;
			return gorn;
			break;
		case "khan" :
			var khan = new Character("Khan", "khan", true, 160, 13.5, "nonFed", '<img src="assets/images/khan.png" height="100%" width="100%">');
			console.log(khan);
			charSelect = true;
			return khan;
			break;
		case "kor" :
			var kor = new Character("kor", "kor", true, 140, 13, "nonFed", '<img src="assets/images/kor.png" height="100%" width="100%">');
			console.log(kor);
			charSelect = true;
			return kor;
			break;
		}
}

function game() {
	console.log("game started");

	$("#alert").html("Choose Your Champion!");

	$(".select").on("click", function() {
		var key = $(this).attr("value");
			console.log({key});
			console.log({gameOver});
			console.log({charSelect});
			console.log({oppSelect});
	
		if (gameOver) {
		  $("#alert").html("The game is over. Please click the reset button to restart the game.");
		  $("#opponentsRow").addClass("invisible");
		  return;
		} 

		if (charSelect && !oppSelect) {
			console.log(key, player.name);
			opponent = createChar(key);
			$("#opponent").html(opponent.name);
			$("#oppAvatar").parent().removeClass("invisible");
			$("#oppAvatar").html(opponent.imgHTML);
			$("#oppHealth").html(opponent.life);
			console.log(opponent);
			oppSelect = true;
			console.log({oppSelect});
			$(this).parent().addClass("invisible");
			$("#attack").removeClass("invisible");
			$("#alert").html("Press the attack button to attack your opponent!");
		}
		else if (charSelect === false) { 
			player = createChar(key);
			$("#player").html(player.name);
			$("#playerAvatar").parent().removeClass("invisible");
			$("#playerAvatar").html(player.imgHTML);
			$("#playerHealth").html(player.life);
			console.log(player);
			charSelect = true;
			console.log($(this).attr("id"));
			$("#opponentsRow").removeClass("invisible");
		  
			if (player.side === "fed") {
				console.log(player.side);
				for (var i = 0; i<idFed.length; i++) {
					(($(idNonFed[i])).parent()).detach().appendTo("#opponentBox");
					$(idNonFed[i]).addClass("enemyRow");
				}
			  $("#attack").removeClass("btn-default").addClass("btn-info");
			}
			else if (player.side === "nonFed") {
				for (var i = 0; i<idNonFed.length; i++) {
					if ((("#" + $(this).attr("id"))) !== idNonFed[i]) {
						$(idNonFed[i]).parent().addClass("invisible");
					}
				else if ((("#" + $(this).attr("id"))) === idNonFed[i]) {
					$(idNonFed[i]).addClass("disabled");
					$(idNonFed[i]).click(false);// NOT WORKING
				}
				  (($(idFed[i])).parent()).detach().appendTo("#opponentBox");
				  $(idFed[i]).addClass("enemyRow");
				}
				$("#attack").removeClass("btn-default").addClass("btn-danger");
			}
		  
			$("#alert").html("Choose Your Champion!");
			$("#charSelectRow").addClass("hidden");
		}
	});

	$("#attack").on("click", function() {
		if (gameOver) {
		  $("#alert").html("The challenge is over. Click the reset button to reset the arena.");
		}
		else {
		  console.log("player attacks!");
		  player.attack(opponent);
		  opponent.takeDmg(player.power);
		  console.log(opponent.name + " life is now " + opponent.life);
		  $("#oppHealth").html(opponent.life);
		  player.increasePower();

		  if (opponent.life <= 0) {
			$("#attack").addClass("invisible");
			opponent.death();
			oppSelect = false;

			$("#oppAvatar").html("");
			$("#oppAvatar").parent().addClass("invisible");

			opponentsDefeated++;
			$("#defeated").html(opponentsDefeated);

			console.log(opponent.alive);
			$("#" + opponent.htmlID).parent().addClass("hesDeadJim");
			if(noOpponentsLeft()) {
			  endGame();
			  $("#alert").html("You have defeated your opponents! &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You Win!");
			}
			else {
			  $("#alert").html("You have defeated " + opponent.name + "! &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Choose your next opponent!");
			  console.log("You have defeated " + opponent.name + "!");
			}
			
		  }
		  else if(opponent.alive) {
			console.log("opponent counters!");
			console.log(opponent.ctrAttack);
			console.log(opponent.basePower);
			opponent.ctrAttack(player);
			player.takeDmg(opponent.ctrPower);
			
			console.log(player.name + " life is now " + player.life);
			$("#playerHealth").html(player.life);
			if (player.life <= 0) {
			  player.death();
			  charSelect = false;
			  $("#playerAvatar").html("");
			  console.log(player.alive);
			  endGame();
			  $("#alert").html("You have been defeated! &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Game Over!");
			  console.log("You have been defeated! &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Game Over!");
			}
		  }
		}
	});
}

game();

}); 