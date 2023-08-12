import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ChangeEmail.module.css";
import {
  handleShowAccountSettings,
  handleShowChangeEmail,
  hideAll,
} from "../../../../redux/slices/componentSlice";
import { handleEmail } from "../../../../redux/slices/userSlice";
import languagesJson from "../../../../languages.json";
import { saveEmailInDB, verifyJWT } from "../../../../services/backendService";
import { onLostFocus } from "../../../../services/inputService";
import { showNewPin } from "../../../../redux/slices/mapSlice";


function EmailSettings() {
  const dispatch = useDispatch();
  const [changeEmail, setChangeEmail] = useState(false);
  const email = useSelector((state) => {
    return state.user.email;
  });

  function goBack() {
    dispatch(handleShowChangeEmail(false));
    dispatch(handleShowAccountSettings(true));
  }
  function handleClosing() {
    dispatch(hideAll());
    dispatch(showNewPin(false));
  }

  async function saveEmail(e) {
    e.preventDefault();

    const isLoggedIn = await verifyJWT();
    if (isLoggedIn) {
      if (!isLoggedIn.user) return;
    }
    const formData = new FormData(e.target);
    const formEmail = formData.get("email");

    const userObj = {
      formEmail,
      id: isLoggedIn.user,
    };
    const data = await saveEmailInDB(userObj);
    if (data.success) {
      dispatch(handleEmail({ formEmail }));
      setChangeEmail(false);
    }
  }

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  return (
    <div className={`${"component-frame"} ${styles.container}`}>
      <section className={styles.header}>
        <div className={styles.backBtn}>
          <button onClick={goBack}>
            {"<"} {translations.back}
          </button>
        </div>
        <h1 className="componentHeader">{translations.changeEmail}</h1>
      </section>
      {email.length > 0 && !changeEmail ? (
        <section className={styles.currentEmail}>
          <div className={styles.email}>
            <h2>{email}</h2>
          </div>
          <button
            onClick={() => {
              setChangeEmail(true);
            }}>
            {translations.change}
          </button>
        </section>
      ) : (
        <div className={styles.item}>
          <h3>{translations.enterEmail}</h3>
          <section className={styles.emailChange}>
            <form
              className="formContainer"
            >
              <label
                className="customField"
                htmlFor="email">
                <input
                  className="inputField"
                  styles={{ textAlign: "center" }}
                  onBlur={(e) => onLostFocus(e)}
                  name="email"
                  type="email"
                  required></input>
                <span className="placeholder">
                  {}{" "}
                  {translations.emailInput}
                </span>
              </label>

              <section className={styles.formButtons}>
                <button
                  className={styles.cancelBtn}
                  onClick={handleClosing}>
                  {translations.cancelBtn}
                </button>
                {}
              </section>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default EmailSettings;
