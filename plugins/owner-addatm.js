let handler = async (m, { conn, command, text, args }) => {
    if (!text) throw 'Format salah!\n\nTambah level ATM: atmup <tag orang> <level baru>'
    
    // Extracting the mentioned user and the new ATM level from the command text
    let [who, atmLevel] = text.split(' ')
    if (!who) throw 'Tag orang yang akan diubah level ATM-nya!'
    if (isNaN(atmLevel)) throw 'Level ATM harus angka!'

    // Converting atmLevel to a number
    atmLevel = parseInt(atmLevel)

    let user = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let users = global.db.data.users

    // Checking if the user is in the database, if not, initialize their ATM level to 0
    if (!users[user]) users[user] = { atm: 0 }


    users[user].atm = atmLevel
    conn.reply(m.chat, `Berhasil memperbarui level ATM untuk @${user.split('@')[0]} menjadi ${atmLevel}!`, m)
}

handler.help = ['atmup']
handler.tags = ['owner']
handler.command = /^(atmup)$/i
handler.rowner = true

export default handler