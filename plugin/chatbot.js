const axios = require("axios").default;
const chatbot = (text,number) => new Promise(async (resolve, reject) => {

    const options = {
        method: 'POST',
        url: 'https://harley-the-chatbot.p.rapidapi.com/talk/bot',
        headers: {
            'content-type': 'application/json',
            accept: 'application/json',
            'x-rapidapi-host': 'harley-the-chatbot.p.rapidapi.com',
            'x-rapidapi-key': process.env.CHATBOT_API
        },
        data: {
            client: number,
            bot: 'harley',
            message: text
        }
    };

    axios.request(options).then(function (response) {
        resolve(response.data.data.conversation.output);
    }).catch(function (error) {
        reject();
    });
});

module.exports.chatbot = chatbot;