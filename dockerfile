FROM node:20-alpine

WORKDIR /app

# Copiar solo dependencias
COPY package*.json ./

# Instalar dependencias dentro del contenedor
RUN npm install

# Copiar el resto del proyecto
COPY . .

EXPOSE 8080

CMD ["npm", "start"]
