import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ChangeAddress.module.css";
import {
  handleShowAccountSettings,
  handleShowChangeAddress,
  hideAll,
} from "../../../../redux/slices/componentSlice";
import { handleAddress } from "../../../../redux/slices/userSlice";
import languagesJson from "../../../../languages.json";
import {
  verifyJWT,
  saveAddressInDB,
} from "../../../../services/backendService";
import { onLostFocus } from "../../../../services/inputService";
import { showNewPin } from "../../../../redux/slices/mapSlice";

function AddressSettings() {
  const dispatch = useDispatch();
  const [ChangeAddress, setChangeAddress] = useState(false);
  const address = useSelector((state) => {
    return state.user.address;
  });

  async function saveAddress(e) {
    e.preventDefault();

    const isLoggedIn = await verifyJWT();
    if (isLoggedIn) {
      if (!isLoggedIn.user) return;
    }
    const formData = new FormData(e.target);
    const formAddress = formData.get("address");

    const userObj = {
      formAddress,
      id: isLoggedIn.user,
    };
    const data = await saveAddressInDB(userObj);
    if (data.success) {
      dispatch(handleAddress({ formAddress }));
      setChangeAddress(false);
    }
  }

  function goBack() {
    dispatch(handleShowChangeAddress(false));
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
        <h1 className={styles.h}>{translations.Address}</h1>
      </section>
      {address && !ChangeAddress ? (
        <section className={styles.currentNumber}>
          <div className={styles.number}>
            <h2>{address}</h2>
          </div>
          <button
            onClick={() => {
              setChangeAddress(true);
            }}>
            {translations.change}
          </button>
        </section>
      ) : (
        <div className={styles.item}>
          <h3>{translations.enterAddress}</h3>
          <section className={styles.dateChange}>
            <form
              className="formContainer"
              onSubmit={saveAddress}>
              <div className={styles.inputRow}>
                <label
                  className="customField"
                  htmlFor="address">
                  <input
                    className="inputField"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    styles={{ textAlign: "center" }}
                    onBlur={(e) => onLostFocus(e)}
                    name="address"
                    minLength={6}
                    maxLength={15}
                    label="address"
                    type="text"
                    required></input>
                  <span className="placeholder">{translations.address}</span>
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

export default AddressSettings;
