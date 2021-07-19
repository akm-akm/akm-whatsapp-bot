//trim a sentence
function trim(str) {
    return str.replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "").slice(1).replace(/^\s+|\s+$/g, "").split(" ");
}

h=trim("     !      market    details        tcs  ")
console.log(h);

