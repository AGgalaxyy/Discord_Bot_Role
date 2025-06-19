const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const { start } = require('repl');

function startBot() {
  const logStream = fs.createWriteStream(path.join(__dirname, 'crash.log'), { flags: 'a' });

  console.log('Starting bot process...');
  const bot = spawn('node', ['index.js']);

  bot.stdout.on('data', (data) => {
    process.stdout.write(data);
    logStream.write(`[stdout] ${data}`);
  });

  bot.stderr.on('data', (data) => {
    process.stderr.write(data);
    logStream.write(`[stderr] ${data}`);
  });

  bot.on('exit', (code) => {
    const exitMessage = `❌ Bot exited with code ${code} at ${new Date().toISOString()}\n`;
    console.log(exitMessage);
    logStream.write(exitMessage);
    logStream.end();

    console.log('Restarting bot in 10 seconds...');
    setTimeout(startBot, 10000); // wait 10 seconds before restarting
  });
}

startBot(); 
