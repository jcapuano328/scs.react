module.exports = {
    dieColor(i) {
		switch(i) {
		case 1:
			return 'red';
		case 2:
			return 'white';
		case 3:
			return 'blackr';
		case 4:
			return 'blackw';
		case 5:
			return 'yellow';
		case 6:
			return 'blue';
		case 7:
			return 'green';
		}
		return 'white';
	},
    dotColor(i) {
		switch(i) {
		case 1:
			return 'white';
		case 2:
			return 'black';
		case 3:
			return 'red';
		case 4:
			return 'white';
		case 5:
			return 'black';
		case 6:
			return 'white';
		case 7:
			return 'white';
		}
		return 'black';
	}
}
