import React from "react";
import style from "./NotificationSettings.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  handleShowNotificationSettings,
  handleShowSettings,
} from "../../../redux/slices/componentSlice";
import languagesJson from "../../../languages.json";

function Notifications() {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  function goBack() {
    dispatch(handleShowNotificationSettings(false));
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
        <h1 className={style.componentHeader}>{translations.notifications}</h1>
      </section>

      <div className={style.item}>
        {/* Button for toggle notifications */}
        <section className={style.notificationsChoices}>
          <li className={style.toggleSwitch}>
            {translations.notifications}
            <input
              type="checkbox"
              onClick={() => setActive(!active)}
            />
          </li>
        </section>

        {/* Button for bids on my plot */}
        <section className={style.notificationsChoices}>
          <li className={style.toggleOptions}>
            {translations.bidsOnMyPlot}
            <input
              type="checkBox"
              disabled={!active}
            />
          </li>
        </section>

        {/* Button for when I've been outbid */}
        <section className={style.notificationsChoices}>
          <li className={style.toggleOptions}>
            {translations.whenOutBid}
            <input
              type="checkBox"
              disabled={!active}
            />
          </li>
        </section>

        {/* Button for updates for plots I follow */}
        <section className={style.notificationsChoices}>
          <li className={style.toggleOptions}>
            {translations.updatesOnFollowed}
            <input
              type="checkBox"
              disabled={!active}
            />
          </li>
        </section>
      </div>
    </div>
  );
}

export default Notifications;
