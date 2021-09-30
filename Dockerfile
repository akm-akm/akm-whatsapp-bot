FROM node:16.10.0
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["npm", "run", "docker"]
EXPOSE 5000