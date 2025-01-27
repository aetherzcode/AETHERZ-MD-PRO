import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const Telegraph = async (path) => {
  try {
    let formData = new FormData();
    formData.append("images", fs.createReadStream(path));

    let headers = {
      headers: {
        ...formData.getHeaders(),
      },
    };

    let { data: uploads } = await axios.post(
      "https://telegraph.zorner.men/upload",
      formData,
      headers
    );

    return {
      uploadedLinks: uploads.links,
    };
  } catch (e) {
    console.error(e.message);
    return { error: e.message };
  }
};

let handler = async (m, { conn, args }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";

  if (!mime || !mime.startsWith("image/")) {
    return m.reply(" *Format tidak valid!* Balas dengan media gambar yang valid.");
  }

  let media = await q.download();
  let filePath = "./tmp/" + new Date().getTime() + ".jpg";

  fs.writeFileSync(filePath, media);

  await conn.sendMessage(m.chat, {
            react: {
                text: "⏱️", 
                key: m.key,
            },
        });

  try {
    let result = await Telegraph(filePath);

    fs.unlinkSync(filePath);

    if (result.error) {
      throw new Error(result.error);
    }

    let uploadedLinks = result.uploadedLinks.join("\n");
    m.reply(
      `*Berhasil Mengunggah*\n\n☘️ *Link Telegraph:*\n${uploadedLinks}\n\n📝 *Gunakan link ini untuk berbagi gambar dengan mudah!*`
    );
await conn.sendMessage(m.chat, {
            react: {
                text: "✅", // Emoji reaction for success
                key: m.key,
            },
        });
  } catch (err) {
    console.error(err);
    m.reply(` *Terjadi kesalahan saat mengunggah gambar:*\n${err.message}`);
  }
};

handler.help = ["tlgph (reply gambar)"];
handler.tags = ["tools"];
handler.command = /^(tlgph|telegraph)$/i;

export default handler;