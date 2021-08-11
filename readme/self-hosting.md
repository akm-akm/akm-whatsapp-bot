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
> git clone https://github.com/akm-akm/xxx-bot.git
> cd xxx-bot
```

- Run this to install the dependencies

```SH
> npm install
```

## ✍ Configuration

#### Step 1 > 🚂 Setting up the enviroment

 Create a file named `.env` then add the following fields

```env
COINMARKETCAP_API_KEY=
KEEPSAVEIT_API=
clientId=
clientSecret=
OWNER_NUMBER=
HOSTING_PLATFORM=
WEBSITE_PASSWORD=
```

`COINMARKETCAP_API_KEY` The API key of CoinMarketCap for crypto market data. (optional)

`KEEPSAVEIT_API` The API key of KeepSaveIt for downloading the Pinterest videos. (optional)

`clientId` The client id from jdoodle.com for the run feature to compile code. (optional)

`clientSecret` The client secret from jdoodle.com for the run feature to compile code. (optional)


`OWNER_NUMBER` Your whatsapp number along with country code. (required)

`HOSTING_PLATFORM` The hosting platform you want to host the bot on. The only supported ones are local, heroku and qovery. (required)

`WEBSITE_PASSWORD` The password you want to keep for the bot website. (required)

#### Step 2 > 💾 Setting up the database

*To get a database, there are two ways:*

- Use the postsgres installed in your pc

- Use online database from (easy)
  - [elephant sql](https://customer.elephantsql.com/signup)
  - [pantheon](https://pantheon.io/register)


## 💻 Running

- Running in development mode

```sh
> npm run dev
```

- Running in production mode

```sh
> npm run prod
```

#### Running the above command will start the bot.

! If the bot is started in production mode, it will be accessible at `http://localhost:5000`

- To start the bot, go to the URL shown on the terminal.
- Enter the password you set in the Environment variable.
- Click on start and scan the qr code shown on the website using the WA-Web Scanner on your WhatsApp.
- Now you're on your own. Good Luck!

**! If the bot is started in development mode**

- It will auto connect everytime you start the bot.
- Scan the qr code shown in the terminal using the WA-Web Scanner on your WhatsApp
- The bot will not work in group in development mode.




###  🔗 Want to host on server ? Click [here](/heroku-hosting.md)