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
/* 加载更多 */
 function scrollToBottom(number = 0, callback, once = false) {
                const doc = document;
                /** 滚动事件 */
                function onScroll() {
                    /** 滚动的高度 */
                    let scrollTop = doc.documentElement.scrollTop === 0 ? doc.body.scrollTop : doc.documentElement.scrollTop;
                    /** 滚动条高度 */
                    let scrollHeight = doc.documentElement.scrollTop === 0 ? doc.body.scrollHeight : doc.documentElement.scrollHeight;
                    if (scrollHeight - scrollTop - number <= window.innerHeight) {
                        if (typeof callback === 'function') callback();
                        if (once) window.removeEventListener('scroll', onScroll);
                    }
                }
                window.addEventListener('scroll', onScroll);
                onScroll(); // 先执行一次
            }
            scrollToBottom(100, function () {
                console.log('到底底部~');
            }, false);
