import fs from 'fs';
import fetch from 'node-fetch';
import moment from 'moment-timezone';

// Use moment-timezone to get the current time in your desired timezone
let waktu = moment().tz('Asia/Jakarta');

var tampilTanggal = waktu.format('dddd DD MMMM YYYY');
var tampilWaktu = `Jam : ${waktu.format('HH:mm:ss')}`;
var tampilHari = '';

if (waktu.hours() >= 0 && waktu.hours() < 3) {
  tampilHari = 'Malam';
} else if (waktu.hours() < 12) {
  tampilHari = 'Pagi';
} else if (waktu.hours() < 18) {
  tampilHari = 'Siang';
} else {
  tampilHari = 'Sore';
}

let handler = async (m, { conn, usedPrefix: _p, args, command, text }) => {
  let who;
  if (m.isGroup) who = m.mentionedJid0 ? m.mentionedJid0 : m.quoted ? m.quoted.sender : text;
  else who = m.chat;
  if (!who) throw 'Reply pesannya';
  m.reply(`TRANSAKSI PENDING\n\nTANGGAL : ${tampilTanggal}\nJAM : ${tampilWaktu} WIB\nSTATUS : Pending\n\nPesanan @${m.quoted.sender.split('@')[0]} sedang diproses!`);
};

handler.help = 'proses <reply cht nya>';
handler.tags = 'store';
handler.customPrefix = /^(proses)$/i;
handler.group = false;
handler.admin = false;
handler.owner = true;
handler.command = new RegExp();

export default handler;