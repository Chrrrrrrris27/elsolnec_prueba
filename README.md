# Prueba técnica ELSOLNEC
## Autor: Christian Aguilar
## Tecnologías utilizadas
- NEXTJS 14
- ReactJS
- TypeScript
- TanStack Query
- ShadCN
- Tailwind
- API [{JSON} Placeholder](https://jsonplaceholder.typicode.com/)
  
## Getting Started

First, install the dependencies needed for the project:
```bash
npm install
```
After, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Especificaciones técnicas
### Organización del proyecto
- src
    - app (Sistema de rutas principal)
    - components (Componentes globales y reutilizables de la app, creados desde cero y también agregados de ShadCN)
    - config (Configuraciones generales del proyecto y constantes)
    - hooks (Custom hooks como useFetchQuery para realizar peticiones con TanStack Query)
    - lib (comprende los modelos e interfaces de la aplicación junto con funciones globales)

### Navegación y funcionalidades:
- /users -> página principal: muestra la lista de usuarios disponibles junto a un filtro por nombre o username y cada usuario permite navegar a su página individual (/users/id).
- /users/id -> muestra la información detallada del usuario
- /posts -> muestra la lista de posts con su autor y un call to action que permite mostrar más información del post (/posts/id) paginados (10 por página), aedmás cuenta con filtro de ordenamiento por título y búsqueda por título.
- /posts/id -> muestra la información detallada de cada post por su id permitiendo navegar a los comentarios del mismo (/posts/id/comments)
- /posts/id/comments -> muestra los comentarios del post y permite añadir un nuevo comentario.

Las páginas principales se mantienen como Server Components para así manetener una carga rápida de las mismas, y solo uitilizar SSR cuando es completamente necesaria la interacción del usuario y actualización de estados.
Se buscó mantener una arqquitectura limpia implementando componentes que cumplan una única función permitiendo fácil escalabilidad, reutilización de componentes y evitar sobre cargas en los mismos.
 

### Estructura de React Query
- Almacenamiento de usuarios: query["users"]
- Almacenamiento de posts: query["posts"]
- Almacenamiento de comentarios: query["posts", id, "comments"]
  
### Beneficios de utilizar React Query
- Su almacenamiento de data en caché evitó llamados inncesarios de API al realizar navegación entre las diferentes páginas de la aplicación.
- Evitó la utilización de gestores de estado como Redux o context de React para tener persistencia de los datos tanto al leer APIs como al agregar nuevo datos del usario (como un nuevo comentario).
- Realiza el refetch automático de la data cuando sea necesario o la data es obsoleta.
- Permite un óptimo manejo de estado en las peticiones, lo cual permite darle una óptima respuesta en UI al usuario cuando hay data, está cargando o se tiene algún error.

    
