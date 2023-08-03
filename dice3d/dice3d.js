function rollCube(die) {
	var xRand = getRandom(8, -8) * 90;
	var yRand = getRandom(8, -8) * 90;

	die.style.transform = 'rotateX(' + xRand + 'deg) rotateY(' + yRand + 'deg)';
	console.log(getResult(xRand, yRand));
}

function getRandom(max, min) {
	let rand = Math.random();
	rand *= (max - min + 1);
	rand += min;
	return Math.floor(rand);
}

function posMod(n, m) {
	return ((n % m) + m) % m;
}

function getResult(rotX, rotY) {
	let countX = posMod(rotX / 90, 4);
	if (countX === 1) return 6; // bottom
	if (countX === 3) return 5; // top

	let countY = posMod(rotY / 90 + countX, 4);
	
	return [1, 4, 2, 3][countY];
}
