FROM node:18

EXPOSE 8080
WORKDIR /src/app

COPY . . 
RUN npm install --production
RUN npm run build
CMD ["npm", "run"]