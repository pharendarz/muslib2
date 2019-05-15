import React from 'react';
import {Table} from 'react-bootstrap'
import LibraryTableRow from '../body/LibraryTableRow';

export const LibraryTable = (props) => {
    return (
        <Table>
        <thead>
            <tr>
                <th>#</th>
                <th>Song path</th>
                <th>Album folder</th>
                <th>Album</th>
                <th>Artist</th>
                <th>Title</th>
                <th>rating</th>
                <th>genre</th>
                <th>add mongo</th>
                <th>mongo sync</th>
                <th>read flac</th>
                <th>write tags</th>
            </tr>
        </thead>
        {props.readAlbums.length !== 0 ? 
        props.readAlbums.map((albumFiles, indexAlbum) => {
            // console.log(albumFiles);
            return (albumFiles.map((file, indexFile) => {
                return (<LibraryTableRow 
                    key={indexFile} 
                    indexAlbum={indexAlbum} 
                    indexFile={indexFile} 
                    song={file}
                />)
            }))
            // return (<TableRow key={index} index={index} song={song}/>)
        }) :
            <LibraryTableRow key={'nosongkey-1'} index={0} song={[{filePath: 'no song'}]}/>
        }
        </Table>
    )
}

    