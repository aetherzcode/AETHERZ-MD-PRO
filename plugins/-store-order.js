let handler = async (m, { conn, text, usedPrefix, command }) => {
	const example = `Silahkan masukan pesannya\nContoh : ${usedPrefix + command} Halo kak order sewabot`.trim();
	if (!text) throw example;
	if (text.length > 500) throw "Teks kepanjangan!";
	const order = `*「 ORDER 」*\n\nUntuk : ${pesan}\nDari: *@${m.sender.split`@`[0]}*`;
	conn.reply("6282389924037@s.whatsapp.net", order.trim(), m);
	await m.reply(`[ ✔️ ] Berhasil mengirim orderan. Mohon tunggu balasan dari owner.`);
};

handler.help = ["order"];
handler.tags = ["store"];
handler.command = /^order$/i

export default handler;