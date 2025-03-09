# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files
COPY . .

# Expose Expo port
EXPOSE 8081

# Start Expo
CMD ["npx", "expo", "start", "--web"]
