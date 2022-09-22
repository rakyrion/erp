import { Pane, Dialog } from 'evergreen-ui'
import './DeleteDialog.css'
function DeleteDialog({status, title, onConfirm, onCancelClick, item}) {
    const handleConfirm = () => {
        status = false
        if(onConfirm) onConfirm()
    }

    const handleCancel = () => {
        status = false
        if(onCancelClick){
            
            onCancelClick()
        }
    }
    return (
      <Pane>
        <Dialog
          isShown={status}
          title={title}
          intent="danger"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          confirmLabel="Delete"
        >
          Are you sure you want to delete this {item}?
        </Dialog>
      </Pane>
    )
  }

export default DeleteDialog