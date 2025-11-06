const { Client, GatewayIntentBits, Events } = require('discord.js');
process.env.DOTENV_CONFIG_QUIET = 'true';
require('dotenv').config();

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

function updateStatus(presence) {
  if (!presence) {
    userStatus = {
      status: 'offline',
      activities: [],
      lastUpdate: new Date().toISOString()
    };
    return;
  }

  userStatus = {
    status: presence.status || 'offline',
    activities: presence.activities?.map(activity => ({
      name: activity.name,
      type: activity.type,
      details: activity.details,
      state: activity.state
    })) || [],
    lastUpdate: new Date().toISOString()
  };
}

client.once(Events.ClientReady, async () => {
  console.log('[BOT] Connected');
  
  try {
    const guild = await client.guilds.fetch(process.env.DISCORD_GUILD_ID);
    const member = await guild.members.fetch(process.env.DISCORD_USER_ID);
    
    updateStatus(member.presence);
    console.log(`[BOT] Status: ${userStatus.status}`);
  } catch (error) {
    console.error('[BOT] Init error:', error.message);
  }
});

client.on(Events.PresenceUpdate, (oldPresence, newPresence) => {
  if (newPresence.userId === process.env.DISCORD_USER_ID) {
    updateStatus(newPresence);
    console.log(`[BOT] ${userStatus.status}`);
  }
});

client.on(Events.Error, (error) => {
  console.error('[BOT] Error:', error);
});

client.login(process.env.DISCORD_BOT_TOKEN)
  .catch(() => {
    console.error('[BOT] Connection failed');
    process.exit(1);
  });

function getUserStatus() {
  return userStatus;
}

function isReady() {
  return client.isReady();
}

module.exports = { getUserStatus, isReady };
