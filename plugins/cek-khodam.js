/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/
let handler = async (m, { conn, command, text }) => {
    if (!text) return conn.reply(m.chat, 'Masukan Namamu!', m)

    let khodams = [
        { name: "Harimau Putih", meaning: "Kamu kuat dan berani seperti harimau, karena pendahulumu mewariskan kekuatan besar padamu." },
        { name: "Monyet Kekar", meaning: "Kamu lincah dan cerdas, mampu menghadapi berbagai tantangan dengan ketangkasan." },
        { name: "Naga Merah", meaning: "Kamu memiliki kekuatan luar biasa dan kebijaksanaan, seperti naga yang legendaris." },
        { name: "Burung Garuda", meaning: "Kamu bebas dan perkasa, melambangkan kebebasan dan kemuliaan." },
        { name: "Serigala Hitam", meaning: "Kamu setia dan memiliki insting tajam, mampu melindungi diri dan orang lain." },
        { name: "Macan Kumbang", meaning: "Kamu misterius dan kuat, seperti macan yang jarang terlihat tapi selalu waspada." },
        { name: "Kuda Emas", meaning: "Kamu berharga dan kuat, siap untuk berlari menuju kesuksesan." },
        { name: "Elang Biru", meaning: "Kamu memiliki visi yang tajam dan dapat melihat peluang dari jauh." },
        { name: "Harimau Loreng", meaning: "Kamu tangguh dan memiliki kekuatan untuk melindungi dan menyerang." },
        { name: "Gajah Putih", meaning: "Kamu bijaksana dan memiliki kekuatan besar, lambang dari keberanian dan keteguhan hati." },
        { name: "Banteng Sakti", meaning: "Kamu kuat dan penuh semangat, tidak takut menghadapi rintangan." },
        { name: "Ular Raksasa", meaning: "Kamu memiliki kebijaksanaan dan kekuatan tersembunyi, siap menyerang jika diperlukan." },
        { name: "Ikan Dewa", meaning: "Kamu tenang dan penuh kedamaian, membawa rezeki dan keberuntungan." },
        { name: "Kucing Hitam", meaning: "Kamu misterius dan penuh dengan rahasia, membawa keberuntungan bagi yang memahami." },
        { name: "Rusa Emas", meaning: "Kamu anggun dan berharga, selalu dihargai oleh orang-orang di sekitarmu." },
        { name: "Singa Bermahkota", meaning: "Kamu lahir sebagai pemimpin, memiliki kekuatan dan kebijaksanaan seorang raja." },
        { name: "Kijang Perak", meaning: "Kamu cepat dan cekatan, selalu waspada dan siap bertindak." },
        { name: "Kura-kura Sakti", meaning: "Kamu sabar dan bijaksana, hidup panjang dan penuh kedamaian." },
        { name: "Burung Hantu Putih", meaning: "Kamu memiliki kebijaksanaan malam, melihat hal-hal yang tidak terlihat oleh orang lain." },
        { name: "Kuda Laut", meaning: "Kamu unik dan fleksibel, mampu beradaptasi dengan berbagai situasi." },
        { name: "Kuda Hitam", meaning: "Kamu kuat dan penuh semangat, selalu bergerak maju tanpa kenal lelah." },
        { name: "Harimau Emas", meaning: "Kamu kuat dan berharga, lambang dari kekuatan dan kemuliaan." }
    ]

    let khodam = pickRandom(khodams)

    conn.reply(m.chat, `
  「 *CEK KHODAM ${text}* 」

• Nama : ${text}
• Khodam : ${khodam.name}
• Arti : ${khodam.meaning}

`.trim(), m, m.mentionedJid ? {
        mentions: m.mentionedJid
    } : {})
}

handler.help = ['cekkhodam <nama>']
handler.tags = ['fun']
handler.command = /^cekkhodam/i

export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/