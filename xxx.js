


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
        hash = ((hash * (2 ** 5)) - hash) + chr;
        hash |= 0;
    }
    return hash;
}

//console.log("behnchd".hash());


arg = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem.Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid.Reprehenderit, quia.Quo neque error repudiandae fuga ? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint ? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum.Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit ".split(" ");

abc = "hello hey how".split(" ");
console.log(arg.splice(0, 10).join(" "));

console.log(arg);