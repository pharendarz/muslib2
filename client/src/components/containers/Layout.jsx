import React, {Component} from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import axios from 'axios';
//<<redux
import { selectSong } from '../../actions';
import SongTable from '../tables/SongTable';
//>>
class Layout extends Component {
    // state = {
    //     songs: [],
    // }
    handleGetSongs = async (readTags) => {
        // await axios.post('/readdrive', {readTags: readTags}).then(response => response.data).then(result => {
        //     // console.log(result);
        //     if(result){
        //         // this.setState({
        //         //     songs: result.songs,
        //         // })
        //     }
        // })
    }

    async componentWillMount(){
        console.log(this.state);
        await this.handleGetSongs(false);
    }
    render() {
        return (
            <div>
                <BrowserRouter>
                
                    <Route exact path="/" render={()=>
                        <div>
                            <p>music lib java script</p>
                            <p>=======================</p>
                            <p>=======================</p>
                            <p>=======================</p>
                            <div>
                                {/* <SongTable songs={this.state.songs} /> */}
                                <SongTable  />
                            </div>
                        </div>
                    }
                    />
                </BrowserRouter>
            </div>
        )
    }
}

export default Layout;