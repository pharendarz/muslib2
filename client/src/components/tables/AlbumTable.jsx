import React, {Component} from 'react';
import {Button, Table} from 'react-bootstrap';
import axios from 'axios';
//redux
import { connect } from 'react-redux';
import { readMongoAlbums } from '../../actions';
//app functions
import {readDriveHDD} from '../../commonFunctions/harddrive';
import {getAppPaths} from '../../commonFunctions/application';

import { getAlbums} from '../../commonFunctions/dev';
//app client
import Aux from '../containers/Ax/Ax';
import TableRow from './body/AlbumsTableRow';
// import { start } from 'repl';

class AlbumTable extends Component {

    render() {
        console.log('RERENDER ==== ', this.props.filePaths);
        let songs = (
                <Table>
                    <thead>
                        <tr>
                            {/* <th>#</th> */}
                            <th>Id</th>
                            <th>Artist</th>
                            <th>Title</th>
                            <th>Tracks</th>
                            <th>Discogs Tracks</th>
                            <th>Processed</th>
                            <th>Last status</th>
                            <th>Average rate</th>
                            {/* <th>rating</th> */}
                        </tr>
                    </thead>
                    {this.props.filePaths.length !== 0 ? 
                    this.props.filePaths.map((dbObj, index) => {
                        return (
                            <TableRow key={dbObj.filePath} index={index} filePath={dbObj.filePath} dbObj={dbObj}/>
                        )}) :
                            <TableRow key={'nosongkey-1'} index={0} song={{filePath: 'no song'}}/>}
                </Table>
                )
        
        return (
            <div>
                <Button style={{background: 'green', border: '1px solid #000'}} 
                    onClick={async () =>  {
                        const albums = await getAlbums();
                        console.log(albums);
                        this.props.readMongoAlbums(albums);
                    }}
                >
                    Read mongo
                </Button>
                {songs}
                
            </div>
        )
    }
}

//<<REDUX
const mapStateToProps = (state) => { // << GET MY STATE
    return {filePaths: state.mongoAlbums}; // MUSI ZWRACAC OBIEKT
}


export default connect(mapStateToProps, 
    {readMongoAlbums} // << drugi argument zawiera ACTION CREATORY
)(AlbumTable);

//>>