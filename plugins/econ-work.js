import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let startTime = new Date();
    try {
        conn.sendMessage(m.chat, {
            react: {
                text: '♻️',
                key: m.key,
            }
        })
        if (!args[0]) throw `*Contoh:* ${usedPrefix+command} https://www.instagram.com/reel/Co18PSBAmkh/?igshid=MmJiY2I4NDBkZg==`
        let ig = await fetch(`https://api.simplebot.my.id/api/downloader/igdl?url=${encodeURIComponent(args[0])}`)
        let res = await ig.json()
        if (!res.status) throw res
        let cap = `*Mengunduh:* ${(new Date() - startTime) / 1000} detik`
        conn.sendFile(m.chat, res.result[0].url, 'instagram_video.mp4', cap, m)
    } catch (e) {
        console.log(e)
        conn.reply(m.chat, '*Maaf terjadi kesalahan saat memproses permintaan.*', m)
    }
};

handler.help = ['igdl *⧼url⧽*', 'instagram *⧼url⧽*']
handler.tags = ['downloader']
handler.command = /^(igdl|instagram|ig)$/i
handler.register = false
handler.premium = false
handler.limit = false

export default handler