import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import ModelComponent from './Model'

const Topbar = () => {
    const [open, setOpen] = React.useState(false)
    
let Content=()=>{
    return(
        <Register/>
    )
}
let Content1=()=>{
    return(
        <Login/>
    )
}

    return (
        <>

            <div class="ui secondary  menu">
                <a class="active item">
                    Home
                </a>
                <a class="item">
                    Messages
                </a>
                <a class="item">
                    Friends
                </a>
                <div class="right menu">
                    <div class="item">
                        <div class="ui icon input">
                            <input type="text" placeholder="Search..." />
                            <i class="search link icon"></i>
                        </div>
                    </div>
                    <ModelComponent {...{Content}} ButtonComp={<button class="ui primary button" >Register</button>}></ModelComponent>
                    <ModelComponent {...{Content}}  ButtonComp={<button class="ui primary button" >Login</button>}></ModelComponent>
                    {/* <Modal
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        trigger={<button class="ui primary button" >Sign Up</button>}
                    >
                        <Modal.Header>Register</Modal.Header>
                        <Modal.Content>
                            <Register {...{ setOpen }} />
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='black' onClick={() => setOpen(false)}>
                                Cancel
                            </Button>

                        </Modal.Actions>
                    </Modal> */}

                    {/* <Modal
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        trigger={<button class="ui primary button" >Login</button>}
                    >
                        <Modal.Header>Login</Modal.Header>
                        <Modal.Content>
                            <Login {...{ setOpen }} />
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='black' onClick={() => setOpen(false)}>
                                Cancel
                            </Button>

                        </Modal.Actions>
                    </Modal> */}
                </div>
            </div>


        </>
    )
}

export default Topbar


