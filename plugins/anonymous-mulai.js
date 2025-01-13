let handler = async (m, { conn }) => {
let fotonya = 'https://telegra.ph/file/933792ff3179d04927710.jpg'
let sewa = `Untuk memulai chat silahkan ketik .start untuk memulai 
`
conn.sendFile(m.chat, fotonya, 'anu.jpg', sewa, m)  
}
handler.help = ['anonymous']
handler.tags = ['random']
handler.command = /^(anonymous)$/i
handler.private = true
export default handler
