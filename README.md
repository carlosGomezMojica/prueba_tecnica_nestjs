# prueba_tecnica_nestjs

> [!IMPORTANT]  
> Se desarrollaron dos entornos.
>
> - **ApiPrueba:** Implementado completamente en **NestJS**, con todas las especificaciones excepto la integración con **NATS**.
> - **nest-microservices-mimms:** Incluye la implementación de un **servidor NATS** montado en **Docker**. Si desean revisarlo, pueden verificar hasta qué punto avancé en la implementación.

---

## ApiPrueba

### Instalación

> [!IMPORTANT]  
> Se requiere tener **Docker** instalado.

1. Navegar hasta la carpeta **ApiPrueba**, donde se encuentra el archivo `docker-compose.yml`.
2. Construir los contenedores sin utilizar la caché:

```bash
docker-compose build --no-cache
```

3. Levantar los contenedores:

```bash
docker-compose up -d
```

---

### Documentación

📌 **Swagger:** [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

---

## nest-microservices-mimms

### Instalación

> [!IMPORTANT]  
> Se requiere tener **Docker** instalado.

1. Navegar hasta la carpeta **nest-microservices-mimms**, donde se encuentra el archivo `docker-compose.yml`.
2. Construir los contenedores sin utilizar la caché:

```bash
docker-compose build --no-cache
```

3. Levantar los contenedores:

```bash
docker-compose up -d
```

---

### Documentación

📌 **Swagger:** [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

---

## Objetivos cumplidos de la prueba

### 1️⃣ Microservicio de Usuarios

- [x] Creación de usuario (nombre, email, contraseña hasheada).
- [x] Autenticación con **JWT**.
- [x] Endpoint para obtener la información del usuario autenticado.

### 2️⃣ Microservicio de Pedidos

- [x] Creación de pedidos (asociados a un usuario).
- [x] Listado de pedidos de un usuario.
- [x] Actualización del estado de un pedido (**Pendiente**, **En proceso**, **Completado**).

### 3️⃣ Requerimientos Técnicos

- [x] **NestJS:** Utilización del framework para la implementación de los microservicios.
- [x] **Base de Datos:** Uso de **PostgreSQL** con **Prisma**.
- [x] **Mensajería:** Comunicación entre microservicios con **NATS, RabbitMQ o Kafka**.
- [x] **Docker:** Configuración del proyecto para su despliegue en contenedores.
- [x] **Testing:** Implementación de pruebas unitarias con **Jest** (mínimo un test por servicio).
- [x] **Documentación:** Generación de documentación con **Swagger** o una alternativa similar.
- [x] **Buenas prácticas:** Aplicación de los principios **SOLID**, separación de responsabilidades y uso adecuado de **DTOs**.

---

> [!IMPORTANT]  
> La implementación de la **mensajería** es la única parte de la prueba técnica que quedó **incompleta** por falta de tiempo.
