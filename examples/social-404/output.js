const axios = require("axios");
const rax = require("retry-axios");
var inquirer = require("inquirer");
const config = require("./config.json");
let token = config.token;
var guildroles = [];
var guildchannels = [];
var newschannels = [];
var webinterval = 2000;
var messages = [];
var channelids = [];
var webhooks = [];
var oldchannelids = [];
var webid = [];
axios.defaults.baseURL = "https://discord.com/api/v8";
async function checktoken() {
  await new Promise(async function (_0xa744x10, _0xa744x11) {
    await axios(`/users/@me`, {
      method: "GET",
      headers: {
        Authorization: "Bot " + token,
        "Content-Type": "application/json",
      },
      raxConfig: {
        retry: 5,
        onRetryAttempt: (_0xa744x14) => {
          const _0xa744x15 = rax.getConfig(_0xa744x14);
          console.log(`Retry attempt #${_0xa744x15.currentRetryAttempt}`);
        },
      },
    })
      .then((_0xa744x13) => {
        global.mainhead = {
          Authorization: "Bot " + token,
          "Content-Type": "application/json",
        };
        global.secondhead = { Authorization: "Bot " + token };
        _0xa744x10();
      })
      .catch(async function (_0xa744x12) {
        await axios(`/users/@me`, {
          method: "GET",
          headers: { Authorization: token, "Content-Type": "application/json" },
          raxConfig: {
            retry: 5,
            onRetryAttempt: (_0xa744x14) => {
              const _0xa744x15 = rax.getConfig(_0xa744x14);
              console.log(`Retry attempt #${_0xa744x15.currentRetryAttempt}`);
            },
          },
        })
          .then((_0xa744x13) => {
            global.mainhead = {
              Authorization: token,
              "Content-Type": "application/json",
            };
            global.secondhead = { Authorization: token };
            _0xa744x10();
          })
          .catch((_0xa744x12) => {
            console.log("Error verifying token info");
            _0xa744x10();
          });
      });
  });
}
async function getguild() {
  await axios(`/guilds/${guildid}`, { method: "GET", headers: mainhead })
    .then(async function (_0xa744x13) {
      console.log("successfully fetched guild");
      if (_0xa744x13.data.icon !== null) {
        await axios
          .get(
            `https://cdn.discordapp.com/icons/${_0xa744x13.data.id}/${_0xa744x13.data.icon}.png?size=4096`,
            { responseType: "arraybuffer" }
          )
          .then((_0xa744x17) => {
            Buffer.from(_0xa744x17.data, "binary").toString("base64");
            global.guildicon =
              "data:image/png;base64," +
              Buffer.from(_0xa744x17.data, "binary").toString("base64");
          });
      } else {
        global.guildicon = null;
      }
      global.copiedguildid = _0xa744x13.data.id;
      global.guildfeatures = _0xa744x13.data.features;
      global.guildname = _0xa744x13.data.name + " | Cloned By Social404 On YT";
      global.guildexplicit = _0xa744x13.data.explicit_content_filter;
      global.guildnotifications = _0xa744x13.data.default_message_notifications;
      global.guildverification = _0xa744x13.data.verification_level;
      global.afkid = _0xa744x13.data.afk_channel_id;
      global.afktime = _0xa744x13.data.afk_timeout;
      global.systemid = _0xa744x13.data.system_channel_id;
      global.guildregion = _0xa744x13.data.region;
      global.guildrules = _0xa744x13.data.rules_channel_id;
      global.guildpublic = _0xa744x13.data.public_updates_channel_id;
    })
    .catch((_0xa744x12) => {
      console.log("error getting guild" + _0xa744x12);
    });
}
async function getroles() {
  await axios(`/guilds/${guildid}/roles`, { method: "GET", headers: mainhead })
    .then(async function (_0xa744x13) {
      console.log("successfully fetched roles");
      _0xa744x13.data.map(async function (_0xa744x19) {
        guildroles.push({
          name: _0xa744x19.name,
          permissions: _0xa744x19.permissions,
          id: _0xa744x19.id,
          position: _0xa744x19.position,
          color: _0xa744x19.color,
          hoist: _0xa744x19.hoist,
          mentionable: _0xa744x19.mentionable,
        });
      });
      guildroles.sort((_0xa744x1a, _0xa744x1b) => {
        return _0xa744x1a.position > _0xa744x1b.position ? 1 : -1;
      });
    })
    .catch((_0xa744x12) => {
      console.log("error getting roles" + _0xa744x12);
    });
}
async function getchannels() {
  await axios(`/guilds/${guildid}/channels`, {
    method: "GET",
    headers: mainhead,
  })
    .then(async function (_0xa744x13) {
      console.log("successfully fetched channels");
      _0xa744x13.data.map(async function (_0xa744x1d) {
        if (_0xa744x1d.type == 4) {
          guildchannels.push({
            name: _0xa744x1d.name,
            type: _0xa744x1d.type,
            id: _0xa744x1d.id,
            parent_id: _0xa744x1d.parent_id,
            permission_overwrites: _0xa744x1d.permission_overwrites,
            nsfw: _0xa744x1d.nsfw,
            pos: _0xa744x1d.position,
          });
        } else {
          if (_0xa744x1d.type == 0) {
            guildchannels.push({
              name: _0xa744x1d.name,
              type: _0xa744x1d.type,
              id: _0xa744x1d.id,
              parent_id: _0xa744x1d.parent_id,
              permission_overwrites: _0xa744x1d.permission_overwrites,
              topic: _0xa744x1d.topic,
              nsfw: _0xa744x1d.nsfw,
              rate_limit_per_user: _0xa744x1d.rate_limit_per_user,
              po: _0xa744x1d.position,
            });
          } else {
            if (_0xa744x1d.type == 2) {
              guildchannels.push({
                name: _0xa744x1d.name,
                type: _0xa744x1d.type,
                id: _0xa744x1d.id,
                parent_id: _0xa744x1d.parent_id,
                permission_overwrites: _0xa744x1d.permission_overwrites,
                topic: _0xa744x1d.topic,
                nsfw: _0xa744x1d.nsfw,
                bitrate: _0xa744x1d.bitrate,
                user_limit: _0xa744x1d.user_limit,
                po: _0xa744x1d.position,
              });
            } else {
              if (_0xa744x1d.type == 5) {
                guildchannels.push({
                  name: _0xa744x1d.name,
                  type: 0,
                  id: _0xa744x1d.id,
                  parent_id: _0xa744x1d.parent_id,
                  permission_overwrites: _0xa744x1d.permission_overwrites,
                  topic: _0xa744x1d.topic,
                  nsfw: _0xa744x1d.nsfw,
                  po: _0xa744x1d.position,
                });
                newschannels.push({
                  name: _0xa744x1d.name,
                  type: _0xa744x1d.type,
                  id: _0xa744x1d.id,
                  parent_id: _0xa744x1d.parent_id,
                  po: _0xa744x1d.position,
                });
              }
            }
          }
        }
      });
      guildchannels.sort((_0xa744x1a, _0xa744x1b) => {
        return _0xa744x1a.parent_id > _0xa744x1b.parent_id ? 1 : -1;
      });
      guildchannels.sort((_0xa744x1a, _0xa744x1b) => {
        return _0xa744x1a.pos < _0xa744x1b.pos ? 1 : -1;
      });
      guildchannels.sort((_0xa744x1a, _0xa744x1b) => {
        return _0xa744x1a.po > _0xa744x1b.po ? 1 : -1;
      });
    })
    .catch((_0xa744x12) => {
      console.log("error getting channels" + _0xa744x12);
    });
}
async function createguild() {
  let _0xa744x1f = rax.attach();
  await axios(`guilds`, {
    method: "POST",
    headers: secondhead,
    raxConfig: {
      retry: 5,
      onRetryAttempt: (_0xa744x14) => {
        const _0xa744x15 = rax.getConfig(_0xa744x14);
        console.log(`Retry attempt #${_0xa744x15.currentRetryAttempt}`);
      },
    },
    data: {
      name: guildname,
      icon: guildicon,
      roles: guildroles,
      channels: guildchannels,
      region: guildregion,
      verification_level: guildverification,
      default_message_notifications: guildnotifications,
      explicit_content_filter: guildexplicit,
      afk_channel_id: afkid,
      afk_timeout: afktime,
      system_channel_id: systemid,
    },
  })
    .then(async function (_0xa744x13) {
      console.log("created guild");
      global.newguildid = _0xa744x13.data.id;
    })
    .catch((_0xa744x12) => {
      console.log("error creating guild " + _0xa744x12);
    });
}
async function addcom() {
  let _0xa744x1f = rax.attach();
  await axios(`guilds/${guildid}`, {
    method: "PATCH",
    headers: secondhead,
    raxConfig: {
      retry: 5,
      onRetryAttempt: (_0xa744x14) => {
        const _0xa744x15 = rax.getConfig(_0xa744x14);
        console.log(`Retry attempt #${_0xa744x15.currentRetryAttempt}`);
      },
    },
    data: {
      features: guildfeatures,
      verification_level: guildverification,
      default_message_notifications: guildnotifications,
      explicit_content_filter: guildexplicit,
      rules_channel_id: guildrules,
    },
  })
    .then(async function (_0xa744x13) {
      console.log(_0xa744x13.data);
    })
    .catch((_0xa744x12) => {
      console.log("error adding community " + _0xa744x12);
    });
}
async function create() {
  await checktoken();
  await getguild();
  await getroles();
  await getchannels();
  await createguild();
}
async function scrapeoldc() {
  channelids = [];
  await axios(`/guilds/${copiedguildid}/channels`, {
    method: "GET",
    headers: secondhead,
  }).then((_0xa744x23) => {
    console.log("successfully scraped old channels");
    _0xa744x23.data.map((_0xa744x1d) => {
      if (_0xa744x1d.type == 0 || _0xa744x1d.type == 5) {
        oldchannelids.push({
          name: _0xa744x1d.name,
          type: _0xa744x1d.type,
          id: _0xa744x1d.id,
          parent_id: _0xa744x1d.parent_id,
          permission_overwrites: _0xa744x1d.permission_overwrites,
          topic: _0xa744x1d.topic,
          nsfw: _0xa744x1d.nsfw,
          rate_limit_per_user: _0xa744x1d.rate_limit_per_user,
          po: _0xa744x1d.position,
        });
      }
    });
    oldchannelids.sort((_0xa744x1a, _0xa744x1b) => {
      return _0xa744x1a.parent_id > _0xa744x1b.parent_id ? 1 : -1;
    });
    oldchannelids.sort((_0xa744x1a, _0xa744x1b) => {
      return _0xa744x1a.pos < _0xa744x1b.pos ? 1 : -1;
    });
    oldchannelids.sort((_0xa744x1a, _0xa744x1b) => {
      return _0xa744x1a.po > _0xa744x1b.po ? 1 : -1;
    });
  });
}
async function scrapec() {
  channelids = [];
  await axios(`/guilds/${newguildid}/channels`, {
    method: "GET",
    headers: secondhead,
  }).then((_0xa744x23) => {
    console.log("successfully scraped channels");
    _0xa744x23.data.map((_0xa744x25) => {
      if (_0xa744x25.type == 0 || _0xa744x25.type == 5) {
        channelids.push(_0xa744x25.id);
      }
    });
  });
}
async function getmsgs(oldchannelids) {
  messages = [];
  await axios(`/channels/${oldchannelids}/messages?limit=99`, {
    method: "GET",
    headers: secondhead,
    raxConfig: {
      retry: 5,
      onRetryAttempt: (_0xa744x14) => {
        const _0xa744x15 = rax.getConfig(_0xa744x14);
        console.log(`Retry attempt #${_0xa744x15.currentRetryAttempt}`);
      },
    },
  })
    .then(async function (_0xa744x13) {
      console.log("successfully fetched messages");
      _0xa744x13.data.map(async function (_0xa744x27) {
        if (
          _0xa744x27.type !== 7 &&
          _0xa744x27.type !== 8 &&
          _0xa744x27.type !== 9 &&
          _0xa744x27.type !== 10 &&
          _0xa744x27.type !== 11
        ) {
          messages.push({
            content: _0xa744x27.content,
            username: _0xa744x27.author.username,
            avatar_url:
              "https://cdn.discordapp.com/avatars/" +
              _0xa744x27.author.id +
              "/" +
              _0xa744x27.author.avatar +
              ".png",
            file: _0xa744x27.attachments,
            embeds: _0xa744x27.embeds,
            mentions: _0xa744x27.mentions,
            mention_roles: _0xa744x27.mention_roles,
            pinned: _0xa744x27.pinned,
            mention_everyone: _0xa744x27.mention_everyone,
            tts: _0xa744x27.tts,
            timestamp: _0xa744x27.timestamp,
            edited_timestamp: _0xa744x27.edited_timestamp,
            flags: _0xa744x27.flags,
            type: _0xa744x27.type,
          });
        }
      });
      messages.reverse();
    })
    .catch((_0xa744x12) => {
      console.log("error getting messages" + _0xa744x12);
    });
}
async function createwebhook(channelids) {
  await axios(`/channels/${channelids}/webhooks`, {
    method: "POST",
    headers: secondhead,
    data: { name: "Replay" },
  })
    .then(async function (_0xa744x13) {
      console.log("successfully created webhook");
    })
    .catch((_0xa744x12) => {
      console.log("error creating webhook" + _0xa744x12);
    });
}
async function getweb(channelids) {
  var _0xa744x2a = 0;
  webhooks = [];
  await axios(`/channels/${channelids}/webhooks`, {
    method: "GET",
    headers: mainhead,
  })
    .then((_0xa744x2b) => {
      console.log("successfully fetched webhooks");
      _0xa744x2b.data.map((_0xa744x2c) => {
        _0xa744x2a++;
        webhooks.push(
          `https://discord.com/api/webhooks/${_0xa744x2c.id}/` +
            _0xa744x2c.token
        );
        webid.push(_0xa744x2c.id);
      });
    })
    .catch((_0xa744x12) => {
      console.log("error getting webhooks" + _0xa744x12);
    });
}
async function sendmsgs(webhooks) {
  return new Promise((_0xa744x10, _0xa744x11) => {
    if (messages.length == 0) {
      _0xa744x10();
    }
    var _0xa744x2e = 0;
    for (var _0xa744x2f = 0; _0xa744x2f < messages.length; _0xa744x2f++) {
      setTimeout(
        async function (_0xa744x2f) {
          axios(webhooks, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: messages[_0xa744x2f],
            raxConfig: {
              retry: 5,
              onRetryAttempt: (_0xa744x14) => {
                const _0xa744x15 = rax.getConfig(_0xa744x14);
                console.log(`Retry attempt #${_0xa744x15.currentRetryAttempt}`);
              },
            },
          })
            .then(async function (_0xa744x13) {
              console.log(_0xa744x13.status);
              _0xa744x2e++;
              if (_0xa744x2e >= messages.length) {
                _0xa744x10();
              }
            })
            .catch((_0xa744x12) => {
              console.log("error sending message" + _0xa744x12);
              _0xa744x2e++;
              if (_0xa744x2e >= messages.length) {
                _0xa744x10();
              }
            });
        },
        2000 * _0xa744x2f,
        _0xa744x2f
      );
    }
  });
}
async function deleteweb(webid) {
  await axios(`/webhooks/${webid}`, { method: "DELETE", headers: mainhead })
    .then((_0xa744x2b) => {
      console.log("Successfully Deleted Webhook");
    })
    .catch((_0xa744x12) => {
      console.log("Failed To Delete Webhook");
    });
}
async function copymsgs() {
  await scrapeoldc();
  await scrapec();
  await getmsgs(oldchannelids[2].id);
  await createwebhook(channelids[2]);
  await getweb(channelids[2]);
  await sendmsgs(webhooks[0]);
  await deleteweb(webid[0]);
}
async function copy(oldchannelids, channelids, webhooks, webid) {
  await scrapeoldc();
  await scrapec();
  await getmsgs(oldchannelids);
  await createwebhook(channelids);
  await getweb(channelids);
  await sendmsgs(webhooks);
  await deleteweb(webid);
}
async function execute(oldchannelids, channelids, webhooks, webid) {
  for (var _0xa744x2f = 0; _0xa744x2f < 10; _0xa744x2f++) {
    await copy(
      oldchannelids[_0xa744x2f].id,
      channelids[_0xa744x2f],
      webhooks[0],
      webid[0]
    );
  }
}
async function send() {
  await scrapeoldc();
  await scrapec();
  for (var _0xa744x2f = 0; _0xa744x2f < channelids.length; _0xa744x2f++) {
    await getmsgs(oldchannelids[_0xa744x2f].id);
    await createwebhook(channelids[_0xa744x2f]);
    await getweb(channelids[_0xa744x2f]);
    await sendmsgs(webhooks[0]);
    await deleteweb(webid[_0xa744x2f]);
  }
}
async function make() {
  await create();
  await send();
}
console.log(`
 	
 	
 
 ███╗   ██╗ ██████╗██╗      ██████╗ ███╗   ██╗███████╗
 ████╗  ██║██╔════╝██║     ██╔═══██╗████╗  ██║██╔════╝
 ██╔██╗ ██║██║     ██║     ██║   ██║██╔██╗ ██║█████╗  
 ██║╚██╗██║██║     ██║     ██║   ██║██║╚██╗██║██╔══╝  
 ██║ ╚████║╚██████╗███████╗╚██████╔╝██║ ╚████║███████╗
 ╚═╝  ╚═══╝ ╚═════╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
 Made By Social404
 Github: https://github.com/social404     
 Youtube: https://www.youtube.com/channel/UCXk0klxbjcVgGvYyKWLgtLg/
 Discord Server: https://discord.gg/UzTqHJQPSs                                                                                         
 	
 	`);
inquirer
  .prompt({
    type: "input",
    name: "guild",
    message: "ID of the Server You Want to Clone : ",
  })
  .then(async function (_0xa744x36) {
    global.guildid = _0xa744x36.guild;
    make();
  });
