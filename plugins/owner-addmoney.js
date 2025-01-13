let handler = async (m, { conn, command, text, args }) => {
    if (!text) throw 'Format salah!\n\nTambah money: addmoney <tag orang> <jumlah money>\nKurangi money: removemoney <tag orang> <jumlah money>'
    let [who, value] = text.split(' ')
    if (!who) throw 'Tag orang yang akan diubah moneynya!'
    if (isNaN(value)) throw 'Jumlah harus angka!'
    value = parseInt(value)
    let user = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let users = global.db.data.users
    if (!users[user]) users[user] = { money: 0, level: 1, diamond: 0 } // Ensure user object exists
    if (command === 'addmoney') {
        users[user].money += value
        conn.reply(m.chat, `Berhasil menambahkan ${value} money untuk @${user.split('@')[0]}!`, m)
    } else if (command === 'removemoney') {
        if (value > users[user].money) {
            users[user].money = 0
            conn.reply(m.chat, `Berhasil mengurangi money untuk @${user.split('@')[0]}. Money kini menjadi 0!`, m)
        } else {
            users[user].money -= value
            conn.reply(m.chat, `Berhasil mengurangi ${value} money untuk @${user.split('@')[0]}!`, m)
        }
    } else if (command === 'addlevel') {
        users[user].level += value
        conn.reply(m.chat, `Berhasil menambahkan ${value} level untuk @${user.split('@')[0]}!`, m)
    } else if (command === 'adddiamond') {
        users[user].diamond += value
        conn.reply(m.chat, `Berhasil menambahkan ${value} diamond untuk @${user.split('@')[0]}!`, m)
    }
}
handler.help = ['addmoney', 'remmoney', 'addlevel', 'adddiamond']
handler.tags = ['owner']
handler.command = /^(add|rem)money$|^addlevel$|^adddiamond$/i
handler.rowner = true

export default handler