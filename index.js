require('http').createServer().listen(3000);
const Discord = require('discord.js');
const client = new Discord.Client();

client.on("ready", () => {
    client.user.setActivity('lw$ajuda', {type:"LISTEING"});
    console.log("bot carregado boyes");
});

client.on("message", async message => {
    let prefix = "lw$"
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
    if (message.channel.type === "dm") return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        let commandFile = require(`./comandos/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        console.error(err);
        let embed = new Discord.RichEmbed();
        embed.setColor('RANDOM');
        embed.setAuthor(`${message.author.username}#${message.author.discriminator}`);
        embed.setTitle('Falha ao executar o comando');
        embed.setDescription('Houve um erro ao processar o comando, ele provavelmente não existe !');
        message.channel.send(embed);
    }
});

client.login(process.env.TOKEN);
