module.exports = {
	name: 'hello',
	description: 'Prints Greeting',
	execute(message,words) {
		message.channel.send("Hello to you too :wave:");
	},
};