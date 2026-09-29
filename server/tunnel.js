import { startTunnel } from 'untun';

async function launch() {
  try {
    const tunnel = await startTunnel({
      port: 5000,
      acceptCloudflareNotice: true
    });
    const url = await tunnel.getURL();
    console.log('CLOUDFLARE_PUBLIC_URL=' + url);
  } catch (err) {
    console.error('Tunnel error:', err.message);
  }
}

launch();
