<h1 align="center">🤖 XXX WHATSAPP BOT 🤖</h1>

<p align="center">
<img src="https://user-images.githubusercontent.com/37355997/135646758-f37a88fa-1234-47ff-b57f-f70aed05dcb8.png" width=400px alt="xxxlogo" />
</p>


## ✨ Highlights

- 💻 4000 lines of code
- 💖 open source
- 💙 Written in Javascript
- 💛 Event-Based
- 💝 Built with [Baileys](https://github.com/adiwajshing/baileys)
- 🖤 Integrated abuse detection.
- ⚠️ Integrated NSFW detection.

## 💮 Hosting

#### 💻 See the [Self-Hosting Guide](/src/readme/self-hosting.md)

#### 🛰️ See the [Heroku Deploy Guide](/src/readme/heroku-hosting.md)

## 💪 Contribution

- Feel free to open issues regarding any problems or if you have any feature requests
- Make sure to enter proper documentation before opening PRs

## 💡 How to use the bot

- Send `hi` to the bot.
- The bot will respond with `👋 hello`.
- Send `help` to the bot.
- The bot will respond with the menu.

## 🔧 Default Configuration

- Default daily limit for a normal user is `30` messages.
- Owner and bot moderators have no limit.
- Default daily group limit is `50` messages.
- By default, abuse detection is on.
- Default minimum group size for the bot to work in it is `3` members.
- These values can be changed only by the bot owner.
- When the bot is added to any group, it will auto assign any random prefix to it, which can be changed by group admins.

## ⚠️ Troubleshooting

##### 1. The bot is not responding to anyone

- Send the command `restart` to the bot.
- Go to to the bot website and click on the `restart` button.
- See heroku logs and see if it is showing connected and bot name or not.
- If not try logging out using the bot website and login again.

##### 2. The bot is not responding to a particular user

- The user might have used the daily limit.
- If so, the limit will be reset at `00:00` every day.
- The user might have been blocked by the bot if it is not replying in a group.
- type `banlist` in a group to see the list of banned users.

##### 3. The bot is not responding to a particular group

- The bot does not work in groups with disappearing messages turned on.
- The group may be admins only.
- The users may not be using the correct prefix.
- Try `.hi` , `!hi` , `#hi` or `-hi` to see if the bot responds to any of them.
- If the bot is not responding to any of the above prefixes, then send `hi` to see if the prefix is disabled for that group.
- The bot may be down due to heavy traffic.
- Try after some time.
- Open an issue if the problem persists.

##### 4. Other troubles

- Make sure the env variables are set properly.
- Make sure the phone is connected to the internet.
- Make sure the Heroku postgres is added in the addons if running on heroku or the database uri is set properly if running locally.

## 📜 Documentation

- you are on your own...
