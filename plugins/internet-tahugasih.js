import fetch from 'node-fetch'
let handler = async(m, { conn, text }) => {
  let res = await fetch(API('lol', '/api/random/faktaunik', null, 'apikey'))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  if(!json.result) throw json
  conn.reply(m.chat, json.result, m)
}
handler.help = ['tahugasih']
handler.tags = ['internet']
handler.command = /^(taugasih|tahugasih)$/i
handler.limit = true
export default handler