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


$(document).ready(function(){
	$('#obiWanKenobe-hp').html(obiWanKenobe.hp)
	$('#lukeSkywalker-hp').html(lukeSkywalker.hp)
	$('#darthSidious-hp').html(darthSidious.hp)
	$('#darthMaul-hp').html(darthMaul.hp)

	$('img').on('click', function(event){
		console.log($(event.target).parent().attr('id'))
		input = $(event.target).parent().attr('id')
		console.log(input)
		if (obiWanKenobe.enemy == true && lukeSkywalker.enemy == true && darthSidious.enemy == true && darthMaul.enemy == true) {
			$('#attackUpdate').empty()
			$('#counterUpdate').empty()
			selectCharacter(input)
		}else if ((obiWanKenobe.enemy == false || lukeSkywalker.enemy == false || darthSidious.enemy == false || darthMaul.enemy == false) && $('#defender').has('img').length == 0) {
			// console.log('in the select enemy block')
			$('#attackUpdate').empty()
			$('#counterUpdate').empty()
			selectEnemy(input)
			$('#defeatedMessage').remove()
		}
	})
	$('button').on('click', function(event){
		inputB = event.target.value
		// console.log('button clicked')
		// console.log(inputB)
		// console.log(event.target.id)
		if (inputB == 'attack' && $('#defender').has('div').length > 0){
			var good = eval($('#your-character div').first().attr('id'))
			var bad = eval($('#defender div').first().attr('id'))
			if (good.hp <= 0) {
				$('#attackUpdate').remove()
				$('#counterUpdate').remove()
				$('#defender').append('<p>You have been defeated...GAME OVER</p>')
				$('#defender').append('<button id="resetButton" value="reset">Reset</button>')
			}else if (bad.hp <=0) {
				$('#attackUpdate').empty()
				$('#counterUpdate').empty()
				$('#' + bad.identity).remove()
				$('#defender').append('<p id="defeatedMessage">You have defeated ' + bad.name + ', you can choose to fight another enemey</p>')
			}else {
				$('#attackUpdate').html('You attacked ' + bad.name + ' for ' + good.attack + ' damage.')
				$('#counterUpdate').html(bad.name + ' attacked you back for ' + bad.counterAttack + ' damage.')
				
				good.attackEnemy(bad)
				
				if (good.hp <= 0) {
					$('#attackUpdate').remove()
					$('#counterUpdate').remove()
					$('#defender').append('<p>You have been defeated...GAME OVER</p>')
					$('.container').append('<button id="resetButton" value="reset">Reset</button>')
				}else if (bad.hp <=0) {
					$('#attackUpdate').empty()
					$('#counterUpdate').empty()
					$('#' + bad.identity).remove()
					$('#defender').append('<p id="defeatedMessage">You have defeated ' + bad.name + ', you can choose to fight another enemey</p>')
				}else if ($('#enemies').has('div').length == 0 && $('defender').has('div').length ==0) {
					$('#attackUpdate').empty()
					$('#counterUpdate').empty()
					$('#' + bad.identity).remove()
					$('#defender').append('<p>You won!!!! GAME OVER!!!!!</p>')
					$('.container').append('<button id="resetButton" value="reset">Reset</button>')
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
		}else {
			$('#attackUpdate').html('No enemy here.')
		}
	})
})

