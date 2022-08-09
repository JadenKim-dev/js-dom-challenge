import { HTML_IDS, HTML_CLASSES, HTML_LABELS, DURATIONS } from './constants.js';
import { makeHTML } from "./htmlFactory.js";
import useMemoryGame from './useMemoryGame.js';
const { BUTTON_ID } = HTML_IDS;

function MemoryGame(el) {
	const { gameStart } = useMemoryGame();
	
	const htmlResult = makeHTML();
	const targetElement = document.querySelector(el);
	targetElement.appendChild(htmlResult);
	
	document.getElementById(BUTTON_ID).addEventListener('click', () => {
		gameStart(1);
	});
}

MemoryGame("#memory-game");