# Servicios - Store App

Listar productos, categorías, obtener total de paginas.

Tabla de contenido

* [Productos](#Productos)
  * [Listar productos](#Listar-productos)
  * [Obtener numero de páginas](#Obtener-numero-de-páginas)
* [Categorías](#Categorías)
  * [Listar Categorías](#Listar-categorías)

* [Configuración](#Configuración)
## Productos

### Listar productos

Los productos pueden llamarse mediante parámetros (page, categoryId, name).

#### Parámetros

**page** :  Numero entero representa a pagina solicitada acorde a numero de items por pagina
**categoryId** : Numero entero representa Id de la categoría.
**name** : Cadena de texto con el nombre del producto o palabra clave de búsqueda

#### Estructura JSON

Al realizar una petición HTTP, el servicio retornara un JSON con la siguiente estructura:

```json
{
    "data": [
        {
            "id": 8,
            "name": "PISCO ALTO DEL CARMEN 35º",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/alto8532.jpg",
            "price": 7990,
            "discount": 10
        }
    ],
    "meta": {
        "page": "1"
    }
}
```

* **data**,  Contiene un arreglo con los productos (array).
  * **id**,  identificador único del producto (int).
  * **name**,  nombre del producto (string).
  * **url_image**,   ruta de la imagen del producto (string).
  * **price**,  precio del producto (float).
  * **discount**,  descuento del producto (float).
* **meta**,  Contiene un arreglo con los metadatos (array).
  * **page**,  numero de pagina del listado de productos obtenidos (int).

#### GET lista de productos

* GET /products retornara todos los productos acorde al limite de paginado.

##### Parámetros

* **page** :  Permite filtrar por pagina acorde a numero de items por pagina. Por defecto su valor es 1
* **categoryId** : Permite filtrar por categoría
* **name** : Permite filtrar por nombre de producto

En el caso de necesitar filtro por **categoryId** el parámetro name no debe ser definido. Siempre que este definido el parámetro **name** el filtro se realiza por nombre de producto.

##### Ejemplos

* GET /products
* GET /products/?categoryId=1
* GET /products/?categoryId=2&page=2
* GET /products/?categoryId=2&page=2&name=pisco
    > *categoryId is ignored*
* GET /products/?page=2&name=pisco

#### Respuesta

```json
{
    "data": [
        {
            "id": 18,
            "name": "PISCO HORCON QUEMADO 46º",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/horcon469075.jpg",
            "price": 8990,
            "discount": 20
        },
        {
            "id": 19,
            "name": "PISCO MISTRAL 35º",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/mistral359200.jpg",
            "price": 4990,
            "discount": 20
        }
    ],
    "meta": {
        "page": "2"
    }
}
```

### Obtener numero de páginas

La cantidad de paginas puede obtenerse mediante parámetros (page, categoryId, name).

#### Parámetros

**categoryId** : Numero entero representa Id de la categoría.
**name** : Cadena de texto con el nombre del producto o palabra clave de búsqueda

#### Estructura JSON

Al realizar una petición HTTP, el servicio retornara un JSON con la siguiente estructura:

```json
{
    "data": [
        {
            "pages": "3"
        }
    ]
}
```

* **data**,  Contiene un arreglo con los productos (array).
  * **pages**,  número total de paginas (int).

#### GET Numero de páginas

* GET /products retornara número de páginas acorde al limite de paginado.

##### Parámetros

* **categoryId** : Permite filtrar por categoría
* **name** : Permite filtrar por nombre de producto

En el caso de necesitar filtro por **categoryId** el parámetro name no debe ser definido. Siempre que este definido el parámetro **name** el filtro se realiza por nombre de producto.

##### Ejemplos

* GET /products/getNumPages
* GET /products/getNumPages?categoryId=1
* GET /products/getNumPages?categoryId=2&page=2
* GET /products/getNumPages?categoryId=2&page=2&name=pisco
    > *categoryId is ignored*
* GET /products/getNumPages?page=2&name=pisco

#### Respuesta

```json
{
    "data": [
        {
            "pages": "3"
        }
    ]
}
```

## Categorías

## Listar categorías

#### Estructura JSON

Al realizar una petición HTTP, el servicio retornara un JSON con la siguiente estructura:

```json
{
    "data": [
        {
            "id": 1,
            "name": "bebida energetica"
        }
    ]
}
```

* **data**,  Contiene un arreglo con las categorías (array).
  * **id**,  identificador único de la categoría (int).
  * **name**,  nombre de la categoría (string).

#### GET lista de categorías

* GET /categorias retornara todas las categorías existentes.

##### Respuesta

```json
{
    "data": [
        {
            "id": 1,
            "name": "bebida energetica"
        },
        {
            "id": 2,
            "name": "pisco"
        },
        {
            "id": 3,
            "name": "ron"
        }
    ]
}
```
## Configuración

### config.js

Los productos pueden llamarse mediante parámetros (page, categoryId, name).

```js
require('dotenv/config');

const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: process.env.host,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database,
    },
    listPerPage: 9,
  };
  module.exports = config;
```

##### Parámetros

* **db** :  Arreglo con los parámetros para conectarse a la base de datos
  * **host** : URL del servidor de base de datos
  * **user** : Usuario de la base de datos
  * **password** : Contraseña de la base de datos
  * **database** : Nombre de la base de datos
* **listPerPage** : Numero de items por página

#### Heroku - Comandos

Definir variable de entorno:

* heroku config:set var_name = var_value

Ejemplos

* heroku config:set host=URLServidorDeBaseDeDatos
* heroku config:set user=usuario
* heroku config:set password=contraseña
* heroku config:set database=NombreDeBaseDeDatos
* heroku config:set PORT=80
