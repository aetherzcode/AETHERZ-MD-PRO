let handler = async (m, { conn, text, isROwner, isOwner }) => {
  if (text) {
    global.db.data.chats.sBye = text
    m.reply('Bye berhasil diatur\n@user (Mention)')
  } else throw 'Teksnya mana?'
}
handler.help = ['setbye <teks>']
handler.tags = ['group','owner',]
handler.command = /^setbye$/i
handler.group = true
handler.admin = true

export default handler