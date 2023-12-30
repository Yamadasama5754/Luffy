const axios = require('axios');
const moment = require('moment-timezone');

module.exports = {
  config: {
    name: 'حالة_البوت',
    author: 'Jun',
    countDown: 5,
    role: 2,
    category: 'خدمات',
    shortDescription: { en: "قم بتفقد حالة البوت " }
  },

  onStart: async function({ event, api, message, args, usersData, threadsData }) {
    try {
      const allUsers = await usersData.getAll();
      const allThreads = await threadsData.getAll();
      const uptime = process.uptime();

      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);

      const uptimeString = `${hours}:${minutes}:${seconds}`;

      const currentDate = moment().tz('Africa/Casablanca').format('YYYY-MM-DD');
      const currentTime = moment().tz('Africa/Casablanca').format('HH:mm:ss');

    const output2 = `\nحالة البوت\n\nالبوت يجري في: ${uptimeString}\nالوقت الحالي: ${currentTime}\nالتاريخ الحالي: ${currentDate}`;

      const response = await axios.get('https://api-test.yourboss12.repl.co/stats/hello');
      const data = response.data;

      const sortedData = data.sort((a, b) => b[Object.keys(b)[0]] - a[Object.keys(a)[0]]);

      let commandCount = 10;
      if (args[0] && args[0].toLowerCase() === 'الكل') {
        commandCount = data.length;
      }

      const topCommands = sortedData.slice(0, commandCount);

      let output = `${output2}\nإجمال عدد المستخدمين: ${allUsers.length}\nإجمالي عدد المجموعات: ${allThreads.length}\n\n\nتوب ${commandCount} أمر الذي تم إرساله بكثرة من 2023-08-14 إلى ${currentDate}\n\n`;
      topCommands.forEach((command, index) => {
        const commandName = Object.keys(command)[0];
        const commandCount = command[commandName];
        output += `${index + 1}. ${commandName}: ${commandCount}\n`;
      });

      api.sendMessage(output, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
    }
}
};