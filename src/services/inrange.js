'use strict'

module.exports = (d, lo, hi) => {
	return (d < lo || (d >= lo && d <= hi));
}
