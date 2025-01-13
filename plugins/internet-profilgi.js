import fetch from 'node-fetch'
import Jimp from 'jimp'
let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('Masukan Uid Genshin mu')
    if (isNaN(text)) return m.reply('Hanya berupa angka!')
    try {
        m.reply('Sedang Mengambil Data...')
        let src = await(await fetch(`https://enka.network/api/uid/${text}/`)).json()
        let teks = `▧ *Profile Info*

❃ _*Nickname:*_ ${src.playerInfo.nickname}
❃ _*Signature:*_ ${src.playerInfo.signature ? src.playerInfo.signature: 'Tidak Ada Signature'}
❃ _*Adventure Level:*_ ${src.playerInfo.level}

❃ _*World Level:*_ ${src.playerInfo.worldLevel ? src.playerInfo.worldLevel: '0'}
❃ _*Archievment:*_ ${src.playerInfo.finishAchievementNum}
❃ _*Abyss:*_ Floor ${src.playerInfo.towerFloorIndex ? src.playerInfo.towerFloorIndex: '0'} Chamber ${src.playerInfo.towerLevelIndex ? src.playerInfo.towerLevelIndex: '0'}

❃ _*Open In Enkanetwork:*_ https://enka.network/u/${text}
`.trim()
        let image = await Jimp.read({ url: API('saipul', '/api/download/ssweb', { url: `https://enka.network/u/${text}` }, null) })
        let crop = await image.crop(15, 300, 990, 410).getBufferAsync('image/png')
        await conn.sendFile(m.chat, crop, 'profilgenshin.jpg', teks, m)
    } catch (e) {
        throw `_Uid ${text} Tidak Ditemukan..._`
    }
}
handler.help = ['profilgi']
handler.command = /^profilgenshin|profilgi|profilegi|profilgi$/i
handler.tags = ['genshin']
handler.limit = true
export default handler