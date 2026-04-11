ssh root@10.0.0.102 << 'EOF'
  cd /var/www/nuxt-app
  pm2 restart nuxt-app || HOST=0.0.0.0 PORT=80 pm2 start .output/server/index.mjs --name nuxt-app
EOF