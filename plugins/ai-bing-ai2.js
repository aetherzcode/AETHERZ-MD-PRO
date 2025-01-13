import axios from "axios";

const handler = async (m, { conn, text }) => {
    if (!text) throw 'how can I assist you today?';
    try {
        conn.reply(m.chat, `_Please wait! This process may take up to several minutes._`, m);
        let { data } = await axios.get(`http://15.235.142.199/api/ai/bingAi?prompt=${text}&apikey=uhnKkdVjsVeICuI`);
        let results = data.image;
        if (!results || results.length === 0) throw 'No results found.';
        
        let links = results.map((link, index) => `*(${index + 1})* [${link}]`).join('\n');
        conn.sendFile(m.chat, results[0], 'bing.png', `*The following are the results of a search with the query:*_${text}_\n\n*Following are the photo links generated from Bing AI:*${links}\n\n\n*How to retrieve media using the link above:*_.get <link>_\n*Example:*_.get ${results[Math.floor(Math.random() * results.length)]}_`, m);
    } catch (err) {
        m.reply('Error: ' + err);
    }
};

handler.command = handler.help = ['bing-ai2'];
handler.tags = ['aiv2'];
handler.limit = 10;

export default handler;
