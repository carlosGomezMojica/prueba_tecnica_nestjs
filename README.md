# prueba_tecnica_nestjs

> [!IMPORTANT]
> Desarrolle 2 entornos, el primero ApiPrueba esta desarrollado todo en nestjs con todas las especificaciones a exepción de la implementación de nats.
> La segunda nest-microservices-mimms cuenta con la implementación de un servidor nats montado en docker, si gustan pueden revisar hasta que parte de la implementación me quede de terminar.

## ApiPrueba

### Instalación

> [!IMPORTANT]
> Tener instalado docker

1. Moverse a la carpeta ApiPrueba sobre el archivo docker-compose.yml

2. Construir los contenedores sin guardar en cache

```bash
docker-compose build --no-cache
```

3. Levantar los contenedores

```bash
docker-compose up -b
```

## nest-microservices-mimms

### Instalación

> [!IMPORTANT]
> Tener instalado docker

1. Moverse a la carpeta ApiPrueba sobre el archivo docker-compose.yml

2. Construir los contenedores sin guardar en cache

```bash
docker-compose build --no-cache
```

3. Levantar los contenedores

```bash
docker-compose up -b
```
