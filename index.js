const { Client, GatewayIntentBits, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
require('dotenv').config();
const express = require('express');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Message, Partials.Channel]
});

const ROLE_NAME = "Cannon foder"; // Change to your role name

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.content === '!reactrole') {
    const embed = new EmbedBuilder()
      .setColor(0x9b59b6)
      .setDescription("Clica neste botao para conseguires o cargo e veres as merdas do server!");

    const giveRoleButton = new ButtonBuilder()
      .setCustomId('give_role')
      .setLabel('Big mistake')
      .setStyle(ButtonStyle.Primary); // Blue button

    const removeRoleButton = new ButtonBuilder()
      .setCustomId('remove_role')
      .setLabel('Unmake the mistake')
      .setStyle(ButtonStyle.Danger); // Red button

    const row = new ActionRowBuilder().addComponents(giveRoleButton, removeRoleButton);

    await message.channel.send({
      embeds: [embed],
      components: [row]
    });
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  const guild = interaction.guild;
  const member = await guild.members.fetch(interaction.user.id);
  let role = guild.roles.cache.find(r => r.name === ROLE_NAME);

  if (interaction.customId === 'give_role') {
    if (!role) {
      role = await guild.roles.create({
        name: ROLE_NAME,
        color: 'Blue',
        reason: 'Auto-created role from button bot'
      });
    }
    await member.roles.add(role);
    await interaction.reply({ content: `🎉 Adicionaste o cargo "${ROLE_NAME}"!`, ephemeral: true });

  } else if (interaction.customId === 'remove_role') {
    if (role && member.roles.cache.has(role.id)) {
      await member.roles.remove(role);
      await interaction.reply({ content: `❌ Removeste o cargo "${ROLE_NAME}".`, ephemeral: true });
    } else {
      await interaction.reply({ content: `Você não tem o cargo "${ROLE_NAME}" para remover.`, ephemeral: true });
    }
  }
});

// Express server to keep Replit awake
const app = express();

app.get('/', (req, res) => {
  res.send('Bot is running!');
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Web server running on port ${port}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use.`);
    process.exit(1); // exit so the restart script can restart cleanly
  } else {
    console.error('Server error:', err);
  }
});

process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Login the bot last
client.login(process.env.DISCORD_TOKEN);
