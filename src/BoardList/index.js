import React from 'react'
import { Card, Button, Image, Comment, Form } from 'semantic-ui-react'


async function addMessage (messageFromTheForm) {
   
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

function BoardList(props) {

    const { boards } = props

    

    const boardsList = boards.map((board) => {

        return (

            <Card key={board.id}>
                <Image src={board.image} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{board.name}</Card.Header>
                    <Card.Description>{board.loggedUser.username}</Card.Description>
                    <Card.Description>{board.body}</Card.Description>
                </Card.Content>
                <Comment.Group>
    <Comment>
      <Comment.Content>
        <Comment.Author as='a'>DaveIsNotHere</Comment.Author>
        <Comment.Metadata>
            <div>2001 years ago</div>
        </Comment.Metadata>
        <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
        <Comment.Text>Dave Really Sucks. No Joke!</Comment.Text>
        <Comment.Author as='a'>CuntFaceMcfuckAll</Comment.Author>
        <Comment.Metadata>
          <div>2000 years ago</div>
        </Comment.Metadata>
        <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
        <Comment.Text>Dave Sux</Comment.Text>
        <Comment.Author as='a'>noDave</Comment.Author>
        <Comment.Metadata>
            <div>999 years ago</div>
        </Comment.Metadata>
        <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
        <Comment.Text>Yha, Fuck that guy!</Comment.Text>
        <Comment.Actions>
          <Comment.Action active>Comment:</Comment.Action>
        </Comment.Actions>
        <Form reply>
          <Form.TextArea />
          <Button onClick={addMessage()}
            content='Make It So'
            labelPosition='left'
            icon='edit'
            primary
            
          />
        </Form>
      </Comment.Content>
    </Comment>
  </Comment.Group>
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