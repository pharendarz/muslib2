import React from 'react';
import {Button} from 'react-bootstrap';
import Aux from '../containers/Ax/Ax';
import axios from 'axios';
const handleReadFlac = async (songPath) => {
    await axios.post('readflac', {songPath: songPath}).then(response => response.data).then(result => {
        console.log(result, songPath);
    })
}

const ReadFlac = (props) => {
    return (
        // <Aux>
            <Button onClick={() => handleReadFlac(props.songPath)}>Read Flac</Button>

        // </Aux>

    )

}

export default ReadFlac;