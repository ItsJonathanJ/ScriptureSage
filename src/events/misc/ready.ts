import mongoose from 'mongoose';

export default {
    name: 'ready',
    once: true,
    async execute(client: any) {
        console.log(`Logged in as ${client.user.tag}!`);

        mongoose.set('strictQuery', true)
        await mongoose.connect(process.env.MONGO_URI || '', {
            keepAlive: true,
        }).then(() => console.log('Connected to MongoDB') )
    }
}