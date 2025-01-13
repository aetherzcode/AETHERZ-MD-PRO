import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*Masukan Username!*\n\n*Contoh:*\n*${usedPrefix + command} adibabilqiss*`
  
  try {
    let response = await axios.get(`https://api.betabotz.eu.org/api/search/tiktoks?query=${text}&apikey=${global.lann}`)
    let data = response.data.data
    let user = data.user
    let stats = data.stats

    let caption = `👤 *Name:* ${user.nickname}
📝 *Username:* ${user.uniqueId}
📸 *Avatar:* ${user.avatarLarger}
💌 *Followers:* ${stats.followerCount}
👥 *Following:* ${stats.followingCount}
❤ *Like:* ${stats.heartCount}
🎥 *Video:* ${stats.videoCount}
👍 *Digg:* ${stats.diggCount}
🔗 *Verified:* ${user.verified ? 'Yes' : 'No'}
🔒 *Private Account:* ${user.privateAccount ? 'Yes' : 'No'}
🔞 *Under Age 18:* ${user.isUnderAge18 ? 'Yes' : 'No'}
🔒 *Secret:* ${user.secret ? 'Yes' : 'No'}
📑 *Bio:* ${user.signature ? user.signature : 'Tidak Ada Bio'}
🆔 *User ID:* ${user.id}
👤 *Sec UID:* ${user.secUid}
💼 *FTC:* ${user.ftc ? 'Yes' : 'No'}
⭐ *Open Favorite:* ${user.openFavorite ? 'Yes' : 'No'}
`.trim()
    
    await conn.sendFile(m.chat, user.avatarLarger, 'tiktokjpg.jpg', caption, m)
  } catch (error) {
    throw `Terjadi kesalahan saat mengambil data pengguna TikTok. Pastikan username yang dimasukkan benar.`
  }
}

handler.help = ['tiktokstalk']
handler.tags = ['tools']
handler.command = /^(stalktiktok|stalktt|tiktokstalk|ttstalk)$/i

export default handler