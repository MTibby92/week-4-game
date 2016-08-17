var obiWanKenobe = {
	identity: 'obiWanKenobe',
	name: 'Obi-Wan Kenobe',
	hp: 120,
	attack: 8,
	counterAttack: 7,
	enemy: true,
	attackEnemy: function(player) {
		player.hp -= this.attack
		obiWanKenobe.attack += 8
	},
	counterPlayer: function(player) {
		player.hp -= this.counterAttack
	}
}

var lukeSkywalker = {
	identity: 'lukeSkywalker',
	name: 'Luke Skywalker',
	hp: 100,
	attack: 10,
	counterAttack: 5,
	enemy: true,
	attackEnemy: function(player) {
		player.hp -= this.attack
		lukeSkywalker.attack += 10
	},
	counterPlayer: function(player) {
		player.hp -= this.counterAttack
	}
}

var darthSidious = {
	identity: 'darthSidious',
	name: 'Dark Sidious',
	hp: 150,
	attack: 6,
	counterAttack: 20,
	enemy: true,
	attackEnemy: function(player) {
		player.hp -= this.attack
		darthSidious.attack += 6
	},
	counterPlayer: function(player) {
		player.hp -= this.counterAttack
	}
}

var darthMaul = {
	identity: 'darthMaul',
	name: 'Darth Maul',
	hp: 180,
	attack: 5,
	counterAttack: 25,
	enemy: true,
	attackEnemy: function(player) {
		player.hp -= this.attack
		darthMaul.attack += 5
	},
	counterPlayer: function(player) {
		player.hp -= this.counterAttack
	}
}

var charArray = [obiWanKenobe, lukeSkywalker, darthSidious, darthMaul]



function selectCharacter(input) {
	$('#'+input).appendTo('#your-character')

	for (char in charArray) {
		if (charArray[char].identity == input) {
			charArray[char].enemy = false
		}
	}

	for (char in charArray) {
		if (charArray[char].enemy == true){
			$('#' + charArray[char].identity).appendTo('#enemies')
		}
	}
}

function selectEnemy(input){
	$('#'+input).appendTo('#defender')
}

function reset() {
	console.log('reset function has begun')
	$('#select').empty()
	$('#your-character').empty()
	$('#enemies').empty()
	$('#attackButton').prop("disabled",false)
	$('#options').empty()
	$('#defender').empty()
	$('#attackUpdate').empty()
	$('#counterUpdate').empty()

	$('#select').append('<div id="obiWanKenobe" class="character"><p>Obi-Wan Kenobe</p><img src="./assets/images/obiwan.jpg" alt="Obi-Wan Kenobe image"><p id="obiWanKenobe-hp"></p></div>')
	$('#select').append('<div id="lukeSkywalker" class="character"><p>Luke Skywalker</p><img src="./assets/images/skywalker.jpeg" alt="Luke Skywalker image"><p id="lukeSkywalker-hp"></p></div>')
	$('#select').append('<div id="darthSidious" class="character"><p>Darth Sidious</p><img src="./assets/images/sidious.jpg" alt="Darth Sidious image"><p id="darthSidious-hp"></p></div>')
	$('#select').append('<div id="darthMaul" class="character"><p>Darth Maul</p><img src="./assets/images/maul.jpeg" alt="Darth Maul image"><p id="darthMaul-hp"></p></div>')

	$('#options').append('<h2>Fight Section</h2>')
	$('#options').append('<button id="attackButton" value="attack">Attack</button>')

	$('#resetButton').hide()

	obiWanKenobe.hp = 120
	obiWanKenobe.attack = 8
	obiWanKenobe.enemy = true

	lukeSkywalker.hp = 100
	lukeSkywalker.attack = 10
	lukeSkywalker.enemy = true

	darthSidious.hp = 150
	darthSidious.attack = 6
	darthSidious.enemy = true

	darthMaul.hp = 180
	darthMaul.attack = 5
	darthMaul.enemy = true

	$('#obiWanKenobe-hp').html(obiWanKenobe.hp)
	$('#lukeSkywalker-hp').html(lukeSkywalker.hp)
	$('#darthSidious-hp').html(darthSidious.hp)
	$('#darthMaul-hp').html(darthMaul.hp)

	runGame()
}

