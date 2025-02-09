//require('dotenv').config(); //initialize dotenv
//const cron = require('cron');
const { Client, Discord, Intents, TextChannel } = require('discord.js')
const { clientId, guildId, token } = require('./config.json');
const client = new Client({ intents: ['Guilds', 'GuildMessages', 'MessageContent', 'GuildMembers'] });
//client = new Client({ intents: 32767 });

var foodList = {
    general: [],
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
function removeItem(array, value, name)
{
    name = "" ? "the general food" : name.concat("'s");
    if (array.includes(value))
    {
        var index = array.indexOf(value);
        message.reply("Removed "+value+" from "+name+" list!");
        if (index > -1)
        { array.splice(index, 1); }
    }
    else
        { message.reply(msg+" is not in "+name+" list!"); }

    return array
}

function addItem(array, value, name)
{
    name = "" ? "the general food" : name.concat("'s");
    if (array.includes(value))
    { message.reply(""+value+" is already added to "+name+" list!"); }
    else
    {
        message.reply("Added "+value+" to "+name+" food list!");
        array.push(value);
    }
}

function clearArray(array, name)
{
    name = "" ? "the general food" : name.concat("'s");
    message.reply("Okay, I am removing all the items from "+name+" list");

    while (array.length > 0)
    { array.pop(); }
}

function listArray(array, name)
{
    name = "" ? "the general food" : name.concat("'s");
    if (array.length == 0)
    { message.reply("No items have been added to "+name+" list!"); }
    else
    { message.reply("These are the foods in "+name+" list:\n"+array.join("\r\n")); }
}

function selectRandomElement(array, name)
{
    name = "" ? "the general food" : name.concat("'s");
    if (array.length == 0)
    { message.reply("There are no choices in "+name+" list for me to choose from"); }
    else
    {
        var rand = Math.floor(Math.random() * array.length);
        message.reply("Choosing from the list, why not have you some ["+array[rand]+"] today");
    }
}

function importFoodList(array, name)
{
    if (foodList["general"].length == 0)
    { message.reply("There are no choices in the general list to copy over"); }
    else
    {
        for (i=0; i<foodList["general"].length; i+=1)
        {
            if (!array.includes(foodList["general"][i]))
            { array.push(foodList["general"][i]); }
        }
    message.reply("Added items from the general list into "+name+" list");
    }
}

client.once('ready', () => {
    fetchMembers();
});

client.on("messageCreate", (message) => {
    if (message.author.bot)
    { return false }

    if (message.author.username != "")

    if (message.content == '!removeAllFood')
    { clearArray(foodList[message.author.id], message.author.username); }

    if (message.content.startsWith('!addFood '))
    { addItem(foodList[message.author.id], message.content.split(" ")[1].toUpperCase(), message.author.username); }

    if (message.content.startsWith('!addFoodGeneral '))
    { addItem(foodList["general"], message.content.split(" ")[1].toUpperCase(), ""); }

    if (message.content.startsWith('!removeFood '))
    { foodList[message.author.id] = removeItem(foodList[message.author.id], message.content.split(" ")[1].toUpperCase(), message.author.username); }

    if (message.content.startsWith('!removeFoodGeneral '))
    { foodList["general"] = removeItem(foodList["general"], message.content.split(" ")[1].toUpperCase(), ""); }

    if (message.content == "!foodList")
    { listArray(foodList[message.author.id], message.author.username); }

    if (message.content == "!foodListGeneral")
    { listArray(foodList["general"], ""); }

    if (message.content == "!pickFood")
    { selectRandomElement(foodList[message.author.id], message.author.username); }

    if (message.content == "!pickFoodGeneral")
    { selectRandomElement(foodList["general"], ""); }

    if (message.content == "!import")
    { importFoodList(foodList[message.author.id], message.author.username); }

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