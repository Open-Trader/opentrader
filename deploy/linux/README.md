OpenTrader Linux Deployment (systemd + Nginx)

This guide sets up OpenTrader as a Linux service and exposes it securely via Nginx with TLS. The app listens on port 9966 and is reachable on your home network.

Prerequisites
- Linux host with sudo
- Node.js 22.x on the host (required by OpenTrader). Recommended: nvm
- Nginx installed (for TLS/domain)

1) Install Node 22 and OpenTrader
- Install nvm and Node 22:
  - curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  - source ~/.nvm/nvm.sh
  - nvm install 22 && nvm use 22
- Install OpenTrader CLI globally:
  - npm install -g opentrader

2) Create a dedicated user and working dir
- sudo useradd -r -m -d /opt/opentrader opentrader || true
- sudo mkdir -p /opt/opentrader
- sudo chown -R opentrader:opentrader /opt/opentrader

3) Initialize configs and admin password
- Create configs in /opt/opentrader:
  - sudo cp -n /opt/opentrader/config.sample.json5 /opt/opentrader/config.json5 || true
  - sudo cp -n /opt/opentrader/exchanges.sample.json5 /opt/opentrader/exchanges.json5 || true
  - If samples aren’t present in /opt/opentrader, copy them from this repo root:
    - sudo cp config.sample.json5 /opt/opentrader/config.json5
    - sudo cp exchanges.sample.json5 /opt/opentrader/exchanges.json5
- Set the admin password (runs as the opentrader user):
  - sudo -u opentrader opentrader set-password <your_strong_password>

4) Install the systemd unit
- Copy the unit file:
  - sudo cp deploy/linux/opentrader.service /etc/systemd/system/opentrader.service
- Reload and start:
  - sudo systemctl daemon-reload
  - sudo systemctl enable --now opentrader
- Check status/logs:
  - systemctl status opentrader
  - journalctl -u opentrader -f

By default, the service listens on 0.0.0.0:9966 so it’s available on your LAN.

5) Nginx reverse proxy with TLS (optional, for domain)
- Replace example.com with your domain in deploy/linux/nginx/opentrader.conf and copy it:
  - sudo cp deploy/linux/nginx/opentrader.conf /etc/nginx/sites-available/opentrader.conf
  - sudo ln -s /etc/nginx/sites-available/opentrader.conf /etc/nginx/sites-enabled/opentrader.conf
- Test and reload Nginx:
  - sudo nginx -t && sudo systemctl reload nginx
- Obtain Let’s Encrypt certificates (certbot example):
  - sudo apt-get update && sudo apt-get install -y certbot python3-certbot-nginx
  - sudo certbot --nginx -d example.com -d www.example.com

6) Firewall
- For LAN access without Nginx, open 9966/tcp:
  - sudo ufw allow 9966/tcp
- If using Nginx + TLS, allow 80,443:
  - sudo ufw allow 80/tcp
  - sudo ufw allow 443/tcp

Service management
- Start:    sudo systemctl start opentrader
- Stop:     sudo systemctl stop opentrader
- Restart:  sudo systemctl restart opentrader

Notes
- Configure exchanges in /opt/opentrader/exchanges.json5 (created from exchanges.sample.json5)
- Configure strategy in /opt/opentrader/config.json5 (created from config.sample.json5)
- To change port/host, edit ExecStart in the unit to pass --host and --port or run `opentrader up --host 0.0.0.0 --port 9966` manually.

