import React, { useState } from "react";

import Select from "react-select";

export default function SelectCustom({ data, title, change }) {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
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
        // defaultValue={data[0]}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={false}
        isRtl={false}
        isSearchable={true}
        name="color"
        options={data}
        onChange={change}
        placeholder={"Selecione"}
      />
    </div>
  );
}
