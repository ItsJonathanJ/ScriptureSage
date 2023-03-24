export default {
    name: 'interactionCreate',
    async execute(interaction: any, client: any) {
        if (!interaction.isCommand()) return;
        if(interaction.user.bot) return;
        
        const slashCommand = client.slashCommands.get(interaction.commandName)
        if(!slashCommand) return;
        
        if (interaction.type === 4) {
            if (slashCommand.autocomplete) {
                const choices: any[] = [];
                await slashCommand.autocomplete(interaction, choices)
            }
        }

        try{ 
            await slashCommand.execute(interaction, client)
        }
        catch (err) {
            console.log(err)
        }


    }
}