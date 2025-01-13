export async function before(m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true;
  let chat = global.db.data.chats[m.chat];
  let sender = global.db.data.users[m.sender];
  let hapus = m.key.participant;
  let bang = m.key.id;
  if (chat.antiBot) {
    if (m.isBaileys && !m.fromMe) {
      if (isAdmin || !isBotAdmin) {
        return true;
      } else {
        await this.sendText(m.chat, `*Bot Lain Terdeteksi*\n\nMaaf, saya harus mengeluarkan Anda karena admin telah mengaktifkan fitur Anti Bot :)`);
        return await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      }
    }
  }
  return true;
}