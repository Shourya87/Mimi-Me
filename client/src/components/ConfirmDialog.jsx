import { AlertTriangle, X } from "lucide-react";
import clsx from "clsx";

export default function ConfirmDialog({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
  variant = "danger",
}) {
  if (!isOpen) return null;

  const confirmStyles = {
    danger:
      "bg-[#9A5F58] text-white hover:bg-[#834D48] focus:ring-[#F1DDDA]",
    primary:
      "bg-[#74533F] text-white hover:bg-[#604330] focus:ring-[#E8D8C6]",
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#4F3C30]/35 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-[#E6D9CC] bg-[#FFFCF9] shadow-[0_20px_60px_rgba(79,60,48,0.18)]">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 pt-6">
          <div className="flex items-start gap-3">
            <div
              className={clsx(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
                variant === "danger"
                  ? "bg-[#F4E3E1] text-[#9A5F58]"
                  : "bg-[#F3E8DE] text-[#74533F]",
              )}
            >
              <AlertTriangle size={20} strokeWidth={1.8} />
            </div>

            <div>
              <h2
                id="confirm-dialog-title"
                className="text-lg font-semibold tracking-tight text-[#4F3C30]"
              >
                {title}
              </h2>

              <p className="mt-1.5 text-sm leading-6 text-[#8D7968]">
                {message}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            aria-label="Close dialog"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#9A8879] transition hover:bg-[#F3E8DE] hover:text-[#6d5b4d] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-[#EDE3DA] px-6 py-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-xl border border-[#E2D5C9] bg-[#FAF7F3] px-5 py-2.5 text-sm font-semibold text-[#6d5b4d] transition-all duration-300 hover:border-[#D3B8A3] hover:bg-[#F3E8DE] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={clsx(
              "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60",
              confirmStyles[variant] || confirmStyles.danger,
            )}
          >
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}

            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}