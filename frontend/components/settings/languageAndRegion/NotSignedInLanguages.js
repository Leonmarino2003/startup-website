import React, { useEffect, useState } from "react";
import style from "./DisplayLanguage.module.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import languageJSON from "../../../languages.json";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../../redux/slices/userSlice";
import {
  handleDisplayLanguage,
  handleShowSettings,
  handleShowOverlay,
  handleProfileSettings,
  handleNotSignedInLanguages,
  hideAll,
} from "../../../redux/slices/componentSlice";
import { showNewPin } from "../../../redux/slices/mapSlice";
import languagesJson from "../../../languages.json";
import ProfilePage from "../ProfilePage";
import Image from "next/image";

function NotSignedInLanguages() {
  const dispatch = useDispatch();
  const [languages, setLanguages] = useState([]);
  const isLoggedIn = useSelector((state) => {
    return state.login.isLoggedIn;
  });

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  useEffect(() => {
    for (const language of Object.entries(languageJSON)) {
      const languageObj = {
        ISO: language[0],
        name: language[1].language,
        flag: language[1].flag,
      };
      setLanguages((prevVal) => {
        return [...prevVal, languageObj];
      });
    }
  }, []);

  function handleClosing() {
    dispatch(hideAll());
    dispatch(showNewPin(false));
  }

  function handleChangeLanguage(ISO) {
    dispatch(changeLanguage(ISO));
    localStorage.setItem("language", ISO);
    dispatch(handleDisplayLanguage(false));
    dispatch(handleShowOverlay(false));
  }

  return (
    <div className={`${"component-frame"} ${style.container}`}>
      <section className={style.header}>
        <div className={style.backBtn}>
          <button onClick={handleClosing}>
            {translations.close.toUpperCase()}
          </button>
        </div>
        <h1 className="componentHeader">{translations.languages}</h1>
      </section>
      <section className={style.languagesList}>
        {languages.map((language) => {
          return (
            <div
              key={language.ISO}
              className={style.option}>
              <button onClick={() => handleChangeLanguage(language.ISO)}>
                <Image
                  alt=""
                  key={language.flag}
                  src={"/" + language.flag}
                  width="20"
                  height="15"
                />
                <> </>
                {language.name}
              </button>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default NotSignedInLanguages;
