import React from "react";

export default function InputCustom({ title, type, change, disabled, value }) {
  const today = new Date().toISOString().slice(0, 16);

  return (
    <div className="input-container-custom">
      <label className="input-label" htmlFor="">
        {title}
      </label>
      <input min={type == "datetime-local" ? today : ""} disabled={disabled} onChange={(e) => change(e.currentTarget.value)} className={disabled ? "input-disabled" : "input"} type={type}  value={value}/>
    </div>
  );
}
