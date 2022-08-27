export const HTML_IDS = {
	CALENDER_CONTAINER_ID: 'calenderContainer',
	TIME_CONTAINER_ID: 'timeContainer',
	TASK_CONTAINER_ID: 'taskContainer',
	TASK_ELEMENTS_ID: 'taskElements',
	FIRST_TIME_ID: 'firstTime',
	LAST_TIME_ID: 'lastTime',
};

const OVERLAPPING_TASK_CLASS_MAP = new Map([
	[2, 'task-2'],
	[3, 'task-3'],
])

export const HTML_CLASSES = {
	TIME_CLASSNAME: 'time',
	DIVIDER_CLASSNAME: 'divider',
	TASK_CLASSNAME: 'task',
	OVERLAPPING_TASK_CLASS_MAP,
};

export const TIME_STYLE_NUM = {
	HEIGHT_PER_MIN: 0.0665,
	MARGIN_PER_MIN: 0.0703,
}