const { Client, Intents } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.once("ready", () => {
	console.log("MusicBot is online!");
});

/*
TODOS:
* read docs for start
* make a clear messages command
- pull token from gitignored file
*/

client.on("messageCreate", async message => {
	console.log("got a message");
	if (message.content === "!test" && !message.author.bot) {
		message.channel.send("Testing!");
	}
	else if (message.content === "!clear" && !message.author.bot) {
		const allMessages = await message.channel.messages.fetch({ limit: 100 });
		console.log(`Clearing ${allMessages.size} messages.`);
		message.channel.bulkDelete(allMessages);
	}
});

client.login("TOKEN GOES HERE");