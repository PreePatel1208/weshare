import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import Register from '../Pages/Register'


const ModelComponent = ({Content,...props}) => {
    const [open, setOpen] = React.useState(false)

  return (
    <Modal
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    trigger={props.ButtonComp}
>
    <Modal.Header>Register</Modal.Header>
    <Modal.Content>
  <Content/>
  {/* {props.Content} */}
        {/* <Register {...{ setOpen }} /> */}
    </Modal.Content>
    <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
            Cancel
        </Button>

    </Modal.Actions>
</Modal>
  )
}

export default ModelComponent