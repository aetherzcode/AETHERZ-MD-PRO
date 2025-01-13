import axios from 'axios'
let handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  try {
    if (!text) return m.reply(usedPrefix + command + 'Kucing nakal')
    m.reply('Wait')
    let json = await axios.get('https://api.alyachan.dev/api/openai?prompt=' + text + '&apikey=Ariel1')
    m.reply(json.data.data.content)
  } catch (e) {
    console.log(e)
    m.reply(e)
  }
}
handler.help = ['ai']
handler.tags = ['internet']
handler.limit = 1
handler.command = ['openai2', 'ai2']
export default handler