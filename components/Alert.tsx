import { TbCalendarEvent, TbX } from "@preact-icons/tb";
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
      <TbCalendarEvent class="hidden lg:block h-8 w-8" />
      {message}
      <div>
        <button
          onClick={onDismissClick}
          type="button"
          class="btn btn-soft btn-square"
        >
          <TbX class="lg:h-6 lg:w-6 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export { Alert };
