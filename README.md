# Entrega N°1 - Mocks y Mocking

## Router base

El router de mocks se encuentra montado bajo la ruta base:

- `/api/mocks`

---

## Endpoints

### GET `/api/mocks/mockingpets`

Genera y devuelve una lista de mascotas de prueba **en memoria** (no se insertan en la base de datos).

**Query params opcionales:**

- `quantity` (number): cantidad de mascotas a generar.  
  - Por defecto: `100`
  - Máximo: `1000`

**Ejemplo:**

```http
GET http://localhost:8080/api/mocks/mockingpets?quantity=20
```

**Respuesta:**

```json
{
  "status": "success",
  "payload": [
    {
      "name": "Pet12345",
      "specie": "dog",
      "adopted": false
    },
    ...
  ]
}
```

---

### GET `/api/mocks/mockingusers`

Utiliza un módulo de mocking para generar usuarios de prueba con formato similar a un documento de Mongo.

**Características de los usuarios generados:**

- `password`: contiene la contraseña `"coder123"` **encriptada**.
- `role`: puede ser `"user"` o `"admin"`.
- `pets`: array vacío `[]`.
- Incluye un `_id` generado con `mongoose.Types.ObjectId()` para simular el formato de Mongo.

**Query params opcionales:**

- `quantity` (number): cantidad de usuarios a generar.  
  - Por defecto: `50`
  - Máximo: `1000`

**Ejemplo:**

```http
GET http://localhost:8080/api/mocks/mockingusers?quantity=50
```

**Respuesta:**

```json
{
  "status": "success",
  "payload": [
    {
      "_id": "66f0c9f1f2c2d91234567890",
      "first_name": "User12345",
      "last_name": "Test12345",
      "email": "user12345@test.com",
      "password": "$2b$10$...",
      "role": "user",
      "pets": []
    },
    ...
  ]
}
```

---

### POST `/api/mocks/generateData`

Genera e **inserta en la base de datos** usuarios y mascotas de prueba.

**Body (JSON):**

- `users` (number): cantidad de usuarios mock a generar e insertar.
- `pets` (number): cantidad de mascotas mock a generar e insertar.

**Reglas:**

- Ambos valores deben ser números **positivos**.
- Máximo `1000` usuarios y `1000` mascotas por petición.

**Ejemplo:**

```http
POST http://localhost:8080/api/mocks/generateData
Content-Type: application/json

{
  "users": 5,
  "pets": 10
}
```

**Respuesta:**

```json
{
  "status": "success",
  "message": "Mock data generada e insertada correctamente",
  "payload": {
    "usersInserted": 5,
    "petsInserted": 10
  }
}
```

---

## Verificación de la inserción

Para comprobar los registros generados por `/api/mocks/generateData`, se utilizan los endpoints GET ya existentes:

- `GET /api/users` → debe incluir los usuarios generados.
- `GET /api/pets` → debe incluir las mascotas generadas.

---

## Criterios cumplidos

1. **Creación del router de mocks y migración de endpoints**  
   - Router `mocks.router.js` bajo `/api/mocks`.  
   - Endpoint `/mockingpets` dentro de este router.

2. **Módulo de mocking de usuarios**  
   - Generación de usuarios con contraseña encriptada, rol `"user"`/`"admin"` y `pets: []`.

3. **Endpoint GET `/mockingusers`**  
   - Utiliza el módulo de mocking para devolver la cantidad de usuarios solicitados.

4. **Endpoint POST `/generateData`**  
   - Recibe `users` y `pets`, genera los registros e inserta en la base.  
   - La inserción se comprueba con los GET de `users` y `pets`.
