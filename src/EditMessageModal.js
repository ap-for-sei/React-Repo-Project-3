import React from 'react'
import { Form, Button, Header, Modal } from 'semantic-ui-react'

function EditMessageModel(props) {
    console.log("props: ", props)
    return (
        <Modal open={props.open} 
        closeIcon onClose={props.closeModal}
        >
            <Header>Edit Message</Header>
            <Modal.Content>
                <Form
                    size='large'
                    onSubmit={props.updateMessage}
                >
                    <Form.Field>
                        <label>Name</label>
                        <Form.Input
                            type="text"
                            name="name"
                            value={props.messageToEdit.name}
                            onChange={props.handleEditChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Body</label>
                        <Form.Input
                            type="text"
                            name="body"
                            value={props.messageToEdit.body}
                            onChange={props.handleEditChange}
                        />
                    </Form.Field>
                    <Button type="submit">Make It So</Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default EditMessageModel