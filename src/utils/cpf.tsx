import React from "react";
import PropTypes from "prop-types";

const CpfCnpj = (props: any) => {
  const TYPES = {
    CPF: "999.999.999-999",
    CNPJ: "99.999.999/9999-99",
  };
  const MAX_LENGTH = clear(TYPES.CNPJ).length;

  const { onChange, type } = props;

  let value = clear(props.value);

  if (value) {
    value = applyMask(value, TYPES[getMask(value)]);
  }

  function onLocalChange(ev: any) {
    let value = clear(ev.target.value);
    const mask = getMask(value);

    let nextLength = value.length;

    if (nextLength > MAX_LENGTH) return;

    value = applyMask(value, TYPES[mask]);

    ev.target.value = value;

    onChange(ev, mask);
  }

  function getMask(value: any) {
    return value.length > 11 ? "CNPJ" : "CPF";
  }

  function applyMask(value: any, mask: any) {
    let result = "";

    let inc = 0;
    Array.from(value).forEach((letter, index) => {
      if (!mask[index + inc].match(/[0-9]/)) {
        result += mask[index + inc];
        inc++;
      }
      result += letter;
    });
    return result;
  }

  function clear(value: any) {
    return value && value.replace(/[^0-9]/g, "");
  }

  return (
    <input {...props} placeholder={props.placeholder} className={props.className} type={type} value={value} onChange={onLocalChange} />
  );
};

CpfCnpj.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

CpfCnpj.defaultProps = {
  type: "tel",
  value: "",
  onChange: () => {},
  placeholder: "",
  className: "",
};

export default CpfCnpj;