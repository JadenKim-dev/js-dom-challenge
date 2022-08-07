const CONTAINER_ID = 'progresBarContainer';
const GAUGE_ID = 'progresBarGauge';
const BUTTON_ID = 'progresBarButton';
const BUTTON_INITIAL_TEXT = 'Run';
const LOADING_CLASSNAME = 'loading';

const findButton = () => document.querySelector(`#${BUTTON_ID}`);

const findGauge = () => document.querySelector(`#${GAUGE_ID}`)

function ProgressBar(el) {
	let interval;
	
	let loadingCnt = 0;
	const increaseLoadingCnt = () => {
		if (loadingCnt === 0) {
			const gauge = findGauge();
			gauge.className = LOADING_CLASSNAME;
		}
		loadingCnt += 1;
		const button = findButton();
		window.button = button;
		button.innerHTML = `${BUTTON_INITIAL_TEXT} ${loadingCnt}`;
	}
	
	const decreaseLoadingCnt = () => {
		loadingCnt -= 1;
		
		const gauge = findGauge();
		gauge.className = '';
		void gauge.offsetWidth;
		
		const button = findButton();
		if (loadingCnt	<= 0) {
			button.innerHTML = BUTTON_INITIAL_TEXT;
			interval = clearInterval(interval);
		} else {
			gauge.className = LOADING_CLASSNAME;
			button.innerHTML = `${BUTTON_INITIAL_TEXT} ${loadingCnt}`;
		}
	}
	
	const container = document.createElement('div');
	container.id = CONTAINER_ID;
	
	const gauge = document.createElement('div');
	gauge.id = GAUGE_ID;
	container.appendChild(gauge);
	
	const onClickButton = () => {
		increaseLoadingCnt();
		
		if (!interval) {
			interval = setInterval((button) => {
				decreaseLoadingCnt();
			}, 3000);
		}
	}

	const button = document.createElement('button');
	button.id = BUTTON_ID
	button.innerHTML = BUTTON_INITIAL_TEXT;
	button.addEventListener('click', onClickButton);
	
	const resultElement = document.querySelector(el);
	resultElement.appendChild(container);
	resultElement.appendChild(button);
}