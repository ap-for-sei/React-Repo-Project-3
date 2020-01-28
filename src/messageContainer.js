import React, { Component } from 'react'
import CreateMessage from '../CreateMessageForm'
import MessageList from '../messageList'
import EditMessageModal from '../EditMessageModal'
import { Grid, Button } from 'semantic-ui-react'

class messageContainer extends Component {

    state = {
        messages: [],
        createModalOpen: false,
        editModalOpen: false,
        messageToEdit: {
            name: '',
            loggedUser: '',
            body: '',
            id: '',
        }
    }

    createMessage = () => {
        this.setState({
            createModalOpen: true
        })
    }

    addmessage = async (e, messageFromTheForm) => {
        e.preventDefault();

        try {
            console.log(messageFromTheForm)
            const createdmessageResponse = await fetch(`http://localhost:8000/api/v1/messages/`, {
                method: 'POST',
                body: JSON.stringify(messageFromTheForm),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const parsedResponse = await createdmessageResponse.json()

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
        this.getmessages()
    }

    getmessages = async () => {
        try {
            const messages = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/messages`, { credentials: 'include' })
            const parsedmessages = await messages.json()

            this.setState({
                messages: parsedmessages.data
            })
        } catch (err) {
            console.log(err);
        }
    } 

    editmessage = (idOfMessageEdit) => {
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
            const updateResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/messages/${this.state.messageToEdit.id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state.messageToEdit),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })

            const updateResponseParsed = await updateResponse.json()

            const newmessageArrayWithUpdate = this.state.messages.map((message) => {
                if (message.id === updateResponseParsed.data.id) {
                    message = updateResponseParsed.data
                }
                return message 
            })

            this.setState({
                messages: newmessageArrayWithUpdate
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
        const deleteMessageResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/messages/${id}`, {
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
                        style={{ marginTop: '7em', height: '100%' }}
                        verticalAlign='top'
                        stackable
                    >
                        <Grid.Row>
                            <Button onClick={this.createMessage}>Create New message</Button>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <messageList
                                    messages={this.state.messages}
                                    deleteMessage={this.deleteMessage}
                                    editmessage={this.editmessage}
                                />
                            </Grid.Column>
                            <CreateMessage 
                                open={this.state.createModalOpen}
                                closeModal={this.closeCreateModal}
                                addmessage={this.addmessage}
                            />
                            <EditmessageModal 
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
                    You must be logged in to make a message. Death from above.
                </Grid>
                }
            </div>
        )
    }
}

export default messageContainer;