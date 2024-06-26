
import { NewUserModal } from "./modals/NewUser"
import { NewMessageModal } from "./modals/NewMessage"
import { NewInstanceModal } from "./modals/NewInstance"
import { ConfirmModal } from "./modals/Confirm"
import { EditUserModal } from "./modals/EditUser"

export const Modals = () => {

    return (

        <>
            <NewUserModal />
            <NewMessageModal />
            <NewInstanceModal />
            <ConfirmModal />
            <EditUserModal />
        </>
    )
}
