const COLOR_SPOTTER_ID = '#color-spotter';
const SCORE_ID = '#score';

const ColorSpotter = (n) => {
	let resultElement = document.querySelector(COLOR_SPOTTER_ID);
	resultElement.appendChild(createGridOf(n));
	Score(n);
}

const createGridOf = (n) => {
	const r = getRandomIntLessThan(n);
	const c = getRandomIntLessThan(n);
	const { color, oddColor } = getRandomColors();

	const spotterElement = document.querySelector(COLOR_SPOTTER_ID);
	const scoreElement = document.querySelector(SCORE_ID);

	const fragment = document.createDocumentFragment();
	for (let i = 0; i < n; i++) {
		const rowDiv = document.createElement('div');
		rowDiv.className = 'row';
		for (let j = 0; j < n; j++) {
			const colDiv = document.createElement('div');
			colDiv.className = 'col';

			if (i === r && j === c) {
				colDiv.style.background = oddColor;
				colDiv.addEventListener('click', () => {
					spotterElement.innerHTML = '';
					ColorSpotter(n + 1);
					scoreElement.innerHTML = '';
					Score(n + 1);
				});
			} else {
				colDiv.style.background = color;
				colDiv.addEventListener('click', (event) => {
					spotterElement.classList.add('shake');
					setTimeout(() => {
						spotterElement.classList.remove('shake');
					}, 400);
					spotterElement.innerHTML = '';
					ColorSpotter(4);
					scoreElement.innerHTML = '';
					Score(4);
				});
			}

			rowDiv.appendChild(colDiv);
		}
		fragment.appendChild(rowDiv);
	}
	return fragment;
};

const getRandomIntLessThan = (n) => {
	return Math.floor(Math.random() * n);
};

const getRandomColors = function () {
	var ratio = 0.618033988749895;

	var hue = (Math.random() + ratio) % 1;
	var saturation = Math.round(Math.random() * 100) % 85;
	var lightness = Math.round(Math.random() * 100) % 85;

	var color = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + lightness + '%)';
	var oddColor = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + (lightness + 5) + '%)';

	return {
		color,
		oddColor,
	};
};

function Score(n) {
	const titleDiv = document.createElement('div');
	titleDiv.innerHTML = `Score: ${n-4}`;
	
	const frameDiv = document.createElement('div');
	frameDiv.className = 'frame';
	frameDiv.appendChild(titleDiv);
	
	const scoreElement = document.querySelector('#score');
	scoreElement.appendChild(frameDiv);
}