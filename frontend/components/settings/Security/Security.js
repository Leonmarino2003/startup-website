import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Security.module.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import {
  handleShowChangePassword,
  handleShowSecurity,
  handleShowSettings,
} from "../../../redux/slices/componentSlice";
import languagesJson from "../../../languages.json";

function Security() {
  const dispatch = useDispatch();

  function toChangePassword() {
    dispatch(handleShowChangePassword(true));
    dispatch(handleShowSecurity(false));
  }

  function goBack() {
    dispatch(handleShowSecurity(false));
    dispatch(handleShowSettings(true));
  }

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  return (
    <div className={`${"component-frame"} ${style.container}`}>
      <section className={style.header}>
        <MdKeyboardArrowLeft
          onClick={goBack}
          className={style.icon}
        />
        <h1 className="componentHeader">{translations.security}</h1>
      </section>
      <section className={style.optionsList}>
        <button onClick={toChangePassword}>
          {translations.changePassword}
        </button>
        {}
      </section>
    </div>
  );
}

export default Security;
