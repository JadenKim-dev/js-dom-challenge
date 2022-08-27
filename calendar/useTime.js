const useTime = () => {
	const getTimeLabelFromNum = (timeNum) => {
		if (timeNum <= 12) {
			return `${timeNum}:00 AM`;
		} else {
			return `${timeNum - 12}:00 PM`;
		}
	};

	const convertToAmPmFormat = (rawTimeStr) => {
		let [hour, minute] = rawTimeStr.split(':');
		hour = parseInt(hour);
		if (hour <= 12) {
			return `${rawTimeStr} am`;
		} else {
			return `${hour - 12}:${minute} pm`;
		}
	};

	const getTimeDiff = (startTimeStr, endTimeStr) => {
		const [startHour, startMin] = startTimeStr.split(':').map((rawTime) => parseInt(rawTime));
		const [endHour, endMin] = endTimeStr.split(':').map((rawTime) => parseInt(rawTime));

		const hourDiff = endHour - startHour;
		const minDiff = endMin - startMin;

		return hourDiff*60 + minDiff;
	};

	const getMinutesInt = (timeStr) => {
		let [hour, minute] = timeStr.split(':').map((rawTime) => parseInt(rawTime));
		return minute + hour * 60;
	};
	
	const timeSortFunc = (time1, time2) => {
		const minutesInt1 = getMinutesInt(time1.startTime);
		const minutesInt2 = getMinutesInt(time2.startTime);
		
		return minutesInt1-minutesInt2;
	}

	return { getTimeLabelFromNum, convertToAmPmFormat, getTimeDiff, getMinutesInt, timeSortFunc };
};

export default useTime;