const axios = require('axios');
axios
    .get(
        "https://www1.nseindia.com//emerge/homepage/smeNormalMktStatus.json"
    )
    .then((response) => {
        if (response.error) {
            console.log(response.error);

        } else {
            console.log(response.data);
            var msg =
                "Market status : ```" + response.data.NormalMktStatus + "```";
            console.log(msg);

        }
    })
    .catch((err) => {
        console.log(err);
    });