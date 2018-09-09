FROM xiewulong/node:latest

RUN yum -y install gcc gcc-c++ make \
                   bzip2 \
                   cairo cairo-devel cairomm-devel giflib-devel libjpeg-turbo-devel pango pango-devel pangomm pangomm-devel \
    && yum clean all \
    \
    && /usr/local/node/bin/npm i -g --registry=https://registry.npm.taobao.org cnpm npm@latest \
    && ln -sf /usr/local/node/bin/cnpm /usr/local/bin/cnpm \
    && ln -sf /usr/local/node/bin/npx /usr/local/bin/npx

VOLUME ["/app/log"]

ENTRYPOINT []

ENV APP_PORT 80
EXPOSE 80
CMD ["/usr/local/node/bin/npm", "run", "app"]

WORKDIR /app
ADD . .
RUN /usr/local/node/bin/cnpm i \
    && /usr/local/node/bin/npm run build
