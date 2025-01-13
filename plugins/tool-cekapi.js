import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
    if (!args[0]) return m.reply('Apikeynya mana?')
    let res = await fetch(API('lol', '/api/checkapikey', { apikey: args[0] }, false))
    let lol = await res.json()
    conn.reply(m.chat, `• *ᴛʏᴘᴇ:* LOLHUMAN
• *ᴀᴘɪᴋᴇʏ:* ${args[0]}

• *ɴᴀᴍᴇ:* ${lol.result.username}
• *ᴛᴏᴛᴀʟ ʜɪᴛ:* ${lol.result.requests}
• *ʜɪᴛ ᴛᴏᴅᴀʏ:* ${lol.result.today}
• *ᴀᴄᴄᴏᴜɴᴛ:* ${lol.result.account_type}

• *ᴇxᴘɪʀᴇᴅ:* ${lol.result.expired}`, m)
}
handler.help = ['lolapikey']
handler.tags = ['tools']
handler.command = /^lol(apikey|api|key)$/i

export default handler