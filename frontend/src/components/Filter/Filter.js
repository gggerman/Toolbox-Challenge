import React, { useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { useGetFileMutation, useGetFilesListQuery } from '../../app/apis/files/filesQuery';
import { useDispatch } from 'react-redux';
import { setFiles, showAllFiles } from '../../app/apis/files/filesSlice';

const Filter = () => {
  const dispatch = useDispatch();

  //RTK Query
  const {
      data: getFilesListData,
      isLoading: isGetFilesListLoading,
      isSuccess: isGetFilesListSuccess,
      isError: isGetFilesListError,
    } = useGetFilesListQuery();

  const [
    getFile,
    {
      data: getFileData,
      isLoading: isGetFileLoading,
      isSuccess: isGetFileSuccess,
      isError: isGetFileError,
    },
  ] = useGetFileMutation();
  
  const onSelectChange = (e) => {
    const fileSelected = e.target.value
    
    if (fileSelected !== "all") {
      getFile(fileSelected)
    } else {
      dispatch(showAllFiles())
    }
  };
  
  useEffect(() => {
    if (isGetFileSuccess) {
      if (isGetFileSuccess) {
        dispatch(setFiles(getFileData))
    }
    }
  }, [isGetFileSuccess])

  return (
    <Navbar bg="danger" variant="dark" className='px-1'>
      <Navbar.Brand href="#home">React Test App</Navbar.Brand>
      <Form inline>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Control as="select" onChange={onSelectChange}>
            <option value="all">Todos</option>
            {isGetFilesListSuccess && getFilesListData.files.map((file, index) => (
              <option value={file} key={index}>{file}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
    </Navbar>
  );
};

export default Filter;
