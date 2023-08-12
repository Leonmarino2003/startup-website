import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ChangePhoneNumber.module.css";
import {
  handleShowAccountSettings,
  handleShowChangePhoneNumber,
  hideAll,
} from "../../../../redux/slices/componentSlice";
import { handlePhoneNumber } from "../../../../redux/slices/userSlice";
import languagesJson from "../../../../languages.json";
import {
  verifyJWT,
  savePhoneNumberInDB,
} from "../../../../services/backendService";
import { onLostFocus } from "../../../../services/inputService";
import { showNewPin } from "../../../../redux/slices/mapSlice";

function PhoneSettings() {
  const dispatch = useDispatch();
  const [changePhoneNumber, setChangePhoneNumber] = useState(false);
  const phoneNumber = useSelector((state) => {
    return state.user.phoneNumber;
  });

  async function savePhoneNumber(e) {
    e.preventDefault();

    const isLoggedIn = await verifyJWT();
    if (isLoggedIn) {
      if (!isLoggedIn.user) return;
    }
    const formData = new FormData(e.target);
    const formPhoneNumber = formData.get("phoneNumber");

    const userObj = {
      formPhoneNumber,
      id: isLoggedIn.user,
    };
    const data = await savePhoneNumberInDB(userObj);
    if (data.success) {
      dispatch(handlePhoneNumber({ formPhoneNumber }));
      setChangePhoneNumber(false);
    }
  }

  function goBack() {
    dispatch(handleShowChangePhoneNumber(false));
    dispatch(handleShowAccountSettings(true));
  }

  function handleClosing() {
    dispatch(hideAll());
    dispatch(showNewPin(false));
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
        <h1 className={styles.h}>{translations.PhoneNumber}</h1>
      </section>
      {phoneNumber && !changePhoneNumber ? (
        <section className={styles.currentNumber}>
          <div className={styles.number}>
            <h2>{phoneNumber}</h2>
          </div>
          <button
            onClick={() => {
              setChangePhoneNumber(true);
            }}>
            {translations.change}
          </button>
        </section>
      ) : (
        <div className={styles.item}>
          <h3>{translations.enterPhone}</h3>
          <section className={styles.dateChange}>
            <form
              className="formContainer"
              onSubmit={savePhoneNumber}>
              <div className={styles.inputRow}>
                <label
                  className="customField"
                  htmlFor="phoneNumber">
                  <input
                    className="inputField"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    styles={{ textAlign: "center" }}
                    onBlur={(e) => onLostFocus(e)}
                    name="phoneNumber"
                    minLength={6}
                    maxLength={15}
                    label="Number"
                    type="text"
                    required></input>
                  <span className="placeholder">
                    {translations.phoneNumber}
                  </span>
                </label>
              </div>
              <section className={styles.formButtons}>
                <button
                  className={styles.cancelBtn}
                  onClick={handleClosing}>
                  {translations.cancelBtn}
                </button>
                <button
                  className={styles.saveBtn}
                  type="submit">
                  {translations.saveBtn}
                </button>
              </section>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default PhoneSettings;
