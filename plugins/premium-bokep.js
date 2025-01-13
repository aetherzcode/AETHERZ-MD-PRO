import axios from 'axios'

let handler = async (m, { conn }) => {
  const api = `https://api.zahwazein.xyz/randomasupan/discord18?apikey=${global.zein}`
  try {
    conn.sendMessage(m.chat, {
		react: {
			text: '♻️',
			key: m.key,
		}
	})
    const res = await axios.get(api)
    const result = res.data.result
    conn.sendFile(m.chat, result, 'asupan.mp4', '*Here ur porn.*', m)
  } catch (e) {
    console.log(e)
    conn.reply(m.chat, 'An error occurred while processing your request.', m)
  }
}

handler.help = ['bokep']
handler.tags = ['menuprem']
handler.register = true
handler.premium = true
handler.limit = true
handler.command = /^(bokeplagi)$/i

export default handler