//use eval if you wanna.
//this gives you the invite link in a server of a channel.
//code by Tac Shadow#5920

async function asyncCall() {
  const result = await client.channels.cache.get("CHANNEL_ID").createInvite();

message.channel.send(`${result}`);
}

asyncCall();
