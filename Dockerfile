FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Ensure the database file exists or is created
RUN touch database.db

ENV NEXT_PUBLIC_BASE_URL=http://localhost:3000

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
