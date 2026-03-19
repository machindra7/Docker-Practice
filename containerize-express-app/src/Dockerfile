FROM node:22

WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json .

# install the dependencies
RUN npm install

# Copy the source code of our app
COPY index.js index.js

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]



