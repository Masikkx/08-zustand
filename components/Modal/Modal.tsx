'use client';

import css from "./Modal.module.css";
import { useRouter } from "next/navigation";

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  const router = useRouter();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        {children}
        <button className={css.button} onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;