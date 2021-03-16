# Movnots
Enjoy Motivational Quotes From The Comfort of Your Homescreen

# ⚠WARNING⚠
You must run this project in HTTPS protocol because it uses service workers in the background.

You can use these two options if you're going to develop locally

## Ngrok
Use [ngrok](https://ngrok.com) to create an https tunnel to your local development server. Once you set it up on your computer, you can create the tunnel with this command on let's say port 3000:

`ngrok http 3000`

*Make sure ngrok is inside your path variable*

## Mkcert
You can also use mkcert if you want to create a locally-trusted development certificate for your localhost.

You will find all the instructions to set it up in this [repository](https://github.com/FiloSottile/mkcert).

# Installation

- clone the project:

`git clone https://github.com/Ignema/movnots.git`

- install npm dependencies:

`npm install`

# Running the project

- run the server with nodemon:

`npm run dev`

*you can also run it normally with node using `npm start`*

- navigate to your https website and *voila!*
