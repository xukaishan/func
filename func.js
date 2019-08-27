/* 懒加载条件判断 */
	function elementIsLazy(el) {
		var top = el.getBoundingClientRect().top;
		var left = el.getBoundingClientRect().left;
		var innerHeight = window.innerHeight;
		var innerWidth = window.innerWidth;
		return (top >= 0 && top < innerHeight + 800)
	};
	/* 滚动节流 */
	function throttle(func, delay) {
		var timer = null;
		return function () {
			var context = this;
			var args = arguments;
			if (!timer) {
				timer = setTimeout(function () {
					func.apply(context, args);
					timer = null;
				}, delay);
			}
		}
	}
