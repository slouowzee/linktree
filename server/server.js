const express = require('express');
const cors = require('cors');
process.env.DOTENV_CONFIG_QUIET = 'true';
require('dotenv').config();

const bot = require('./bot');

const app = express();
app.use(cors());

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