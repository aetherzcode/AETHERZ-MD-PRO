/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/

import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `• *Example :* ${usedPrefix + command} stepmoms`
  let response = await fetch(`https://api.agatz.xyz/api/xnxx?message=${text}`)
  let res = await response.json()

  if (res.status !== 200) throw `API Error: ${res.creator}`

  let resultText = ''
  for (let i = 0; i < res.data.result.length; i++) {
    let result = res.data.result[i]
    let hasil = `• Title: *${result.title}*\n• Info: *${result.info}*\n• Link: *${result.link}*\n`
    resultText += hasil + '\n'
  }

  let name = m.sender
  let fkonn = {
    key: {
      fromMe: false,
      participant: `0@s.whatsapp.net`,
      ...(m.chat ? { remoteJid: '6285863907468@s.whatsapp.net' } : {})
    },
    message: {
      contactMessage: {
        displayName: await conn.getName(name),
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    }
  }

  await conn.reply(m.chat, 'Please wait...', fkonn)

  conn.sendMessage(m.chat, {
    text: resultText,
    contextInfo: {
      externalAdReply: {
        title: `© 2025 AETHERz-MD`,
        body: wm,
        thumbnailUrl: thumbnail,
        sourceUrl: link.web,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  })
}

handler.command = handler.help = ['xnxxsearch']
handler.tags = ['internet']
handler.premium = true

export default handler