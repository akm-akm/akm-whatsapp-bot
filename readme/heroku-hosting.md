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
<img src='/readme\images\connectgithub.png' width=500px ></img>
- input xxx-bot and search and connect the repo displayed.
- now under resources tab select add addons.
<img src='/readme\images\herokupostgres.png'></img>
- Search heroku postgres and click on the result.
- Then click on submit order form on the pop up.
- Now under settinngs tab click on reveal config vars.
<img src='/readme\images\herokuconfigvars.png'></img>
- Now under config vars input the values shown in `.env.example`.
<img src='/readme\images\herokuenv.png'></img>


```env
COINMARKETCAP_API_KEY=
KEEPSAVEIT_API=
OWNER_NUMBER=
HOSTING_PLATFORM=
WEBSITE_PASSWORD=
```

`COINMARKETCAP_API_KEY` The API key of CoinMarketCap for crypto market data. (optional)

`KEEPSAVEIT_API` The API key of KeepSaveIt for downloading the Pinterest videos. (optional)

`OWNER_NUMBER` Your whatsapp number along with country code. (required)

`HOSTING_PLATFORM` The hosting platform you want to host the bot on. The only supported ones are local, heroku and qovery. (required)

`WEBSITE_PASSWORD` The password you want to keep for the bot website. (required)

- Now click on Deploy tab and scroll to the bottom and click on deploy.
<img src='/readme\images\deploy.png'></img>
- Now the bot will be deployed in under a minute.



## 🤖 Running

- Now click on view.
<img src='/readme\images\viewheroku.png'></img>
- The website will open in your browser. Login using the password you entered in the previous step.
<img src='/readme\images\sitelogin.png'></img>
- Click on start and scan the qr code shown on the website using the WA-Web Scanner on your WhatsApp.
<img src='/readme\images\scan.png'></img>
- On successful login you will see the connected written on the button.
<img src='/readme\images\connected.png'></img>
- Now close the browser.


###  🔗 Want to host locally ? Click [here](/readme\self-hosting.md)