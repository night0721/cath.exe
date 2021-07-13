const client = require("../bot");
client.on("raw", d => client.manager.updateVoiceState(d));
