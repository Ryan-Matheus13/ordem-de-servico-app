import React from "react";

export default function InputCustom({ title, type, change }) {

  return (
    <div className="input-container-custom">
      <label className="input-label" htmlFor="">
        {title}
      </label>
      <input onChange={(e) => change(e.currentTarget.value)} className="input" type={type} />
    </div>
  );
}
