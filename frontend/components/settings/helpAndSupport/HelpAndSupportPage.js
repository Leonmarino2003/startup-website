import React from "react";
import style from "./HelpAndSupportPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  handleShowHelpAndSupportPage,
  handleShowSettings,
  handleShowUserFeedback,
} from "../../../redux/slices/componentSlice";
import languagesJson from "../../../languages.json";
import {
  MdOutlineArrowForwardIos,
  MdBorderColor,
} from "react-icons/md";

function AccountSettings() {
  const dispatch = useDispatch();

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  function toFeedback() {
    dispatch(handleShowHelpAndSupportPage(false));
    dispatch(handleShowUserFeedback(true));
  }

  function goBack() {
    dispatch(handleShowHelpAndSupportPage(false));
    dispatch(handleShowSettings(true));
  }
  return (
    <div className={`${"component-frame"} ${style.container}`}>
      <section className={style.header}>
        <div className={style.backBtn}>
          <button onClick={goBack}>
            {"<"} {translations.back}
          </button>
        </div>
        <h1 className={style.componentHeader}>{translations.helpAndSupport}</h1>
      </section>
      <div className={style.item}>
        {/*Button for change Contact us */}
        <section className={style.helpChoices}>
          {}
          {/*Button for change Feedback */}
          <button onClick={toFeedback}>
            <MdBorderColor className={style.icons} />
            {translations.sendFeedback}
            <MdOutlineArrowForwardIos className={style.arrow} />
          </button>
          {}
          {}
        </section>
      </div>
    </div>
  );
}

export default AccountSettings;
