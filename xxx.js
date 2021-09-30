String.prototype.hash = function () {    
        let hash = 0, i, chr;
        if (this.length === 0) return hash;
        for (i = 0; i < this.length; i++) {
            chr = this.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        return hash;    
}


String.prototype.hash1 = function () {
    let hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash *(2 ** 5)) - hash) + chr;
        hash |= 0;
    }
    return hash;
}
console.log("1teat".hash());
console.log("1teat".hash1());


