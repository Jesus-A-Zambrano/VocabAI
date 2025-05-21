# Use an official Node.js runtime as a parent image
FROM node:20-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript
RUN npm run build # Assuming you have a build script for TypeScript compilation

# Expose the port the app runs on
EXPOSE 3000

# Run the development script
CMD ["npm", "run", "dev"]
