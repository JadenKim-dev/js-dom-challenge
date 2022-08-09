import { HTML_IDS, HTML_CLASSES, HTML_LABELS, DURATIONS, CELL_NUM } from './constants.js';

const { BUTTON_ID, CURR_SCORE_ID, HIGH_SCORE_ID, BOARD_ID } = HTML_IDS;
const {
	SHAKED_CLASSNAME,
	ACTIVE_CELL_CLASSNAME,
	WRONG_CELL_CLASSNAME,
} = HTML_CLASSES;
const { SCORE_LABEL, HIGH_SCORE_LABEL } = HTML_LABELS;
const { PER_CELL_DURATION, COLOR_DURATION } = DURATIONS

import { getRandomSequenceOf } from './utils.js';

const useMemoryGame = () => {
	
	let buttonEl;
	let scoreEl;
	let boardEl;
	let highScoreEl;
	
	const initElementsFromDoc = () => {
		buttonEl = document.getElementById(BUTTON_ID);
		scoreEl = document.getElementById(CURR_SCORE_ID);
		boardEl = document.getElementById(BOARD_ID);
		highScoreEl = document.getElementById(HIGH_SCORE_ID);
	}
	
	let currentScore = 0;
	const storedHighScore = Number(localStorage.getItem(HIGH_SCORE_ID));
	let highScore = storedHighScore ? storedHighScore : 0;
	
	const setHighScore = (newScore) => {
		highScore = newScore;
		localStorage.setItem(HIGH_SCORE_ID, highScore);
		highScoreEl.innerHTML = `${HIGH_SCORE_LABEL}: ${highScore}`;
	}
	
	const increaseCurrentScore = () => {
		currentScore += 1;
		scoreEl.innerHTML = `${SCORE_LABEL}: ${currentScore}`;
		if (currentScore > highScore) {
			setHighScore(currentScore);
		}
		gameStart(currentScore+1);
	};
	
	const resetCurrentScore = () => {
		currentScore = 0;
		scoreEl.innerHTML = `${SCORE_LABEL}: ${currentScore}`;
		buttonEl.disabled = false;
	}
	
	const gameStart = async (stage) => {
		if(!buttonEl) {
			initElementsFromDoc();	
		}
		
		buttonEl.disabled = true;

		const answerArr = getRandomSequenceOf(stage, CELL_NUM);
		await showAnswer(answerArr);
		const isValidAnswer = await getInputAndValidate(answerArr);

		if (isValidAnswer) {
			increaseCurrentScore();
		} else {
			resetCurrentScore();
		}
	};
	
	const showAnswer = (answerArr) =>
		new Promise((resolve) => {
			let idx = 0;
			const interval = setInterval(() => {
				const currCellNum = answerArr[idx];
				const cellEl = document.getElementById(`${currCellNum}th_cell`);
				cellEl.classList.add(ACTIVE_CELL_CLASSNAME);
				setTimeout(() => {
					cellEl.classList.remove(ACTIVE_CELL_CLASSNAME);
				}, COLOR_DURATION);

				idx += 1;
				
				if (idx === answerArr.length) {
					clearInterval(interval);
					setTimeout(() => {
						resolve();	
					}, COLOR_DURATION)
				}
			}, PER_CELL_DURATION);
		});

	const getInputAndValidate = (answerArr) =>
		new Promise((resolve) => {
			const userInput = [];

			const userInputHandler = (e) => {
				const { target: selectedCell } = e;
				const currCellNum = Number(selectedCell.id.substring(0, 1));
				userInput.push(currCellNum);
				const subAnsArr = answerArr.slice(0, userInput.length);
				if (JSON.stringify(subAnsArr) !== JSON.stringify(userInput)) {
					boardEl.removeEventListener('click', userInputHandler);
					onIncorrectClick(selectedCell);
					resolve(false);
				}
				
				onCorrectClick(selectedCell);

				if (userInput.length === answerArr.length) {
					boardEl.removeEventListener('click', userInputHandler);
					resolve(true);
				}
			};
			
			boardEl.addEventListener('click', userInputHandler);	
		});
	
	const onIncorrectClick = (selectedCell) => {
		selectedCell.classList.add(WRONG_CELL_CLASSNAME);
		setTimeout(() => {
			selectedCell.classList.remove(WRONG_CELL_CLASSNAME);
		}, COLOR_DURATION);
		
		boardEl.classList.add(SHAKED_CLASSNAME);
		setTimeout(() => {
			boardEl.classList.remove(SHAKED_CLASSNAME);
		}, 1000);
	}
	
	const onCorrectClick = (selectedCell) => {
		selectedCell.classList.add(ACTIVE_CELL_CLASSNAME);
		setTimeout(() => {
			selectedCell.classList.remove(ACTIVE_CELL_CLASSNAME);
		}, COLOR_DURATION)
	}
	
	return { gameStart, highScore };
}

export default useMemoryGame;