var axios = require("axios").default;
var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=WGWACLRRMBB4KG7A';

var options = {
  method: 'GET',
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  
  
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});