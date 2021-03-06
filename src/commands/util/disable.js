const Command = require('../command');

class DisableCommandCommand extends Command {
	constructor(client) {
		super(client, {
            name: 'disable-command',
            aliases: ['disable', 'cmd-off', 'command-off'],
            hidden: true,
            ownerOnly: true,
            guarded: true,
			description: 'Disables a command globally.',
			args: [
				{
                    key: 'commandName',
                    label: 'command',
				}
			]
		});
	}

	async run(message, { commandName }) { 
        const command = this.commander.registry.findCommand(commandName);
        if(command) {
            if(!command._globalEnabled) return message.reply(`The \`\`\`${command.name}\`\`\` command is already disabled.`);
            if(command.guarded) return message.reply(`You cannot disable the \`\`\`${command.name}\`\`\` command.`); 
            
            command._globalEnabled = false;
            message.reply(`The \`\`\`${command.name}\`\`\` command has been disabled.`);
        } else {
            return message.reply('That\'s not a valid command!');
        }
	}
};

module.exports = DisableCommandCommand;