const client = require("../..");
client.on("raw", c => client.manager.updateVoiceState(c));
