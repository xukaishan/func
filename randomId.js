function $randomId (n = 32) {
    let s = '';
    Array.from({ length: n }).forEach((v, i) => {
        let r = Math.floor(Math.random() * 36);
        if (r < 10) {
            s += r;
        } else {
            s += String.fromCharCode(r + 87);
        }
        if ([7, 11, 15, 19].includes(i)) s += '-';
    });
    return s;
}
