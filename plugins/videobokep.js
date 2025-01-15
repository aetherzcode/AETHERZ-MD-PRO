let handler = async (m, { conn, usedPrefix, command }) => {
  let who = m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
      ? conn.user.jid
      : m.sender;

  let name = conn.getName(who);

  if (!vbokep || vbokep.length === 0) {
    return conn.reply(m.chat, "Maaf, saat ini tidak ada video yang tersedia.", m);
  }

  const randomVideo = pickRandom(vbokep);

  try {
    await conn.reply(m.chat, `Dosa tanggung sendiri ya *${name}*\n${randomVideo}`, m);
  } catch (err) {
    console.error(err);
    conn.reply(m.chat, "Terjadi kesalahan saat mencoba mengirim video.", m);
  }
};

handler.help = ['vidiobokep'];
handler.tags = ['menuprem'];
handler.command = /^(vbokep|vidiobokep|bokep)$/i;

handler.premium = true;
handler.limit = false;
handler.fail = null;
handler.register = false;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

const vbokep = [
  "https://videy.co/v?id=IgUkEaNC",
  "https://videy.co/v?id=xqXupicv",
  "https://videy.co/v?id=GDt6z7iX",
  "https://videy.co/v?id=JyLiUq2t",
  "https://videy.co/v?id=1jqvRc2R",
  "https://videy.co/v?id=7vcYfjaZ",
  "https://videy.co/v?id=EpD3YoB1",
  "https://videy.co/v?id=J4r8BFDR",
  "https://videy.co/v?id=fCOumEXd",
  "https://videy.co/v?id=q8vAz8Lv",
  "https://videy.co/v?id=hT7sLcCi",
  "https://videy.co/v?id=pDRiNxNl",
  "https://videy.co/v?id=RfZd5bOo",
  "https://videy.co/v?id=BWalhVPO",
  "https://videy.co/v?id=mD960mZH",
  "https://videy.co/v?id=fA2e9grW",
  "https://videy.co/v?id=KIly9fB2",
  "https://videy.co/v?id=n2GxTlcD",
  "https://videy.co/v?id=VQBNre30",
  "https://videy.co/v?id=BTJUch6D",
  "https://videy.co/v?id=kxPiXWL0",
  "https://videy.co/v?id=oqdoL1WB",
  "https://videy.co/v?id=xfNdpp9K",
  "https://videy.co/v?id=0Km5xs1g",
  "https://videy.co/v?id=NQ8EOxk0",
  "https://videy.co/v?id=NUDNeGlw",
  "https://videy.co/v?id=GrGFuAoI",
  "https://videy.co/v?id=0bXvq7II",
  "https://videy.co/v?id=qBVtWktq",
  "https://videy.co/v?id=16gpSQzQ",
  "https://videy.co/v?id=SwvFhPLb",
  "https://videy.co/v?id=IxI6Zsxs",
  "https://videy.co/v?id=wnApN5h5",
  "https://videy.co/v?id=NTctS4bg1",
  "https://videy.co/v?id=fzrfdxz11",
  "https://videy.co/v?id=OOFUnpw11",
  "https://videy.co/v?id=O6PSsNOZ1",
  "https://videy.co/v?id=Od5LIWRQ1",
  "https://videy.co/v?id=Hb4NHkZh1",
  "https://videy.co/v?id=GurDqFiU1",
  "https://videy.co/v?id=x5mYQbWi1",
  "https://videy.co/v?id=J4GYsMOs1",
  "https://videy.co/v?id=4261H5e41",
  "https://videy.co/v?id=CkzfrQGr1",
  "https://videy.co/v?id=uuhojsne1",
  "https://pidey.co/v?go=f71930a1",
  "https://pidey.co/v?go=41d5737d",
  "https://pidey.co/v?go=ed01bafd",
  "https://pidey.co/v?go=e34fb9bd",
  "https://pidey.co/v?go=19966194",
  "https://pidey.co/v?go=f64856a9",
  "https://pidey.co/v?go=21dac12c",
  "https://pidey.co/v?go=0f43b1fb",
  "https://pidey.co/v?go=138bdd72",
  "https://pidey.co/v?go=0119daf2",
  "https://pidey.co/v?go=fb9a2585",
  "https://pidey.co/v?go=8fb27c11",
  "https://pidey.co/v?go=2cd09b6a",
  "https://pidey.co/v?go=8e51eb5d",
  "https://pidey.co/v?go=daff7082",
];