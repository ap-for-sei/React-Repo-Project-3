import React, { Component } from 'react'
import { Form, Button, Header, Modal } from 'semantic-ui-react'

class CreateBoard extends Component {
    constructor(){
        super();

        this.state = {
            name: '',
            loggedUser: '',
            body: ''
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
                            <label>Body</label>
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

export default CreateBoard;