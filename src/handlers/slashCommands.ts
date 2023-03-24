import { Client, REST, Routes } from 'discord.js';
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()


export default async (client:any) => {
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN || '')
    const slashCommands = []
    const directory = fs.readdirSync(`./src/commands/`)

    console.log(`Loading slash commands...`);

    for (const dir of directory) {
        const commandFiles = fs.readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith('.js') || file.endsWith('.ts'));

        for (const file of commandFiles) {
            try {
            const slashCommand = (await import(`../commands/${dir}/${file}`)).default;
            slashCommands.push({
                name: slashCommand.name,
                description: slashCommand.description,
                options: slashCommand.options ? slashCommand.options : null,
                defaultPermission: slashCommand.defaultPermission ? slashCommand.defaultPermission : true,
                type: slashCommand.type
            })

            if(slashCommand.name) {
                client.slashCommands.set(slashCommand.name, slashCommand);
                
            } else {
                console.log(`No slash command name found in ${file}`);
            }

            await rest.put(
                process.env.GUILD_ID ?
                Routes.applicationGuildCommands(process.env.CLIENT_ID || '', process.env.GUILD_ID || '') :
                Routes.applicationCommands(process.env.CLIENT_ID || ''), 
                { body: slashCommands }
            );
            console.log(`Loaded slash command ${slashCommand.name}!`)
        } catch (err) {
            console.log(`Error loading slash command ${file}: ${err}`);
        }

        }
    }
}