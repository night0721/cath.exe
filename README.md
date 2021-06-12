# cath.exe <img src = "https://cdn.discordapp.com/avatars/800966959268364288/36d6967911a31a638d65d1da472d2e14.png?size=1024" width = "45">
cath.exe is a CODM-theme based Discord Bot with many categories of commands like Moderation, Music and Economy. It is an open source project based on Project Lighthouse by path.exe, written in node.js(JavaScript), mainly using discord.js and mongoose module.<br><br>If you like this bot, feel free to **star** and **fork** the repository!<br>
Click [here](https://discord.com/oauth2/authorize?client_id=800966959268364288&permissions=4231314550&scope=bot%20applications.commands) to invite cath.exe

[![Discord](https://img.shields.io/discord/718762019586572341?color=46828d&label=Support&style=for-the-badge)](https://discord.gg/SbQHChmGcp)
![Repo Stars](https://img.shields.io/github/stars/night0721/cath.exe?color=46828d&style=for-the-badge)
# How to deploy the bot? <img src = "https://cdn.discordapp.com/emojis/740978278055280722.png" width = "40">

1. Clone the repository
```cmd
git clone https://github.com/night0721/cath.exe
(or)
gh repo clone night0721/cath.exe
```
or

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/night0721/cath.exe)
[![repl.it](https://repl.it/badge/github/night0721/cath.exe)](https://repl.it/github/night0721/cath.exe)

2.Create a .env file from <a href = "https://github.com/night0721/cath.exe/blob/main/.env.example">.env.example </a><br><br>
3. Create an application from [Discord Developer Portal](https://discord.com/developers/applications), then copy the
  - Bot Token<br>
  - Application ID(Client ID)<br>
  - Client Secret<br>
<br>
4. Create a MongoDB Connection URI from [here](https://www.mongodb.com)<br><br>
5. Create 5 Webhooks in **Your Discord Server**: <br>
- Server Log(Log new Server Added/Premium Server) <br>
- Error Log(Log Unhandled Rejection Error) <br>
- Ready Log(Log when bot online)<br>
- Command Log(Log command usage)<br>
- DM Log(Log when someone send DM to Bot)<br><br>
<img src = "https://media.discordapp.net/attachments/838006493361471508/853217575986659328/unknown.png" width="300"><br>
6. Paste the IDs, Tokens and the Webhooks into the `.env` respectively<br><br>
7. After you have done the above steps, run the commands in your **Command Prompt** or **PowerShell**
```cmd
npm install
node index.js
```

# Reporting Bugs <img src = "https://cdn.discordapp.com/emojis/841195615458951168.png" width = "40">

You can report bugs or issues by opening a issue in this repository or join the [support server](https://discord.gg/SbQHChmGcp)

# Support <img src = "https://cdn.discordapp.com/emojis/841196992385253408.png" width = 40>

If you faced any error, please join the [support server](https://discord.gg/SbQHChmGcp) and I will be here for help
