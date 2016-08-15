var obiWanKenobe = {
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




$(document).ready(function(){
	$('img').on('click', function(event){
		input = event.target.id
		console.log(input)
	})
})

