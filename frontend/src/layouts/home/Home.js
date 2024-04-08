import React, {useEffect} from 'react'
import FilesTable from '../../components/FilesTable/FilesTable';
import { useGetFilesQuery } from '../../app/apis/files/filesQuery';
import Filter from '../../components/Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { setAllFiles, setFiles } from '../../app/apis/files/filesSlice';
import Spinner from 'react-bootstrap/Spinner';

const Home = () => {
    const dispatch = useDispatch();
    const files = useSelector((state) => state.files.files);

    //RTK Query
    const {
        data: filesData,
        isSuccess: isFilesSuccess,
        isFetching: isFilesFetching,
        isLoading: isFilesLoading,
        isError: isFilesError,
      } = useGetFilesQuery()
    
      useEffect(() => {
        if (isFilesSuccess) {
            dispatch(setFiles(filesData))
            dispatch(setAllFiles(filesData))
        }
      }, [isFilesSuccess])

    return (
        <>
            <Filter/>
            {isFilesLoading ? (
            <Spinner animation="border" className='mt-5'/>
            ) : files.length > 0 && (
                <FilesTable files={files}/>
            )}
        </>
    )
}

export default Home;