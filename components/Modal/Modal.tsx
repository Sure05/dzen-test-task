import styles from './styles.module.scss'
import React, {PropsWithChildren} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose, faTrashCan} from "@fortawesome/free-solid-svg-icons";

type ModalProps = {
    title: string,
    open: boolean,
    close: () => void
}
const Modal: React.FC<PropsWithChildren & ModalProps> = ({children, title, open, close}) => {
    if(!open) return null
    return (
        <>
            <div className={`modal show modal-dialog-centered ${styles.modal}`}>
                <div className={`modal-dialog modal-lg ${styles.modal_dialog_content}`}>
                    <div className="shadow modal-content">
                        <div className={`modal-header ${styles.modal_head}`}>
                            <h5 className="modal-title">{title}</h5>
                            <button onClick={close} className={`shadow ${styles.modal__close}`}>
                                <FontAwesomeIcon icon={faClose} color={'darkgray'}/>
                            </button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                        <div className={`modal-footer ${styles.modal_footer}`}>
                            <button onClick={close} type="button" className={`${styles.modal_footer__cansel_button} ${styles.modal_footer__button}`} data-bs-dismiss="modal">Close</button>
                            <button type="button" className={`shadow ${styles.modal_footer__apply_button} ${styles.modal_footer__button}`}>
                                <FontAwesomeIcon icon={faTrashCan} color={"red"}/>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div onClick={close} className="modal-backdrop fade show position-absolute" style={{top: '-45px'}}></div>
        </>
    )
}

export default Modal
