let handler = async (m, { conn, command, text, args }) => {
    if (!text) throw 'Format salah!\n\nTambah koin: adddkoin <nomor orang> <jumlah koin>\nKurangi koin: remdkoin <nomor orang> <jumlah koin>'
    let [phone, koinValue] = text.split(' ')
    if (!phone) throw 'Masukkan nomor orang yang akan diubah koinnya!'
    if (isNaN(koinValue)) throw 'Jumlah koin harus angka!'
    koinValue = parseInt(koinValue)
    let user = conn.user.jid
    let users = global.db.data.users
    if (!users[phone + '@s.whatsapp.net']) users[phone + '@s.whatsapp.net'] = { koin: 0 }
    if (command === 'adddkoin') {
        users[phone + '@s.whatsapp.net'].koin += koinValue
        conn.reply(m.chat, `Berhasil menambahkan ${koinValue} koin untuk ${phone}!`, m)
        let date = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
        let day = new Date().toLocaleDateString('id-ID', { weekday: 'long' })
        await conn.sendMessage(phone + '@s.whatsapp.net', { text: `
   \`「 DEPOSIT SUKSES」\`
   
▧ Status: Sukses 
▧ Nomor: ${phone}
▧ Masuk: ${koinValue} koin
▧ Tanggal: ${date}
▧ Hari: ${day}

> Terimakasih telah melakukan deposit. Silahkan gunakan. Untuk melihat semua koin mu, ketik .mykoin` })
    } else if (command === 'remdkoin') {
        if (koinValue > users[phone + '@s.whatsapp.net'].koin) {
            users[phone + '@s.whatsapp.net'].koin = 0
            conn.reply(m.chat, `Berhasil mengurangi koin untuk ${phone}. Koin kini menjadi 0!`, m)
            await conn.sendMessage(phone + '@s.whatsapp.net', { text: `Maaf, koin Anda telah dikurangi hingga menjadi 0.` })
        } else {
            users[phone + '@s.whatsapp.net'].koin -= koinValue
            conn.reply(m.chat, `Berhasil mengurangi ${koinValue} koin untuk ${phone}!`, m)
            let date = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
            let day = new Date().toLocaleDateString('id-ID', { weekday: 'long' })
            await conn.sendMessage(phone + '@s.whatsapp.net', { text: `
   \`「 PENGURANGAN KOIN」\`
   
▧ Status: Berhasil 
▧ Nomor: ${phone}
▧ Pengurangan: ${koinValue} koin
▧ Tanggal: ${date}
▧ Hari: ${day}

> Koin Anda telah dikurangi sebanyak ${koinValue}.` })
        }
    }
}

handler.help = ['adddkoin', 'remdkoin']
handler.tags = ['owner','judi']
handler.command = /^(add|rem)dkoin$/i
handler.rowner = true

export default handler