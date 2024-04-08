import axios from 'axios'
import app from '../index.js'
import { expect } from 'chai'

const PORT = process.env.PORT || 3001

describe('Backend API Tests', () => {
  describe('GET /files/data', () => {
    it('should return formatted files data', async function () {
      this.timeout(10000)
      try {
        const res = await axios.get(`http://localhost:${PORT}/files/data`)
        expect(res.status).to.equal(200)
        expect(res.data).to.be.an('array')

        res.data.forEach((item) => {
          expect(item).to.have.property('file')
          expect(item).to.have.property('lines').that.is.an('array')
          item.lines.forEach((line) => {
            expect(line).to.have.property('text')
            expect(line).to.have.property('number')
            expect(line).to.have.property('hex')
            // Verificar el formato de los campos
            expect(line.text).to.be.a('string')
            expect(line.number).to.be.a('number')
            expect(line.hex).to.be.a('string').and.to.match(/^[0-9a-fA-F]{32}$/) // Verificar que el hexadecimal tenga 32 dígitos
          })
        })
      } catch (error) {
        throw new Error(`Failed to make request: ${error.message}`)
      }
    })
  })
})
