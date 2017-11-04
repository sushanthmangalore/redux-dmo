FROM node:8-alpine
WORKDIR /home/shopapp
ADD . //
EXPOSE 9080
ENTRYPOINT ["npm", "start"]
