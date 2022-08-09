import { HTML_IDS, HTML_CLASSES, HTML_LABELS } from './constants.js';
import useMemoryGame from './useMemoryGame.js';

const { CURR_SCORE_ID, HIGH_SCORE_ID, BUTTON_ID, BOARD_ID } = HTML_IDS;
const {
	SCORE_CLASSNAME,
	HEADER_CLASSNAME,
	CELL_CLASSNAME,
	FOOTER_CLASSNAME,
} = HTML_CLASSES;
const { SCORE_LABEL, HIGH_SCORE_LABEL, BUTTON_LABEL } = HTML_LABELS;

export const makeHTML = () => {
	const { highScore } = useMemoryGame();

	const scoreDiv = document.createElement('div');
	scoreDiv.innerHTML = `${SCORE_LABEL}: 0`;
	scoreDiv.id = CURR_SCORE_ID;
	scoreDiv.className = SCORE_CLASSNAME;

	const highScoreDiv = document.createElement('div');
	highScoreDiv.innerHTML = `${HIGH_SCORE_LABEL}: ${highScore}`;
	highScoreDiv.id = HIGH_SCORE_ID;
	highScoreDiv.className = SCORE_CLASSNAME;

	const headerDiv = document.createElement('div');
	headerDiv.className = HEADER_CLASSNAME;
	headerDiv.appendChild(scoreDiv);
	headerDiv.appendChild(highScoreDiv);

	const boardDiv = document.createElement('div');
	boardDiv.id = BOARD_ID;
	for (let i = 0; i < 5; i++) {
		const cellDiv = document.createElement('div');
		cellDiv.classList.add(CELL_CLASSNAME);
		cellDiv.id = `${i}th_cell`;
		boardDiv.appendChild(cellDiv);
	}

	const footerDiv = document.createElement('div');
	footerDiv.className = FOOTER_CLASSNAME;

	const buttonEl = document.createElement('button');
	buttonEl.innerHTML = BUTTON_LABEL;
	buttonEl.id = BUTTON_ID;
	footerDiv.appendChild(buttonEl);

	const resultFragment = document.createDocumentFragment();
	resultFragment.appendChild(headerDiv);
	resultFragment.appendChild(boardDiv);
	resultFragment.appendChild(footerDiv);
	return resultFragment;
};