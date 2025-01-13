let handler = async (m, { conn, command }) => {
    let user = global.db.data.users[m.sender]
    if (!user.koin) {
        return await conn.reply(m.chat, 'Anda belum memiliki koin gabung.', m)
    }

    const leaderboard = getKoinLeaderboard() // Mendapatkan leaderboard koin gabung

    // Tampilkan leaderboard koin gabung dengan jarak antara baris
    let text = `
🏆 Leaderboard Koin Gabung:

${leaderboard.map((entry, index) => `${index + 1}. ${entry.name} - ${entry.koin} koin`).join('\n\n')}
    `.trim()

    return await conn.reply(m.chat, text, m)
}

// Fungsi untuk mendapatkan leaderboard koin gabung
function getKoinLeaderboard() {
    let users = Object.values(global.db.data.users)
    let leaderboard = users.filter(user => user.koin).sort((a, b) => b.koin - a.koin).slice(0, 10)
    return leaderboard.map(user => ({ name: user.name || conn.getName(user.jid), koin: user.koin }))
}

handler.help = ['leaderboardkoin', 'koinjoinlb', 'koinjoingabung']
handler.tags = ['xp']
handler.command = /^(leaderboardkoin|koinjoinlb|koinjoingabung)$/i
handler.register = true
handler.group = true

export default handler