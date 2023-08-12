import React from "react";
import style from "./LoadingIcon.module.css";

function LoadingIcon() {
  return (
    <div className={style.loadingContainer}>
      {}
      <span
        title="loaderSpan"
        className={style.loader}></span>
    </div>
  );
}

export default LoadingIcon;
