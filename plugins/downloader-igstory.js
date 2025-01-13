import { instagramStory } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.room = conn.room ? conn.room: {}
    if (!text) return m.reply(`Masukan Username Instagram!\n\nContoh :\n${usedPrefix + command} animeroles`)
    let id = 'igstory_' + m.sender
    if (!isNaN(text) && id in conn.room) {
        let { result } = conn.room[id]
        if (!(id in conn.room)) return m.reply('Kamu belum berada di sesi')
        if (text > result.length) return m.reply('Invalid Number')
        conn.sendFile(m.chat, result[text - 1].url, null, 'Ini Dia Kak', m)
    } else {
        let { results } = await instagramStory(text)
        if (results.length > 1) {
            conn.room[id] = {
                result: results
            }
            conn.sendFile(m.chat, results[0].url, null, `_Silahkan Ketik *${usedPrefix + command} <number>* Untuk Mendownload Sisa Foto Atau Video._ \n_Terdapat *${results.length} Hasil*_\n\n_Contoh :_\n${usedPrefix + command} 2`, m)
        } else conn.sendFile(m.chat, results[0].url, null, 'Ini Dia Kak', m)
    }
}
handler.help = ['instagramstory'].map(v => v + ' <username>')
handler.tags = ['downloader']
handler.command = /^(igstory|instagramstory)$/i
handler.limit = true
export default handler