var a = require("axios");

module.exports = {
  config: {
    name: "ميدو",
    aliases: [],
    version: 1.6,
    author: "Jun",
    role: 0,
    shortDescription: "ذكء إصطناعي يمكنه التحدث بجميع اللغات في الأرض و يجيب على جميع الأسئلة",
    guide: "{pn} <سؤال>",
    category: "الذكاء الإصطناعي"
  },
  onStart: function() {},
  onChat: async function({ message, api, event, args, usersData }) {

//this is optional 
var apikey = "open_ai_apikey"; 
var fbtoken = "token_fb"; 


    var prefix = ["ميدو", "*ai", "-ai"];
    var w = args[0];
w = w.toLowerCase();
    for (var i = 0; i < prefix.length; i++) {
      if (w.startsWith(prefix[i])) {
        try {
          var p = args.slice(1).join(" ");
          var id = event.senderID;
          var user = await usersData.get(id);
          var n = user.name;
          var tag = [{ id: id, tag: n }];
          var r = await a.post("https://gpt.jn-api.repl.co/api", {
            prompt: p,
            author: this.config.author,
            name: n,
            id: id,
            apikey: apikey,
            fbtoken: fbtoken
          });

var av = r.data.av
          var l = r.data.result.replace(/{name}/g, n);
          if (av) {
            message.reply({
              body: l,
              mentions: tag,
              attachment: await global.utils.getStreamFromURL(av)
            });
          } else {
            message.reply({
              body: l,
              mentions: tag
            });
          }
        } catch (error) {
          console.error(error);
          message.reply("حدث خطأ ما");
        }
      }
    }
  }
};