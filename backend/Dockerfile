# Use Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy all files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["node", "index.js"]
