/*
 * Creates pixel art grid
 * @param el DOM Element
 * @param rows Number of rows
 * @param rows Number of cols
 */
function PixelArt(el, rows, cols) {
  const resultElement = document.querySelector(el);
	
	const fragment = document.createDocumentFragment();
	for (let i=0; i<rows; i++) {
		const rowDiv = document.createElement('div');
		rowDiv.className = 'row';
		for (let j=0; j<cols; j++) {
			const colDiv = document.createElement('div');
			colDiv.className = 'col';
			rowDiv.appendChild(colDiv);
		}
		fragment.appendChild(rowDiv);
	}
	resultElement.appendChild(fragment);
	
}