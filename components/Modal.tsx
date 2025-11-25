import { TbX } from "@preact-icons/tb";
import type { RefObject, VNode } from "preact";

interface props {
  modalRef: RefObject<HTMLDialogElement>;
  children: VNode | VNode[];
}

const Modal = ({ modalRef, children }: props) => {
  return (
    <dialog ref={modalRef} class="modal modal-bottom sm:modal-middle">
      <div class="modal-box w-fit">
        <form method="dialog">
          <button
            type="submit"
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            <TbX class="text-xl" />
          </button>
        </form>
        {children}
      </div>
      <form method="dialog" class="modal-backdrop">
        <button type="submit">close</button>
      </form>
    </dialog>
  );
};

export { Modal };
