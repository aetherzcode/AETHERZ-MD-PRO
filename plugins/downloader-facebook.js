import axios from 'axios'
let handler = async (m, {
  conn,
  usedPrefix,
  command,
  args
}) => {
  try {
    if (!args[0]) return m.reply(`${usedPrefix + command} https://fb.watch/mdAicxI4P9/`)
    if (!args[0].match(/(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/)) return m.reply('URL Tidak Valid!')
    let json = await axios.get(`https://api.alyachan.dev/api/fb?url=${args[0]}&apikey=Ariel1`)
    if (!json.status) return m.reply(String(json))
    let result = json.data.data.find(v => v.quality == 'HD') || json.data.data.find(v => v.quality == 'SD')
    conn.sendFile(m.chat, result.url, '', result.quality, m)
  } catch (e) {
    console.log(e)
    return m.reply(String(e))
  }
}
handler.help = ['facebook']
handler.tags = ['downloader']
handler.command = ['facebook', 'fb', 'fbdl']
handler.limit = true
export default handler