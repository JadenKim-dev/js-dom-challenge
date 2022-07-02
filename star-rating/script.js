/*
 * Creates star rating functionality
 * @param el DOM Element
 * @param count Number of stars
 * @param callback Returns selected star count to callback
 */

const BLANK_STAR_CLASSNAME = 'fa fa-star-o';
const FILLED_STAR_CLASSNAME = 'fa fa-star';

function Star(el, count, callback) {
	let clickedRating = 0;
	const setClickedRating = (newRating) => {
		clickedRating = newRating;
		callback(clickedRating);
	}
	
	const resultElement = document.querySelector(el);
	const fillStarUnder = (rating) => {
		resultElement.childNodes.forEach((element, index) => {
			if (element.dataset.rating <= rating)
				element.className = FILLED_STAR_CLASSNAME;
			else
				element.className = BLANK_STAR_CLASSNAME;
		});
	}
	
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
	resultElement.appendChild(fragment);
}