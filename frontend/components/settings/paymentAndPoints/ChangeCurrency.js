import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./ChangeCurrency.module.css";

import { AiOutlineCheckCircle } from "react-icons/ai";
import {
  handleShowChangeCurrency,
  handleShowSettings,
} from "../../../redux/slices/componentSlice";
import languagesJson from "../../../languages.json";
import { changeCurrency } from "../../../redux/slices/userSlice";

function ChangeCurrency() {
  const dispatch = useDispatch();

  let currencyToUse = useSelector((state) => {
    return state.user.currency;
  });

  const [currencies, setCurrencies] = useState([
    {
      short: "SEK",
    },
    {
      short: "EUR",
    },
    {
      short: "USD",
    },
    {
      short: "GBP",
    },
  ]);

  function handleChangeCurrency(NewCurrency) {
    dispatch(changeCurrency(NewCurrency.short));
    localStorage.setItem("currency", NewCurrency.short);
    dispatch(handleShowChangeCurrency(false));
  }

  function goBack() {
    dispatch(handleShowChangeCurrency(false));
    dispatch(handleShowSettings(true));
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
        <h1 className="componentHeader">{translations.currency}</h1>
      </section>
      <section className={style.optionsList}>
        {currencies.map((currency) => (
          <div
            key={currency.short + "-div"}
            className={style.option}>
            <button onClick={() => handleChangeCurrency(currency)}>
              {currency.short}
            </button>
            {currencyToUse == currency.short && (
              <div className={style.pseudoElement}>
                <AiOutlineCheckCircle
                  data-testid={currency.short + "-selected"}
                  className={style.selectedIcon}
                />
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

export default ChangeCurrency;
