<<<<<<< HEAD
import React, { Component } from 'react';
import { Form, Button, Header, Modal } from 'semantic-ui-react';
=======
import React, { Component } from 'react'
import { Form, Button, Header, Modal } from 'semantic-ui-react'
>>>>>>> 95c8ea52e6f02395424ac62195d985823a1b9335

class CreateBoard extends Component {
    constructor(){
        super();

        this.state = {
            name: '',
<<<<<<< HEAD
            user: '',
            body: '',
            id: '',
=======
            loggedUser: '',
            body: ''
>>>>>>> 95c8ea52e6f02395424ac62195d985823a1b9335
        }
    }

    handleChange = (e) => {
        this.setState({
<<<<<<< HEAD
            [e.currentTarget.name]: e.currentTarget.value
=======
          [e.currentTarget.name]: e.currentTarget.value
>>>>>>> 95c8ea52e6f02395424ac62195d985823a1b9335
        })
    }

    clearForm = () => {
        this.setState({
            name: '',
<<<<<<< HEAD
            user: '',
            body: '',
        })
    }

    render() {
        return(
            <Modal open={this.props.open} closeIcon onClose={this.props.closeModal}>
                <Header>Create a message</Header>
                <Modal.Content>
                    <Form 
=======
            loggedUser: '',
            body: ''
        })
    }

    render () {
        return(
            <Modal 
                open={this.props.open} 
                closeIcon onClose={this.props.closeModal}
            >
                <Header>Create Board</Header>
                <Modal.Content>
                    <Form
>>>>>>> 95c8ea52e6f02395424ac62195d985823a1b9335
                        size='large'
                        onSubmit={(e) => this.props.addBoard(e, this.state)}
                    >
                        <Form.Field>
                            <label>Name</label>
<<<<<<< HEAD
                            <Form.Input
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                />
                        </Form.Field>
                        <Form.Field>
                            <label>User</label>
                            <Form.Input
                                type="text"
                                name="user"
                                value={this.state.user}
                                onChange={this.handleChange}
                                />
                        </Form.Field>
                        <Form.Field>
                            <label>Message</label>
                            <Form.Input 
                                type="text"
                                name="message"
                                value={this.state.body}
                                onChange={this.handleChange}
                                />                   
=======
                            <Form.Input 
                                type="text"  
                                name="name" 
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Body</label>
                            <Form.Input 
                                type="text"  
                                name="body" 
                                value={this.state.body}
                                onChange={this.handleChange}
                            />
>>>>>>> 95c8ea52e6f02395424ac62195d985823a1b9335
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )
<<<<<<< HEAD
    }
} 
=======
    } 
}
>>>>>>> 95c8ea52e6f02395424ac62195d985823a1b9335

export default CreateBoard;