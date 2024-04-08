import React from 'react';
import { render } from '@testing-library/react';
import FilesTable from './components/FilesTable/FilesTable';

describe('FilesTable Component', () => {
  const files = [
    {
      file: 'test1.csv',
      lines: [
        { text: 'Lorem Ipsum', number: 123, hex: 'asdfghjklqwertyu12345678901zxcvb' },
        { text: 'Dolor Sit Amet', number: 456, hex: 'mnbvcxzlkjhgfdsapoiuytrewq098765' }
      ]
    }
  ];

  it('renders table rows with correct data', () => {
    const { queryAllByText } = render(<FilesTable files={files} />);
    
    // Utiliza queryAllByText para obtener todos los elementos que contienen 'test1.csv'
    const fileNameCells = queryAllByText('test1.csv');
    
    // Verifica que haya dos elementos con el texto 'test1.csv'
    expect(fileNameCells.length).toBe(2);
    
    // Verifica que los demás elementos se rendericen correctamente
    expect(queryAllByText('Lorem Ipsum')).toHaveLength(1);
    expect(queryAllByText('123')).toHaveLength(1);
    expect(queryAllByText('asdfghjklqwertyu12345678901zxcvb')).toHaveLength(1);

    expect(queryAllByText('Dolor Sit Amet')).toHaveLength(1);
    expect(queryAllByText('456')).toHaveLength(1);
    expect(queryAllByText('mnbvcxzlkjhgfdsapoiuytrewq098765')).toHaveLength(1);
  });

  const emptyFile = [
    {
      file: 'test.csv',
      lines: []
    }
  ];

  it('renders message when no files are provided', () => {
    const { getByText } = render(<FilesTable files={emptyFile} />);
    
    expect(getByText('No hay archivos correctos')).toBeInTheDocument();
  });
});
