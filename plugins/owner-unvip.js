let handler = async (m, { conn, text, usedPrefix }) => {
  function no(number){
    return number.replace(/\s/g,'').replace(/([@+-])/g,'')
  }
  
  if (!text) return conn.reply(m.chat, `*Example:* ${usedPrefix}unvip @12024988527`, m)
  text = no(text) + "@s.whatsapp.net"
  global.db.data.users[text].vip = false
  global.db.data.users[text].vipDate = 0
  conn.reply(m.chat,`*Successfully removed premium access for @${text.split('@')[0]}.*`,m,{ contextInfo: { mentionedJid: [text] } })

}
handler.help = ['unvip']
handler.tags = ['owner']
handler.command = /^(unvip|delvip)$/i
handler.mods = true
handler.fail = null
export default handler