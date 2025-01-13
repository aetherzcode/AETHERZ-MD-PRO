process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
process.env['NODE_NO_WARNINGS'] = '1';
process.on("uncaughtException", console.error);
import "./config.js";
import chalk from "chalk";
import yargs from "yargs";
import lodash from "lodash";
import {
   format
} from "util";
import path, {
   join
} from "path";
import {
   platform
} from "process";
import {
   spawn
} from "child_process";
import {
   Low,
   JSONFile
} from "lowdb";
import syntaxerror from "syntax-error";
import {
   createRequire
} from "module";
import {
   createInterface
} from "readline";
import {
   fileURLToPath,
   pathToFileURL
} from "url";
import pkg from "@whiskeysockets/baileys";
const { PHONENUMBER_MCC } = pkg;
import {
   watch,
   readdirSync,
   readFileSync,
   existsSync
} from "fs";
import fetch from 'node-fetch';
import {
   ipListUrl,
   myIpUrl,
   githubLink
} from "./lib/link.js";
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
   return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString()
};
global.__dirname = function dirname(pathURL) {
   return path.dirname(global.__filename(pathURL, true))
};
global.__require = function require(dir = import.meta.url) {
   return createRequire(dir)
};
global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]} : {})})) : '');

// Importe utilitas dan modifikasi lainnya
import {
   protoType,
   serialize
} from "./lib/simple.js";
protoType();
serialize();
import Connection from "./lib/connection.js";
import {
   restoreSession
} from "./lib/jadibot.js";
import {
   mongoDB,
   mongoDBV2
} from "./lib/mongoDB.js";
const rl = createInterface(process.stdin, process.stdout);
const question = (query) => new Promise((resolve) => rl.question(query, resolve));
const __dirname = global.__dirname(import.meta.url);
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
global.prefix = new RegExp('^[' + (opts['prefix'] || '‎\/!#.\\').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');

global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : /mongodb(\+srv)?:\/\//i.test(opts['db']) ? (opts['mongodbv2'] ? new mongoDBV2(opts['db']) : new mongoDB(opts['db'])) : new JSONFile(`${opts._[0] ? opts._[0] + '_': ''}database.json`));

global.loadDatabase = async function loadDatabase() {
   if (global.db.READ) return new Promise((resolve) => setInterval(async () => {
      if (!global.db.READ) {
         clearInterval(this)
         resolve(global.db.data == null ? loadDatabase() : global.db.data)
      }
   }, 1 * 1000));
   if (global.db.data !== null) return loadDatabase();
   global.db.READ = true;
   await global.db.read().catch(console.error);
   global.db.READ = null
   global.db.data = {
      users: {},
      chats: {},
      stats: {},
      msgs: {},
      sticker: {},
      settings: {},
      ...(global.db.data || {})
   };
   global.db.chain = lodash.chain(global.db.data);
};
loadDatabase();
Connection.opts.usePairingCode = opts["pairing"] || opts["usePairingCode"];
const conn = Object.defineProperty(Connection, "conn", {
   value: await Connection.start(null, Connection.opts),
   writable: true,
   enumerable: true,
   configurable: true
}).conn;
// restore session
await restoreSession(conn);

if (Connection.opts.usePairingCode && !conn?.authState?.creds?.me) {
   try {
      let number = await question(chalk.bgBlack(chalk.greenBright(`Silahkan masukan Nomor WhatsApp Anda :\n> `))) || '';
      if (number.startsWith('0')) number = '62' + number.slice(1); // @ts-ignore
      if (!Object.keys(PHONENUMBER_MCC).some(v => String(number).startsWith(v))) {
         console.log(chalk.bgBlack(chalk.redBright("Mulailah dengan kode WhatsApp negara Anda, Contoh: 62xxx")));
         number = await question(chalk.bgBlack(chalk.greenBright(`Silahkan masukan Nomor WhatsApp Anda :\n> `)));
         number = number.replace(/[^0-9]/g, '');
      };
      if (!number) throw new Error('Nomor WhatsApp tidak boleh kosong');
      if (number.length < 10) throw new Error('Nomor WhatsApp tidak valid');
      if (number.length > 15) throw new Error('Nomor WhatsApp tidak valid');
      console.log("Nomor WhatsApp Anda adalah:", chalk.bgBlack(chalk.greenBright(number)));
      const code = await conn.requestPairingCode(number);
      console.log("Kode Pairing Anda adalah:", chalk.bgBlack(chalk.greenBright(parse(code))));
   } catch (e) {
      console.error(e);
   };
};

function parse(code) {
   return code?.match(/.{1,4}/g)?.join?.("-");
};

if (!opts['test']) {
   setInterval(async () => {
      if (global.db.data) await global.db.write().catch(console.error)
   }, 60 * 1000)
};

if (opts['server'])(await import('./server.js')).default(conn, PORT);

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'));
const pluginFilter = filename => /\.js$/.test(filename);
global.plugins = {};

async function filesInit() {
   for (let filename of readdirSync(pluginFolder).filter(pluginFilter)) {
      try {
         const file = global.__filename(join(pluginFolder, filename));
         const module = await import(file + "?id=" + Date.now());
         global.plugins[filename] = module.default || module
      } catch (e) {
         const err = syntaxerror(readFileSync(join(pluginFolder, filename)), filename, {
            sourceType: 'module',
            allowAwaitOutsideFunction: true
         });
         if (err)(conn?.logger ?? console).error({
            file: join(pluginFolder, filename),
            line: err.line,
            column: err.column,
            message: err.message,
            stack: err.toString()
         });
         delete global.plugins[filename];
      };
   };
};

await filesInit().then(_ => console.log(Object.keys(global.plugins)));

global.reload = async (_ev, filename) => {
   if (pluginFilter(filename)) {
      let dir = global.__filename(join(pluginFolder, filename), true);
      if (filename in global.plugins) {
         if (existsSync(dir))(conn?.logger ?? console).info(`re - require plugin '${filename}'`);
         else {
            (conn?.logger ?? console).warn(`deleted plugin '${filename}'`);
            return delete global.plugins[filename];
         };
      } else(conn?.logger ?? console).info(`requiring new plugin '${filename}'`);
      let err = syntaxerror(readFileSync(dir), filename, {
         sourceType: 'module',
         allowAwaitOutsideFunction: true
      });
      if (err)(conn?.logger ?? console).error(`syntax error while loading '${filename}'\n${format(err)}`);
      else try {
         const module = await import(`${global.__filename(dir)}?update=${Date.now()}`);
         global.plugins[filename] = module.default || module;
      } catch (e) {
         (conn?.logger ?? console).error(`error require plugin '${filename}\n${format(e)}'`);
      } finally {
         global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)));
      };
   };
};
Object.freeze(global.reload);
watch(pluginFolder, global.reload);

async function _quickTest() {
   let test = await Promise.all([
      spawn('ffmpeg'),
      spawn('ffprobe'),
      spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
      spawn('convert'),
      spawn('magick'),
      spawn('gm'),
      spawn('find', ['--version'])
   ].map(p => {
      return Promise.race([
         new Promise(resolve => {
            p.on('close', code => {
               resolve(code !== 127);
            });
         }),
         new Promise(resolve => {
            p.on('error', _ => resolve(false));
         })
      ]);
   }));

   let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
   console.log(test);
   let s = global.support = {
      ffmpeg,
      ffprobe,
      ffmpegWebp,
      convert,
      magick,
      gm,
      find
   };

   Object.freeze(global.support)

   if (!s.ffmpeg)(conn?.logger ?? console).warn('Please install ffmpeg for sending videos (pkg install ffmpeg)');
   if (s.ffmpeg && !s.ffmpegWebp)(conn?.logger ?? console).warn('Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)');
   if (!s.convert && !s.magick && !s.gm)(conn?.logger ?? console).warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)');
};

_quickTest().then(() => (conn?.logger ?? console).info('☑️ Quick Test Done')).catch(console.error);