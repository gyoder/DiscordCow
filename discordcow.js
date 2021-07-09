const Discord = require('discord.js');
const client = new Discord.Client();
const { exec } = require('child_process');
const request = require('request')
const fs = require('fs')
//on login notify

client.on('ready', () => {
  console.log("Connected as " + client.user.tag);
});

var options = {}
client.on('message', (message) => {
  if (message.content.startsWith('cowsay ')) {
    //options to post for an api. i did not find the cowsay library in time
    options = {
      url: 'https://cowsay.morecode.org/say',
      form: {
        message: message.content.slice(7),
        format: 'text'
      }
    }
    request.post(options, (err, res, body) => {
      if (err) {
          return console.log(err);
      }

      try {
        message.delete();
      } catch (e) {
        console.log('cowsay needs perms');
      }

      message.channel.send('```' + body + '```')
    });
  }
})
fs.readFile('./DiscordToken', 'utf-8', (err, token) => {
  if (err) {
    console.log(`Error reading discord token from file ./DiscordToken: ${err}`)
  } else {
    client.login(token)
  }
  
})
