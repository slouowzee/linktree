const express = require('express');
const cors = require('cors');
process.env.DOTENV_CONFIG_QUIET = 'true';
require('dotenv').config();

const bot = require('./bot');

const app = express();
app.use(cors());

app.get('/api/discord-status/stream', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  const sendUpdate = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  if (bot.isReady()) {
    sendUpdate(bot.getUserStatus());
  } else {
    sendUpdate({ status: 'loading', activities: [], avatarURL: null });
  }

  const handleUpdate = (data) => sendUpdate(data);
  bot.statusEmitter.on('update', handleUpdate);

  const heartbeatId = setInterval(() => {
    res.write(': heartbeat\n\n');
  }, 20000);

  req.on('close', () => {
    clearInterval(heartbeatId);
    bot.statusEmitter.off('update', handleUpdate);
    res.end();
  });
});

app.get('/api/discord-status', (req, res) => {
  try {
    if (!bot.isReady()) {
      return res.status(503).json({ 
        error: 'Service initializing',
        status: 'offline'
      });
    }

    const statusData = bot.getUserStatus();
    
    res.json({
      status: statusData.status,
      activities: statusData.activities,
      avatarURL: statusData.avatarURL,
      lastUpdate: statusData.lastUpdate
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal error',
      status: 'offline'
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    botReady: bot.isReady(),
    timestamp: new Date().toISOString()
  });
});

app.listen(3001, () => {
  console.log('[API] Server ready on :3001');
});