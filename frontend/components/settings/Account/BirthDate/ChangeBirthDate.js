import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ChangeBirthDate.module.css";
import {
  handleShowAccountSettings,
  handleShowChangeBirthDate,
  hideAll,
} from "../../../../redux/slices/componentSlice";
import { handleBirthDate } from "../../../../redux/slices/userSlice";
import languagesJson from "../../../../languages.json";
import {
  verifyJWT,
  saveBirthDateInDB,
} from "../../../../services/backendService";
import { showNewPin } from "../../../../redux/slices/mapSlice";

function BirthDateSettings() {
  const dispatch = useDispatch();
  const [changeBirthDate, setChangeBirthDate] = useState(false);
  const birthDay = useSelector((state) => {
    return state.user.birthDate.birthDay;
  });
  const birthMonth = useSelector((state) => {
    return state.user.birthDate.birthMonth;
  });
  const birthYear = useSelector((state) => {
    return state.user.birthDate.birthYear;
  });

  async function saveBirthDate(e) {
    e.preventDefault();

    const isLoggedIn = await verifyJWT();
    if (isLoggedIn) {
      if (!isLoggedIn.user) return;
    }
    const formData = new FormData(e.target);
    const formBirthDay = formData.get("day");
    const formBirthMonth = formData.get("month");
    const formBirthYear = formData.get("year");

    const userObj = {
      formBirthDay,
      formBirthMonth,
      formBirthYear,
      id: isLoggedIn.user,
    };
    const data = await saveBirthDateInDB(userObj);
    if (data.success) {
      dispatch(
        handleBirthDate({ formBirthDay, formBirthMonth, formBirthYear })
      );
      setChangeBirthDate(false);
    }
  }

  function goBack() {
    dispatch(handleShowChangeBirthDate(false));
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

  const years = [
    2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999,
    1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987,
    1986, 1985, 1984, 1983, 1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975,
    1974, 1973, 1972, 1971, 1970, 1969, 1968, 1967, 1966, 1965, 1964, 1963,
    1962, 1961, 1960, 1959, 1958, 1957, 1956, 1955, 1954, 1953, 1952, 1951,
    1950, 1949, 1948, 1947, 1946, 1945, 1944, 1943, 1942, 1941, 1940, 1939,
    1938, 1937, 1936, 1935, 1934, 1933, 1932, 1931, 1930, 1929, 1928, 1927,
    1926, 1925, 1924, 1923, 1922, 1921, 1920, 1919, 1918, 1917, 1916, 1915,
    1914, 1913, 1912, 1911, 1910,
  ];
  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  return (
    <div className={`${"component-frame"} ${styles.container}`}>
      <section className={styles.header}>
        <div className={styles.backBtn}>
          <button onClick={goBack}>
            {"<"} {translations.back}
          </button>
        </div>
        <h1 className="componentHeader">{translations.birthday}</h1>
      </section>
      {birthDay && birthMonth && birthYear && !changeBirthDate ? (
        <section className={styles.currentBirthDate}>
          <div className={styles.dates}>
            <h2>{birthDay}-</h2>
            <h2>{birthMonth}-</h2>
            <h2>{birthYear}</h2>
          </div>
          <button
            onClick={() => {
              setChangeBirthDate(true);
            }}>
            {translations.change}
          </button>
        </section>
      ) : (
        <div className={styles.item}>
          <h3>{translations.enterBirth}</h3>
          <section className={styles.dateChange}>
            <form
              className="formContainer"
              onSubmit={saveBirthDate}>
              <div className={styles.inputRow}>
                <div className={styles.inputColumn}>
                  <label
                    className={styles.label}
                    htmlFor="day">
                    {translations.day}:
                  </label>
                  <select
                    className={styles.inputField}
                    name="day"
                    id="day"
                    size={5}>
                    {days.map((day, i) => (
                      <option
                        key={i}
                        value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.inputColumn}>
                  <label
                    className={styles.label}
                    htmlFor="month">
                    {translations.month}:
                  </label>
                  <select
                    className={styles.inputField}
                    name="month"
                    id="month"
                    size={5}>
                    <option value={1}>{translations.monthJanuary}</option>
                    <option value={2}>{translations.monthFebruary}</option>
                    <option value={3}>{translations.monthMarch}</option>
                    <option value={4}>{translations.monthApril}</option>
                    <option value={5}>{translations.monthMay}</option>
                    <option value={6}>{translations.monthJune}</option>
                    <option value={7}>{translations.monthJuly}</option>
                    <option value={8}>{translations.monthAugust}</option>
                    <option value={9}>{translations.monthSeptember}</option>
                    <option value={10}>{translations.monthOctober}</option>
                    <option value={11}>{translations.monthNovember}</option>
                    <option value={12}>{translations.monthDecember}</option>
                  </select>
                </div>
                <div className={styles.inputColumn}>
                  <label
                    className={styles.label}
                    htmlFor="year">
                    {translations.year}:
                  </label>
                  <select
                    className={`${styles.inputField}`}
                    name="year"
                    id="year"
                    size={5}>
                    {years.map((year, i) => (
                      <option
                        key={i}
                        value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
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

export default BirthDateSettings;
