import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var handler = async (m, { conn, command, args }) => {
  if (!args[0]) return conn.reply(m.chat, 'Input URL!', m);
  if (args[0].match(/xnxx\.com|hamster\.com|nekopoi\.care/i)) {
    return conn.reply(m.chat, 'Link tersebut dilarang!', m);
  }
  await m.reply('_Ｌｏａｄｉｎｇ．．._');

  const url = args[0].startsWith('http') ? args[0] : 'https://' + args[0];
  try {

    const response = await fetch(`https://api.betabotz.eu.org/api/tools/ssweb?url=${url}&device=desktop&apikey=${lann}`);
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

    const contentType = response.headers.get('content-type');
    if (!contentType.startsWith('image')) throw new Error('Invalid response: Not an image');

    const tmpDir = path.join(__dirname, '../tmp/');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

    const filePath = path.join(tmpDir, `${Date.now()}.jpeg`);
    const fileStream = fs.createWriteStream(filePath);

    await new Promise((resolve, reject) => {
      response.body.pipe(fileStream);
      response.body.on('error', reject);
      fileStream.on('finish', resolve);
    });

    await conn.sendFile(m.chat, filePath, 'screenshot.jpeg', 'Nih gambarnya.', m);

    fs.unlinkSync(filePath);
  } catch (error) {
    console.error('Error:', error);
    conn.reply(m.chat, `Terjadi error: ${error.message}`, m);
  }
};

handler.help = ['ssweb', 'sspc'];
handler.tags = ['tools'];
handler.command = ['ssweb', 'sspc', 'ss'];
handler.limit = true;
handler.fail = null;

export default handler;