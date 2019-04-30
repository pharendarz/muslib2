import React from 'react';
import {Button} from 'react-bootstrap';

import { getAlbumsFromMongo} from '../../commonFunctions/dev';

const AlbumsButtons = (props) => {
    return (
        <div>
            <Button style={{background: 'green', border: '1px solid #000'}} 
                    onClick={async () =>  {
                        const albums = await getAlbumsFromMongo();
                        console.log('ALBUMS FROM MONGO:::', albums);
                        props.readMongoAlbums(albums);
                    }}
                >
                    Read mongo
                </Button>
        </div>
    )
}

export default AlbumsButtons;