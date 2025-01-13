async function handler(m, { command, usedPrefix }) {
    command = command.toLowerCase()
    this.anonymous = this.anonymous ? this.anonymous : {}
    let footer = `\n\n_Ketik ${usedPrefix}next untuk melanjutkan_\n_Ketik ${usedPrefix}leave untuk keluar_`
    switch (command) {
        case 'next':
        case 'leave': {
            let room = Object.values(this.anonymous).find(room => room.check(m.sender))
            if (!room) return this.reply(m.chat, `Kamu tidak sedang berada dalam obrolan anonim ketik .start ${footer}`, m)
            m.reply('Kamu berhasil keluar dari ruang obrolan. Semoga hari mu menyenangkan!')
            let other = room.other(m.sender)
            if (other) await this.reply(other, `Partner kamu telah meninggalkan obrolan. ${footer}`, m)
            delete this.anonymous[room.id]
            if (command === 'leave') break
        }
        case 'start': {
            if (Object.values(this.anonymous).find(room => room.check(m.sender))) return this.reply(m.chat, `Anda masih berada dalam obrolan anonim dan menunggu partner ${footer}`, m)
            let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
            if (room) {
                await this.reply(room.a, `Partner ditemukan!\n${footer}`, m)
                room.b = m.sender
                room.state = 'CHATTING'
                await this.reply(room.b, `Partner ditemukan!\n${footer}`, m)
            } else {
                let id = + new Date
                this.anonymous[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: 'WAITING',
                    check: function (who = '') {
                        return [this.a, this.b].includes(who)
                    },
                    other: function (who = '') {
                        return who === this.a ? this.b : who === this.b ? this.a : ''
                    },
                }
                await this.reply(m.chat, `Tunggu sebentar, sedang mencari partner untukmu. Sabar ya, akan segera ada yang bergabung! ${footer}`, m)
            }
            break
        }
    }
}
handler.help = ['start', 'leave', 'next']
handler.tags = ['anonymous']
handler.command = ['start', 'leave', 'next']

handler.private = true

export default handler