import React, {Component} from 'react';
//redux
import { connect } from 'react-redux';
import { 
    readDriveDump,
    readDrivePurgatory, 
    readSongsWithFlacType, 
    readDriveLibrary, 
    createMongoAlbumsFromPurgatory,
    readMongoAlbums
} from '../../actions';
//app client
import DumpButtons from '../buttons/DumpButtonsSet';
import PurgatoryButtons from '../buttons/PurgatoryButtonSet';
import LibraryButtons from '../buttons/LibraryButtonSet';
import AlbumsButtons from '../buttons/AlbumsButtonSet';
import {DumpTable} from './containers/DumpTableContainer';
import {PurgatoryTable} from './containers/PurgatoryTableContainer';
import {LibraryTable} from './containers/LibraryTableContainer';
import {AlbumsTable} from './containers/AlbumsTableContainer';
class JabbaTable extends Component {
    
    render() {
        switch(this.props.pageType){
            case 'dump':
                return (
                    <div>
                        <DumpButtons 
                            readSongsWithFlacType={this.props.readSongsWithFlacType}
                            readDriveDump={this.props.readDriveDump}
                            readAlbums={this.props.readAlbumsDump}
                            // createMongoAlbumsFromPurgatory={this.props.createMongoAlbumsFromPurgatory}
                        />
                        <DumpTable readAlbums={this.props.readAlbumsDump}/>
                        
                    </div>
                )
            case 'purgatory':
                return (
                    <div>
                        <PurgatoryButtons 
                            readSongsWithFlacType={this.props.readSongsWithFlacType}
                            readDrivePurgatory={this.props.readDrivePurgatory}
                            readAlbums={this.props.readAlbumsPurgatory}
                            createMongoAlbumsFromPurgatory={this.props.createMongoAlbumsFromPurgatory}
                        />
                        <PurgatoryTable readAlbums={this.props.readAlbumsPurgatory}/>
                        
                    </div>
                )
            case 'library':
                return (
                    <div>
                        <LibraryButtons 
                            readSongsWithFlacType={this.props.readSongsWithFlacType}
                            readDrivePurgatory={this.props.readDriveLibrary}
                            readAlbums={this.props.readAlbumsLibrary}
                            readMongoAlbums={this.props.readMongoAlbums}
                        />
                        <LibraryTable readAlbums={this.props.readAlbumsLibrary}/>
                        
                    </div>
                )                   
            case 'albums':
                return (
                    <div>
                        <AlbumsButtons 
                            readMongoAlbums={this.props.readMongoAlbums}
                        />
                        <AlbumsTable readAlbums={this.props.readAlbumsMongo}/>
                        
                    </div>
                )                   
            default:
                break;
        }
    }
}

//<<REDUX
const mapStateToProps = (state) => { // << GET MY STATE
    return {
        readAlbumsDump: state.filePathsDump,
        readAlbumsPurgatory: state.filePathsPurgatory,
        readAlbumsLibrary: state.filePathsLibrary,
        readAlbumsMongo: state.mongoAlbums
    }; // MUSI ZWRACAC OBIEKT
}


export default connect(mapStateToProps, 
    {
        readDriveDump, 
        readDrivePurgatory, 
        readSongsWithFlacType, 
        readDriveLibrary, 
        createMongoAlbumsFromPurgatory,
        readMongoAlbums
    } // << drugi argument zawiera ACTION CREATORY
)(JabbaTable);

//>>