# Use official Node image
FROM node:18

# Set working directory
WORKDIR /app

# Install only production dependencies first
COPY package*.json ./
RUN npm install

# Copy rest of the app code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose backend port
EXPOSE 5000

# Start the backend
CMD ["npm", "run", "dev"]
