import { default as makeWASocket } from "@whiskeysockets/baileys";

const handler = async (m, { conn }) => {
  // Mengambil data dari global config jika tersedia
  const name = global.info.nameown || "Owner";
  const nomorown = global.info.nomorown || null; 
  const email = global.info.email || null; 
  const website = global.link.web || null; 

  const nomorownText = nomorown ? `item1.TEL;waid=${nomorown}:${nomorown}@s.whatsapp.net` : "";
  const emailText = email ? `item2.EMAIL;type=INTERNET:${email}` : "";
  const websiteText = website ? `item4.URL:${website}` : "";

  const vcard = `BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:${name}
item.ORG: Creator Bot
${nomorownText}
item1.X-ABLabel:${name}
${emailText}
item2.X-ABLabel:Email
item3.ADR:;;🇮🇩 Indonesia;;;;
item3.X-ABADR:ac
${websiteText}
item4.X-ABLabel:Website
END:VCARD`;

  try {
    // Mengirimkan kontak owner
    await conn.sendMessage(m.chat, {
      contacts: {
        displayName: "Contact Owner",
        contacts: [{ vcard }],
      },
    });

    await conn.reply(m.chat, "Itu nomor kontak owner gua, jangan di spam ya mek.");
  } catch (error) {
    console.error("Error mengirim kontak:", error);
    await conn.reply(m.chat, "Maaf, terjadi kesalahan saat mengirim kontak owner.");
  }
};

handler.command = handler.help = ["owner", "creator"];
handler.tags = ["info"];
handler.limit = false;

export default handler;