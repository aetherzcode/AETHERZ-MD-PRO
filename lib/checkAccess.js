import fetch from 'node-fetch';
import { ipListUrl, myIpUrl } from './link.js';

export async function checkUserAccess() {
  try {
    const ipList = await fetch(ipListUrl).then(res => res.json());
    const userIP = await fetch(myIpUrl).then(res => res.json());

    console.log(`User IP: ${userIP.ip}`);

    const accessInfo = ipList.find(entry => entry.Ip === userIP.ip);

    if (accessInfo && accessInfo.Access) {
      console.log(`Access granted for ${accessInfo.username} (IP: ${accessInfo.Ip})`);
    } else {
      console.log('Your IP is not authorized or access is not granted. Please request access.');
      process.exit(1);
    }
  } catch (error) {
    console.error('Error checking IP access:', error);
    process.exit(1);
  }
}
