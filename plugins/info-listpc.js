import fs from "fs"
let handler = async(m, { conn }) => {
let pc = Object.entries(await conn.chats)
let niorg = pc.filter(([jid]) => jid.endsWith('@s.whatsapp.net'))
let txt = ''
    for (let [jid] of niorg)
txt += `*⫹⫺ Name :* ${await conn.getName(jid)}\n*⫹⫺ Tags :* ${'@' + jid.replace(/@.+/, '')}\n\n`
return conn.sendMessage(m.chat, {text: txt,
  contextInfo: {
      mentionedJid: conn.parseMention(txt),
      externalAdReply: {
      title: `List Private Chats`,
      body: wm,
      thumbnailUrl: global.aetherzjpg,
      sourceUrl: link.web,
      mediaType: 1,
      renderLargerThumbnail: true
      }}})
}
handler.help = ['pclist']
handler.tags = ['owner']
handler.command = /^(pclist)$/i
handler.owner = true

export default handler