import React from 'react';
import {Table} from 'react-bootstrap'
import DumpTableRow from '../body/DumpTableRow';

export const DumpTable = (props) => {
    return (
        <Table>
        <thead>
            <tr>
                <th>#</th>
                <th>Song path</th>
                <th>Purgatory path</th>
                <th>Album Folder</th>
                <th>Album</th>
                <th>Index Album</th>
                <th>Index Track</th>
                <th>Artist</th>
                <th>Title</th>
                <th>rating</th>
                <th>Library</th>
                <th>read flac</th>
                {/* <th>write tags</th> */}
                <th>open file loc</th>
            </tr>
        </thead>
        {props.readAlbums.length !== 0 ? 
        props.readAlbums.map((albumFiles, indexAlbum) => {
            // console.log(albumFiles);
            return (albumFiles.map((file, indexFile) => {
                return (<DumpTableRow 
                    key={indexFile} 
                    indexAlbum={indexAlbum} 
                    indexFile={indexFile} 
                    song={file}
                />)
            }))
            // return (<TableRow key={index} index={index} song={song}/>)
        }) :
            <DumpTableRow key={'nosongkey-1'} index={0} song={[{filePath: 'no song'}]}/>
        }
        </Table>
    )
}

    