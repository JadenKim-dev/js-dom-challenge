	export const getRandomSequenceOf = (size, max) => {
		let result = [];
		result.length = size;
		result.fill(0);
		return result.map(() => Math.floor(Math.random() * max));
	};