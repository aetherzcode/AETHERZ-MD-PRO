import fetch from "node-fetch";
import axios from "axios";

let handler = async (m, { conn, text }) => {
  // Periksa apakah ada query yang diberikan
  if (!text) {
    return conn.reply(m.chat, "Silakan masukkan nama hero.", m);
  }

  const options = {
    method: 'GET',
    url: `https://samirxpikachu.onrender.com/mobile-legends/hero/${text}`
  };

  try {
    const { data } = await axios.request(options);
    if (data) {
      const { hero_img, desc, release, role, specialty, lane, price, gameplay_info, story_info_list, attributes } = data;

      // Menyusun deskripsi hero
      let response = `
*Hero Info: ${text}*
- Description: ${desc || "No description available"}
- Release: ${release}
- Role: ${role}
- Specialty: ${specialty}
- Lane: ${lane}
- Price: ${price}

*Gameplay Info:*
- Durability: ${gameplay_info.durability}
- Offense: ${gameplay_info.offense}
- Control Effect: ${gameplay_info.control_effect}
- Difficulty: ${gameplay_info.difficulty}

*Story Info:*
${Object.entries(story_info_list).map(([key, value]) => `- ${key}: ${value}`).join("\n")}

*Attributes:*
${attributes.map(attr => `- ${attr.attribute}: Level 1: ${attr.level_1}, Level 15: ${attr.level_15}, Growth: ${attr.growth}`).join("\n")}
      `;

      // Mengirim gambar hero dengan deskripsi sebagai caption
      await conn.sendFile(m.chat, hero_img, 'hero.jpg', response, m);
    } else {
      await conn.reply(m.chat, "Hero tidak ditemukan.", m);
    }
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, "Terjadi kesalahan saat mengambil data hero.", m);
  }
};

handler.help = ['heroml'];
handler.tags = ['internet'];
handler.command = /^(heroml|infohero)$/i;
handler.limit = false;
handler.premium = true;

export default handler;