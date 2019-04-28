import React, {Component} from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import axios from 'axios';


//app components
import DevTools from '../../dev/DevTools';
import Navbar from '../navbars/Navbar';


//app pages
import {LibraryPage, PurgatoryPage, AlbumPage} from '../../pages/';

class Layout extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Navbar/>
                    <DevTools/>
                    <Route exact path="/purgatory" render={()=>
                        <div>
                            <br/>
                            <br/>
                            <div>
                                <PurgatoryPage />
                            </div>
                        </div>
                    }
                    />
                    <Route exact path="/wholelibrary" render={()=>
                        <div>
                            <br/>
                            <br/>
                            <div>
                                <LibraryPage />
                            </div>
                        </div>
                    }
                    />
                    <Route exact path="/albums" render={()=>
                        <div>
                            <br/>
                            <br/>
                            <div>
                                <AlbumPage />
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