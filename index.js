const fs=require('fs');
const Discord=require("discord.js");
const Config=require("./config.json");
const client=new Discord.Client();
client.commands=new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(let file of commandFiles){
	const command=require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
client.once('ready', ()=>{
	console.log('All is good');
	console.log(client.commands.get('hello').description);
})

client.on('message', message=>{
    if(message.content.startsWith(Config.prefix)&&!(message.author.bot)){
        let words=message.content.toLowerCase().split(" ");
        if(words[1]=='hello'){
			client.commands.get('hello').execute(message,words);}
		else if(words[1]=='minesweeper'){
			client.commands.get('minesweeper').execute(message,words);}
		}
	}
)

client.login(Config.token);