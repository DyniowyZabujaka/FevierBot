// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();
const bot = new Discord.Client();

const prefix = "!";

client.on("ready", () => {
// This event will run if the bot starts, and logs in, successfully.
console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
// Example of changing the bot's playing game to something useful. `client.user` is what the
// docs refer to as the "ClientUser".
client.user.setActivity(`a.help | Serving ${client.guilds.size} servers`, 'WATCHING');
});

client.on("guildCreate", guild => {
// This event triggers when the bot joins a guild.
console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
// this event triggers when the bot is removed from a guild.
console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

////////// Functions | Actions \\\\\\\\\\


client.on("message", async message => {
    // This event will run on every single message received, from any channel or DM.

    // It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that "botception").
    if (message.author.bot) return;

    // Also good practice to ignore any message that does not start with our prefix, 
    if (message.content.indexOf(prefix) !== 0) return;

    // Here we separate our "command" name, and our "arguments" for the command. 
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Let's go with a few common example commands! Feel free to delete or change those.

    if (command === 'fakeping') {
        if (message.author.bot) return;
        if (message.content.indexOf(prefix) !== 0) return;
        // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
        // To get the "message" itself we join the `args` back into a string with spaces: 
        const sayMessage = args.join(" ");
        // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
        message.delete().catch(O_o => { });


        if (!message.member.roles.some(r => ["Negative Latex"].includes(r.name)))
            return message.channel.send("How the literal fuck did you get this message");
    }


    if (command === "ping") {
        // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
        // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms. :ping_pong:`);
    }

    if (command === "say") {
        // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
        // To get the "message" itself we join the `args` back into a string with spaces: 
        const sayMessage = args.join(" ");
        // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
        message.delete().catch(O_o => { });
        // And we get the bot to say the thing:
        const embed = {
            "description": `${sayMessage}`,
            "color": 16777215
        };
        message.channel.send({ embed });
    }

    if (command === "servingu") {
        const embed = {
            "description": `Serving **${client.users.size}** users total`,
            "color": 16777215
        };
        message.channel.send({ embed });
    }

    function magic8ball() {
        var rand = ['Reply hazy', 'try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again', 'It is certain', 'It is decidedly so', 'Without a doubt', 'Yes – definitely', 'You may rely on it', 'As I see it', 'yes', 'Most Likely', 'Outlook good', 'Yes', 'Signs point to yes', 'Don’t count on it', 'My reply is no', 'My sources say no', 'Outlook not so good', 'very doubtful'];

        return rand[Math.floor(Math.random() * rand.length)];
    }

    function spanking() {
        var rand = [
            `**${message.author.tag}** gives **${member.user.tag}** a smol spanking!`,
            `**${message.author.tag}** spanks **${member.user.tag}** `,
            `**${message.author.tag}** gives **${member.user.tag}** a spank! `,
            `**${message.author.tag}** spanks **${member.user.tag}** softly! `,
            `**${message.author.tag}** spanks **${member.user.tag}** gently! `,
            `**${message.author.tag}** turns around and spanks **${member.user.tag}**! `,
            `**${message.author.tag}** gives **${member.user.tag}** a firm spanking! `,
            `**${message.author.tag}** gives **${member.user.tag}** a hard spanking! `,
            `**${message.author.tag}** seems to think you've been bad, **${member.user.tag}**, so they walk up to you and spank you! `,
            `**${message.author.tag}** spanks **${member.user.tag}** several times! `,
            `**${message.author.tag}** spanks **${member.user.tag}** until red marks appear!`
        ];

        return rand[Math.floor(Math.random() * rand.length)];
    }



    if (command === "poke") {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member)
            return message.channel.send(`${message.member} has poked them self... **How unusual**`)


        message.channel.send(`**${member.user.tag}** has been poked by **${message.author.tag}**. `)
    }

    if (command === "slap") {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member)
            return message.channel.send(`${message.member} has slapped them self... **How unusual**`)


        message.channel.send(`**${member.user.tag}** has been slapped by **${message.author.tag}**. `)
    }

    if (command === "bap") {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member)
            return message.channel.send(`${message.member} has bap them self... **How unusual**`)


        message.channel.send(`**${member.user.tag}** has been bap by **${message.author.tag}**. `)
    }

    if (command === "avatar") {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member)
            return message.channel.send(message.author.avatarURL)
        let MentionedUser = message.mentions.users.first()

        message.channel.send(MentionedUser.avatarURL)
    }

    if (command === "sendn00ds") {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member)
            return message.channel.send(`${message.member} has sent n00ds of themself to them self... **How unusual**`)


        message.channel.send(`**${message.author.tag}** has sent n00ds of them self to **${member.user.tag}**. `)
    }

    if (command === "boop") {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member)
            return message.channel.send(`${message.member} has booped them self... **How unusual**`)


        message.channel.send(`**${member.user.tag}** has been booped by **${message.author.tag}**. `)
    }

    if (command === "cuddle") {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member)
            return message.channel.send(`${message.member} has cuddled them self up in a blanket... **How unusual**`)


        message.channel.send(`**${member.user.tag}** is being cuddled by **${message.author.tag}**. `)
    }

    if (command === "snuggle") {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member)
            return message.channel.send(`${message.member} has snuggled them self up in a blanket... **How unusual**`)


        message.channel.send(`**${member.user.tag}** is being snuggled by **${message.author.tag}**. `)
    }

    if (command === "waitforcuddle") {
        message.reply(` has opened here arms out for a cuddle, do \`a.cuddle @${member.user.tag}\` to cuddle them. ~w~`)
    }

    if (command === "kiss") {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member)
            return message.channel.send(`${message.member} has kissed them self... **How unusual**`)


        message.channel.send(`**${member.user.tag}** has been kissed by **${message.author.tag}**. `)
    }

    if (command === "shoot") {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member)
            return message.channel.send(`${message.member} has shot them self... **ScArY~!**`)


        message.channel.send(`**${member.user.tag}** has been shot by **${message.author.tag}**! `)
    }

    if (command === "8ball") {
        message.channel.send(`Your answer: ` + magic8ball());
    }

    if (command === "spank") {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member)
            return message.channel.send(`${message.member} has spanked them self... **How unusual**`)

        message.channel.send(`** ${ message.author.tag } ** spanks ** ${ member.user.tag } ** gently! `);
    }

    if (command === "poke") {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member)
            return message.channel.send(`${message.member} has poked them self... **How unusual**`)


        message.channel.send(`**${member.user.tag}** has been poked by **${message.author.tag}**. `)
    }

    if (command === "kick") {
        // This command must be limited to mods and admins. In this example we just hardcode the role names.
        // Please read on Array.some() to understand this bit: 
        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
        if (!message.member.roles.some(r => ["Administrator", "Moderator", "Owner"].includes(r.name)))
            return message.reply("Sorry, you don't have permissions to use this!");

        // Let's first check if we have a member and if we can kick them!
        // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
        // We can also support getting the member by ID, which would be args[0]
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member)
            return message.reply("Please mention a valid member of this server");
        if (!member.kickable)
            return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

        // slice(1) removes the first part, which here should be the user mention or ID
        // join(' ') takes all the various parts to make it a single string.
        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason provided";

        // Now, time for a swift kick in the nuts!
        await member.kick(reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
        message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

    }

    if (command === "unmute") {
        // This command must be limited to mods and admins. In this example we just hardcode the role names.
        // Please read on Array.some() to understand this bit: 
        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
        if (!message.member.roles.some(r => ["Administrator", "Moderator", "Owner"].includes(r.name)))
            return message.reply("Sorry, you don't have permissions to use this!");

        // Let's first check if we have a member and if we can kick them!
        // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
        // We can also support getting the member by ID, which would be args[0]
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member)
            return message.reply("Please mention a valid member of this server");
        if (!member.kickable) //We'll use member.kickable because it must be able to say if the user has higher roles or permission than the bot
            return message.reply("I cannot mute this user! Do they have a higher role? Do I have kick permissions?");

        // slice(1) removes the first part, which here should be the user mention or ID
        // join(' ') takes all the various parts to make it a single string.
        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason provided";

        // Now, time for a swift mute!
        await member.setMute(true, reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't mute because of : ${error}`));
        message.reply(`${member.user.tag} has been muted by ${message.author.tag} because: ${reason}`);
    }

    if (command === "ban") {
        // Most of this command is identical to kick, except that here we'll only let admins do it.
        // In the real world mods could ban too, but this is just an example, right? ;)
        if (!message.member.roles.some(r => ["Administrator", "Owner"].includes(r.name)))
            return message.reply("Sorry, you don't have permissions to use this!");

        let member = message.mentions.members.first();
        if (!member)
            return message.reply("Please mention a valid member of this server");
        if (!member.bannable)
            return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason provided";

        await member.ban(reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
        message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
    }

    if (command === "purge") {
        // This command removes all messages from all users in the channel, up to 100.
        // Most of this command is identical to kick, except that here we'll only let admins do it.
        // In the real world mods could ban too, but this is just an example, right? ;)
        if (!message.member.roles.some(r => ["Administrator", "Moderator", "Owner"].includes(r.name)))
            return message.reply("Sorry, you don't have permissions to use this!");

        // get the delete count, as an actual number.
        const deleteCount = parseInt(args[0], 10);

        // Ooooh nice, combined conditions. <3
        if (!deleteCount || deleteCount < 2 || deleteCount > 100)
            return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

        // So we get our messages, and delete them. Simple enough, right?
        const fetched = await message.channel.fetchMessages({ limit: deleteCount });
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    }

});

