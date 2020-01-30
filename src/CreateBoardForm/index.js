import React, { Component } from 'react'
import { Form, Button, Header, Modal } from 'semantic-ui-react'

class CreateBoard extends Component {
    constructor(){
        super();

        this.state = {
            name: '',
            body: '',
            
        }
    }

    handleChange = (e) => {
        this.setState({
          [e.currentTarget.name]: e.currentTarget.value
        })
    }

    clearForm = () => {
        this.setState({
            name: '',
            body: '',
        })
    }

    render() {
        return(
            <Modal open={this.props.open} closeIcon onClose={this.props.closeModal}>
                <Header>Create a Board</Header>
                <Modal.Content>
                    <Form 
                        size='large'
                        onSubmit={(e) => this.props.addBoard(e, this.state)}
                    >
                        <Form.Field>
                            <label>Name</label>
                            <Form.Input
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                />
                        </Form.Field>
                        <Form.Field>
                            <label>Message</label>
                            <Form.Input 
                                type="text"
                                name="body"
                                value={this.state.body}
                                onChange={this.handleChange}
                                />                   
                        </Form.Field>
                        <Form.Field>
                            <label>Image</label>
                            <Form.Input 
                                type="text"
                                name="image"
                                value={this.state.image}
                                onChange={this.handleChange}
                                />                   
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
} 

export default CreateBoard;