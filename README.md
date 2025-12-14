# 📦 EntregaMartin – Backend III

Proyecto backend desarrollado con **Node.js, Express y MongoDB**, correspondiente a la **entrega final del curso Backend III**. Incluye manejo de usuarios, mascotas, adopciones, autenticación, mocks de datos y **dockerización completa** del entorno.

---

## 🚀 Tecnologías utilizadas

* Node.js
* Express
* MongoDB + Mongoose
* JWT & Cookies
* bcrypt
* Faker (mocking)
* Docker & Docker Compose
* dotenv

---

## 📂 Estructura del proyecto

```
src/
 ├── app.js
 ├── config/
 ├── dao/
 ├── mocks/
 ├── routes/
 ├── services/
 └── utils/
```

---

## ⚙️ Variables de entorno

El proyecto utiliza variables de entorno para proteger datos sensibles.

### `.env.example`

```env
MONGO_URL=TU_MONGO_URL_AQUI
PORT=8080
```

⚠️ **El archivo `.env` real no se sube al repositorio**.

---

## 🧪 Endpoints principales

### 🔹 Usuarios

* `GET /api/users`
* `POST /api/users`

### 🔹 Mascotas

* `GET /api/pets`
* `POST /api/pets`

### 🔹 Adopciones

* `POST /api/adoptions`

### 🔹 Mocks

* `GET /api/mocks/mockingusers` → genera 50 usuarios mock
* `GET /api/mocks/mockingpets` → genera mascotas mock
* `POST /api/mocks/generateData` → genera e inserta usuarios y mascotas reales en la DB

Body de ejemplo:

```json
{
  "users": 10,
  "pets": 5
}
```

---

## 🐳 Docker

El proyecto está completamente dockerizado para facilitar su ejecución.

### 📄 Dockerfile

```Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
```

### 📄 docker-compose.yml

```yaml
version: "3.9"

services:
  backend:
    build: .
    ports:
      - "8080:8080"
    environment:
      - MONGO_URL=${MONGO_URL}
    depends_on:
      - mongo

  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

### 📄 .dockerignore

```
node_modules
.env
.git
```

---

## ▶️ Cómo ejecutar el proyecto

### Opción 1: Docker (recomendado)

```bash
docker compose up --build
```

La API quedará disponible en:

```
http://localhost:8080
```

---

---

## 👨‍💻 Autor

**Juan Martín**
Entrega final – Backend III
