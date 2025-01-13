let handler = async (m, { conn, command }) => {
  let user = global.db.data.users[m.sender]
  if (!user.koin) {
    return conn.reply(m.chat, 'Kamu belum memiliki koin. Waktunya untuk deposit!', m)
  }
  const caption = `*▸ Nama:* ${user.registered ? user.name : conn.getName(m.sender)}
*▸ Limit:* ${user.premiumTime >= 1 ? 'Unlimited' : user.limit}
*▸ Koin:* ${user.koin}

*Tanggal:* ${new Date().toLocaleDateString('id-ID')}
*Jam:* ${new Date().toLocaleTimeString('id-ID')}
`.trim()
  await conn.reply(m.chat, caption, m)
}

handler.help = ['mykoin']
handler.tags = ['judi']
handler.command = /^(mykoin)$/i

handler.register = false
export default handler
