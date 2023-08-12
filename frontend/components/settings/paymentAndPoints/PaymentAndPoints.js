import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./PaymentAndPoints.module.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import {
  handleShowChangeCurrency,
  handleShowPaymentAndPoints,
  handleShowSettings,
} from "../../../redux/slices/componentSlice";
import languagesJson from "../../../languages.json";

function PaymentAndPoints() {
  const dispatch = useDispatch();

  function goBack() {
    dispatch(handleShowPaymentAndPoints(false));
    dispatch(handleShowSettings(true));
  }

  function toChangeCurrency() {
    dispatch(handleShowChangeCurrency(true));
    dispatch(handleShowPaymentAndPoints(false));
  }

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  return (
    <div className={`${"component-frame"} ${style.container}`}>
      <section className={style.header}>
        <MdKeyboardArrowLeft
          onClick={goBack}
          className={style.icon}
        />
        <h1 className="componentHeader">{translations.paymentAndPoints}</h1>
      </section>
      <section className={style.optionsList}>
        {/*<button>{translations.buyPointsBtn}</button>*/}
        {/*<button>{translations.paymentOptionsBtn}</button>*/}
        <button onClick={toChangeCurrency}>
          {translations.changeCurrencyBtn}
        </button>
      </section>
    </div>
  );
}

export default PaymentAndPoints;
