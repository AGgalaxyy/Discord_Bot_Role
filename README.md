
Discord Bot: Role Manager
==========================

This project is a Discord bot that handles role management.

------------------------------------

🚀 How to Push Changes from VS Code to GitHub
------------------------------------

After making changes to your code in VS Code, follow these steps to update the GitHub repository:

1. Open the Terminal in VS Code

You can open the terminal by pressing:
Ctrl + `
Or go to View > Terminal.

2. Run These Commands

git add .
git commit -m "Your commit message here"
git push

Example:

git add .
git commit -m "Added new role handler"
git push

------------------------------------

🛠 Optional: Use Auto Push Script (Windows)
------------------------------------

You can create a file called auto_push.bat in the project folder with this content:

@echo off
git add .
git commit -m "%1"
git push

Then run it like this:

auto_push.bat "Updated something important"

------------------------------------

🔒 Important
------------------------------------

Never commit your bot token or secrets. Use a .gitignore file to hide:

.env
config.json
token.txt

------------------------------------

📎 Repo URL
------------------------------------

This project is linked to:
https://github.com/AGgalaxyy/Discord_Bot_Role



also for the bot to work create a .env with: DISCORD_TOKEN=
