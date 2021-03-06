import React from 'react'
import { Form, Button, Header, Modal } from 'semantic-ui-react'

function EditBoardModal(props) {
    console.log("props: ", props)
    return (
        <Modal open={props.open} 
        closeIcon onClose={props.closeModal}
        >
            <Header>Edit Post-It</Header>
            <Modal.Content>
                <Form
                    size='large'
                    onSubmit={props.updateBoard}
                >
                    <Form.Field>
                        <label>Name</label>
                        <Form.Input
                            type="text"
                            name="name"
                            value={props.boardToEdit.name}
                            onChange={props.handleEditChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Body</label>
                        <Form.Input
                            type="text"
                            name="body"
                            value={props.boardToEdit.body}
                            onChange={props.handleEditChange}
                        />
                    </Form.Field>
                    <Form.Field>
                            <label>Image</label>
                            <Form.Input 
                                type="text"
                                name="image"
                                value={props.boardToEdit.image}
                                onChange={props.handleEditChange}
                                />                   
                    </Form.Field>
                    <Form.Field>
                            <label>Location</label>
                            <Form.Input 
                                type="text"
                                name="location"
                                value={props.boardToEdit.location}
                                onChange={props.handleEditChange}
                                />                   
                    </Form.Field>
                    <Button type="submit">Submit</Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default EditBoardModal