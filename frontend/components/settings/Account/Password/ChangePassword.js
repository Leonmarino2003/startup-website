import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./ChangePassword.module.css";
import {
  handleShowAccountSettings,
  handleShowChangePassword,
  hideAll,
} from "../../../../redux/slices/componentSlice";
import languagesJson from "../../../../languages.json";
import { changePassword, verifyJWT } from "../../../../services/backendService";
import { onLostFocus } from "../../../../services/inputService";
import { showNewPin } from "../../../../redux/slices/mapSlice";

function Settings() {
  const dispatch = useDispatch();
  const [successfulReset, setSuccessfulReset] = useState(false);
  const [failedReset, setFailedReset] = useState(false);

  function goBack() {
    dispatch(handleShowChangePassword(false));
    dispatch(handleShowAccountSettings(true));
  }

  async function submitNewPassword(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const currentPass = data.get("currentPassword");
    const newPass = data.get("newPassword");

    const isLoggedIn = await verifyJWT();
    const user = {
      user: isLoggedIn.user,
      oldPass: currentPass,
      newPass: newPass,
    };
    try {
      const result = await changePassword(user);
      if (result.success) {
        setSuccessfulReset(true);
      } else {
        setFailedReset(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function showPassword() {
    const currentPWInput = document.getElementById("currentPass");
    const newPWInput = document.getElementById("newPass");

    if (currentPWInput.type === "password") {
      currentPWInput.type = "text";
      newPWInput.type = "text";
    } else {
      currentPWInput.type = "password";
      newPWInput.type = "password";
    }
  }

  function handleChangePW() {
    setFailedReset(false);
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
    <div className={`${"component-frame"} ${style.container}`}>
      <section className={style.header}>
        <div className={style.backBtn}>
          <button onClick={goBack}>
            {"<"} {translations.back}
          </button>
        </div>
        <h1 className={style.header}>{translations.changePassword}</h1>
      </section>
      {successfulReset ? (
        <div className={style.resetSuccessful}>
          <p>{translations.passwordResetSuccess}</p>
        </div>
      ) : (
        <form
          onSubmit={(event) => submitNewPassword(event)}
          className="formContainer"
          style={{
            maxWidth: "90%",
            margin: "0 1em",
            background: "white",
            margin: "5px",
            padding: "32px 32px",
            borderRadius: "8px",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
            width: "85%",
            marginLeft: "30px",
            marginBottom: "32px",
          }}>
          {/* The email field is hidden but still helps password
              managers do their thing */}
          <h3 className={style.contain}>{translations.contain}</h3>
          <input
            style={{
              position: "absolute",
              opacity: "0",
              width: "0",
              height: "0",
              margin: "0",
              padding: "0",
            }}
            id="email"
            type="email"
            autoComplete="email"></input>
          <label
            className="customField"
            htmlFor="currentPassword">
            <input
              className="inputField"
              onChange={handleChangePW}
              onBlur={(e) => onLostFocus(e)}
              id="currentPass"
              name="currentPassword"
              type="password"
              autoComplete="current-password"
              title="currentpassword"
              required={true}></input>
            <span className="placeholder">{translations.currentPassword}</span>
          </label>
          {failedReset && (
            <p className={style.wrongPass}>
              {translations.passwordDoesNotMatch}
            </p>
          )}
          <label
            className="customField"
            htmlFor="newPassword">
            <input
              className="inputField"
              onBlur={(e) => onLostFocus(e)}
              id="newPass"
              name="newPassword"
              type="password"
              autoComplete="new-password"
              title="newpassword"
              minLength={8}
              required={true}></input>
            <span className="placeholder">{translations.newPassword}</span>
          </label>

          {}
          <div className={style.close}>
            <button
              className={style.cancelBtn}
              onClick={handleClosing}>
              {translations.cancelBtn}
            </button>
            <button
              className={style.saveBtn}
              type="submit">
              {translations.saveBtn}
            </button>
          </div>

          {}
        </form>
      )}
    </div>
  );
}

export default Settings;
