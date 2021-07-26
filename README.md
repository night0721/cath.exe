<img src = "https://media.discordapp.net/attachments/842014909264953354/867806346593042483/Cath-temp-banner.png?width=1244&height=415">
<h1 align="center"> CATH.EXE TEMPLATE</h1>

> <img src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Warning-icon.png" width = "16"> This is a Bot Template based on Cath.exe, This templated **does not** conatain any data from Project Lighthouse. For Call of duty mobile stats invite the main instance using the **INVITE ME** badge.

**Cath.exe** is a Multipurpose Discord Bot with many features that include but are not limited to Moderation, Music and Economy. The Call of Duty Stats are courtesy of [**Project Lighthouse**](https://discord.gg/ARNFCu9NxK) by [**Path.exe**](https://www.youtube.com/channel/UC0hvUWYhyx_DOEBzLWEJxsw).<br><br>
If you like this bot, feel free to <img src = "https://discord.com/assets/141d49436743034a59dec6bd5618675d.svg" width = "16"> **Star** and **fork** this repository.<br><br>

<!-- Main Badges  -->
[![inviteme](https://badgen.net/badge/Invite%20Me/Online/5865F2?icon=discord&color=5865F2&style=for-the-badge&scale=1.4)](https://discord.com/oauth2/authorize?client_id=800966959268364288&permissions=4231314550&scope=bot%20applications.commands) 
[![Support Server](https://img.shields.io/discord/718762019586572341?label=Support%20Server&logo=Discord&colorB=5865F2&style=for-the-badge&logoColor=white) ](https://discord.gg/SR7TeNJG67)
![Repo Stars](https://img.shields.io/github/stars/night0721/cath.exe?logo=github&color=5865F2&style=for-the-badge)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg?colorB=5865F2&style=for-the-badge)](https://github.com/night0721/cath.exe/blob/main/CODE_OF_CONDUCT.md)


<!-- Build with badges -->
## Build with:
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
<img src ="https://forthebadge.com/images/badges/built-with-love.svg" width = "122"><br>

<h1 align="center"> <img src = "https://discord.com/assets/a6d05968d7706183143518d96c9f066e.svg" width = "20"> Deployment <img src = "https://discord.com/assets/a6d05968d7706183143518d96c9f066e.svg" width = "20"> </h1>

## Deploy Online
[![Run On Replit](https://img.shields.io/static/v1?label=Run%20On&message=Repl.it&color=5865F2&logo=replit&logoColor=white&style=for-the-badge&scale=1.4)](https://repl.it/github/night0721/cath.exe)
[![Deploy On Heroku](https://img.shields.io/static/v1?label=Deploy%20On&message=Heroku&color=5865F2&logo=heroku&logoColor=white&style=for-the-badge&scale=1.4)](https://heroku.com/deploy?template=https://github.com/night0721/cath.exe)

## Deploy Locally

### Prerequisite 
Download all these programs on your local machine by clicking on the badge & following the standard installing procedure. You can use any IDE but we recommand VS Code. 

[![git](https://badgen.net/badge/icon/git?icon=git&label&color=5865F2&style=for-the-badge&scale=1.4)](https://git-scm.com/downloads) 
[![Open in Visual Studio Code](https://img.shields.io/badge/Visual_Studio_Code-5865F2?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)](https://code.visualstudio.com/Download) 
[![node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/download/)
<!-- [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/cloud/atlas/lp/try2) -->

### Step by Step Walkthrough

### [![YouTube Tutorial](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/_D5xG7XoF88)
1. Clone this repository

```cmd
git clone https://github.com/night0721/cath.exe
```

2. Make a new file & name it ``.env`` then copy-paste all the contents from [`.env.example`<span>&#10138;</span>
](https://github.com/night0721/cath.exe/blob/main/.env.example) into the `.env` file <br>

3. Create an application from Discord Developer's Portal then copy these things into the `.env` file.<br>
[![Open Discord Developer Portal](https://badgen.net/badge/icon/discord?icon=discord&label=Developer%20Portal&color=5865F2&style=for-the-badge)](https://discord.com/developers/applications)
    - **Bot Token**<br>
    - **Application ID** (Client ID)<br>
    - **Client Secret**<br>
    
4. To view the logs, Create 5 Channels & 5 Webhooks in *your* **Discord Server** corresponding to these logs.
    - **Server Log** (Log new Server Added/Premium Server)<br>
    - **Error Log** (Log Unhandled Rejection Error)<br>
    - **Ready Log** (Log when bot online)<br>
    - **Command Log** (Log command usage)<br>
    - **DM Log** (Log when someone send DM to Bot)<br>

    >You can also just use one Channel & one Webhook for everything but it will be really inconvenient.

    <img src = "https://media.discordapp.net/attachments/540218400413188116/867797464169709661/unknown.png" width="640"> <br>

5. One by one paste the webhook url in a web browser & copy the **ID** & the **TOKEN** and paste it in the corresponding feilds in the `.env` file. <br>

6. After this, you need to install all dependencies by using this command. This will takes a few minutes.

    ```cmd
    npm i
    ```

7. Now, to start the bot use this command in your terminal.
    ```cmd
    node .
    ```

# Additional Steps
## Economy Commands [MongoDB]
To enable the Economy Commands, you need to Setup a MongoDB Database. You can also watch a video guide [here](https://youtu.be/dQw4w9WgXcQ).

1. Create a Free [MongoDB Account](https://www.mongodb.com/cloud/atlas/register)
2. Click on the `Create a New Database`.
3. Selct the `CREATE` option in the **Shared** Teir.
4. Select a `Cloud Provider & Region` that is geographically closer to the average user that will use the bot. *This will effect the responce time of the bot.*
5. Then you can Name your Cluster, after that click on `Create Cluster`. *This will take a couple of minutes.*
6. Then click on `Database Access` from the sidebar & then click on `Add New Database User`.
7. Under the `Password - Authentication Method`. Enter a username & password. then click on `Add User`.
8. After that, click on `Network Access` from the sidebar & then click on `Add IP Address`. & click on the `Add Current IP Address` Then click on `Confirm`.
9. now, Click on `Database` from the sidebar & then click on `Connect`.
10. Then on click on `Connect your Application`. & Copy the link.
11. The paste that link in the `MONGODB` feild in the `.env` file.
12. Now you need to modify that link, 
    - Replace `<password>` with the password for the user that you created in **Step 7**.
    - Replace `myFirstDatabase` with the name of the Database that you named in **Step 5**.
13. That's it.

## Music (Spotify)
To use spotify urls to play music follow these steps.

1. Go to the [**Spotify's Developer Dashboard**](https://developer.spotify.com/dashboard/).
2. Click on **Create an app**.
3. Fill out the required info, then click on **CREATE**.
4. Copy the **Client ID** & paste it in the `SPOTIFY_ID` feild in the `.env` file.
5. Back in the Dashboard, Click on **SHOW CLIENT SECRET**
6. Copy the **Client Secret** & paste it in the `SPOTIFY_SECRET` feild in the `.env` file.
7. That's it.

# Support, Feature Request & Bug Reports

## <img src = "https://cdn.discordapp.com/emojis/867093614403256350.png?v=1" width = 18> Support & Feature Request 
Join the official [Support Server](https://discord.gg/SbQHChmGcp) on Discord & we will be happy to assist you. <br>
To Request new features contact us on Discord using the support server. 

## <img src = "https://cdn.discordapp.com/emojis/867093601962950666.png?v=1" width = "18"> Report Bugs
You can report bugs or issues by opening a issue in this repository. Alternatevely you can also contact us on Discord using the support server. 

[![Support Server](https://img.shields.io/discord/718762019586572341?label=Support%20Server&logo=Discord&colorB=5865F2&style=for-the-badge&logoColor=white) ](https://discord.gg/SR7TeNJG67)

<h1 align = "center">CONTRIBUTORS</h1>

Contributions are always welcomed, but make sure to read [Contributing.md](/CONTRIBUTING.md) first.

<a href="https://github.com/night0721/cath.exe/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=night0721/cath.exe" />
</a>
