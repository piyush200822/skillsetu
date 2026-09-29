import { startTunnel } from 'untun';

async function main() {
  console.log('====================================================');
  console.log('  SkillSetu (AYUSH SkillBridge) - Public Tunnel');
  console.log('  Connecting to Cloudflare Quick Tunnel...');
  console.log('====================================================');

  try {
    const tunnel = await startTunnel({ port: 5000 });
    const url = await tunnel.getURL();
    console.log('\n====================================================');
    console.log(`  PUBLIC LIVE LINK: ${url}`);
    console.log('====================================================\n');
  } catch (err) {
    console.error('Failed to start tunnel:', err.message);
  }
}

main();
