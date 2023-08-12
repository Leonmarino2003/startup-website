import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ChangeGender.module.css";
import {
  handleShowAccountSettings,
  handleShowChangeGender,
  hideAll,
} from "../../../../redux/slices/componentSlice";
import languagesJson from "../../../../languages.json";
import { saveGenderInDB, verifyJWT } from "../../../../services/backendService";
import { handleGender } from "../../../../redux/slices/userSlice";
import { showNewPin } from "../../../../redux/slices/mapSlice";

function GenderSettings() {
  const dispatch = useDispatch();
  const [changeGender, setChangeGender] = useState(false);
  const gender = useSelector((state) => {
    return state.user.gender;
  });

  function goBack() {
    dispatch(handleShowChangeGender(false));
    dispatch(handleShowAccountSettings(true));
  }
  function handleClosing() {
    dispatch(hideAll());
    dispatch(showNewPin(false));
  }

  async function saveGender(e) {
    e.preventDefault();

    const isLoggedIn = await verifyJWT();
    console();
    if (isLoggedIn) {
      if (!isLoggedIn.user) return;
    }
    const formData = new FormData(e.target);
    const formGender = formData.get("gender");

    const userObj = {
      formGender,
      id: isLoggedIn.user,
    };
    const data = await saveGenderInDB(userObj);
    if (data.success) {
      dispatch(handleGender({ formGender }));
      setChangeGender(false);
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
        <h1 className="componentHeader">{translations.changeGender}</h1>
      </section>
      {gender.length > 0 && !changeGender ? (
        <section className={styles.currentGender}>
          <div className={styles.gender}>
            <h2>
              {gender === "F" ? translations.female : null}
              {gender === "M" ? translations.male : null}
              {gender === "O" ? translations.other : null}
            </h2>
          </div>
          <button
            onClick={() => {
              setChangeGender(true);
            }}>
            {translations.change}
          </button>
        </section>
      ) : (
        <div className={styles.item}>
          <h3>{translations.selectGender}</h3>
          <section className={styles.genderChange}>
            <form
              className="formContainer"
              onSubmit={saveGender}>
              <label
                className="customField"
                htmlFor="gender">
                <div
                  className={styles.circleContainer}
                  name="gender">
                  <li>
                    <input
                      type="radio"
                      value="M"
                      name="gender"
                    />{" "}
                    {translations.male}
                  </li>
                  <li>
                    <input
                      type="radio"
                      value="F"
                      name="gender"
                    />{" "}
                    {translations.female}
                  </li>
                  <li>
                    <input
                      type="radio"
                      value="O"
                      name="gender"
                      required
                    />{" "}
                    {translations.other}
                  </li>
                </div>
              </label>
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

export default GenderSettings;
