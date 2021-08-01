### 🤖 [Click-here-to-chat-with-this-bot](http://wa.me/+17122205956?text=help)

# XXX-BOT Self-hosting Guide

## ⛵ Prerequisites

- [Git](https://git-scm.com/)
- [Node.JS](https://nodejs.org/en/)
- [FFMpeg](https://ffmpeg.org/download.html)

## 🍀 Installation

- Run the following code to clone the repo

```SH
> git clone https://github.com/akm-akm/xxx-bot.git
> cd xxx-bot
```

- Run this to install the dependencies

```SH
> npm i && npm i -D
```

## ✍ Configuration

- Create a file named `.env` then add the following fields

```env
COINMARKETCAP_API_KEY=
WEBSITE_PASSWORD=
KEEPSAVEIT_API=
OWNER_NUMBER=
DAILY_LIMIT=
DAILY_GROUP_LIMIT=
HOSTING_PLATFORM=
MIN_GROUP_SIZE=
BOT_MODERATORS=
```

`COINMARKETCAP_API_KEY` The API key of CoinMarketCap for crypto market data
`WEBSITE_PASSWORD` The password you want to keep for the website
`KEEPSAVEIT_API` The API key of KeepSaveIt for downloading the Pinterest videos
`OWNER_NUMBER` The Whatsapp number of the owner of the bot
`DAILY_LIMIT` The maximum number of replies that the bot will give to any user daily
`DAILY_GROUP_LIMIT` The maximum number of replies that the bot will give to any group daily
`HOSTING_PLATFORM` The hosting platform you want to host the bot on. The only supported ones are heroku and qovery
`MIN_GROUP_SIZE` The minimum number of members in a group for the bot to be added to it
`BOT_MODERATORS` The bot's moderators must be separated by a comma and the numbers must be in the following format: `[cc][number]` eg: `919744******`


### To get the connection URL there are two ways


## 💻 Running

- Running in development mode

```sh
> npm run dev
```

- Running in production mode

```sh
> npm start
```

#### Running the above command will start the bot.

**! If the bot is started in production mode, it will be accessible at `http://localhost:5000`**

- To start the bot, go to the URL shown on the terminal.
- Enter the password you set in the Environment variable.
- Click on start and scan the qr code shown on the website using the WA-Web Scanner on your WhatsApp.
- Now you're on your own. Good Luck!

**! If the bot is started in development mode**

- It will auto connect everytime you start the bot.
- Scan the qr code shown in the terminal using the WA-Web Scanner on your WhatsApp
- The bot will not work in group in development mode.
