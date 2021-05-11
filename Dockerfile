FROM node:14.15.1
WORKDIR /app
COPY ./ /app
RUN npm ci

EXPOSE 3000
EXPOSE 8000
EXPOSE 80

CMD [ "npm", "start" ]
