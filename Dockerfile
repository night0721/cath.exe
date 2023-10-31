FROM node:alpine

# Create app directory
WORKDIR /usr/bot/nyx

# Copy package.json and package-lock.json
COPY package*.json ./

# Install packages
RUN npm install

# Copy the app code
COPY . .

# Build the project
RUN npm run all

# Expose ports
# EXPOSE 8080

# Run the application
CMD [ "node", "index.js" ]
# not sure what to run index.js or bot.js