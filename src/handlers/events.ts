import { Client } from 'discord.js'
import path from 'path'
import fs from 'fs'


export default async (client: Client) => {
    const eventsList: any[] = [];
    const directory = fs.readdirSync('./src/events')

    for (const dir of directory) {
        const eventFiles = fs.readdirSync(`./src/events/${dir}`).filter((file: string) => file.endsWith('.js') || file.endsWith('.ts'))


        eventFiles.forEach(async (file: string) => {

            console.log(`Loading events...`);

            const event = (await import(`../events/${dir}/${file}`)).default
            const execute = (...args: any[]) => event.execute(...args, client)

            if (event.once) {
                client.once(event.name, execute)
            } else {
                client.on(event.name, execute)
            }


            eventsList.push(event.name)
            console.log(`Loaded event: ${event.name}`)
        })
    }
}