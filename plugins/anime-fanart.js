let handler = async (m, { conn, command }) => {
    let url = API('lol', '/api/random/art', null, 'apikey')
    conn.sendFile(m.chat, url, 'fanart.jpeg', 'Ini Dia Kak', m, false)
}
handler.command = /^(fanart)$/i
handler.tags = ['anime']
handler.help = ['fanart']
handler.premium = false
handler.limit = true

export default handler