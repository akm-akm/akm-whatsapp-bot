## 🤖️ Self Deployment Guide 🤖️

### Pre-requisite

- ⚓[Git](https://git-scm.com/)⚓
- 🎛️[Node.JS](https://nodejs.org/en/)🎛️
- 🧠️ Brain 🧠️
- 🌐️ Internet 🌐️️

## 🍀 Installation

- Open a terminal or command prompt.
- Run the following code to clone the repository.

```SH
> git clone https://github.com/akm-akm/xxx-whatsapp-bot.git
> cd xxx-whatsapp-bot
```

- Run this to install the dependencies

```SH
> npm install
```

## ✍ Configuration

### 🚂 Setting up the enviroment

Edit file named `.env.example` and replace the values with your own.

`COINMARKETCAP_API_KEY` The API key of CoinMarketCap for crypto market data. (optional)

`KEEPSAVEIT_API` The API key of KeepSaveIt for downloading the Pinterest videos. (optional)

`clientId` The client id from jdoodle.com for the run feature to compile code. (optional)

`clientSecret` The client secret from jdoodle.com for the run feature to compile code. (optional)

`OWNER_NUMBER` Your whatsapp number along with country code without + sign. (required)

`HOSTING_PLATFORM` Type local there. (required)

`WEBSITE_PASSWORD` The password you want to keep for the bot website. (required)

`DEEPAI` The api key for nsfw detection in images from [deepai](https://deepai.org/machine-learning-model/nsfw-detector). (optional)

`LOCAL_DATABASE_URL` The url of the database if the bot is running locallly on your system. (required if running locally)

`SEARCH_STICKER` The api from [Rapid API](https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/bing-image-search1/) if you want to use the search sticker (ss) feature. (optional)

`CHATBOT_API` The api key from [Rapid API](https://rapidapi.com/lemur-engine-lemur-engine-default/api/harley-the-chatbot) for the chatbot to work in the inbox. (optional)

Now save the file with the name `.env`
### 💾 Setting up the database

#### To get a database, there are two ways

- Use the postsgres installed in your pc

- Use online database from any of the following providers:
  - [elephant sql](https://customer.elephantsql.com/signup) or [pantheon](https://pantheon.io/register)
  - Copy the url of the database and add it in the LOCAL_DATABASE_URL field in the .env file.

## 💻 Running

- Running in development mode

```sh
> npm run dev
```

- Running in production mode

```sh
> npm run prod
```

### Running the above command will start the bot.

#### ‼️ If the bot is started in production mode, it will be accessible at `http://localhost:5000`

- To start the bot, go to the URL shown on the terminal.
- Enter the password you set in the Environment variable.
- Click on start and scan the qr code shown on the website using the WA-Web Scanner on your WhatsApp.
- Now you're on your own. Good Luck!

#### ‼️ If the bot is started in development mode

- It will auto connect everytime you start the bot.
- Scan the qr code shown in the terminal using the WA-Web Scanner on your WhatsApp
- The bot will work in group in development mode if the commands start with /.
- eg. `/help`, `/limit`, `/rs`

## 💡 How to use the bot

- Send `hi` to the bot in the inbox or hi along with prefix if in a group.
- The bot will respond with `👋 hello`.
- Send `help` to the bot in the inbox or help along with prefix if in a group.
- The bot will respond with the menu.

## 🔧 Default Configuration

- Default daily limit for a normal user is `70` messages.
- Owner and bot moderators have no limit and they cannot be banned in groups.
- Owner and bot moderators have access to all group commands even if they are not admin in any group.
- Default daily group limit is `100` messages.
- By default, abuse detection and nudity detection is on.
- Default minimum group size for the bot to work in it is `1` members.
- These values can be changed only by the bot owner.
- When the bot is added to any group, it will auto assign any random prefix to it, which can be changed by group admins using `setprefix` command or prefix can be turned off using `useprefix` command.
- If deepai api key is added to the bot, the bot will detect nudity in the image and if it detects 50% nudity, it will not make a sticker.

### 🔗 Want to host on server ? Click [here](heroku-hosting.md)