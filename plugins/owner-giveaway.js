let handler = async (m, { conn, command, text }) => {
    if (!text) throw `Contoh:
    ${command} undian|nama|nama|nama`

    let names = text.split('|')
    if (names.length < 3) throw 'Minimal 3 nama yang diikutkan dalam giveaway!'

    let winners = []
    let x = '\u{1F381}' // Emoji Hadiah
    let firstPlaceEmoji = '\u{1F947}' // Emoji juara 1
    let secondPlaceEmoji = '\u{1F948}' // Emoji juara 2
    let thirdPlaceEmoji = '\u{1F949}' // Emoji juara 3

    // Teks loading
    let loadingText = `⏳ Mencari pemenang ${x}`

    // Kirim teks loading
    await conn.reply(m.chat, loadingText, m)

    // Tambahkan delay selama 10 detik
    await new Promise(resolve => setTimeout(resolve, 10000));

    for (let i = 0; i < 3; i++) {
        let winnerName = names[Math.floor(Math.random() * names.length)]
        winners.push(`${i+1}. ${winnerName}`)
        // Hapus nama yang sudah terpilih
        names = names.filter(name => name !== winnerName)
    }

    let top = `*PEMENANG GIVEAWAY🎁*

${firstPlaceEmoji} ${winners[0]}
${secondPlaceEmoji} ${winners[1]}
${thirdPlaceEmoji} ${winners[2]}
`

    // Menambahkan pemenang ke-4 dan seterusnya tanpa emoji
    for (let i = 3; i < winners.length; i++) {
        top += `${i + 1}. ${winners[i]}\n`
    }

    top = top.trim()

    conn.reply(m.chat, top, m)
}

handler.help = ['giveaway']
handler.tags = ['owner']
handler.command = /^giveaway$/i
handler.owner = true

export default handler