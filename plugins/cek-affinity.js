let handler = async (m, { conn, text }) => {
  let id = m.chat
  conn.affinity = conn.affinity ? conn.affinity : {}
  if (id in conn.affinity) {
    clearTimeout(conn.affinity[id][3])
    delete conn.affinity[id]
    m.reply('Hmmm...ngecheat?')
  }

  let input = text.split('|')
  if (input.length !== 2) throw 'Format salah, gunakan .cekaffinity poin affinity saat ini|match yang ingin Anda mainkan'

  let currentPoints = parseFloat(input[0])
  let matchType = input[1].trim().toLowerCase()

  if (isNaN(currentPoints)) throw 'Format salah, pastikan poin affinity saat ini adalah angka'

  const RANKED_POINTS = 6
  const CLASSIC_POINTS = 3
  const OTHER_POINTS = 2

  let pointsPerMatch
  switch (matchType) {
    case 'rank':
    case 'ranked':
      pointsPerMatch = RANKED_POINTS
      break
    case 'classic':
      pointsPerMatch = CLASSIC_POINTS
      break
    case 'other':
    case 'pertandingan lain':
      pointsPerMatch = OTHER_POINTS
      break
    default:
      throw 'Tipe pertandingan tidak valid, gunakan rank/classic/other'
  }

  let pointsNeeded = Math.max(0, 150 - currentPoints)
  let matchesNeeded = Math.ceil(pointsNeeded / pointsPerMatch)

  m.reply(`
*Detail Poin Affinity:*
Poin Anda saat ini: ${currentPoints}
Poin yang dibutuhkan: ${pointsNeeded}
Tipe pertandingan: ${matchType}
Poin per match: ${pointsPerMatch}

= Anda membutuhkan ${matchesNeeded} pertandingan tipe ${matchType} untuk mencapai 150 poin affinity.
`)
}

handler.help = ['affinity poin saat ini|match type']
handler.tags = ['store']
handler.command = /^(cekaffinity|csos)$/i
handler.exp = 5

export default handler