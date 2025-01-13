import { randomBytes } from 'crypto'

let broadcasting = false;
let lastBroadcastTime = 0;

let handler = async (m, { conn, text, command }) => {
  switch (command) {
    case 'stopbc':
      if (!broadcasting) {
        return conn.reply(m.chat, 'Tidak ada proses broadcast yang sedang berlangsung.', m);
      }
      broadcasting = false;
      return conn.reply(m.chat, 'Proses broadcast dihentikan.', m);
    case 'aetherz-bcgc':
      if (broadcasting) {
        return conn.reply(m.chat, 'Proses broadcast masih berlangsung. Silakan tunggu hingga selesai atau ketik .stopbc untuk menghentikan.', m);
      }
      
      // Cek apakah sudah lebih dari 1 jam sejak proses broadcast terakhir
      if (Date.now() - lastBroadcastTime < 3600000) { // 1 jam dalam milidetik
        return conn.reply(m.chat, 'Harap tunggu setidaknya 1 jam sebelum memulai kembali proses broadcast.', m);
      }
      
      broadcasting = true;
      lastBroadcastTime = Date.now();

      let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.read_only && !chat.announce).map(v => v[0])
      let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m
      let [delay, broadcastText] = text.split('|')
      let teks = broadcastText ? broadcastText.trim() : cc.text
      let delayMilliseconds = parseDelay(delay)
      let additionalDelay = 120000; // 1 jam tambahan setelah proses broadcast selesai
      
      if (!delayMilliseconds) {
        broadcasting = false;
        return conn.reply(m.chat, 'Format delay tidak valid. Gunakan 1s, 1m, atau 1h.', m)
      }
      
      conn.reply(m.chat, `_Mengirim pesan broadcast ke ${groups.length} grup dengan delay ${delay}_\n\nSilakan tunggu hingga proses selesai. Bot akan mengirimkan pesan ketika selesai dan akan memulai broadcast otomatis setelah 1 jam.`, m)
      
      for (let id of groups) {
        await sleep(delayMilliseconds)
        await conn.copyNForward(id, conn.cMod(m.chat, cc, /bc|broadcast/i.test(teks) ? `–––『 *BROADCAST* 』–––\n\n${teks}` : `–––『 *BROADCAST* 』–––\n\n${teks}`), true).catch(_ => _)
      }
      
      conn.reply(m.chat, `_Selesai Broadcast All Group, bot akan mengirimkan pesan untuk memulai broadcast otomatis setelah 1 jam._`, m)
      
      await sleep(additionalDelay)
      
      conn.reply(m.chat, `_Bot akan memulai Broadcast All Group setelah 1 jam._`, m)
      
      if (broadcasting) {
        for (let id of groups) {
          await sleep(delayMilliseconds)
          await conn.copyNForward(id, conn.cMod(m.chat, cc, /bc|broadcast/i.test(teks) ? `–––『 *BROADCAST* *AUTOMATIS* 』–––\n\n${teks}` : `–––『 *BROADCAST* *AUTOMATIS* 』–––\n\n${teks}`), true).catch(_ => _)
        }
      }
      
      m.reply('Selesai Broadcast All Group :)')
      broadcasting = false;
      break;
    default:
      // Kode untuk perintah lain ...
  }
}

handler.help = ['aetherz-bcgc','stopbc']
handler.tags = ['pushkontak']
handler.command = /^(aetherz-bcgc|stopbc)$/i
handler.owner = true
export default handler

function parseDelay(delay) {
  if (!delay) return 0;
  let time = parseInt(delay)
  if (delay.endsWith('s')) {
    return time * 1000; // detik ke milidetik
  } else if (delay.endsWith('m')) {
    return time * 60 * 1000; // menit ke milidetik
  } else if (delay.endsWith('h')) {
    return time * 60 * 60 * 1000; // jam ke milidetik
  } else {
    return 0;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}