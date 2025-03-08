const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");
const ytdl = require("ytdl-core");
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require("@discordjs/voice");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });

client.once("ready", () => {
	console.log("MusicBot is online!");
});

/*
TODOS:
* read docs for start
* make a clear messages command
* pull token from gitignored file
* linter
- get mvp of sounds working (start and stop)
- queueing
- linter autofix instead of complaining (esp for whitespace)
- investigate buttons (try to make command bar for pause/play, skip, etc)
- convert commands to registered slash commands
- separate out commands into their own files
- typescript?
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
	else if (message.content === "!play" && !message.author.bot) {
		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			message.channel.send("You need to be in a voice channel to execute this command.");
			return;
		}

		/*
		* create a connection
		- create an audio player
		- subscribe the connection to the audio player (terminology?)
		- create an audio resource from youtube
		- audioPlayer.play(resource)
		- encoding and all that?
		*/

		const connection = joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId: voiceChannel.guild.id,
			adapterCreator: voiceChannel.guild.voiceAdapterCreator,
		});
		const player = createAudioPlayer();
		// connection.subscribe(player);

		const process = ytdl("https://www.youtube.com/watch?v=dQw4w9WgXcQ", { filter: "audioonly" }, { stdio: ["ignore", "pipe", "ignore"] });
		const resource = createAudioResource(process);
		player.play(resource);

		connection.subscribe(player);

		setTimeout(() => { connection.destroy(); }, 50000);
	}
});

client.login(token);