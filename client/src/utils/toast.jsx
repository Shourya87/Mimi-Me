import toast from "react-hot-toast";
import { Check, X, Info, AlertTriangle } from "lucide-react";

const toastStyle = {
  duration: 4500,
  position: "top-center",
  icon: false,
  style: {
    background: "#FFFCF9",
    border: "1px solid #E6D9CC",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(109, 91, 77, 0.10)",
    padding: "14px 16px",
    maxWidth: "420px",
    color: "#4F3C30",
  },
};

const ToastContent = ({ type, title, message }) => {
  const config = {
    success: {
      icon: Check,
      iconClass: "bg-[#E5EFE5] text-[#60755F]",
    },
    error: {
      icon: X,
      iconClass: "bg-[#F4E3E1] text-[#9A5F58]",
    },
    info: {
      icon: Info,
      iconClass: "bg-[#F1E7DE] text-[#74533F]",
    },
    warning: {
      icon: AlertTriangle,
      iconClass: "bg-[#F4E8D6] text-[#9A7754]",
    },
  };

  const { icon: Icon, iconClass } = config[type];

  return (
    <div className="flex items-start gap-3">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconClass}`}
      >
        <Icon size={19} strokeWidth={2.2} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[#4F3C30]">
          {title}
        </p>

        {message && (
          <p className="mt-0.5 text-xs leading-5 text-[#806F60]">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

/* Success Toast */
export const showSuccessToast = (title, message, id) => {
  toast.success(
    <ToastContent
      type="success"
      title={title}
      message={message}
    />,
    {
      ...toastStyle,
      id,
    },
  );
};

/* Error Toast */
export const showErrorToast = (title, message, id) => {
  toast.error(
    <ToastContent
      type="error"
      title={title}
      message={message}
    />,
    {
      ...toastStyle,
      id,
      style: {
        ...toastStyle.style,
        border: "1px solid #E8D0CD",
      },
    },
  );
};

/* Info Toast */
export const showInfoToast = (title, message, id) => {
  toast(
    <ToastContent
      type="info"
      title={title}
      message={message}
    />,
    {
      ...toastStyle,
      id,
    },
  );
};

/* Warning Toast */
export const showWarningToast = (title, message, id) => {
  toast(
    <ToastContent
      type="warning"
      title={title}
      message={message}
    />,
    {
      ...toastStyle,
      id,
      style: {
        ...toastStyle.style,
        border: "1px solid #E7D8C4",
      },
    },
  );
};