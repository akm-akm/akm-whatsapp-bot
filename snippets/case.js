const path = require("path");

const {
    crypto
} = require(path.join(__dirname, "../plugins/crypto"));
const {
    market
} = require(path.join(__dirname, "../plugins/market"));

function switchcase(arg) {
d=arg[0]
console.log(d)

    switch (d) {
        case "crypto":
            console.log("777777")

           // crypto(arg);
            break;


        case "market":
            

            (async () => {
                console.log(await market(arg));
            })();
            console.log("5952959")
            break;

        default:
            break;
    }
}
console.log("ppppp")
x=["market", "status"];
//switchcase(x);

(async () => {
    console.log(await market(x));
})();
