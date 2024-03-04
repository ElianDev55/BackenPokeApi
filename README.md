
## Installation

Este aplicacion api  esta hecho con  Nest.js y con base de datos Mysql


```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Routs

- Users CRUD - http://localhost:3000/users  
- Pokemons CRUD - http://localhost:3000/pokemons
- Habilidades CRUD - http://localhost:3000/habilidades
- Login post - http://localhost:3000/auth/login
- Register post - http://localhost:3000/auth/register



  ## Crear Pokemones
```javasricpt
  {
    name: string;
    tipo: string;
    habilidades: [id,id]
    Peso: number;
    imagen: string;
}

  }
  ```



  ## Crear Habilidades
```javasricpt
  {
name: string;

  }
  ```



  ## Crear Register
```javasricpt
  {
    email: string;
    
    password: string;

  }
  ```



  ## Crear Login
```javasricpt
  {
    email: string;
    
    password: string;

  }
  ```
