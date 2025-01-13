import util from "util";
import path from "path";

let handler = async (m, { conn }) => {
	conn.sendFile(m.chat, `${salam.getRandom()}`, "salam.mp3", null, m, true, {
		type: "audioMessage",
		ptt: true,
	});
};
handler.customPrefix =
	/^(assalamualaikum|assalamu'alaikum|salam|asalamualaikum|assalam|asalam|salam|salom|shalom|Assalamualaikum)$/i;
handler.command = new RegExp();

export default handler;

const salam = [
"./media/salam.mp3",
]