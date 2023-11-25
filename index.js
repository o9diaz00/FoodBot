require('dotenv').config(); //initialize dotenv
//const cron = require('cron');
const { Client, Discord, Intents, TextChannel } = require('discord.js')
const { clientId, guildId, token } = require('./config.json');
const client = new Client({ intents: ['Guilds', 'GuildMessages', 'MessageContent', 'GuildMembers'] });
//client = new Client({ intents: 32767 });

var foodList = {
    general: ["GIANTASSSUB","CHIPOTLE","RAMEN","PAELLA","CHICKFILA", "MCDONALDS", "POPEYES", "WENDY'S", "FOODATTHEHOUSE", "KFC", "PIZZAHUT", "PANDAEXPRESS", "GYROS", "W/EYOUWANT", "SMASHBURGER", "PHO", "BJHOMECOOKEDMEALS"],
};

async function fetchMembers()
{
    const Guild = client.guilds.cache.get(guildId); // Getting the guild.
    const members = await Guild.members.fetch();
    members.forEach(member => {
        if (!member.user.bot)
        {
            var key = member.user.id;
            foodList[key] = [];
        }
    });
}
function removeItem(array, value)
{
    var index = array.indexOf(value);
    if (index > -1)
    { array.splice(index, 1); }
    return array
}

function clearArray(array)
{
    while (array.length > 0)
    { array.pop(); }
    return array;
}

//songList.push("https://www.youtube.com/watch?v=kfVsfOSbJY0&ab_channel=rebecca");

client.once('ready', () => {
  /*let fridaySong = new cron.CronJob('00 00 10 * * 5', () => {
    const chn = client.channels.fetch("239077914363035649");
    chn.send("Happy Friday!\n"+songList[Math.floor(Math.random() * songList.length)]);
    console.log("Song List\n"+songList);
    });
    fridaySong.start();*/
    fetchMembers();
});

client.on("messageCreate", (message) => {
    if (message.author.bot)
    { return false }

    if (message.author.username != "")

    if (message.content == '!removeAllFood')
    {
        var key = message.author.id;
        var name = message.author.username;

        message.reply("Okay, I am removing all the items from ["+name+"]'s list");

        console.log(foodList[key]);
    }

    if (message.content.startsWith('!addFood '))
    {
        var msg = message.content.split(" ")[1].toUpperCase();
        var key = message.author.id;
        var name = message.author.username;

        if (foodList[key].includes(msg))
        { message.reply(""+msg+" is already added to ["+name+"]'s list!"); }
        else
        {
            message.reply("Added "+msg+" to ["+name+"]'s food list!");
            foodList[key].push(msg);
        }
    }

    if (message.content.startsWith('!addFoodGeneral '))
    {
        var msg = message.content.split(" ")[1].toUpperCase();

        if (foodList["general"].includes(msg))
        { message.reply(""+msg+" is already added to the general list!"); }
        else
        {
            message.reply("Added "+msg+" to the general food list!");
            foodList["general"].push(msg);
            console.log(foodList["general"]);
        }
    }

    if (message.content.startsWith('!removeFood '))
    {
        var msg = message.content.split(" ")[1].toUpperCase();
        var key = message.author.id;
        var name = message.author.username;

        if (foodList[key].includes(msg))
        {
            message.reply("Removed "+msg+" from ["+name+"]'s list!");
            foodList[key] = removeItem(foodList[key], msg);
            console.log(name+"'s"+foodList[key]);
        }
        else
        { message.reply(msg+" is not in ["+name+"]'s list!"); }
    }

    if (message.content.startsWith('!removeFoodGeneral '))
    {
        var msg = message.content.split(" ")[1].toUpperCase();

        if (foodList["general"].includes(msg))
        {
            message.reply("Removed "+msg+" from the general list!");
            foodList["general"] = removeItem(foodList["general"], msg);
            console.log(foodList["general"]);
        }
        else
        { message.reply(msg+" is not in the general list!"); }
    }

    if (message.content == "!foodList")
    {
        var key = message.author.id;
        var name = message.author.username;

        if (foodList[key].length == 0)
        { message.reply("No items have been added to ["+name+"]'s list!"); }
        else
        {
            message.reply("These are the foods in ["+name+"]'s list:\n"+foodList[key].join("\r\n"));
            console.log("["+name+"]'s Food List]\n"+foodList[key]);
        }
    }

    if (message.content == "!foodListGeneral")
    {
        if (foodList["general"].length == 0)
        { message.reply("No items have been added to the general food list"); }
        else
        {
            message.reply("These are the list of foods:\n"+foodList["general"].join("\r\n"));
            console.log("[Food List]\n"+foodList["general"]);
        }
    }

    if (message.content == "!pickFood")
    {
        var key = message.author.id;
        var name = message.author.username;

        if (foodList[key].length == 0)
        { message.reply("There are no choices in ["+name+"]'s list for me to choose from"); }
        else
        {
            var rand = Math.floor(Math.random() * foodList[key].length);
            message.reply("Choosing from the list, why not have you some ["+foodList[key][rand]+"] today");
        }
    }

    if (message.content == "!pickFoodGeneral")
    {
        if (foodList["general"].length == 0)
        { message.reply("There are no choices in the general list for me to choose from"); }
        else
        {
            var rand = Math.floor(Math.random() * foodList["general"].length);
            message.reply("Choosing from the general list, why not have you some ["+foodList["general"][rand]+"] today");
        }
    }

    if (message.content == "!import")
    {
        if (foodList["general"].length == 0)
        { message.reply("There are no choices in the general list to copy over"); }
        else
        {
            var key = message.author.id;
            var name = message.author.username;

            for (i=0; i<foodList["general"].length; i+=1)
            {
                if (!foodList[key].includes(foodList["general"][i]))
                {
                    foodList[key].push(foodList["general"][i]);
                    console.log("Added "+foodList["general"][i]+" to ["+name+"]'s list");
                }
            }
            message.reply("Added items from the general list into ["+name+"]'s list");
            console.log("["+name+"'s Food List]\n"+foodList[key]);
        }
    }

    if (message.content == "!foodHelp")
    {
    const reply = `These are the commands that currently work:
                   !foodHelp => Call this help menu
                   !addFood $food => Inserts an item into your personal food list
                   !addFoodGeneral $food => Inserts an item into the general food list
                   !removeFood $food => Removes an item from your personal food list
                   !removeFoodGeneral $food => Removes an item from the general food list
                   !foodList => Grabs the list of items in your personal list
                   !foodListGeneral => Grabs the list of items in the general list
                   !pickFood => Randomly selects an item from your personal list
                   !pickFoodGeneral => Randomly selects an item from the general food list
                   !import => Sets your list to the general food list`
    message.reply(reply);
    }
});

client.login(token); //login bot using token