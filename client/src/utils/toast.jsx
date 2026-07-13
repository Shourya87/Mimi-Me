import toast from "react-hot-toast";

/* ===========================
   Success Toast
=========================== */

export const showSuccessToast = (title, message, id) => {
  toast.success(
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <div className="flex-1">
        <p className="text-[15px] font-semibold text-stone-900">{title}</p>

        <p className="mt-1 text-sm leading-6 text-stone-600">{message}</p>
      </div>
    </div>,
    {
      id,
      duration: 5000,
      position: "top-center",
      icon: false,
      style: {
        background: "#fff",
        border: "1px solid #e7e5e4",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        padding: "16px 18px",
        maxWidth: "420px",
      },
    },
  );
};

/* ===========================
   Error Toast
=========================== */

export const showErrorToast = (title, message, id) => {
  toast.error(
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

      <div className="flex-1">
        <p className="text-[15px] font-semibold text-stone-900">{title}</p>

        <p className="mt-1 text-sm leading-6 text-stone-600">{message}</p>
      </div>
    </div>,
    {
      id,
      duration: 5000,
      position: "top-center",
      icon: false,
      style: {
        background: "#fff",
        border: "1px solid #fecaca",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        padding: "16px 18px",
        maxWidth: "420px",
      },
    },
  );
};

/* ===========================
   Info Toast (Future)
=========================== */

export const showInfoToast = (title, message, id) => {
  toast(title, {
    id,
  });
};

/* ===========================
   Warning Toast (Future)
=========================== */

export const showWarningToast = (title, message, id) => {
  toast(title, {
    id,
  });
};
