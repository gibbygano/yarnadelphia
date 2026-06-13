import { TbCalendar, TbX } from "@preact-icons/tb";
import type { ComponentChildren } from "preact";

interface AlertProps {
  message: ComponentChildren;
  onDismissClick: () => void;
}

const Alert = ({ message, onDismissClick }: AlertProps) => {
  return (
    <div
      role="alert"
      class="alert alert-vertical sm:alert-horizontal sticky top-0 z-10 rounded-none px-3 py-1 flex-nowrap"
    >
      <TbCalendar class="w-6 h-6" />
      {message}
      <div>
        <button
          onClick={onDismissClick}
          type="button"
          class="btn btn-soft btn-square"
        >
          <TbX class="h-6 w-6 sm:h-4 sm:w-4" />
        </button>
      </div>
    </div>
  );
};

export { Alert };
