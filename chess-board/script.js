const BLACK_COL_CLASSNAME = 'col black_col';
const WHITE_COL_CLASSNAME = 'col white_col';
const RED_COL_CLASSNAME = 'col red_col';

const CHESS_BOARD_ID = '#grid'

const dr = [-1, 1, -1, 1];
const dc = [-1, -1, 1, 1];

const isSumOdd = (n1, n2) => (n1 + n2) % 2 == 1;

const ChessBoard = (rows, cols) => {
	let axis = [-1, -1];
	const resultElement = document.querySelector(CHESS_BOARD_ID);
	
	const setAxis = (r, c) => {
		const [rr, cc] = axis;
		paint(rr, cc, isSumOdd(rr, cc) ? BLACK_COL_CLASSNAME : WHITE_COL_CLASSNAME);
		paint(r, c, RED_COL_CLASSNAME);
		axis = [r, c];
	};
	
	const paint = (r, c, newClassName) => {
		if (r === -1 && c === -1) return;
		for (let i = 0; i <= Math.max(rows, cols); i++) {
			for (let j = 0; j < 4; j++) {
				const nr = r + dr[j] * i;
				const nc = c + dc[j] * i;
				if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
				resultElement.children[nr].children[nc].className = newClassName;
				if (i == 0) break;
			}
		}
	};

	const fragment = document.createDocumentFragment();

	for (let r = 0; r < rows; r++) {
		const rowDiv = document.createElement('div');
		rowDiv.className = 'row';
		for (let c = 0; c < cols; c++) {
			const colDiv = document.createElement('div');
			colDiv.dataset.row = r;
			colDiv.dataset.col = c;
			if (isSumOdd(r, c)) colDiv.className = BLACK_COL_CLASSNAME;
			else colDiv.className = WHITE_COL_CLASSNAME;
			rowDiv.appendChild(colDiv);
		}
		fragment.appendChild(rowDiv);
	}
	resultElement.appendChild(fragment);

	resultElement.addEventListener('click', (e) => {
		let { row, col } = e.target.dataset;
		if (!row || !col) return;
		setAxis(parseInt(row), parseInt(col));
	});
}