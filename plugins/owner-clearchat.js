let handler = async (m, { conn }) => {
  try {
    const hapus = await conn.sendMessage(m.chat, { text: 'sabar lagi hapus pesan' }, { quoted: m, ephemeralExpiration: global.ephemeral });
    const chats = Object.values(conn.chats);

    const gusChats = chats.filter(item => /@g\.us$/.test(item.id));
    const whatsappNetChats = chats.filter(item => /@[gs].whatsapp.net$/.test(item.id));

    const gusChatCount = gusChats.length;
    const whatsappNetChatCount = whatsappNetChats.length;

    for (const chat of gusChats) {
      await conn.chatModify({ delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }] }, chat.id);
    }

    for (const chat of whatsappNetChats) {
      await conn.chatModify({ delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }] }, chat.id);
    }

    await conn.sendMessage(m.chat, { text: `*Jumlah chat dihapus (g.us):* ${gusChatCount}\n*Jumlah chat dihapus (whatsapp.net):* ${whatsappNetChatCount}`, edit: hapus.key }, { quoted: m, ephemeralExpiration: global.ephemeral });
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, 'Terjadi kesalahan dalam menghapus chat.', m);
  }
};

handler.help = ['clearchat'];
handler.tags = ['owner'];
handler.owner = true;
handler.command = /^(clearcha?t)$/i;

export default handler;
