import React, { useEffect, useState } from "react";
import style from "./DisplayLanguage.module.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import languageJSON from "../../../languages.json";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../../redux/slices/userSlice";
import {
  handleDisplayLanguage,
  handleShowSettings,
  handleShowOverlay,
} from "../../../redux/slices/componentSlice";
import languagesJson from "../../../languages.json";
import Image from "next/image";

function DisplayLanguage() {
  const dispatch = useDispatch();
  const [languages, setLanguages] = useState([]);


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

  function goBack() {
    dispatch(handleDisplayLanguage(false));
    dispatch(handleShowSettings(true));
  }

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
          <button onClick={goBack}>
            {"<"} {translations.back}
          </button>
        </div>
        <h1 className="componentHeader">{translations.languages}</h1>
      </section>
      <section className={style.languagesList}>
        {languages.map((language) => (
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
              {languageToUse == language.ISO && (
                <div className={style.pseudoElement}>
                  <AiOutlineCheckCircle
                    data-testid={language.ISO + "-selected"}
                    className={style.selectedIcon}
                  />
                </div>
            )}
            </div>
          )
        )}
      </section>
    </div>
  );
}

export default DisplayLanguage;
