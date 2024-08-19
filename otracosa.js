const dic = new Map([
    ['I',1],
    ['V',5],
    ['X',10],
    ['L',50],
    ['C',100],
    ['D',500],
    ['M',1000]
])

var roman = 'MCMXCIV'

/**
* @param {string} s
* @return {number}
*/
var romanToInt = function(s) {
    let beforeChar;
    let beforeNum;
    let total;
    if (s.length < 2) {
        return dic.get(s.toUpperCase());
    }
    for (let char of s) {
        console.log(`\ntotal actual=${total}`);
        console.log(`Letra anterior=${beforeChar}`);
        console.log(`Letra actual=${char}`);
        

    }
    console.log(total);
    return total;
};

romanToInt(roman);