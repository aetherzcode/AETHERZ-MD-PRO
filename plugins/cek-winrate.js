/* JANGAN HAPUS WM INI MEK
SCRIPT BY © AETHERZCODE
•• contacts: (6285798045817)
•• instagram: @aetherz17_
•• (github.com/aetherzcode) 
*/
let handler = async (m, { conn, text }) => {
  let id = m.chat
  conn.math = conn.math ? conn.math : {}
  if (id in conn.math) {
    clearTimeout(conn.math[id][3])
    delete conn.math[id]
    m.reply('Hmmm...ngecheat?')
  }
  
  let input = text.split('/')
  if (input.length !== 3) throw 'Format salah, gunakan total pertandingan/total win rate/target win rate'
  
  let totalMatches = parseFloat(input[0])
  let currentWinRate = parseFloat(input[1])
  let targetWinRate = parseFloat(input[2])
  
  if (isNaN(totalMatches) || isNaN(currentWinRate) || isNaN(targetWinRate)) throw 'Format salah, gunakan total pertandingan/total win rate/target win rate'
  
  let winNeeded = Math.ceil(((targetWinRate * (totalMatches + 1) / 100) - (currentWinRate * totalMatches / 100)) / (targetWinRate / 100 - currentWinRate / 100))
  
  m.reply(`
*Detail Win Rate:*
Total pertandingan Anda saat ini: ${totalMatches}
Total win rate Anda saat ini: ${currentWinRate}%
Win rate total yang Anda inginkan: ${targetWinRate}%

= Kamu membutuhkan ${winNeeded} pertandingan tanpa kalah untuk mencapai ${targetWinRate}% win rate.
`)
}

handler.help = ['cwr total pertandingan/total win rate/target win rate']
handler.tags = ['store']
handler.command = /^(cwr)$/i
handler.exp = 5

export default handler