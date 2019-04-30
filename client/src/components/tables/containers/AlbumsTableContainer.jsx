import React from 'react';
import {Table} from 'react-bootstrap'
import AlbumsTableRow from '../body/AlbumsTableRow';

export const AlbumsTable = (props) => {
    return (
        <Table>
        <thead>
            <tr>
            <th>Id</th>
            <th>Artist</th>
            <th>Title</th>
            <th>Tracks</th>
            <th>Discogs Tracks</th>
            <th>Processed</th>
            <th>Last status</th>
            <th>Average rate</th>
            </tr>
        </thead>
        {props.readAlbums.length !== 0 ? 
        props.readAlbums.map((album, indexAlbum) => {
                return (<AlbumsTableRow 
                    key={indexAlbum} 
                    indexAlbum={indexAlbum} 
                    indexFile={indexAlbum} 
                    album={album}
                />)
        }) :
            <AlbumsTableRow key={'nosongkey-1'} index={0} song={[{filePath: 'no song'}]}/>
        }
        </Table>
    )
}

    