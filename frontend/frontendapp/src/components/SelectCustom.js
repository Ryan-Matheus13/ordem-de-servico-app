import React, { useEffect, useState } from "react";

import Select from "react-select";

export default function SelectCustom({ data, title, change, value, disabled, index }) {

  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [defaultValue, setDefaultValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  return (
    <div className="input-container-custom">
      <label className="input-label" htmlFor="">
        {title}
      </label>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={value}
        isDisabled={disabled}
        isLoading={isLoading}
        isClearable={false}
        isRtl={false}
        isSearchable={true}
        name="color"
        options={data}
        onChange={change}
        placeholder={"Selecione"}
        // value={value}
      />
    </div>
  );
}
