FROM nginx:1.27.0

RUN apt-get update
RUN apt-get -y install vim
RUN apt-get -y install tree
RUN apt-get -y install git
# This file is located at /usr/share/nginx/html/index.html in the nginx Docker image.

COPY index.html /usr/share/nginx/html/index.html
