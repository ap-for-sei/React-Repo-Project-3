import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Header, Container, Menu } from 'semantic-ui-react'

class HeaderComponent extends Component {
    logoutHandler = () => {
        this.props.logout()
    }

    render() {
        return (
            <Header>
                <Menu fixed='top' inverted>
                    <Container>
                        { !this.props.loggedIn ?
                        <Menu.Item>
                            <Link to='/'>Log In</Link>
                        </Menu.Item>
                        : null    
                        }
                        <Menu.Item>
                            <Link to='/boards'>Post-Its</Link>
                        </Menu.Item>
                        { this.props.loggedIn ?
                            <Menu.Item>
                                <Link to='/' 
                                onClick={this.logoutHandler}>Logout
                                </Link>
                                </Menu.Item>
                        :
                        null
                        }
                        { this.props.loggedIn ?
                            <Menu.Item position='right'>
                                {this.props.loggedInUserEmail}
                            </Menu.Item>
                        :
                        null
                        }
                    </Container>
                </Menu>
            </Header>
        )
    }
}

export default HeaderComponent;