import React from 'react';
import {Link} from 'react-router-dom';
import {Nav, Form, FormControl, Button, NavDropdown} from 'react-bootstrap';
//dev
import {createAlbum, getAlbums} from '../commonFunctions/dev';
//redux
import { readMongoAlbums } from '../actions';
import {connect} from 'react-redux';

class DevTools extends React.Component {
    render(){
        return(
        <Nav variant="pills" activeKey="1" onSelect={k => this.handleSelect(k)}>
            <Nav.Item>
                <Button variant="warning" onClick={()=>{
                    createAlbum();
                }}>
                    Create Album
                </Button>
            </Nav.Item>
            <Nav.Item>
                <Button variant="warning" onClick={async ()=>{
                    const albums = await getAlbums();
                    console.log(albums);
                    this.props.readMongoAlbums(albums);
                }}>
                    mongo albums
                </Button>
            </Nav.Item>
            <Nav.Item>
                <Button variant="dark">
                    rewrite ML's
                </Button>
            </Nav.Item>
            <NavDropdown title="_blankDropdown" id="nav-dropdown">
                <Button variant="dark">
                    _blank
                </Button >
                <Button variant="dark">
                    _blank
                </Button>
                <Button variant="dark">
                    _blank
                </Button>
              {/* <NavDropdown.Divider /> */}
                <Button variant="dark">
                    _blank
                </Button>
            </NavDropdown>
          </Nav>
        )
    }
}

export default connect(null, {readMongoAlbums})(DevTools);