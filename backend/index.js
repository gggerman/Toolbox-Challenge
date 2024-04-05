const express = require('express');
const filesRoutes = require('./routes/filesRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/files', filesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor API corriendo en el puerto ${PORT}`);
});

module.exports = app;
