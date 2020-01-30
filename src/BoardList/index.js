import React from 'react'
import { Card, Button, Image } from 'semantic-ui-react'

function BoardList(props) {

    const { boards } = props

    const boardsList = boards.map((board) => {

        return (

            <Card key={board.id}>
                <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{board.name}</Card.Header>
                    <Card.Description>{board.loggedUser.username}</Card.Description>
                    <Card.Description>{board.body}</Card.Description>
                </Card.Content>
                <Card.Group>
                    <Card fluid color='red' header='Option 1' />
                    <Card fluid color='orange' header='Option 2' />
                    <Card fluid color='yellow' header='Option 3' />
                </Card.Group>
                <Card.Content extra>
                    <Button onClick={() => props.deleteBoard(board.id)}>Delete Board
                    </Button>
                    <Button onClick={() => props.editBoard(board.id)}>Edit Board
                    </Button>
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