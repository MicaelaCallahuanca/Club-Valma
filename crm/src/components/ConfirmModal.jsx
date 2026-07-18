import Modal from "./Modal";

// Shared destructive-action confirmation — every delete in the CRM routes
// through this so nothing is ever removed on a single click.
export default function ConfirmModal({
  open,
  title = "¿Eliminar este registro?",
  message,
  confirmLabel = "Eliminar",
  onConfirm,
  onCancel,
}) {
  return (
    <Modal open={open} onClose={onCancel} title={title} maxWidth="max-w-sm">
      <p className="text-sm text-text-body">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-[3px] border border-border-gray px-4 py-2 text-sm font-semibold text-text-body hover:bg-surface-tint"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-[3px] bg-status-critical-dot px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
