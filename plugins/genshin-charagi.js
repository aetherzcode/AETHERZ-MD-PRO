import fetch from 'node-fetch'
let handler = async(m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Masukan Nama Character!\n\nContoh :\n${usedPrefix + command} Hu Tao`)
    let { result, matchtype } = await (await fetch(`https://genshin-db-api.vercel.app/api/characters?query=${text}&matchCategories=true&dumpResult=true&queryLanguages=English&resultLanguage=Indonesian`)).json()
    if (matchtype == 'none') return m.reply(`Character "${text}" Tidak Ditemukan...`)
    let txt = `
❃ Name: ${result.fullname}
❃ Title: ${result.title}

❃ Desc: ${result.description}

❃ Element: ${result.element}
❃ Weapon Type: ${result.weapontype}
❃ Substat: ${result.substat}
❃ Gender: ${result.gender}
❃ Affiliation: ${result.affiliation}
❃ Birthday: ${result.birthday}
❃ Constellation: ${result.constellation}

❃ Cv:
• English ~ ${result.cv.english}
• Chinese ~ ${result.cv.chinese}
• Japanese ~ ${result.cv.japanese}
• Korean ~ ${result.cv.korean}
`.trim()
    conn.sendFile(m.chat, result.images.cover1, null, txt, m)
}
handler.help = ['charagenshin']
handler.tags = ['genshin']
handler.limit = true
handler.command = /^(chara(gi|genshin)|genshin(chara|character))$/i
export default handler 