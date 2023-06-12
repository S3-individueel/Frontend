# Base image
FROM node:alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the entire project
COPY . .

# Build the React app
RUN npm run build

# Serve the app with a static server
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Expose the port your app will run on (if necessary)
EXPOSE 3000
