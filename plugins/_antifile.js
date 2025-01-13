export async function before(m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys || !(m.mtype === "documentMessage") || !global.db.data.chats[m.chat]?.antiFile) return;

  const user = global.db.data.users[m.sender];
  user.warn += 1;
  user.banned = true;

  const warningMessage = '⚠️ *File Terdeteksi!* ⚠️\nKamu telah mengirim file ZIP. Waspada dalam mendownload file, bisa saja mengandung virus atau phising.';
  await m.reply(warningMessage);

  const deleteMessage = { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant } };
  await this.sendMessage(m.chat, deleteMessage);

  if (isAdmin || isBotAdmin) {
    await m.reply(isAdmin ? '❌ *Kamu tidak diizinkan mengirim file ZIP.*' : '❌ *File ZIP terdeteksi dan dihapus.*');
  } else {
    const kick = { kick: { jid: m.sender, reason: "Mengirim file ZIP yang tidak diizinkan" } };
    await this.groupSettingChange(m.chat, kick);
  }
}
