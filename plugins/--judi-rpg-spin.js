let handler = async (m, { conn, text, command, args, usedPrefix, DevMode }) => {
    try {
        let user = global.db.data.users[m.sender]
        if (!user.koin) return conn.reply(m.chat, 'Kamu tidak memiliki koin untuk bermain slots. Mulailah dengan deposit!', m)

        let count = 0
        if (args.length < 1) {
            conn.reply(m.chat, `Gunakan format *${usedPrefix}${command} [jumlah]*\nContoh: *${usedPrefix}${command} 10*`, m)
            return
        }

        let spinAll = args[0].toLowerCase() === 'max'

        if (!spinAll) {
            count = Math.floor(args[0])
            if (isNaN(count) || count <= 0) {
                conn.reply(m.chat, 'Jumlah taruhan harus lebih dari 0.', m)
                return
            }
            if (count > user.koin) {
                conn.reply(m.chat, 'Maaf, koin yang Anda miliki tidak cukup untuk memasang taruhan sebanyak itu.', m)
                return
            }
        } else {
            count = user.koin
        }

        let symbols = ['🦁', '🐼', '🐷', '🐮', '🦊']
        let result = []
        for (let i = 0; i < 3; i++) {
            result.push(pickRandom(symbols))
        }

        let message = `
*🎰 Virtual Slot 🎰*

${result[0]} | ${result[1]} | ${result[2]}

`
        let winOrLose = ''
        let multiplier = 0
        if (result[0] === result[1] && result[1] === result[2]) {
            winOrLose = 'Jackpot!! 🥳🥳'
            multiplier = 4
        } else if (result[1] === result[2]) {
            winOrLose = 'Jackpot! 🥳'
            multiplier = 2
        } else {
            winOrLose = 'Kalah'
        }

        let prize = count * multiplier
        user.koin -= count
        user.koin += prize

        message += `${winOrLose} Koin yang Anda menangkan: ${prize}\nSisa koin Anda: ${user.koin}`

        conn.reply(m.chat, message, m)
    } catch (e) {
        console.error(e)
        conn.reply(m.chat, 'Terjadi kesalahan saat menjalankan perintah.', m)
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, `Error di slot.js\n\nError: ${e}\n\n${e.stack}`)
            }
        }
    }
}

handler.help = ['spin']
handler.tags = ['judi']
handler.command = /^spin$/i

export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
