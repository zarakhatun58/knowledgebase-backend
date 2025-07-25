# Use official Node image
FROM node:18

# Set working directory
WORKDIR /app

# Install only production dependencies first
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Generate Prisma client again (in case needed inside container)
RUN npx prisma generate

# Expose backend port
EXPOSE 5000

# Start the backend
CMD ["npm", "run", "dev"]
