let handler = async (m, { conn, args }) => {
  let user = Object.entries(global.db.data.users).filter(user => user[1].ownerTime).map(([key, value]) => {
    return { ...value, jid: key }
  })
  let name = 'owner'
  let fkon = { key: { fromMe: false, participant: `${m.sender.split`@`[0]}@s.whatsapp.net`, ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
  let ownTime = global.db.data.users[m.sender].ownerTime
  let own = global.db.data.users[m.sender].owner
  let waktu = clockString(`${ownTime - new Date() * 1} `)
  let sortedP = user.map(toNumber('ownerTime')).sort(sort('ownerTime'))
  let len = args[0] && args[0].length > 0 ? Math.min(100, Math.max(parseInt(args[0]), 10)) : Math.min(10, sortedP.length)
  await conn.reply(m.chat, `┌✦ *My owner Time:*
┊• *Name:* ${conn.getName(m.sender)}
${own ? `${msToDate(ownTime - new Date() * 1)}` : '┊• *ownerTime:* Expired'}
┗━═┅═━––––––๑

•·–––––––––––––––––––––·•
${sortedP.slice(0, len).map(({ jid, name, ownerTime, registered }, i) => `\n\n┌✦ ${registered ? name : conn.getName(jid)}\n┊• wa.me/${jid.split`@`[0]}\n${ownTime > 0 ? `${msToDate(ownerTime - new Date() * 1)}` : '┊ *Expired*'}`).join`\n┗━═┅═━––––––๑`}
┗━═┅═━––––––๑`.trim(), fkon)
setTimeout(() => {
    if (db.data.chats[m.chat].deletemedia) conn.deleteMessage(m.chat, key)
  }, db.data.chats[m.chat].deletemediaTime)
}
handler.help = ['ownlist']
handler.tags = ['info']
handler.command = /^(listown|ownlist)$/i

export default handler

function msToDate(ms) {
    let temp = ms
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let daysms = ms % (24 * 60 * 60 * 1000);
    let hours = Math.floor((daysms) / (60 * 60 * 1000));
    let hoursms = ms % (60 * 60 * 1000);
    let minutes = Math.floor((hoursms) / (60 * 1000));
    let minutesms = ms % (60 * 1000);
    let sec = Math.floor((minutesms) / (1000));
    return '┊ ' + days + " Hari\n" + '┊ ' + hours + " Jam\n" + '┊ ' + minutes + " Menit";
    // +minutes+":"+sec;
}

function clockString(ms) {
  let ye = isNaN(ms) ? '--' : Math.floor(ms / 31104000000) % 10
  let mo = isNaN(ms) ? '--' : Math.floor(ms / 2592000000) % 12
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return ['┊ ', ye, ' *Tahun*\n', '┊ ', mo, ' *Bulan*\n', '┊ ', d, ' *Hari*\n', '┊ ', h, ' *Jam*\n', '┊ ', m, ' *Menit*\n', '┊ ', s, ' *Detik*'].map(v => v.toString().padStart(2, 0)).join('')
}

function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
  else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
    return { ...b[i], [property]: a[property] === undefined ? _default : a[property] }
  }
  else return a => a === undefined ? _default : a
}