FROM node:16-slim

# Install app dependencies.
COPY package.json /src/package.json
WORKDIR /src
RUN npm install

# Bundle app source.
COPY *.js /src/
COPY *.json /src/


CMD ["npm", "start"]