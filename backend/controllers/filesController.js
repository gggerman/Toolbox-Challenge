import axios from 'axios'

export async function formatFileData (file, isQuery) {
  try {
    const fileData = await axios.get(`https://echo-serv.tbxnet.com/v1/secret/file/${file}`, {
      headers: {
        Authorization: 'Bearer aSuperSecretKey'
      }
    })

    // Si hay Query, trae el archivo entero y lo formatea
    // if (isQuery) {
    //   return fileData.data.
    //   split('\n')
    //   .slice(1)
    //   .map(line => line.split(','))
    //   .map(fields => {
    //     const [file, text, number, hex] = fields;

    //     return { text, number: Number(number), hex };
    //   })
    // }

    return fileData.data
      .split('\n') // Dividir el texto en líneas
      .slice(1) // Omitir la primera línea que contiene los nombres de las columnas
      .map(line => line.split(',')) // Dividir cada línea en campos
      .filter(fields => fields.length === 4) // Filtrar líneas con 4 campos
      .map(fields => {
        const [file, text, number, hex] = fields
        // Verificar que cada campo tenga datos y cumpla con el formato correcto
        if (file && text && number && hex && !isNaN(number) && /^[0-9A-Fa-f]{32}$/.test(hex)) {
          return { text, number: Number(number), hex }
        }
        // Si no hay datos suficientes o no cumplen con el formato, retornar undefined
        return undefined
      })
      .filter(data => data !== undefined)
  } catch (error) {
    throw new Error(`Error al obtener los datos del archivo ${file}: ${error.message}`)
  }
}

export async function getFormattedFilesData (fileName) {
  try {
    // Verificar si se proporcionó un nombre de archivo para filtrar
    if (fileName) {
      const formattedData = await formatFileData(fileName)
      return [{ file: fileName, lines: formattedData }]
    } else {
      // Obtener todos los archivos si no se proporcionó un nombre de archivo para filtrar
      const response = await axios.get('https://echo-serv.tbxnet.com/v1/secret/files', {
        headers: {
          Authorization: 'Bearer aSuperSecretKey'
        }
      })

      const files = []
      for (const file of response.data.files) {
        try {
          const formattedData = await formatFileData(file)
          if (formattedData.length > 0) {
            files.push({ file, lines: formattedData })
          }
        } catch (error) {
          console.error(`Error al procesar el archivo ${file}: ${error.message}`)
        }
      }

      return files
    }
  } catch (error) {
    console.error(error)
    throw new Error('Error al obtener los datos de los archivos')
  }
}

export async function getFilesList () {
  try {
    const response = await axios.get('https://echo-serv.tbxnet.com/v1/secret/files', {
      headers: {
        Authorization: 'Bearer aSuperSecretKey'
      }
    })

    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Error al obtener los datos de los archivos')
  }
}
