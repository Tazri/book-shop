import React from "react";
import style from "./styles/ButtonSpinner.module.css";

function ButtonSpinner({
  width = "20px",
  padding = "2px",
  background = "white",
}) {
  return (
    <div
      style={{ width: width, padding: padding, background: background }}
      className={style.loader}
    ></div>
  );
}

export default ButtonSpinner;
