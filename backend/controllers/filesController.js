const axios = require('axios');

async function formatFileData(file) {
  try {
    const fileData = await axios.get(`https://echo-serv.tbxnet.com/v1/secret/file/${file}`, {
      headers: {
        Authorization: 'Bearer aSuperSecretKey'
      }
    });

    return fileData.data
      .split('\n') // Dividir el texto en líneas
      .slice(1) // Omitir la primera línea que contiene los nombres de las columnas
      .map(line => line.split(',')) // Dividir cada línea en campos
      .filter(fields => fields.length === 4) // Filtrar líneas con 4 campos
      .map(fields => {
        const [file, text, number, hex] = fields;
        // Verificar que cada campo tenga datos y cumpla con el formato correcto
        if (file && text && number && hex && !isNaN(number) && /^[0-9A-Fa-f]{32}$/.test(hex)) {
          return { text, number: Number(number), hex };
        }
        // Si no hay datos suficientes o no cumplen con el formato, retornar undefined
        return undefined;
      })
      .filter(data => data !== undefined); // Filtrar los resultados indefinidos
  } catch (error) {
    // Si hay un error al obtener los datos del archivo, lanzar una excepción
    throw new Error(`Error al obtener los datos del archivo ${file}: ${error.message}`);
  }
}

  

async function getFormattedFilesData() {
    try {
      const response = await axios.get('https://echo-serv.tbxnet.com/v1/secret/files', {
        headers: {
          Authorization: 'Bearer aSuperSecretKey'
        }
      });
  
      const files = [];
      for (const file of response.data.files) {
        try {
          const formattedData = await formatFileData(file);
          if (formattedData.length > 0) {
              files.push({ file, lines: formattedData });
          }
        } catch (error) {
          console.error(`Error al procesar el archivo ${file}: ${error.message}`);
          // Continuar con el siguiente archivo en caso de error
        }
      }
  
      return files;
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener los datos de los archivos');
    }
  }
  
  async function getFilesList() {
      try {
        const response = await axios.get('https://echo-serv.tbxnet.com/v1/secret/files', {
          headers: {
            Authorization: 'Bearer aSuperSecretKey'
          }
        });
    
        return response.data;
      } catch (error) {
        console.log(error);
        throw new Error('Error al obtener los datos de los archivos');
      }
    }

module.exports = { getFormattedFilesData, getFilesList };