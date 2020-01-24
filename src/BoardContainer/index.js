import React, { Component } from 'react';
import CreateBoard from '../CreateBoardForm';
import BoardList from '../BoardList';
import EditBoardModal from '../EditBoardModal';
import { Grid, Button } from 'semantic-ui-react';

class BoardContainer extends Component {
    state = {
        boards: [],
        createModalOpen: false,
        editModalOpen: false,
        boardToEdit: {
            name: '',
            user: '',
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
            const createdBoardResponse = await fetch(`${process.env.REACT_APP_APT_URL}/api/v1/boards/`, {
                method: 'POST',
                body: JSON.stringify(boardFromTheForm),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const parsedResponse = await createdBoardResponse.json();

            this.setState({
                dogs: [...this.state.dogs, parsedResponse.data]
            })

            this.closeCreateModal()
        } catch (err) {
            console.log('error: ', err)
        }
    }

    closeCreateModal = () => {
        this.setState(
            { createModalOpen: false }
        });

    componentDidMount() {
        this.getBoards();
    }

    getBoards = async () => {
        try {
            const boards = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/boards`, { credentials: 'include' });
            const parsedBoards = await boards.json();

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
                [e.target.name]:
                e.target.value
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

            const newBoardArrayWithUpdate = 
            this.state.boards.map((board) => {
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
        const deletedBoardResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/boards/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        const deleteBoardParsed = await 
        deleteBoardResponse.json();

        this.setState({
            dogs: this.state.boards.filter((board) => board.id !== id)
        })
    }

    render() {
        const { loggedIn } = this.props
        return (
            <div>
                { loggedIn 
                        ?
                        <Grid 
                            textAlign='center'
                            style={{ marginTop: '7em', height: '100%'}}
                            verticalAlign='top'
                            stackable
                        >
                            <Grid.Row>
                                <Button onClick={this.createBoard}>Create New Message</Button>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <BoardList
                                        boards={this.state.boards}
                                        deleteBoard={this.deleteBoard}
                                        editBoard={this.editBoard}
                                    />
                                </Grid.Column>
                                <CreateBoard 
                                    open={this.state.createModalOpen}
                                    closeModal={this.closeCreateModal}
                                    addBoard={this.addBoard}
                                    ref={this.createDogFormRef}
                                />
                                <EditBoardModal 
                                    open={this.state.editModalOpen}
                                    updateBoard={this.updateBoard}
                                    dogToEdit={this.closeEditModal}
                                    handleEditChange={this.handleEditChange}
                                />
                            </Grid.Row>
                        </Grid>
                        :
                        <Grid 
                            textAlign='center'
                            style={{ marginTop: '7em', heigh: '100%' }}
                            verticalAlign='top'
                            stackable
                        >
                            You must be logged in to post a message.
                </Grid>
                }
            </div>
        )
    }
}

export default BoardContainer;