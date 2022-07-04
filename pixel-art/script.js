/*
 * Creates pixel art grid
 * @param el DOM Element
 * @param rows Number of rows
 * @param rows Number of cols
 */

const PALLETE_CLASSNAME = 'pallete'

const getRandomColorCode = () => (
	'#' + Math.floor(Math.random()*16777215).toString(16)
)

function PixelArt(el, rows, cols) {
	let selectedColor = '';
	let isDragging = false;
	
  const resultElement = document.querySelector(el);
	const fragment = document.createDocumentFragment();
	
	for (let i=0; i<rows+1; i++) {
		const rowDiv = document.createElement('div');
		rowDiv.className = 'row';
		for (let j=0; j<cols; j++) {
			const colDiv = document.createElement('div');
			colDiv.className = 'col';
			
			if(i === rows) {
				colDiv.classList.add(PALLETE_CLASSNAME)
				const colorCode = getRandomColorCode();
				colDiv.style.background = colorCode;
				colDiv.addEventListener('click', () => {
					selectedColor = colorCode;
				})
			} else {
				colDiv.addEventListener('click', () => {
					colDiv.style.background = selectedColor;
				})
			
				colDiv.addEventListener('mousedown', () => {
					isDragging = true;
				})
				colDiv.addEventListener('mousemove', (event) => {
					if (!isDragging || event.target.classList.contains(PALLETE_CLASSNAME)) return;
					event.target.style.background = selectedColor;
				})
				colDiv.addEventListener('mouseup', () => {
					isDragging = false;
				})

			} 
			
			rowDiv.appendChild(colDiv);
		}
		fragment.appendChild(rowDiv);
	}
	resultElement.appendChild(fragment);
}