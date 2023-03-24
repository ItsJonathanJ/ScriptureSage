import { Client, GatewayIntentBits, Collection } from 'discord.js'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

dotenv.config()

const client:any = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
})

client.slashCommands = new Collection()

const handlerDir = fs.readdirSync(path.join(__dirname, './handlers'))

handlerDir.forEach(async (handler: string) => {
    (await import(`./handlers/${handler}`)).default(client);
})


client.login(process.env.TOKEN)