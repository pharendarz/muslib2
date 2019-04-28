import React from 'react';
import ReadFlacButton from '../../buttons/ReadFlac';
import axios from 'axios';
import {Button,} from 'react-bootstrap';
//redux 
import {connect} from 'react-redux';
import {readSongFlacType} from '../../../actions';

function test(t) {      //defining a function
    if (t === undefined) {       //if t=undefined, call tt
          console.log(t)      //call t
    }
    return t;    
}

class SongTableBody extends React.Component {

    render(){
        let artist = null;
        let title = null;
        let indexAlbum = null;
        if (test(this.props.dbObj)){
            artist =  this.props.dbObj.artist;
            title =  this.props.dbObj.title;
            indexAlbum =  this.props.dbObj.indexAlbum;
            // rating =  this.props.dbObj.rating;
        }

        return (
            <tbody>
            <tr>
                {/* <td>{this.props.index}</td> */}
                <td>{indexAlbum}</td>
                <td>{artist}</td>
                <td>{title}</td>
                <td>3/14</td>
                <td>15</td>
                <td>true/false</td>
                <td>Active 03.05.2019</td>
                <td>3.5/5 stars</td>
                {/* <td>{rating}</td> */}
            </tr>
            </tbody>
        )
    }
}

//<<REDUX
const mapStateToProps = (state) => { // << GET MY STATE
    return {
        filePathsState: state.filePathsLibrary,
    }; // MUSI ZWRACAC OBIEKT
}


export default connect(mapStateToProps, 
    {readSongFlacType} // << drugi argument zawiera ACTION CREATORY ES6 << {readSongFlacType: readSongFlacType} = {readSongFlacType}
    )(SongTableBody);
    // export default SongTable;
    
    //>>
// export default SongTableBody;