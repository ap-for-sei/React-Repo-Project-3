import React, { Component } from 'react'
import CreateBoard from '../CreateBoardForm'
import BoardList from '../BoardList'
import EditBoardModal from '../EditBoardModal'
import { Grid, Button } from 'semantic-ui-react'
// import MessageContainer from '../MessageContainer'

class BoardContainer extends Component {

    state = {
        boards: [],
        createModalOpen: false,
        editModalOpen: false,
        boardToEdit: {
            name: '',
            loggedUser: '',
            body: '',
            id: '',
        }
    }

    createBoard = () => {
        this.setState({
            createModalOpen: true
        })
    }

    addBoard = async (e, boardFromTheForm) => {
        e.preventDefault();

        try {
            console.log(boardFromTheForm)
            const createdBoardResponse = await fetch(`http://localhost:8000/api/v1/boards/`, {
                method: 'POST',
                body: JSON.stringify(boardFromTheForm),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const parsedResponse = await createdBoardResponse.json()

            this.setState({
                boards: [...this.state.boards, parsedResponse.data]
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
        this.getBoards()
    }

    getBoards = async () => {
        try {
            const boards = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/boards/`, { credentials: 'include' })
            const parsedBoards = await boards.json()

            this.setState({
                boards: parsedBoards.data
            })
        } catch (err) {
            console.log(err);
        }
    } 
    
    editBoard = (idOfBoardEdit) => {
        const boardToEdit = this.state.boards.find(board => board.id === idOfBoardEdit)

        this.setState({
            editModalOpen: true,
            boardToEdit: {
                ...boardToEdit
            }
        })
    }

    handleEditChange = (e) => {
        this.setState({
            boardToEdit: {
                ...this.state.boardToEdit,
                [e.target.name]: e.target.value
            }
        })
    }

    updateBoard = async (e) => {
        e.preventDefault()

        try {
            const updateResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/boards/${this.state.boardToEdit.id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state.boardToEdit),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })

            const updateResponseParsed = await updateResponse.json()

            const newBoardArrayWithUpdate = this.state.boards.map((board) => {
                if (board.id === updateResponseParsed.data.id) {
                    board = updateResponseParsed.data
                }
                return board 
            })

            this.setState({
                boards: newBoardArrayWithUpdate
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

    deleteBoard = async (id) => {
        const deleteBoardResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/boards/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })

        const deleteBoardParsed = await deleteBoardResponse.json()

        this.setState({
            boards: this.state.boards.filter((board) => board.id !== id)
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
                    >
                        <Grid.Row>
                            <Button onClick={this.createBoard}>Create New Board</Button>
                        </Grid.Row>
                            {/* <Grid.Row>
                                <MessageContainer boardId={this.state.boardToShow} {...this.props}/>
                            </Grid.Row> */}
                            <Grid.Row>
                                <BoardList
                                    boards={this.state.boards}
                                    deleteBoard={this.deleteBoard}
                                    editBoard={this.editBoard}
                                />
                            </Grid.Row>
                            <CreateBoard 
                                open={this.state.createModalOpen}
                                closeModal={this.closeCreateModal}
                                addBoard={this.addBoard}
                            />
                            <EditBoardModal 
                                open={this.state.editModalOpen}
                                updateBoard={this.updateBoard}
                                boardToEdit={this.state.boardToEdit}
                                closeModal={this.closeEditModal}
                                handleEditChange={this.handleEditChange}
                            />
                    </Grid>
                :
                <Grid 
                    textAlign='center'
                    style={{ marginTop: '7em', height: '100%' }}
                    verticalAlign='top'
                    
                >
                    You must be logged in to make a board.
                </Grid>
                }
            </div>
        )
    }
}

export default BoardContainer;