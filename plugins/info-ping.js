import { cpus as _cpus, totalmem, freemem } from 'os';
import util from 'util';
import os from 'os';
import { performance } from 'perf_hooks';
import { sizeFormatter } from 'human-readable';

const format = sizeFormatter({
  std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
});

const handler = async (m, { conn, isRowner }) => {
  let _muptime;
  if (process.send) {
    process.send('uptime');
    _muptime = await new Promise(resolve => {
      process.once('message', resolve);
      setTimeout(resolve, 1000);
    }) * 1000;
  }
  const muptime = clockString(_muptime);
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChat);
  const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'));
  const used = process.memoryUsage();
  const cpus = _cpus().map(cpu => {
    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0);
    return cpu;
  });
  const cpu = cpus.reduce((last, cpu, _, { length }) => {
    last.total += cpu.total;
    last.speed += cpu.speed / length;
    last.times.user += cpu.times.user;
    last.times.nice += cpu.times.nice;
    last.times.sys += cpu.times.sys;
    last.times.idle += cpu.times.idle;
    last.times.irq += cpu.times.irq;
    return last;
  }, {
    speed: 0,
    total: 0,
    times: {
      user: 0,
      nice: 0,
      sys: 0,
      idle: 0,
      irq: 0
    }
  });
  const old = performance.now();
  await conn.sendMessage(m.chat, {
    react: {
      text: '🔥',
      key: m.key,
    }
  });
  const neww = performance.now();
  const speed = neww - old;

  // Tambahkan informasi kecepatan respon yang lebih terperinci
  let responseTimeInfo = '';
  if (speed < 10) {
    responseTimeInfo = 'Sangat cepat';
  } else if (speed < 50) {
    responseTimeInfo = 'Cepat';
  } else if (speed < 100) {
    responseTimeInfo = 'Sedang';
  } else {
    responseTimeInfo = 'Lambat';
  }

  const text = `
\`Kecepatan Respon\`
${speed.toFixed(2)}ms (${responseTimeInfo})

\`Sudah Aktif Selama\`
${muptime}

\`About Servers\`
\`Platform:\` ${os.platform()}
\`Ram:\` ${format(totalmem() - freemem())} / ${format(totalmem())} 
\`Memory:\`
\`\`\`
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')}: ${format(used[key])}`).join('\n')}
\`\`\`
`;
  await conn.sendMessage(m.chat, {
    text: text,
    contextInfo: {
      externalAdReply: {
        title: `P I N G P O N G!!!`,
        thumbnailUrl: 'https://telegra.ph/file/279ae09245a3ae37bf79b.jpg',
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  });
};

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

function clockString(ms) {
  const d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [d, ' Hari ', h, ' Jam ', m, ' Menit ', s, '  Detik '].map(v => v.toString().padStart(2, 0)).join('');
}

handler.customPrefix = /^(.ping|ping)$/i;
handler.command = new RegExp();
export default handler;