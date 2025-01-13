import util from 'util'
import path from 'path'
import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
    let k = Math.floor(Math.random() * 70);
    let elaina = elainajpg.getRandom()
    let vn = `https://hansxd.nasihosting.com/sound/sound${k}.mp3`
    conn.sendFile(m.chat, vn, 'error.mp3', null, m, true, {
        type: 'audioMessage',
        ptt: false, seconds: 0, contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                mediaType: 1,
                renderLargerThumbnail: true,
                title: "▶︎━━━━━•─────────────",
                body: wm,
                mediaUrl: hwaifu.getRandom(),
                sourceId: 'Biar Fotonya Ga Satu',
                thumbnail: await (await fetch(elaina)).buffer(),
                sourceUrl: link.web
            }
        }
    })
}
handler.help = ['randomsound']
handler.tags = ['random']
handler.command = /^(randomsound)$/i
handler.fail = null
handler.exp = 100
export default handler