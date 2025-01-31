import axios from "axios";
import cheerio from "cheerio";
import fs from "fs";
import path from "path";

const tempDir = "/home/container/tmp/";
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const handler = async (m, { conn, args }) => {
  if (!args[0]) {
    return m.reply("🚨 Masukkan URL Pinterest yang valid!");
  }

  const pinUrl = args[0];

  try {
    await conn.sendMessage(m.chat, { react: { text: "⏰", key: m.key } });

    const response = await axios.get(pinUrl);
    const $ = cheerio.load(response.data, null, false);
    const imageUrl = $('meta[property="og:image"]').attr("content");

    if (!imageUrl) {
      throw new Error("Gagal mendapatkan gambar dari Pinterest.");
    }

    const tempPath = path.join(tempDir, `${Date.now()}.jpg`);
    const imgData = await axios.get(imageUrl, { responseType: "arraybuffer" });
    fs.writeFileSync(tempPath, imgData.data);

    await conn.sendFile(m.chat, tempPath, "pinterest.jpg", "📌 Gambar dari Pinterest", m);
    fs.unlinkSync(tempPath);

    await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
  } catch (error) {
    await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
    return m.reply(`🚨 Terjadi kesalahan: ${error.message}`);
  }
};

handler.command = ["pindl", "pinterestdl"];
handler.tags = ["downloader"];
handler.limit = true;
export default handler;