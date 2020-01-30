import React from 'react'
import MessageContainer from '../MessageContainer'
import { Card, Button, Message } from 'semantic-ui-react'

function BoardList(props) {

    const { boards } = props

    const boardsList = boards.map((board) => {

        return (

            <Card key={board.id}>
                <Card.Content>
                    <Card.Header>{board.name}</Card.Header>
                    <Card.Description>{board.loggedUser.username}</Card.Description>
                    <Card.Description>{board.body}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button onClick={() => props.deleteBoard(board.id)}>Delete Board
                    </Button>
                    <Button onClick={() => props.editBoard(board.id)}>Edit Board
                    </Button>
                    <Button onClick={() =>  <MessageContainer {...props}/>}>Comment</Button>
                </Card.Content>
            </Card>
        )
    })

    return (
        <Card.Group centered>
            { boardsList }
        </Card.Group>
    )
}

export default BoardList