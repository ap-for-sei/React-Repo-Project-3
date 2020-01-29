import React, { Component } from 'react'
import { Form, Button, Header, Modal } from 'semantic-ui-react'

class CreateMessageForm extends Component {
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
                <Header>Create a message</Header>
                <Modal.Content>
                    <Form 
                        size='large'
                        onSubmit={(e) => this.props.addMessage(e, this.state)}
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
                        {/* <Form.Field>
                            <label>User</label>
                            <Form.Input
                                type="text"
                                name="user"
                                value={this.state.user}
                                onChange={this.handleChange}
                                />
                        </Form.Field> */}
                        <Form.Field>
                            <label>Message</label>
                            <Form.Input 
                                type="text"
                                name="body"
                                value={this.state.body}
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

export default CreateMessageForm;