# Prueba Técnica.

La API de Github necesita un token para la authentificación de usuarios. Este token se genera desde Github, pero al hacer un commit la plataforma lo detecta y lo elimina por motivos de seguridad. 

Se ha preparado un fichero, globalToken.js, podemos sustituir ahí el token por el nuevo para poder visualizar el proyecto y hacer peticiones a la API de Github. 

Puedes generar un token desde aquí: https://github.com/settings/tokens

### `npm install`

Hacer `npm install` para instalar todas las dependencias

### `npm run start`

Puedes inicializar el proyecto con el comando `npm run start`

### `Dependencias`

"moment": "^2.29.3",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-markdown": "^8.0.3",
"react-router-dom": "^6.3.0",