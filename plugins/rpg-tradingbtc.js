let handler = async (m, { conn, text }) => {
    let user = global.db.data.users[m.sender];
    let bank = user.bank || 0;
    let btc = user.btc || 0;
    
    let args = text.split(' ');
    let action = args[0];
    let amount = parseFloat(args[1]);
    
    if (!action || isNaN(amount) || amount <= 0) {
        return conn.reply(m.chat, `Silakan tentukan aksi (buy/sell) dan jumlah Bitcoin yang valid`, m);
    }

    // Harga awal Bitcoin
    let btcPrice = 1000000000; // 1 miliar
    btcPrice = adjustBTCPrice(btcPrice); // Sesuaikan harga secara acak

    if (action === 'buy') {
        let cost = amount * btcPrice;
        if (bank < cost) {
            return conn.reply(m.chat, `❌ Maaf, saldo bankmu tidak cukup untuk membeli ${amount} BTC. Kamu memerlukan ${cost.toLocaleString('id-ID')} money`, m);
        }
        user.bank -= cost;
        user.btc += amount;
        await conn.reply(m.chat, `✔️ Pembelian Bitcoin berhasil!
        
📛 Nama: ${user.name}
🏦 Saldo Bank: ${user.bank.toLocaleString('id-ID')}
💲 BTC Dibeli: ${amount}
💲 Harga BTC: ${btcPrice.toLocaleString('id-ID')}
💼 BTC Total: ${user.btc.toFixed(8)}`, m);
    } else if (action === 'sell') {
        if (btc < amount) {
            return conn.reply(m.chat, `❌ Maaf, BTC kamu tidak cukup untuk menjual ${amount} BTC. Kamu hanya memiliki ${btc.toFixed(8)} BTC`, m);
        }
        let earnings = amount * btcPrice;
        user.bank += earnings;
        user.btc -= amount;
        await conn.reply(m.chat, `✔️ Penjualan Bitcoin berhasil!
        
📛 Nama: ${user.name}
🏦 Saldo Bank: ${user.bank.toLocaleString('id-ID')}
💲 BTC Dijual: ${amount}
💲 Harga BTC: ${btcPrice.toLocaleString('id-ID')}
💼 BTC Total: ${user.btc.toFixed(8)}`, m);
    } else {
        return conn.reply(m.chat, `Aksi tidak valid. Silakan gunakan 'buy' atau 'sell' diikuti dengan jumlah BTC`, m);
    }

    checkWinOrLose(user, m, conn);
}

handler.help = ['tradebtc <buy/sell> <jumlah BTC>']
handler.tags = ['trading']
handler.command = /^(tradebtc)$/i

handler.group = false
handler.rowner = false 

export default handler;

// Fungsi untuk mendapatkan harga BTC saat ini (dummy)
function getBTCPrice() {
    // Harga BTC awal adalah 1 miliar
    return 1000000000; // 1 miliar
}

// Fungsi untuk menyesuaikan harga BTC secara acak
function adjustBTCPrice(currentPrice) {
    let change = (Math.random() * 0.1 - 0.05); // Perubahan harga antara -5% dan +5%
    return currentPrice * (1 + change);
}

// Fungsi untuk memeriksa apakah pengguna menang atau kalah
function checkWinOrLose(user, m, conn) {
    if (user.bank <= 0 && user.btc <= 0) {
        user.bank = 1000000; // Reset saldo bank pengguna
        user.btc = 0;
        conn.reply(m.chat, `💀 Kamu telah kehilangan semua saldo bank dan BTC kamu. Game Over. Saldo bank kamu telah di-reset ke 1,000,000 money untuk memulai kembali.`, m);
    } else if (user.bank >= 1000000000) { // Contoh target kemenangan
        conn.reply(m.chat, `🎉 Selamat! Kamu telah mencapai 1,000,000,000 money di bank dan memenangkan permainan!`, m);
    }
}
