FROM nginx:1.25-alpine

# Копируем конфигурацию
COPY nginx.conf /etc/nginx/nginx.conf

# SSL сертификаты будут смонтированы через volume или добавлены в образ
# Для продакшена рекомендуется использовать Let's Encrypt или свои сертификаты

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
