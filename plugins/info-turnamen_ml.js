import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { conn, usedPrefix, command }) => {
    const tournaments = await latestTourMobileLegends();

    if (typeof tournaments === "string") {
        return conn.reply(m.chat, tournaments, m);
    }

    if (tournaments.length === 0) {
        return m.reply("Tidak ada turnamen untuk saat ini")
    }

    const messages = tournaments.map((tournament, index) => {
        return `   ◦ Title : ${tournament.title}\n` +
            `   ◦ Link : ${tournament.url}\n` +
            `   ◦ Start date : ${tournament.startDateText}\n` +
            `   ◦ Description : ${tournament.description}\n`;
    }).join("\n\n");

    m.reply("*乂 M L B B - T O U R N A M E N T*\n\n" + messages)
};

handler.help = ["turnamenml *get latest mlbb tournament*"];
handler.tags = ["info", "Internet"];
handler.command = ["turnamenml"];

export default handler;;

async function latestTourMobileLegends() {
    try {
        const { data } = await axios.get('https://infotourney.com/tournament/mobile-legends');
        const $ = cheerio.load(data);
        const tournaments = [];

        $('.items-row .item').each((index, element) => {
            const title = $(element).find('h2 a').text();
            const url = "https://infotourney.com" + $(element).find('h2 a').attr('href');
            const image = "https://infotourney.com" + $(element).find('img').attr('src');
            const startDate = $(element).find('.published time').attr('datetime');
            const startDateText = $(element).find('.published').text().trim();
            const registrationEndDateText = $(element).find('p').last().text().trim();
            const description = $(element).find('p').eq(1).text().trim();
            
            const tags = [];
            $(element).find('.tags a').each((i, tagElement) => {
                tags.push($(tagElement).text());
            });

            tournaments.push({
                title,
                url,
                image,
                startDate,
                startDateText,
                registrationEndDateText,
                description,
                tags
            });
        });

        return tournaments
    } catch (error) {
        return error.message;
    }
}