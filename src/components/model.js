import React from "react";
import "../styles/modal.scss"

export default function Modal({ open, setOpen, children,style }) {
    return (
      <>
        {open && (
          <div className="modal-container" style={{...style}}>
            <div className="modal-backdrop" onClick={() => setOpen(false)}  style={{...style}}/>
            {children}
          </div>
        )}
      </>
    );
  }