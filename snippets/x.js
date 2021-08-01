const axios = require('axios');

function is_registered() {
    axios.post('https://zb0e35911-z9d965017-gtw.qovery.io/is_registered', {
        bot_url: "hehte"
    })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log("error validating");
        });
}

function register_new_bot() {

    axios.post('http://localhost:3333/register_new_bot', {
        ownernumber: 1234453453,
        botnumber: 1234453453,
        bot_url: 7878
    })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log("error registering");
        });
}

//   is_registered();

register_new_bot()