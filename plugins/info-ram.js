import os from 'os'

let handler = async (m, { conn, text }) => {
  let totalStorage = Math.floor(os.totalmem() / 1024 / 1024) + 'MB'
  let freeStorage = Math.floor(os.freemem() / 1024 / 1024) + 'MB'
  let cpuModel = os.cpus()[0].model
  let cpuSpeed = os.cpus()[0].speed / 1000
  let cpuCount = os.cpus().length

  let message = `
*Your Bot Specifications*:

• *Total Storage*: ${totalStorage}
• *Free Storage*: ${freeStorage}
• *CPU Model*: ${cpuModel}
• *CPU Speed*: ${cpuSpeed} GHz
• *Number of CPU Cores*: ${cpuCount}
`

  await conn.sendMessage(m.chat, {
    text: message,
    contextInfo: {
      externalAdReply: {
        title: wm,
        body: 'Bot Specifications 🤖',
        thumbnailUrl: global.aetherzjpg,
        sourceUrl: link.web,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  });
}

handler.help = ['botspec'];
handler.tags = ['info'];
handler.command = /^(botspec|ram)$/i;
export default handler;