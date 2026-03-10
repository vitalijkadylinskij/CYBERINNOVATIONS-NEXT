#!/bin/sh
set -eu

: "${SITE_DOMAIN:?SITE_DOMAIN is required}"

CERT_DIR="/etc/letsencrypt/live/${SITE_DOMAIN}"
TARGET_DIR="/tmp/nginx"
TARGET_CONF="${TARGET_DIR}/nginx.conf"

mkdir -p \
  "${TARGET_DIR}" \
  "${TARGET_DIR}/client_temp" \
  "${TARGET_DIR}/proxy_temp" \
  "${TARGET_DIR}/fastcgi_temp" \
  "${TARGET_DIR}/uwsgi_temp" \
  "${TARGET_DIR}/scgi_temp"

if [ -r "${CERT_DIR}/fullchain.pem" ] && [ -r "${CERT_DIR}/privkey.pem" ]; then
  TEMPLATE="/opt/nginx-templates/nginx.full.conf.template"
  echo "Starting nginx in HTTPS mode for ${SITE_DOMAIN}"
else
  TEMPLATE="/opt/nginx-templates/nginx.bootstrap.conf.template"
  echo "Certificates for ${SITE_DOMAIN} not found. Starting bootstrap HTTP mode for certbot."
fi

export SITE_DOMAIN
envsubst '${SITE_DOMAIN}' < "${TEMPLATE}" > "${TARGET_CONF}"

exec nginx -c "${TARGET_CONF}" -g 'daemon off;'
