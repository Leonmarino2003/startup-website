import React from "react";
import style from "./BiggerLoadingIcon.module.css";

function BiggerLoadingIcon() {
  return (
    <div className={style.loadingContainer}>
      <div className={style.lds_roller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default BiggerLoadingIcon;
