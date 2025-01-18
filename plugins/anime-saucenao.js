import axios from "axios";
import FormData from "form-data";

let handler = async (m, { conn, usedPrefix }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) throw `Reply foto fanart yang mau dicari sumbernya`;
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`;
  let img = await q.download();

  const formData = new FormData();
  formData.append("output_type", "2");
  formData.append("api_key", "58eb687f35decd24507ada808a643fb719931c18");
  formData.append("file", img, "image.jpg");

  await m.reply("Searching...");
  try {
    let res = await axios.post("https://saucenao.com/search.php", formData, {
      headers: formData.getHeaders(),
    });

    let json = res.data;

    if (!json.results || json.results.length === 0) {
      throw "No results found.";
    }

    let result = json.results[0];
    let similarity = result.header.similarity;
    let imageUrl = result.header.thumbnail;
    let indexName = result.header.index_name;

    let fileNameMatch = indexName.match(/-(.*?)\./);
    let fileName = fileNameMatch ? fileNameMatch[1] : "Unknown File";

    let title = result.data.title || "Unknown Title";
    let author_name = result.data.member_name || "Unknown Author";
    let ext_urls = result.data.ext_urls || [];

    let twitterNote = indexName.includes("Twitter")
      ? "\n\n*Catatan:* Informasi dari Twitter sering kali terbatas pada URL sumber. Untuk detail lebih lanjut, Anda dapat membuka link tersebut."
      : "";

    let _result = `*Index Name :* ${indexName}\n*Similarity :* ${similarity}%\n*File Name :* ${fileName}\n*Source :* ${ext_urls[0] || "No URL Found"}${twitterNote}`;

    await conn.sendFile(m.chat, imageUrl, "result.jpg", _result, m);
  } catch (err) {
    console.error(err);
    await m.reply(`Error: ${err.message}`);
  }
};

handler.help = ["saucenao", "nao"].map((v) => v + " <reply/caption>");
handler.tags = ["anime"];
handler.command = /^(saucenao|nao)$/i;
handler.limit = true;
export default handler;