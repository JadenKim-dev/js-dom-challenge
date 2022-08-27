import useTime from './useTime.js';
import { HTML_IDS, HTML_CLASSES, TIME_STYLE_NUM } from './constants.js';

const { TASK_ELEMENTS_ID } = HTML_IDS;
const { TASK_CLASSNAME, OVERLAPPING_TASK_CLASS_MAP } = HTML_CLASSES;
const { HEIGHT_PER_MIN, MARGIN_PER_MIN } = TIME_STYLE_NUM;

export const makeTaskElements = (calenderData) => {
	const tasksContainerDiv = document.createElement('div');
	tasksContainerDiv.id = TASK_ELEMENTS_ID;

	const { convertToAmPmFormat, getTimeDiff, getMinutesInt, timeSortFunc } = useTime();
	const taskCountPer30Minutes = new Map();
	for (let i=0; i<48; i++) {
		taskCountPer30Minutes.set(i*30, 0);
	}

	calenderData.sort(timeSortFunc);
	calenderData.forEach(({ startTime, endTime, color, title }) => {
		const taskDiv = document.createElement('div');
		const startTimeLabel = convertToAmPmFormat(startTime)
		const endTimeLabel = convertToAmPmFormat(endTime)
		taskDiv.innerHTML = `${title}<br/>${startTimeLabel} ~ ${endTimeLabel}`;
		
		taskDiv.className = TASK_CLASSNAME;
		taskDiv.style.backgroundColor = color;

		const timeDiff = getTimeDiff(startTime, endTime);
		taskDiv.style.height = `${HEIGHT_PER_MIN * timeDiff}rem`;

		const startMinutesInt = getMinutesInt(startTime);
		taskDiv.style.marginTop = `${MARGIN_PER_MIN * startMinutesInt}rem`;
		
		const endMinutesInt = getMinutesInt(endTime);
		let overlappingNum = 0;
		for(let i=startMinutesInt; i<endMinutesInt; i+=30) {
			const currTaskCnt = taskCountPer30Minutes.get(i);
			overlappingNum = Math.max(overlappingNum, currTaskCnt+1);
			taskCountPer30Minutes.set(i, currTaskCnt+1);
		}
		if (overlappingNum > 1) {
			taskDiv.classList.add(OVERLAPPING_TASK_CLASS_MAP.get(overlappingNum))
		}
		
		tasksContainerDiv.appendChild(taskDiv);
	});
	return tasksContainerDiv;
};