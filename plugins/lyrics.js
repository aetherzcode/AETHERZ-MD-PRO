import { lyrics, lyricsv2 } from '@bochilteam/scraper'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `Use example ${usedPrefix}${command} hallo`
try {
    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
    const result = await lyricsv2(teks).catch(async _ => await lyrics(teks))
    m.reply(`
Lyrics *${result.title}*
Author ${result.author}


${result.lyrics}


Url ${result.link}
`.trim())
} catch (e) {
    m.reply('Lirik Tidak Ditemukan')
  }
}

handler.help = ['lirik'].map(v => v + ' <Apa>')
handler.tags = ['internet']
handler.command = /^(lirik|lyrics|lyric)$/i

export default handler