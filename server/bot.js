const { Client, GatewayIntentBits, Events } = require('discord.js');
const { EventEmitter } = require('events');
process.env.DOTENV_CONFIG_QUIET = 'true';
require('dotenv').config();

const statusEmitter = new EventEmitter();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers
  ]
});

let userStatus = {
  status: 'offline',
  activities: [],
  lastUpdate: null
};

async function updateStatus(presence) {
  if (!presence) {
    userStatus = {
      ...userStatus,
      status: 'offline',
      activities: []
    };
    statusEmitter.emit('update', userStatus);
    return;
  }

  let user = presence.user;
  if (!user) {
    try {
        user = await client.users.fetch(process.env.DISCORD_USER_ID);
    } catch (e) {
        console.error('[BOT] Could not fetch user:', e.message);
    }
  }

userStatus = {
	status: presence.status || 'offline',
	activities: presence.activities?.map(activity => ({
		name: activity.name,
		type: activity.type,
		details: activity.details,
		state: activity.state,
		syncId: activity.syncId,
		url: activity.url,
		assets: activity.assets ? {
			largeImage: activity.assets.largeImage,
			largeText: activity.assets.largeText,
			smallImage: activity.assets.smallImage,
			smallText: activity.assets.smallText
		} : null,
		button: activity.buttons?.[0]
	})) || [],
	avatarURL: user?.displayAvatarURL({ dynamic: true, size: 256 }) || userStatus.avatarURL,
	lastUpdate: new Date().toISOString()
};

  statusEmitter.emit('update', userStatus);
}

client.once(Events.ClientReady, async () => {
  console.log('[BOT] Connected');
  
  try {
    const guild = await client.guilds.fetch(process.env.DISCORD_GUILD_ID);
    const member = await guild.members.fetch(process.env.DISCORD_USER_ID);
    
    updateStatus(member.presence);
  } catch (error) {
    console.error('[BOT] Init error:', error.message);
  }
});

client.on(Events.PresenceUpdate, (oldPresence, newPresence) => {
  if (newPresence.userId === process.env.DISCORD_USER_ID) {
    updateStatus(newPresence);
  }
});

client.on(Events.UserUpdate, (oldUser, newUser) => {
  if (newUser.id === process.env.DISCORD_USER_ID) {
    userStatus.avatarURL = newUser.displayAvatarURL({ dynamic: true, size: 256 }) || userStatus.avatarURL;
    statusEmitter.emit('update', userStatus);
  }
});

client.on(Events.Error, (error) => {
  console.error('[BOT] Error:', error);
});

client.login(process.env.DISCORD_BOT_TOKEN)
  .catch((err) => {
    console.error('[BOT] Connection failed:', err.message);
  });

function getUserStatus() {
  return userStatus;
}

function isReady() {
  return client.isReady();
}

module.exports = { getUserStatus, isReady, statusEmitter };
