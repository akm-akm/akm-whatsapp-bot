# 🤖️ Heroku Deployment Guide 🤖️


## ⛵ Pre-requisite
- 🌐️ Internet 🌐️️
- 🧠️ Brain 🧠️
- 🎵️ Music 🎵️


## 🍀 Deployment

- Fork this repository.
- Create an account [Heroku](https://signup.heroku.com/login).
- Create a [new app](https://dashboard.heroku.com/new-app).
- Now select github under deployment method.
<img src='\images\connectgithub.png' ></img>
- input xxx-bot and search and connect the repo displayed.
- now under resources tab select add addons.
<img src='\images\herokupostgres.png'></img>
- Search heroku postgres and click on the result.
- Then click on submit order form on the pop up.
- Now under settinngs tab click on reveal config vars.
<img src='\images\herokuconfigvars.png'></img>
- Now under config vars input the values shown in `.env.example`.
<img src='\images\herokuenv.png'></img>


```env
COINMARKETCAP_API_KEY=
KEEPSAVEIT_API=
clientId=
clientSecret=
OWNER_NUMBER=
HOSTING_PLATFORM=
WEBSITE_PASSWORD=
DEEPAI=
```

`COINMARKETCAP_API_KEY` The API key of CoinMarketCap for crypto market data. (optional)

`KEEPSAVEIT_API` The API key of KeepSaveIt for downloading the Pinterest videos. (optional)

`clientId` The client id from jdoodle.com for the run feature to compile code. (optional)

`clientSecret` The client secret from jdoodle.com for the run feature to compile code. (optional)

`OWNER_NUMBER` Your whatsapp number along with country code without + sign. (required)

`HOSTING_PLATFORM` The hosting platform you want to host the bot on. The only supported ones are local, heroku and qovery. (required)

`WEBSITE_PASSWORD` The password you want to keep for the bot website. (required)

`DEEPAI` The api key for nsfw detection in images from deepai.org. (optional)

- Now click on Deploy tab and scroll to the bottom and click on deploy.
<img src='\images\deploy.png'></img>
- Now the bot will be deployed in under a minute.



## 🤖 Running

- Now click on view.
<img src='\images\viewheroku.png'></img>
- The website will open in your browser. Login using the password you entered in the previous step.
<img src='\images\sitelogin.png'></img>
- Click on start and scan the qr code shown on the website using the WA-Web Scanner on your WhatsApp.
<img src='\images\scan.png'></img>
- On successful login you will see connected written on the button.
<img src='\images\connected.png'></img>
- Now close the browser.


###  🔗 Want to host locally ? Click [here](self-hosting.md)