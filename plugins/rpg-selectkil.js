

let handler = async (m, { conn, usedPrefix, text, command }) => {
    let user = global.db.data.users[m.sender]
    let skill = ["swordmaster", "necromancer", "witch", "Archer", "magicswordmaster", "thief", "shadow"]
    let bintang = {
        "satu": "⭐",
        "dua": "⭐⭐",
        "tiga": "⭐⭐⭐",
        "empat": "⭐⭐⭐⭐",
        "lima": "⭐⭐⭐⭐⭐",
        "enam": "⭐⭐⭐⭐⭐⭐"
    }
    let skil = text.trim().toLowerCase() // filter text
    if (!skill.includes(skil)) throw `Select *skill🃏* what do you want/pilih skill apa yg kamu inginkan:\n${skill.map(skil => `› ${skil}`).join('\n')}\n\nHow To use/Cara menggunakan:\n${usedPrefix + command} <nameskill>\n\nExample/Contoh:\n${usedPrefix + command} necromancer`.trim()

    if (user.skill === "") {
        user.skill = skil
        m.reply(`Anda telah memilih Skill ${skil}`)
    } else if (user.skill === skil) {
        m.reply(`Anda Sudah Punya skill ${user.skill} Tidak bisa diganti`)
    } else {
        m.reply(`Anda sudah memiliki skill ${user.skill}. Tidak bisa memilih skill baru.`)
    }
}

handler.help = ['selectskill <type>']
handler.tags = ['rpg']
handler.command = /^(selectskill)$/i
handler.register = true
handler.group = true
handler.rpg = true

export default handler
