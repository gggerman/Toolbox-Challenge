# Usa la imagen de Node.js como base
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto en el que el servidor de desarrollo del frontend se ejecutará
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
