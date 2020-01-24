import React from 'react'
import { Form, Button, Header, Modal } from 'semantic-ui-react'

function EditBoardModal(props) {
    return (
        <Modal open={props.open} closeIcon onClose={props.closeModal}>
            <Header>Edit Board</Header>
            <Modal.Content>
                <Form
                    size='large'
                    onSubmit={props.updatedBoard}
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
                    <Button type="submit">Submit</Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default EditBoardModal