function runGame() {
	//contains the onclick events
	$('img').on('click', function(event){
		console.log($(event.target).parent().attr('id'))
		//when image is clicked, stores the id of the div container in input
		input = $(event.target).parent().attr('id')
		console.log(input)
		//checks if a character has been selected yet; if not runs the select character function
		if (obiWanKenobe.enemy == true && lukeSkywalker.enemy == true && darthSidious.enemy == true && darthMaul.enemy == true) {
			$('#attackUpdate').empty()
			$('#counterUpdate').empty()
			selectCharacter(input)
		//checks if there is a character selected and if the defender div is empty; if so allows you to select an enemy to fight
		}else if ((obiWanKenobe.enemy == false || lukeSkywalker.enemy == false || darthSidious.enemy == false || darthMaul.enemy == false) && $('#defender').has('img').length == 0) {
			// console.log('in the select enemy block')
			$('#attackUpdate').empty()
			$('#counterUpdate').empty()
			selectEnemy(input)
			$('#defeatedMessage').remove()
		}
	})
	$('button').on('click', function(event){
		//checks the value of the button selected and stores in inputB
		inputB = event.target.value
		// console.log('button clicked')
		console.log(inputB)
		console.log(event.target.id)
		//checks if the attack button was selected and if there is a character in the defender div; if so enters the fighting loop
		if (inputB == 'attack' && $('#defender').has('div').length > 0){
			//stores the selected string and converts it to the object it refers to
			var good = eval($('#your-character div').first().attr('id'))
			var bad = eval($('#defender div').first().attr('id'))
			//checks if your character has an hp left; if not you lose
			if (good.hp <= 0) {
				$('#attackUpdate').empty()
				$('#counterUpdate').empty()
				$('#defender').append('<p>You have been defeated...GAME OVER</p>')
				$('#resetButton').show()
			//checks if the enemy has an hp; if not tells you you defeated them and removes the character from the defender div
			}else if (bad.hp <=0) {
				$('#attackUpdate').empty()
				$('#counterUpdate').empty()
				$('#' + bad.identity).remove()
				$('#defender').append('<p id="defeatedMessage">You have defeated ' + bad.name + ', you can choose to fight another enemey</p>')
			//checks if there is still an enemy in the defender div and if there are still any enemies left to choose from; if there aren't any in either then displays the win messaging and the reset button
			}else if ($('#enemies').has('div').length == 0 && $('#defender').has('div').length ==0) {
					$('#attackUpdate').empty()
					$('#counterUpdate').empty()
					$('#' + bad.identity).hide()
					$('#defender').append('<p>You won!!!! GAME OVER!!!!!</p>')
					$('#resetButton').show()
					$('#attackButton').prop("disabled",true)
			//otherwise, the attack functionality will run
			}else {
				$('#attackUpdate').html('You attacked ' + bad.name + ' for ' + good.attack + ' damage.')
				$('#counterUpdate').html(bad.name + ' attacked you back for ' + bad.counterAttack + ' damage.')
				
				good.attackEnemy(bad)
				console.log('does it repeat the hit twice? line 188')
				
				if (good.hp <= 0) {
					$('#attackUpdate').empty()
					$('#counterUpdate').empty()
					$('#defender').append('<p>You have been defeated...GAME OVER</p>')
					$('#resetButton').show()
				}else if (bad.hp <=0) {
					$('#attackUpdate').empty()
					$('#counterUpdate').empty()
					$('#' + bad.identity).remove()
					$('#defender').append('<p id="defeatedMessage">You have defeated ' + bad.name + ', you can choose to fight another enemey</p>')
				}else if ($('#enemies').has('div').length == 0 && $('defender').has('div').length ==0) {
					$('#attackUpdate').empty()
					$('#counterUpdate').empty()
					$('#' + bad.identity).hide()
					$('#defender').append('<p>You won!!!! GAME OVER!!!!!</p>')
					$('#resetButton').show()
					$('#attackButton').prop("disabled",true)
				}

				if (bad.hp > 0){
					bad.counterPlayer(good)
					$('#' + good.identity + '-hp').html(good.hp)
					$('#' + bad.identity + '-hp').html(bad.hp)
				}

				

				//console.log(good.hp)
				//console.log(good.attack)
				//console.log(bad.hp)
			}
		}else if (inputB == 'reset') {
			console.log('reset button press detected')
			reset()
		}else if (inputB == 'attack' && $('#defender').has('div').length == 0) {
			$('#defeatedMessage').empty()
			$('#attackUpdate').html('No enemy here.')
		}
	})
	// $('#resetButton').on('click', function(event) {
	// 	console.log('reset button click detected in separate listener')
	// 	reset()
	// })
}



$(document).ready(function(){
	//code for displaying the hp for each character in the html initally
	$('#resetButton').hide()
	$('#obiWanKenobe-hp').html(obiWanKenobe.hp)
	$('#lukeSkywalker-hp').html(lukeSkywalker.hp)
	$('#darthSidious-hp').html(darthSidious.hp)
	$('#darthMaul-hp').html(darthMaul.hp)
	runGame()
})

