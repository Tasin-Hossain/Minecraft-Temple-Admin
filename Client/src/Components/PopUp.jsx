import React, { useEffect, useRef, useState } from "react";

// creating model
export default function Modal({
  isOpen = false,
  onClose = () => {},
  title = "",
  children,
  className = "",
  showCloseButton = true,
  positionClassName = "",
  width = "100%", // default width
  height = "auto", // default height
  maxWidth = "600px", // default maxWidth
  maxHeight = "80vh", // default maxHeight
}) {
  const contentRef = useRef(null);

  // 👉 BODY SCROLL LOCK BUT SHOW SCROLLBAR
  useEffect(() => {
    const scrollY = window.scrollY;

    if (isOpen) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflowY = "scroll"; // scrollbar always visible
    } else {
      const y = parseInt(document.body.style.top || "0") * -1;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflowY = "";
      window.scrollTo(0, y);
    }

    return () => {
      const y = parseInt(document.body.style.top || "0") * -1;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflowY = "";
      window.scrollTo(0, y);
    };
  }, [isOpen]);

  // CLICK OUTSIDE TO CLOSE
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contentRef.current && !contentRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed  inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-[1px] bg-black/60 p-4">
      <div
        ref={contentRef}
        className={`absolute rounded-md bg-(--card)
          ${className} ${positionClassName}`}
        style={{
          width,
          height,
          maxWidth,
          maxHeight,
          overflowY: "auto",
        }}
      >
        <div className="flex items-start justify-between gap-4 py-4 px-4 border-b border-(--border)">
          <h2
            id="modal-title"
            className="title"
          >
            {title}
          </h2>
          {showCloseButton && (
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="text-(--muted-text) text-[18px] cursor-pointer hover:text-(--theme)"
            >
              ✕
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

export function Popup({
  buttonTitle = "Open Popup",
  buttonClassName = "btn",
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)} className={buttonClassName}>
        {buttonTitle}
      </button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        positionClassName="top-32"
        title="Change Email"
        width="800px" // custom width
        height="auto" // custom height
        maxWidth="90%" // optional max width
      >
        
      </Modal>
    </div>
  );
}

