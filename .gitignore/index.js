const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = '*';
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
const broadcast = bot.createVoiceBroadcast();




function sendError(message, description){
    message.channel.send({embed: {
        color:15158332,
        description: ':x:' + description
    }});
}

bot.on('ready',function () {
    bot.user.setPresence({ game: { name: 'Dev en cours', type: 0}})
    console.log("Je suis prêt !");
});

bot.on('message', message => {
    let splitMessage = message.content.split(" ");
    if(message.content === PREFIX+"help"){
        var help_embed = new Discord.RichEmbed()
            .setColor('#0DE1C4')
            .addField("Commande du bot :", "- *help : Affiche les commandes \n- *play [URL] : Joue une musique \n- *leave : Pour déonnecté le bot")
        message.channel.sendEmbed(help_embed);
        console.log("Commande *help effectuée");

}
    if(splitMessage[0] === '*play'){
        if(splitMessage.length === 2){
            if(message.member.voiceChannel){
                message.member.voiceChannel.join().then(connection => {
                    const stream = ytdl(splitMessage[1], { filter : 'audioonly' });
                    broadcast.playStream(stream);
                    const dispatcher = connection.playBroadcast(broadcast);

                }).catch(console.log);


            }
            else
                sendError(message,"Erreur, vous n'êtes dans aucun canal")
        }
        else
            sendError(message,"Erreur, la commande n'est pas complète")


    }
    if(message.content === PREFIX+"leave"){
        const channel = message.member.voiceChannel;
        channel.leave();
        console.log('Décconnecté');
    }
    if(message.content === PREFIX+"pause"){
        if(broadcast !== undefined){
            broadcast.pause();
        }
    }
if(message.content === PREFIX+"resume"){
        broadcast.resume();

}
});

bot.login(process.env.TOKEN);
