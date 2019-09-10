FROM balenalib/raspberrypi3-alpine-node
RUN install_packages nginx
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY dist/ui/* /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]
