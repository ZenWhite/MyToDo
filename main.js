const game = document.querySelector('.game'),
      gameItems = document.querySelectorAll('.move-item'),
      gameValues = ['stone', 'scirros', 'paper'];
let   yourHealth = document.querySelectorAll('.your-health .health-item'),
      enemyHealth = document.querySelectorAll('.enemy-health .health-item'),
      lastHeathElement1 = yourHealth.length - 1,
      lastHeathElement2 = enemyHealth.length - 1;

game.addEventListener('click', function(e) {
	if(e.target.classList.contains('start')) {
		document.querySelector('.start-block').classList.add('display-block');
		document.querySelector('.game__block').classList.remove('display-block');
		document.querySelector('body').style.display = 'block';
	}
});

for(item of gameItems) {
	item.addEventListener('click', function() {
		let moveValue = Math.floor( Math.random() * gameValues.length );

		if(this.dataset.value == gameValues[moveValue]) moveValue = Math.floor( Math.random() * gameValues.length );
		if(this.dataset.value == 'paper' && gameValues[moveValue] == 'scirros') removeYourHealth();
		if(this.dataset.value == 'scirros' && gameValues[moveValue] == 'paper') removeEnemyHealth();
		if(this.dataset.value == 'scirros' && gameValues[moveValue] == 'stone') removeYourHealth();
		if(this.dataset.value == 'stone' && gameValues[moveValue] == 'scirros') removeEnemyHealth();
		if(this.dataset.value == 'stone' && gameValues[moveValue] == 'paper') removeYourHealth();
		if(this.dataset.value == 'paper' && gameValues[moveValue] == 'stone') removeEnemyHealth();
	});
}

const removeYourHealth = () => {
	alert('- одна ваша жизнь');
    yourHealth[lastHeathElement1].parentNode.removeChild(yourHealth[lastHeathElement1]);
	console.log(lastHeathElement1);
	lastHeathElement1--;
	if (document.querySelector('.health-block').innerHTML == '' || document.querySelector('.your-health .health-block').innerHTML == 0) {
		setTimeout( function() {
			alert('проигрыш!');
		    setTimeout( function() {
			    location.reload();
		    }, 500 );
		}, 300 );
	} 
}

const removeEnemyHealth = () => {
	alert('- одна жизнь противника');
	enemyHealth[lastHeathElement2].parentNode.removeChild(enemyHealth[lastHeathElement2]);
	console.log(lastHeathElement2);
	lastHeathElement2--;
	if (document.querySelector('.health-block').innerHTML == '' || document.querySelector('.enemy-health .health-block').innerHTML == 0) {
		setTimeout( function() {
			alert('выигрыш!');
		    setTimeout( function() {
			    location.reload();
		    }, 500 );
		}, 300 ); 
	} 
}