import type { RefObject, VNode } from "preact";

interface props {
  modalRef: RefObject<HTMLDialogElement>;
  children: VNode | VNode[];
}

const Modal = ({ modalRef, children }: props) => {
  return (
    <dialog ref={modalRef} class="modal modal-bottom sm:modal-middle">
      <div class="modal-box w-fit">
        {children}
      </div>
      <form method="dialog" class="modal-backdrop">
        <button type="submit">close</button>
      </form>
    </dialog>
  );
};

export { Modal };
