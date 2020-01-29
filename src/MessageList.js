import React from 'react'
import { Card, Button } from 'semantic-ui-react'

function MessageList(props) {

    const { messages } = props

    const messagesList = messages.map((message) => {

        return (
            <Card key={message.id}>
                <Card.Content>
                    <Card.Header>{message.name}</Card.Header>
                    <Card.Description>{message.body}</Card.Description>
                    <Card.Description>{message.loggedUser.username}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button onClick={() => props.deleteMessage(message.id)}>Delete
                    </Button>
                    <Button onClick={() => props.editMessage(message.id)}>Edit message
                    </Button>
                </Card.Content>
            </Card>
        )
    })

    return (
        <Card.Group centered>
            { messagesList }
        </Card.Group>
    )
}

export default MessageList