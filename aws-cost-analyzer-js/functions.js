exports.random = function(n) {
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += Math.random();
    }
    return sum;
};
