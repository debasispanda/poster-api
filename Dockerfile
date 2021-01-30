FROM node:lts-alpine

WORKDIR /home/poster

COPY ./package*.json ./
COPY scripts/ ./scripts/
COPY src/ ./src/

RUN npm ci

CMD ["npm", "run", "start"]
