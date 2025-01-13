import axios from 'axios'
let handler = async (m, {
   conn,
   usedPrefix,
   command,
   text
}) => {
   try {
      if (!text) return m.reply(`${usedPrefix + command} Rimuru`)
      m.reply('Wait...')
      let res = await axios.get('https://api.alyachan.dev/api/pinterest?q=' + text + '&apikey=Ariel1')
      let json = res.data
      if (!json.status) return m.reply(Func.jsonFormat(json))
      for (let i = 0; i < 5; i++) {
         var rand = Math.floor(json.data.length * Math.random())
         conn.sendFile(m.chat, json.data[rand].url, '', ``, m)
      }
   } catch (e) {
      console.log(e)
      return conn.reply(m.chat, Func.jsonFormat(e), m)
   }
}
handler.help = ['pinterest']
handler.tags = ['internet']
handler.command = /^(pinterest2|pin2)$/i
handler.limit = 1
export default handler