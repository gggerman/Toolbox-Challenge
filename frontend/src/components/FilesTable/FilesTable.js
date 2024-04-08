import React from 'react';
import Table from 'react-bootstrap/Table';

const FilesTable = ({ files }) => {
  return (
    <div className='px-5 mt-4'>
      {files && files[0].lines.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Text</th>
              <th>Number</th>
              <th>Hex</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, fileIndex) => (
              file.lines.map((line, lineIndex) => (
                <tr key={lineIndex}>
                  <td>{file.file}</td>
                  <td>{line.text}</td>
                  <td>{line.number}</td>
                  <td>{line.hex}</td>
                </tr>
              ))
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No hay archivos correctos</p>
      )}
    </div>
  );
};

export default FilesTable;
