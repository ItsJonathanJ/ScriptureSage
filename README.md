# BaseDiscordBot
This discord bot is meant to be a base discord bot to build your own fuctions off of. This bot was built in DiscordJS version 14.7.1. This bot contains event and slash command handlers. This bot has no real features but should be used to make your own.


# Slash Command Handler

To use the slash command handler, there is a simple "skeleton" you need to create. In this, you will provide all the nessasary info for the slash commands to be deployed.

```typescript

export default {
        name: 'name', //name
        description: 'description', // Description of command
        type: ApplicationCommandType.ChatInput, //Can be something else, see https://discord-api-types.dev/api/discord-api-types-v10/enum/ApplicationCommandType
        cooldown: 100, // Cooldown between commands

//Options for autofill, below is a example
        options: [
                {name: 'user', description: "Specify User", type: 6, required: true}
        ],
//Run the code
	run: async (interaction:any) => {
    console.log('It Works')
	}
};

```


# Event Handler
To use the event handler, it has a similar setup as the slash command handler. You need to create another "skeleton".

```typescript
export default {
    type: 'interactionCreate', // Type of event, see https://gist.github.com/Iliannnn/f4985563833e2538b1b96a8cb89d72bb
    displayName: 'interactionCreate', // Name to show in console when the event is loaded
    
    //Run event
    execute: async (interaction: any) => { 
      console.log('Event ran")
    }
```

#MongoDB Connection

Look in the [example.env](example.env) so that you can add the required information to your MongoDB database. The bot creates a connection in [ready.ts](src/events/misc/ready.ts). You need to create the inquiry’s separately.

For info on how to use MongoDB in node.js, look [here](https://www.w3schools.com/nodejs/nodejs_mongodb.asp)


# Credit
This bot is for public use, please just credit me. https://solo.to/itsjonathan
