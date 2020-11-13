/**
 * 防重复执行,限制高频触发
 * @param fn 应执行的函数
 * @param wait 距离最后一次触发的时间
 * @param outset 触发模式
 *    true => 开始时间点执行
 *    false => 结束时间点执行
 *    'fixed' => 固定间隔wait时间段后，能触发一次
 *  @param 'forwards' => 'fixed'模式结束时间点是否响应
 */
export function $debounce (fn, wait, outset = false, forwards = false) {
    let context = null;
    let lastCall = null;
    let argu = null;
    let timeOut = null;
    let isFix = outset === 'fixed';

    /* 延迟检测函数，检测距离最后一次触发的时间间隔 */
    function timeUp () {
        let interval = new Date() - lastCall; // 最后一次触发的时间间隔;
        if (interval < wait) {
            timeOut = setTimeout(timeUp, isFix && wait || wait - interval);
            /* fixed模式的固定时间点执行 */
            isFix && fn.apply(context, argu);
        } else {
            timeOut = null;
            if (!outset || (isFix && forwards)) { // 结束时间点执行和fixed模式的最后一次触发时间点执行
                fn.apply(context, argu);
            }
            argu = context = null;
        }
    }

    /* 返回闭包函数 */
    return function (...rest) {
        context = this;
        argu = rest;
        /* 记录最后触发时间 */
        if (!isFix || forwards || !lastCall) {
            lastCall = new Date();
        }
        if (outset && !timeOut) { // 开始时间点执行和fixed模式的固定时间点执行
            fn.apply(context, argu);
        }
        if (!timeOut) timeOut = setTimeout(timeUp, wait); // 首次触发产生延迟函数
    };
}
