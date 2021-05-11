# Setup

Run:
`npm install && npm start`
To start the client and the server. Then open http://localhost:3000.

## Troubleshooting

1. Try install `nvm` with the correct version of nodejs (found in .nvmrc) using this command:

```bash
NODE_VERSION=$(cat .nvmrc) curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.0/install.sh | bash
```

2. Try running the project in a docker container (file watching is a little slower): `docker-compose up`

# Background

Remo conference has a bug D: ! We're glad you're here to fix it! :D

Here's how to recreate it:

1. Open up http://localhost:3000 in two different browsers (e.g Chrome and Firefox). Our login system assigns user id's via the browser's user agent.
2. Double click on the first table to join it in Chrome.
3. Open Firefox, double click on the first table to join in Firefox.
4. Close Firefox. The user _should_ disappear in Chrome. Currently they stay at the table.

Luckily, right now we _only_ need it working on your machine. The real conference doesn't happen for another week. We need you to:

1. Get as much functionality working on your machine as quickly as possible. We have a demo in front of the company in 45 minutes :(.
2. Afterwards, explain how you'd make it production-ready:
   - What's wrong with your solution now? Why can't we just ship it?
   - How would we improve what you've finished?
   - How would we scale it for 10,000 users? 100,000? 10,000,000?
   - Would we need any other technologies to help scale this?

# Things to Check:

- As a user, I should disappear when my browser is closed.
- As a user, I should disappear when my _network is disconnected._

# Setting Up a Remote Test (Optional)

- Setup `ngrok` https://ngrok.com/download
- Run `ngrok http 8000`
- Send us the ngrok link - we can test from our machines too.
# remo-conf
