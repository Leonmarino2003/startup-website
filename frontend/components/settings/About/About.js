// This is the old AboutPage thats on main, dont use this! When dev is merged in to main delete the whole folder

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./About.module.css";
import {
  MdKeyboardArrowLeft,
  MdOutlineArrowForwardIos,
  MdOutlinePrivacyTip,
  MdPrivacyTip,
  MdOutlineAutoStories,
  MdAutoStories,
} from "react-icons/md";
import {
  handleShowAbout,
  handleShowSettings,
} from "../../../redux/slices/componentSlice";
import languagesJson from "../../../languages.json";

function About() {
  const dispatch = useDispatch();

  function goBack() {
    dispatch(handleShowAbout(false));
    dispatch(handleShowSettings(true));
  }

  function openTerms() {
    window.open("https://ploteye.com/terms-of-service");
  }

  function openPolicy() {
    window.open("https://ploteye.com/privacy-policy");
  }

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  return (
    <div className={`${"component-frame"} ${style.container}`}>
      <section className={style.header}>
        <div className={style.backBtn}>
          <button onClick={goBack}>
            {"<"} {translations.back}
          </button>
        </div>
        <h1 className={style.componentHeader}>{translations.about}</h1>
      </section>
      <div className={style.item}>
        <section className={style.aboutChoices}>
          {/* Button for privacy policy */}
          <button onClick={openPolicy}>
            <MdOutlinePrivacyTip className={style.icons} />
            {translations.policy}
            <MdOutlineArrowForwardIos className={style.arrow} />
          </button>
          {/* Button for terms of use */}
          <button onClick={openTerms}>
            <MdOutlineAutoStories className={style.icons} />
            {translations.terms}
            <MdOutlineArrowForwardIos className={style.arrow} />
          </button>
        </section>
      </div>
    </div>
  );
}

export default About;
