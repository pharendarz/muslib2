import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav, Form, FormControl, Button, NavDropdown} from 'react-bootstrap';

class NavbarMusicLibrary extends React.Component {
    render(){
        return(

        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">jabba.rar</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#pricing">Settings</Nav.Link>
                <NavDropdown title="Your Library" id="collasible-nav-dropdown">
                    <NavDropdown.Item >
                        <Link to="/albums">
                            Albums / Releases / Ep's
                        </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Artists</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item >
                        <Link to="/wholelibrary">
                            Whole library
                        </Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                        <Link to="/purgatory">
                            Purgatory
                        </Link>
                    </NavDropdown.Item>
                    
                </NavDropdown>

            </Nav>
            {/* <Navbar.Toggle /> */}
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
            </Form>
            {/* <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                Signed in as: <a href="#login">Mark Otto</a>
                </Navbar.Text>
            </Navbar.Collapse> */}
        </Navbar>
        )
    }
}

export default NavbarMusicLibrary;