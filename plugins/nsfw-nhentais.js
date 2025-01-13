import fetch from 'node-fetch'
let handler = async(m, { conn, usedPrefix, command, text }) => {
    if (!text) return m.reply(`Masukan Judul Yang Ingin Dicari!\n\nContoh :\n${usedPrefix + command} Gotoubun`)
    m.reply(wait)
    let api = await fetch(API('lol', '/api/nhentaisearch', { query: text }, 'apikey'))
    let { result } = await api.json()
    let caption = result.map((v, i) => {
        return `
_*${i + 1}. ${v.title_native}*_
❃ Link : https://nhentai.net/${v.id}
❃ Page : ${v.page}
❃ Code : ${v.id}
`.trim()
    }).join('\n\n')
    m.reply(caption)
}
handler.help = ['nhentais <query>']
handler.tags = ['nsfw', 'menuprem']
handler.command = /^(nhentai(s|search))$/i
handler.premium = true
handler.nsfw = true
handler.age = 18
export default handler

