const { Client, GatewayIntentBits, ApplicationCommandType, EmbedBuilder } = require("discord.js");
const env = require("./env");

process.title = "CoinToss Discord Bot";
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", async () =>{ 
    client.application.commands.set([{
        name: "cointoss",
        type: ApplicationCommandType.ChatInput,
    },{
        name: "help",
        type: ApplicationCommandType.ChatInput
    }], env.DEBUG_SERVER_ID);

    setInterval(() =>{
        client.user?.setActivity({
            name: `/help | ${client.guilds.cache.size}サーバーで稼働中`
        });
    }, 5000);
});

client.on("interactionCreate", async (interaction) =>{
    if(interaction.type !== InteractionType.ApplicationCommand) return;
    switch(interaction.commandName){
        case "cointoss":
            const coin = [true, false][Math.floor(Math.random()*2)];
            return interaction.reply({ embeds: [
                new EmbedBuilder()
                .setTitle(`結果は...${["**うら**", "**おもて**"][coin?0:1]} でした!`)
                .setThumbnail(["https://uraimag", "omoteimag"][coin?0:1])
            ] });
        case "help":
            return interaction.reply({ embeds: [
                new EmbedBuilder()
                .setTitle("コイントスBot Help")
                .setDescription("`/cointoss`\nコイントスをします")
                .addFields(
                    { name: "バージョン", value: `v${env.APP_VERSION}`, inline: true },
                    { name: "サーバーへ追加する", value: `[招待する](https://discord.com/api/oauth2/authorize?client_id=${env.CLIENT_ID}&permissions=18432&scope=applications.commands%20bot)`, inline: true },
                    { name: "Github", value: env.GITHUB_URL, inline: true }
                )
            ] });
    }
})

