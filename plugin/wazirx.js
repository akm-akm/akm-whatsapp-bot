
const axios = require('axios');

module.exports = {
    "name": 'wazirx',
    "usage": "wazirx <coinsymbol>",
    "desc": "Fetches the price of the given coin using wazirx api.",
    "eg": [
        "wazirx btc",
        "wazirx xrp",
        "wazirx eth"
    ],
    "group": false,
    "owner": false,
    async handle(Infor) {

        const arg = Infor.arg;
        if (arg.length === 1) {
            Infor.wrongCommand();
        }
        axios.get(
            "https://api.wazirx.com/api/v2/trades?market=" + arg[1] + 'inr'

        )
            .then((response) => {
                var crypto_body = response.data;
            
                if (response.data.code==1999) {
                    Infor.replytext("💸 ```No such crypto currency on Wazirx```")
                } else {
                    const message =
                        "*" + arg[1].toUpperCase() + "* " + "/ " + "*INR*" + " 💹 *Wazirx*" +
                        " 🪙\n\n"
                        +  "```Price :```  " + crypto_body[0].price.toUpperCase();
                    Infor.replytext(message);
                }
            });

    }
}