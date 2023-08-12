import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Privacy.module.css";
import {
  handleShowAbout,
  handleShowPrivacyPolicy,
} from "../../../../redux/slices/componentSlice";
import languagesJson from "../../../../languages.json";

function PrivacyPolicy() {
  const dispatch = useDispatch();

  function goBack() {
    dispatch(handleShowPrivacyPolicy(false));
    dispatch(handleShowAbout(true));
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
        <h1 className={style.componentHeader}>{translations.policy}</h1>
      </section>
      <div className={style.item}>
        <li>{translations.policyText}</li>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
