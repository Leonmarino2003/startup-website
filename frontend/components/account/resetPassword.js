import styles from "../login.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { resetPassword } from "../../services/backendService";
import { handleShowResetPassword } from "../../redux/slices/componentSlice";
import { onLostFocus } from "../../services/inputService";
import languagesJson from "../../languages.json";
import LoadingIcon from "../loadingIcons/LoadingIcon";
import Image from "next/image";

function ResetPassword() {
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const elements = e.target.elements;
    const data = {};

    data.resetPasswordBody = {
      email: elements.email.value,
      resetCode: elements.resetCode.value,
    };
    resetPasswordRequest(data);
  };

  async function resetPasswordRequest(data) {
    console.log("data ", data);
    try {
      const result = await resetPassword(data.resetPasswordBody);
      console.log("result: ", result.msg);

      if (result.codeExpired) {
        setWrongCredentials(true);
        setErrorMessage(translations.passwordResetCodeExpired);
        setIsLoading(false);
        return;
      }

      if (result.codeMissing) {
        setWrongCredentials(true);
        setErrorMessage(translations.passwordResetCodeMissing);
        setIsLoading(false);
        return;
      }
      if (!result.success) {
        setErrorMessage(translations.unknownError);
        setIsLoading(false);
        return;
      }
      //If success resetting password

      handleShowResetPassword(false);
      window.location.href = "/";
    } catch (e) {
      console.log("error: ", e);
    }
  }

  return (
    <>
      <div className="component-frame">
        <div className={styles.headerFrame}>
          <h3 className={styles.componentHeader}> {translations.resetPasswordHeader}
          </h3>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="formContainer">
          <label
            className="customField"
            htmlFor="email">
            <input
              className="inputField"
              onBlur={(e) => onLostFocus(e)}
              id="email"
              name="email"
              title="email"
              type="email"
              autoComplete="email"
              required={true}></input>
            <span className="placeholder">{translations.emailInput}</span>
          </label>
          <label
            className="customField"
            htmlFor="resetCode">
            <input
              className="inputField"
              onBlur={(e) => onLostFocus(e)}
              id="resetCode"
              name="resetCode"
              title="resetCode"
              type="text"
              required={true}></input>
            <span className="placeholder">{translations.resetCodeInput}</span>
          </label>
          {wrongCredentials && (
            <p className={styles.error}>
              {errorMessage || translations.loginError}
            </p>
          )}
          <button
            className={`${styles.submitBtn} ${"dark-green"}`}
            type="submit">
            {isLoading ? (
              <LoadingIcon title="loadIcon" />
            ) : (
              translations.resetPasswordBtn.toUpperCase()
            )}
            {}
          </button>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;
