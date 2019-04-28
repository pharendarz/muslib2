import React, {Component} from 'react';
import {Button, Table} from 'react-bootstrap';
import axios from 'axios';
//redux
import { connect } from 'react-redux';
import { readDrivePurgatory, readAllSongsWithFlacType, createMongoAlbumsFromPurgatory } from '../../actions';
//app functions
import {readDriveHDD} from '../../commonFunctions/harddrive';
import {getAppPaths} from '../../commonFunctions/application';

//app client
import Aux from '../containers/Ax/Ax';
import TableRow from './body/PurgatoryTableRow';

function removeDuplicates(myArr, prop) {
    //[TODO - LEARN BELOW]
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}

class PurgatoryTable extends Component {

    handleReadAllFlacs = async () => {
        this.props.readAllSongsWithFlacType('PURGATORY');
    }
    handleUpdateMongo = async () => {
        //[TODO] check if everything is processed - tags, all files are rated in album, 
        //get info from store about files
        let newArray = this.props.filePaths.filter(element => {
            // console.log(`element:`, element);
            const indexAlbum = parseInt(element.indexAlbum);
            return indexAlbum > 0;
        });
        console.log('newArray', newArray)
        const uniqueAlbums = removeDuplicates(newArray, 'indexAlbum');

        console.log(`uniqueAlbums:`, uniqueAlbums);
        this.props.createMongoAlbumsFromPurgatory(uniqueAlbums);
    }
    render() {
        let songs = (
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Song path</th>
                            <th>Index Album</th>
                            <th>Index Track</th>
                            <th>Artist</th>
                            <th>Title</th>
                            <th>rating</th>
                            <th>Processed</th>
                            <th>read flac</th>
                            <th>write tags</th>
                        </tr>
                    </thead>
                    {this.props.filePaths.length !== 0 ? 
                    this.props.filePaths.map((song, index) => {
                        return (
                            <TableRow key={song.filePath} index={index} song={song}/>
                        )}) :
                            <TableRow key={'nosongkey-1'} index={0} song={{filePath: 'no song'}}/>}
                </Table>
                )
        
        return (
            <div>
                <Button style={{background: 'red', border: '1px solid #000'}} onClick={this.handleReadAllFlacs}>Read all FLAC's</Button>
                <Button variant="dark" onClick={() => this.handleUpdateMongo()}>Update Mongo</Button>
                <Button variant="dark" onClick={() => this.handleUpdateMongo()}>Add AlbumId</Button>
                <Button style={{background: 'green', border: '1px solid #000'}} 
                    onClick={async () =>  {
                        const appPaths = await getAppPaths();
                        let arrayOfPaths = await readDriveHDD(appPaths.purgatoryPath);

                        arrayOfPaths = arrayOfPaths.map(path => {
                            return {
                                filePath: path,
                            }
                        });
                        this.props.readDrivePurgatory(arrayOfPaths);
                    }}
                >
                    Read drive
                </Button>
                {songs}
                
            </div>
        )
    }
}

//<<REDUX
const mapStateToProps = (state) => { // << GET MY STATE
    return {filePaths: state.filePathsPurgatory}; // MUSI ZWRACAC OBIEKT
}


export default connect(mapStateToProps, 
    {readDrivePurgatory, readAllSongsWithFlacType, createMongoAlbumsFromPurgatory} // << drugi argument zawiera ACTION CREATORY
)(PurgatoryTable);

//>>