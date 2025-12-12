# Imagen base
FROM node:20-alpine

# Crear directorio de la app
WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 8080

# Variable de entorno
ENV PORT=8080

# Comando de inicio
CMD ["npm", "start"]