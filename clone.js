/**
 *深拷贝
 * @peram deep
 *   true => 深拷贝,
 *   vue => 适用于VUE的深拷贝(删除原对象多余的数组),
 *   'add' => 只增加新属性的深拷贝,
 *   'reader' => 只改变已有属性的深拷贝
 *   'reader-arr' => 只改变已有属性的深拷贝, 可添加数组
 * ps: 被拷贝属性为 undefined时跳过
 * @return 目标对象
 */
export function $extend (deep, ...rest) {
    if (deep !== true && typeof deep === 'object') { // simple copy
        return Object.assign(deep, ...rest);
    } else if (rest.every(v => typeof v === 'object')) { // deep copy
        let [own, ...copy] = rest;
        deep === 'add' && copy.reverse();
        copy.forEach(obj => {
            // console.log(obj);
            let isArray = Object.prototype.toString.call(obj) === '[object Array]' && !!own.splice;
            if (deep === 'vue' && isArray && obj.length < 1) own.splice(0, own.length);
            for (let key in obj) {
                if (!obj.hasOwnProperty(key)) continue;// ignore prototype
                let own_val = own[key]; let copy_val = obj[key];
                let hasProperty = (deep === 'reader-arr' && !!own.splice) || own.hasOwnProperty(key);
                let isLimit = !(deep === 'add' && hasProperty) && !((deep === 'reader' || deep === 'reader-arr') && !hasProperty);

                if (typeof copy_val === 'object' && copy_val !== null) { // Copy the arrays, objects
                    let constCopy = copy_val.constructor;
                    let constOwn = (own_val !== undefined && own_val !== null) && own_val.constructor;
                    if (constOwn === constCopy) {
                        $extend(deep, own_val, copy_val);
                        if (isArray) {
                            if (deep === 'vue' && key * 1 === obj.length - 1) {
                                own.splice(obj.length);
                            }
                        }
                    } else if (isLimit) { // own_val === undefined or null
                        if (isArray) {
                            own.splice(key, 1, $extend((deep === 'reader' || deep === 'reader-arr') && true || deep, constCopy === Array ? [] : {}, copy_val));
                            if (deep === 'vue' && key * 1 === obj.length - 1) {
                                own.splice(obj.length);
                                break;
                            }
                        } else {
                            $extend((deep === 'reader' || deep === 'reader-arr') && true || deep, own[key] = constCopy === Array ? [] : {}, copy_val);
                        }
                    }
                } else if (isLimit && copy_val !== undefined) {
                    if (isArray) {
                        own.splice(key, 1, copy_val);
                        if (deep === 'vue' && key * 1 === obj.length - 1) {
                            own.splice(obj.length);
                        }
                    } else {
                        own[key] = copy_val;
                    }
                }
            }
        });
        return own;
    }
}
