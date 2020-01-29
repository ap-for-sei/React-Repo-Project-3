import React, { Component } from 'react'
import CreateMessage from './CreateMessageForm'
import MessageList from './MessageList'
import EditMessageModal from './EditMessageModal'
import { Grid, Button } from 'semantic-ui-react'


class MessageContainer extends Component {

    state = {
        messages: [],
        createModalOpen: false,
        editModalOpen: false,
        messageToEdit: {
            body: '',
            id: ''
        }
    }

    createMessage = () => {
        this.setState({
            createModalOpen: true
        })
    }

    addMessage = async (e, messageFromTheForm) => {
        e.preventDefault();

        try {
            console.log(messageFromTheForm)
            const createdMessageResponse = await fetch(`http://localhost:8000/api/v1/boards/`, {
                method: 'POST',
                body: JSON.stringify(messageFromTheForm),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const parsedResponse = await createdMessageResponse.json()

            this.setState({
                messages: [...this.state.messages, parsedResponse.data]
            })

            this.closeCreateModal()
        } catch (err) {
            console.log('error: ', err)
        }
    }

    closeCreateModal = () => {
        this.setState({
            createModalOpen: false
        }, 
    )}

    componentDidMount() {
        this.getMessages()
    }

    getMessages = async () => {
        try {
            const messages = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/boards/`, { credentials: 'include' })
            const parsedMessages = await messages.json()

            this.setState({
                messages: parsedMessages.data
            })
        } catch (err) {
            console.log(err);
        }
    } 

    editMessage = (idOfMessageEdit) => {
        const messageToEdit = this.state.messages.find(message => message.id === idOfMessageEdit)

        this.setState({
            editModalOpen: true,
            messageToEdit: {
                ...messageToEdit
            }
        })
    }

    handleEditChange = (e) => {
        this.setState({
            messageToEdit: {
                ...this.state.messageToEdit,
                [e.target.name]: e.target.value
            }
        })
    }

    updateMessage = async (e) => {
        e.preventDefault()

        try {
            const updateResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/boards/${this.state.messageToEdit.id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state.messageToEdit),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })

            const updateResponseParsed = await updateResponse.json()

            const newMessageArrayWithUpdate = this.state.messages.map((message) => {
                if (message.id === updateResponseParsed.data.id) {
                    message = updateResponseParsed.data
                }
                return message 
            })

            this.setState({
                messages: newMessageArrayWithUpdate
            })

            this.closeEditModal()

        } catch (err) {
            console.error(err)
        }
    } 

    closeEditModal = () => {
        this.setState({
            editModalOpen: false
        })
    }

    deleteMessage = async (id) => {
        const deleteMessageResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/boards/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })

        const deleteMessageParsed = await deleteMessageResponse.json()

        this.setState({
            messages: this.state.messages.filter((message) => message.id !== id)
        })
    }

    render() {
        const { loggedIn } = this.props

        return (
            <div>
                { loggedIn ?
                    <Grid 
                        textAlign='center'
                        style={{ marginTop: '4em', height: '100%' }}
                        // stackable
                    >
                        <Grid.Row>
                            <Button onClick={this.createMessage}>Create New Message</Button>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Row>
                                <MessageList
                                    messages={this.state.messages}
                                    deleteMessage={this.deleteMessage}
                                    editMessage={this.editMessage}
                                />
                            </Grid.Row>
                            <CreateMessage 
                                open={this.state.createModalOpen}
                                closeModal={this.closeCreateModal}
                                addMessage={this.addMessage}
                            />
                            <EditMessageModal 
                                open={this.state.editModalOpen}
                                updateMessage={this.updateMessage}
                                messageToEdit={this.state.messageToEdit}
                                closeModal={this.closeEditModal}
                                handleEditChange={this.handleEditChange}
                            />
                        </Grid.Row>
                    </Grid>
                :
                <Grid 
                    textAlign='center'
                    style={{ marginTop: '7em', height: '100%' }}
                    verticalAlign='top'
                    stackable
                >
                    You must be logged in to make a message.
                </Grid>
                }
            </div>
        )
    }
}

export default MessageContainer;