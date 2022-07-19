const BLANK_STAR_CLASSNAME = 'fa fa-star-o';
const FILLED_STAR_CLASSNAME = 'fa fa-star';

function ProgressBar(el) {
	let clickedRating = 0;
	const setClickedRating = (newRating) => {
		clickedRating = newRating;
		callback(clickedRating);
	}
	
	const resultElement = document.querySelector(el);

	const fragment = document.createDocumentFragment();
	for (let i = 1; i <= count; i++) {
		const element = document.createElement('i');
		element.className = BLANK_STAR_CLASSNAME;
		element.dataset.rating = i;
		element.addEventListener('mouseover', (event) => {
			fillStarUnder(i);
		});
		element.addEventListener('click', (event) => {
			setClickedRating(i);
		})
		element.addEventListener('mouseleave', (event) => {
			fillStarUnder(clickedRating);
		})
		fragment.appendChild(element);
	}
	
	const button = document.createElement('button');
	button.innerHTML = "Run";
	
	resultElement.appendChild(fragment);
}