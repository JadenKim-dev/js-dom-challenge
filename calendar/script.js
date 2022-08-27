import { HTML_IDS, HTML_CLASSES } from './constants.js';
import useTime from './useTime.js';
import { makeTaskElements } from './taskElementsFactory.js';
import { CONFLICTING_DATA } from './data.js';

const {
	CALENDER_CONTAINER_ID,
	TIME_CONTAINER_ID,
	TASK_CONTAINER_ID,
	FIRST_TIME_ID,
	LAST_TIME_ID,
} = HTML_IDS;
const { TIME_CLASSNAME, DIVIDER_CLASSNAME } = HTML_CLASSES;

function Calender(el, calenderData) {
	const { getTimeLabelFromNum } = useTime();

	const calenderContainerDiv = document.createElement('div');
	calenderContainerDiv.id = CALENDER_CONTAINER_ID;

	const timeContainerDiv = document.createElement('div');
	timeContainerDiv.id = TIME_CONTAINER_ID;

	for (let i = 1; i < 24; i++) {
		const timeDiv = document.createElement('div');
		timeDiv.className = TIME_CLASSNAME;
		if (i === 1) {
			timeDiv.id = FIRST_TIME_ID;
		}
		if (i === 23) {
			timeDiv.id = LAST_TIME_ID;
		}
		timeDiv.dataset.time = i;
		timeDiv.innerHTML = getTimeLabelFromNum(i);
		timeContainerDiv.appendChild(timeDiv);
	}

	const taskContainerDiv = document.createElement('div');
	taskContainerDiv.id = TASK_CONTAINER_ID;

	for (let i = 0; i < 23; i++) {
		const dividerDiv = document.createElement('div');
		dividerDiv.className = DIVIDER_CLASSNAME;
		taskContainerDiv.appendChild(dividerDiv);
	}

	const taskElementsHtml = makeTaskElements(CONFLICTING_DATA);
	taskContainerDiv.appendChild(taskElementsHtml);

	calenderContainerDiv.appendChild(timeContainerDiv);
	calenderContainerDiv.appendChild(taskContainerDiv);
	
	const targetElement = document.querySelector(el);
	targetElement.appendChild(calenderContainerDiv);
}

Calender("#calender", CONFLICTING_DATA);