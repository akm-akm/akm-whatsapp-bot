const cherio = require('cherio');
const request = require('request');
const search = "mia khalifa";
const q = `https://www.google.com/search?q=${(search).replace(' ','+')}&source=lnms&tbm=isch&sa=X`;
console.log(q);
request(q, (err, resp, html) => {

    if (!err && resp.statusCode == 200) {
        console.log("Request was successfull ");

        const $ = cherio.load(html);

        $("img.rg_i").each((index, image) => {

            var img = $(image).attr('src');
            var baseUrl = 'https://www.google.com';
            var Links = baseUrl + img;
            console.log(img);
        });

    } else {
        console.log("Request Failed ");
    }

});