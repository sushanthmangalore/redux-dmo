FROM node:8-alpine
ADD . //
ENTRYPOINT ["npm", "start"]
