/**
 * 并发请求数量限制
 * @param arr 包含发起请求的promise对象的数组
 * @param count 同时请求的数量
 * @returns {Function} 传入false时中断后续请求
 */

function $concurrent (arr, count = 4) {
    /* 并发发起四个请求，其中任一请求结束后，发起新的请求，保持并发请求数量不超过四个 */
    return new Promise((resolve, reject) => {
        let g = generator();
        let keep = true;
        let result = [];
        for (let i = 0; i < count; i++) {
            nextCall();
        }

        function nextCall () {
            let { value, done } = g.next();
            done || value.then((data) => {
                if (data === 'reject') {
                    resolve(result);
                    return;
                }
                result.push(data);
                if (result.length === arr.length) {
                    keep = false;
                    resolve(result);
                }
                keep && nextCall();
            }).catch(() => {
                keep = false;
                reject(new Error());
            });
        }

        function * generator () {
            if (arr.length === 0) {
                yield Promise.resolve('reject');
            }
            for (let fn of arr) {
                try {
                    yield fn();
                } catch (e) {
                    return e;
                }
            }
        }
    });
    // return function (p) {
    //   keep = p;
    // }
}
