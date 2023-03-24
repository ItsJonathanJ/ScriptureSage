import exampleSchema from "../../schemas/exampleSchema";
export default {
    name: 'ping',
    description: 'Ping!',
    async execute(interaction: any, client: any) {
        await interaction.reply('Pong!')
    }
}