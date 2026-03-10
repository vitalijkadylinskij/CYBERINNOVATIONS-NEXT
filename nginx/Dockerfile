FROM nginx:1.29-trixie

COPY nginx.bootstrap.conf.template /opt/nginx-templates/nginx.bootstrap.conf.template
COPY nginx.full.conf.template /opt/nginx-templates/nginx.full.conf.template
COPY docker-entrypoint.sh /usr/local/bin/custom-nginx-entrypoint.sh

RUN chmod +x /usr/local/bin/custom-nginx-entrypoint.sh

EXPOSE 8080 8443

CMD ["/usr/local/bin/custom-nginx-entrypoint.sh"]
