import React from 'react';
import {Button} from 'react-bootstrap';
import Aux from '../containers/Ax/Ax';
import axios from 'axios';


const ReadFlac = (props) => {
    return (
        <Button onClick={() => props.handleReadFlac(props.songPath)}>Read Flac</Button>
    )

}

export default ReadFlac;