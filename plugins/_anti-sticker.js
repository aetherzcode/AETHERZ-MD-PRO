export async function before(m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys || !(m.mtype === "stickerMessage") || !global.db.data.chats[m.chat]?.antiSticker) return;

  const user = global.db.data.users[m.sender];
  user.warn += 1;
  user.banned = true;

  m.reply('⚠️ *Stiker Terdeteksi!* ⚠️\nKamu telah mengirimkan stiker yang tidak diizinkan.');

  if (isAdmin || isBotAdmin) {
    const deleteMessage = { delete: { remoteJid: m.key.remoteJid, fromMe: true, id: m.key.id, participant: [m.sender] } };
    m.reply(isAdmin ? '❌ *Kamu tidak diizinkan mengirim stiker.*' : '❌ *Stiker terdeteksi dan dihapus.*');
    await this.sendMessage(m.chat, deleteMessage);
  } else {
    const kick = { kick: { jid: m.sender, reason: "Mengirim stiker yang tidak diizinkan" } };
    await this.groupSettingChange(m.chat, kick);
  }
}