// Create an event listener for messages
client.on('message', message => {
    if (message.content === 'I love you Auro') {
        message.channel.send(`I love you too, @${message.author.tag}`)
    }
    if (message.content === "a.HamiltonParody") {
        // It's good practice to ignore other bots. This also makes your bot ignore itself
        // and not get into a spam loop (we call that "botception").
        if (message.author.bot) return;
        message.channel.send("Yo it's getting dark out so lemme spell out my name, I am the A, U, R, O ment to be, while servers keep shittin' on us endlessly, ENDLESSLY, yo when Jason Citron turns his updates up, we will never be in this century.")
    }
});


//Checks each message for a command
client.on("message", function (message) {
    if (message.content === "a.help") {
        const embed = {
            "title": "__**-= About Auro | Help Desk =-**__",
            "description": "Our bot is created using Discord.JS, a JavaScript library. We are trying to improve by adding more commands every day, week, and month. Check out our links below\n\nTwitter: [Auro Official Twitter](https://twitter.com/Auro_Bot)\nDiscord: [Auro's Discord Server](https://discord.gg/RefJvK7)\nDiscord Invite: [Auro's Invite Link](https://discordapp.com/oauth2/authorize?client_id=468868915230015488&scope=bot&permissions=8)",
            "color": 16777215,
            "footer": {
                "icon_url": "https://images-ext-1.discordapp.net/external/8Kfq_ZnBpN8dVzbDPCK-X7W5iKbrSSMRJs7AH9jmRfU/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/468868915230015488/7ec3a10e89de9ab47e41f4e6550dc37a.webp",
                "text": "Auro's Help Desk"
            },
            "thumbnail": {
                "url": "https://media.discordapp.net/attachments/452903994764034058/472486241301168138/a.png"
            },
            "author": {
                "name": "Help List",
                "icon_url": "https://images-ext-1.discordapp.net/external/8Kfq_ZnBpN8dVzbDPCK-X7W5iKbrSSMRJs7AH9jmRfU/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/468868915230015488/7ec3a10e89de9ab47e41f4e6550dc37a.webp?width=270&height=270"
            },
            "fields": [
                {
                    "name": "__Basic Information__",
                    "value": "Owner: `@Fevier#3517`\nPrefix: `.a`\nVersion: v0.9 ALPHA\nGit Repository: [Auro Bot](https://bit.ly/2AinNqs)\nCoding Library: Discord.JS | Version: ^11.3.2 (Latest)"
                },
                {
                    "name": "__Commands__",
                    "value": "New commands listed will have a `+` next to them, to let users know what we have added to the new version of Auro."
                },
                {
                    "name": "Basic Commands",
                    "value": "`help` - Brings this message up\n`ping` - Pings\n`avatar` - Gets YOUR avatar. Does not support mentions yet.\n"
                },
                {
                    "name": "Fun Commands",
                    "value": "`8ball` - Ask the bot for a response on what it thinks.\n`roll` - NOT ADDED YET\n`flip` - NOT ADDED YET"
                },
                {
                    "name": "Action Commands",
                    "value": "`poke` - Pokes the person you mention, or yourself\n+ `cuddle` - Cuddles the person you mention, or yourself\n+ `snuggle` - Snuggles the person you mention, or yourself\n`bap` - Baps the person you mention, or yourself\n`boop` - Boops the person you mention, or yourself\n`kiss` - Kisses the person you mention, or yourself\n`cuddle` - Cuddles the person you mention, or yourself\n`slap` - Slaps the person you mention, or yourself\n`spank` - Spanks the person you mention, or yourself\n`waitforcuddle` - Tells everyone in Auro's message that you want to cuddle somebody"
                },
                {
                    "name": "Moderation Commands",
                    "value": "This section does require roles named `Owner`, `Administrator`, and `Moderator` to work. All commands go by `{Command} {Mention} {Reason}` and may require manual moderation.\n\n `ban` - Bans the user\n`kick` - Kicks the user\n`mute` - Mutes the user (Buggy command)"
                }
            ]
        };
        message.channel.send({ embed });
    }
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find('name', 'connected');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${member}`);
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find('name', 'welcome_logging');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the **Wyvern Server**, ${member}. Please check #rules to get the Member role and make sure you read them too!`);
});

// Log our bot in
client.login(process.env.BOT_TOKEN);
