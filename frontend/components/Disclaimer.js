import styles from "./Disclaimer.module.css";
import { useDispatch } from "react-redux";
import { shouldPostBid } from "../redux/slices/bidSlice.js";
import { handleShowEmailSignup } from "../redux/slices/componentSlice.js";
import { useSelector } from "react-redux";
import languagesJson from "../languages.json";

export default function Disclaimer() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => {
    return state.login.isLoggedIn;
  });

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  const GoToRegistration = () => {
    if (!isLoggedIn) {
      dispatch(shouldPostBid(false));
      dispatch(handleShowEmailSignup(true));
    }
  };

  return (
    <div
      onClick={() => GoToRegistration()}
      className={styles.componentContainer}>
      <p className={styles.disclaimerText}>
        {translations.disclaimerText}

        {!isLoggedIn && `${translations.disclaimerTextNotLoggedIn}`}
      </p>
    </div>
  );
}
