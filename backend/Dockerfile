# Usa la imagen de Node.js como base
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto en el que el servidor del backend se ejecutará
EXPOSE 3001

# Comando para iniciar el servidor
CMD ["npm", "start"]
