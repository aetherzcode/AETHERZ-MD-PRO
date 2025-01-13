let handler = async (m, { conn, command }) => {
    let url = API('lol', '/api/random/husbu', null, 'apikey')
    conn.sendFile(m.chat, url, 'husbu.jpeg', 'Ini Dia Kak', m, false)
}
handler.command = /^(husbu)$/i
handler.tags = ['anime']
handler.help = ['husbu']
handler.premium = false
handler.limit = true

export default handler