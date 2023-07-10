FROM nginx:1.17.8-alpine
COPY ./build/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 8090
CMD ["nginx", "-g", "daemon off;"]

RUN echo "FINALIZADO"