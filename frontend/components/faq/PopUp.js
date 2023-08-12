import React from "react";
import { FaAngleDoubleDown } from "react-icons/fa";
import styles from "./faq.module.css";

const PopUp = (props) => {
  return (
    <div className={styles.popupbox}>
      <div className={styles.box}>
        <span
          className={styles.closeicon}
          onClick={props.handleClose}>
          <FaAngleDoubleDown />
        </span>
        {props.content}
      </div>
    </div>
  );
};

export default PopUp;
