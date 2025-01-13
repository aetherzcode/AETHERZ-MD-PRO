import axios from 'axios'

let handler = async (m, { text, conn, args, commad, usedPrefix}) => {
  if (!text) throw `[!] *Invalid*\n*Example*: ${usedPrefix+command} https://github.com/sadxzyq`
    
	conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})
shortlink(text).then(a => {
conn.reply(m.chat, '*Link* : ' + a.data, m)
})
 
}

handler.help = ['tinyurl'].map(v => v + ' <link>')
handler.tags = ['tools']
handler.command = /^tinyurl$/i
handler.premium = true
handler.limit = true
export default handler

async function shortlink(url){
let isurl = /https?:\/\//.test(url)
return isurl ? axios.get('https://tinyurl.com/api-create.php?url='+encodeURIComponent(url)) : ''}