import {
   join,
   dirname
} from 'path';
import {
   createRequire
} from "module";
import {
   fileURLToPath
} from 'url';
import {
   setupMaster,
   fork
} from 'cluster';
import {
   watchFile,
   unwatchFile
} from 'fs';
import cfonts from 'cfonts';
import {
   createInterface
} from 'readline';
import yargs from 'yargs';
import fetch from 'node-fetch'; // Ensure node-fetch is installed
import {
   ipListUrl,
   myIpUrl,
   githubLink
} from './lib/link.js';
import fs from 'fs';
import terminalImage from 'terminal-image';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const {
   name,
   author
} = require(join(__dirname, './package.json'));
const {
   say
} = cfonts;
const rl = createInterface(process.stdin, process.stdout);

async function displayImage() {
   try {
      const imagePath = join(__dirname, 'media', 'image1.jpg'); // Path ke gambar
      const image = await terminalImage.file(imagePath);
      console.log(image);
   } catch (error) {
      console.error('Error displaying image:', error);
   }
}

async function start(file) {
   if (isRunning) return;
   isRunning = true;

   try {
      let args = [join(__dirname, file), ...process.argv.slice(2)];
      say([process.argv[0], ...args].join(' '), {
         font: 'console',
         align: 'center',
         colors: ['magenta']
      });
      say('🌏 MEMUAT SOURCE...', {
         font: 'console',
         align: 'center',
         colors: ['blue']
      });
      say('📁 MEMUAT PLUGINS...', {
         font: 'console',
         align: 'center',
         colors: ['blue']
      });
      say('🟢 DONE !', {
         font: 'console',
         align: 'center',
         colors: ['white']
      });

      setupMaster({
         exec: args[0],
         args: args.slice(1),
      });

      let p = fork();
      p.on('message', data => {
         console.log('[RECEIVED]', data);
         switch (data) {
            case 'reset':
               p.process.kill();
               isRunning = false;
               start.apply(this, arguments);
               break;
            case 'uptime':
               p.send(process.uptime());
               break;
         }
      });

      p.on('exit', (_, code) => {
         isRunning = false;
         if (code == 'SIGKILL' || code == 'SIGABRT') return start(file);
         console.error('[❗] Exited with code:', code);
         if (code === 0) return;
         watchFile(args[0], () => {
            unwatchFile(args[0]);
            start(file);
         });
      });

      let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
      if (!opts['test']) {
         if (!rl.listenerCount()) rl.on('line', line => {
            p.emit('message', line.trim());
         });
      }
   } catch (error) {
      console.error('Error:', error);
      isRunning = false;
   }
}

var isRunning = false;
displayImage().then(() => {
   start('main.js');
});
