import React, {Component} from 'react';
import {Button, Table} from 'react-bootstrap';
import axios from 'axios';
//redux
import { connect } from 'react-redux';
import { readDriveLibrary, readAllSongsWithFlacType } from '../../actions';
//app functions
import {readDriveHDD} from '../../commonFunctions/harddrive';
import {getAppPaths} from '../../commonFunctions/application';
//app client
import Aux from '../containers/Ax/Ax';
import TableRow from './body/LibraryTableRow';
// import { start } from 'repl';

class LibraryTable extends Component {

    handleReadAllFlacs = async () => {
        this.props.readAllSongsWithFlacType('LIBRARY');
    }

    render() {
        console.log('RERENDER ==== ', this.props.filePaths);
        let songs = (
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Song path</th>
                            <th>Album</th>
                            <th>Artist</th>
                            <th>Title</th>
                            <th>rating</th>
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
                <Button style={{background: 'green', border: '1px solid #000'}} 
                    onClick={async () =>  {
                        const appPaths = await getAppPaths();
                        let arrayOfPaths = await readDriveHDD(appPaths.musicLibraryPath);

                        arrayOfPaths = arrayOfPaths.map(path => {
                            return {
                                filePath: path,
                                rating: null,
                                album: null,
                                artist: null,
                                title: null,
                            }
                        });
                        this.props.readDriveLibrary(arrayOfPaths);
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
    return {filePaths: state.filePathsLibrary}; // MUSI ZWRACAC OBIEKT
}


export default connect(mapStateToProps, 
    {readDriveLibrary, readAllSongsWithFlacType} // << drugi argument zawiera ACTION CREATORY
)(LibraryTable);

//>>