    // Constances
    const Discord = require('discord.js');
    const fs = require('fs');
    const low = require('lowdb');
    const FileSync = require('lowdb/adapters/FileSync');

    const adapter = new FileSync('database.json');
    const db = low(adapter);

    db.defaults({ histoires: [], xp: []}).write()

    const bot = new Discord.Client();
    const prefix = '.';
    bot.commands = new Discord.Collection();

// Niveau XP
bot.on('message', message => {
  var msgauthor = message.author.username;
  var id = message.author.id;

  if(message.author.bot)return;
  if(!db.get("xp").find({user: msgauthor}).value()) {
    db.get("xp").push({user: msgauthor, xp: 1}).write();
  }else{
    var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
    console.log(userxpdb);
    var userxp = Object.values(userxpdb)
    console.log(userxp)
    console.log(`Nombre d'xp : ${userxp[1]}`)

    db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();

    if (message.content === prefix + "niveau") {
      var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
      var xpfinal = Object.values(xp);
      var xp_embed = new Discord.RichEmbed()
      .setTitle(`Voici ton niveau ${message.author.username}`)
      .setDescription(`Identificateur : ${message.author.id}`)
      .setColor('#F4D03F')
      .setDescription('')
      .addField(`Tu as à ton effectif`, `${xpfinal[1]} niveau(x)`)
      .setFooter("© ShadowBot - By @TheShadow__#3908 ")
      message.channel.send({embed: xp_embed});
    }
  }
})

// Ping + Clear
bot.on('message', message => {
  if (message.content === prefix + "ping") {
    message.channel.send("Temps de latence avec le serveur : " + `${message.createdTimestamp - Date.now()}` + " mini secondes")
  }

  if (message.content === prefix + "clear") {
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
      message.channel.fetchMessages()
        .then(function(list) {
      message.channel.bulkDelete(list);
      var clear_embed = new Discord.RichEmbed()
      .setTitle(`ShadowMod - Clear`)
      .setColor('#19889')
      .addField(`Modérateur :`, `${message.author.username}`)
      .addField(`Raison :`, `Aucune raison spécifié.`)
      .setFooter("© ShadowBot - By @TheShadow__#3908 ")
      message.channel.send({embed: clear_embed});
    }, function(err) { message.channel.send("Erreur")})

    }
  }
})
        // Lancement du robot
        bot.on('ready', async () => {
        console.log('------------------------')
        console.log('Informations :')
        console.log('------------------------')
        console.log(`Connécté sur : ${bot.user.username}`) // A vérifier si c'est bon
        console.log(`Totaux de serveur : ${bot.guilds.size}`) // A finir
        console.log('------------------------')
        bot.user.setActivity("ShadowBot - Maintenance", {type: "WATCHING"})
        })

        bot.on("message", async message => {
          if(message.author.bot) return
          if(message.channel.type === "dm") return;

        })
    // Variables
    bot.on('message', message => {

    var sender = message.author;
    var msg = message.content.toUpperCase();
    var commands = new Object();
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
    })


// --------------- Partie commandes | Utile --------------- \\
bot.on('message', message => {

  if(message.content === prefix + "aide") {
message.channel.send({embed: {
    color: 3447003,
    author: {
      name: bot.user.username,
      icon_url: bot.user.avatarURL
    },
    title: "Page d'aide",
    description: "Alias : help",
    fields: [{
        name: "Commandes utiles ",
        value: "- prefix\n- .aide\n- .help "
      },
      {
        name: "Commandes fun",
        value: "Aucune commande trouvé."
      },
      {
        name: "Commande d'administration",
        value: "Aucune commande trouvé."
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: bot.user.avatarURL,
      text: "© ShadowBot - By @TheShadow__#3908 "
    }

  }
})
}

// Commande : info

if(message.content === prefix + "info") {
message.channel.send({embed: {
  color: 3447003,
  author: {
    name: bot.user.username,
    icon_url: bot.user.avatarURL
  },
  title: "Informations sur le serveur",
  description: "Alias : informations",
  fields: [{
      name: "Nombres de membres",
      value: "Il y a " + message.guild.members.size + " membres sur le serveur."
    },
    {
      name: "Nombres de salons et de catégories",
      value: "Il y a en tout " + message.guild.channels.size + " salons et catégories sur le serveur."
    },
  ],
  timestamp: new Date(),
  footer: {
    icon_url: bot.user.avatarURL,
    text: "© ShadowBot - By @TheShadow__#3908 "
  }

}
})
}

// Commande : informations

if(message.content === prefix + "informations") {
message.channel.send({embed: {
  color: 3447003,
  author: {
    name: bot.user.username,
    icon_url: bot.user.avatarURL
  },
  title: "Informations sur le robot",
  description: "Alias : info",
  fields: [{
      name: "Nombres de membres",
      value: "Il y a " + message.guild.members.size + " membres sur le serveur."
    },
    {
      name: "Nombres de salons et de catégories",
      value: "Il y a en tout " + message.guild.channels.size + " salons et catégories sur le serveur."
    },
  ],
  timestamp: new Date(),
  footer: {
    icon_url: bot.user.avatarURL,
    text: "© ShadowBot - By @TheShadow__#3908 "
  }
}
})
}


if (message.content === prefix + 'staff') {
    let memberhelp = message.author.tag;
    let channelhelp = message.channel.name;
    message.reply("Un membre du staff va venir vous aider prochaînement.");
    const channelstaff = message.guild.channels.find('name', 'devblog');
message.channel.send("Attention " + memberhelp + " a besoin d'aide dans " + channelhelp + ".");

}


})

bot.on('message', async message => {
  //1 blacklisted words
  let blacklisted = ['tg, fdp, ntm, pd, ntr'] //words put , after the word

  //2 looking for words
  let foundInText = false;
  for (var i in blacklisted) { // loops through the blacklisted list
    if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
  }
  // checks casesensitive words

  //3 deletes and send message
    if (foundInText) {
      message.delete();
      message.channel.sendMessage( message.author.username + " Merci de respecter le règlement, les mots vulgaire sont sanctionnable.")
  }
});
// --------------- Partie commandes | Modération --------------- \\
bot.login(process.env.BOT_TOKEN);
