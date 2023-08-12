import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./LanguageRegion.module.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import {
  handleShowLanguageAndRegion,
  handleShowSettings,
  handleDisplayLanguage,
} from "../../../redux/slices/componentSlice";
import languagesJson from "../../../languages.json";

function LanguageRegion() {
  const dispatch = useDispatch();

  function goBack() {
    dispatch(handleShowLanguageAndRegion(false));
    dispatch(handleShowSettings(true));
  }

  function displayLanguageClick() {
    dispatch(handleDisplayLanguage(true));
    dispatch(handleShowLanguageAndRegion(false));
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
        <h1>{translations.settings}</h1>
      </section>
      <section className={style.languagesList}>
        {/* <button>{translations.countryOfResidence}</button> */}
        <button onClick={displayLanguageClick}>
          {translations.displayLanguage}
        </button>
      </section>
    </div>
  );
}

export default LanguageRegion;
