import React from 'react'
import { Card, Button, Image } from 'semantic-ui-react'

function BoardList(props) {

    const { boards } = props

    const boardsList = boards.map((board) => {

        return (

            <Card key={board.id}>
                <Image src={board.image} wrapped ui={false} />
                <Card.Content>
                    <Card.Header><i className="material-icons">place</i> {board.location}</Card.Header><br/>
                    <Card.Header><i className="material-icons">info</i> {board.name}</Card.Header><br/>
                    {/* <Card.Description>{board.loggedUser.username}</Card.Description> */}
                    <Card.Description><i className="material-icons">message</i> {board.body}</Card.Description><br/>
                </Card.Content>
                <Card.Content extra>
                    <Button onClick={() => props.deleteBoard(board.id)}>Delete Post-It
                    </Button>
                    <Button onClick={() => props.editBoard(board.id)}>Edit Post-It
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