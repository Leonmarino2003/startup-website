import Image from "next/image";
import styles from "./login.module.css";
import { updateBid } from "../redux/slices/bidSlice.js";
import { setIsLoggedIn, setLoginPopup } from "../redux/slices/loginSlice";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TbMailFast } from "react-icons/tb";
import {
  handleShowLogInForm,
  handleShowBidSuccess,
  handleShowOverlay,
} from "../redux/slices/componentSlice";
import { setRole } from "../redux/slices/userSlice";
import languagesJson from "../languages.json";
import LoadingIcon from "./loadingIcons/LoadingIcon";
import { onLostFocus } from "../services/inputService";
import {
  loginFetch,
  placePendingBidInDB,
} from "../services/backendService";
import { handleName, handleProfileImage } from "../redux/slices/userSlice";
import { getNameFromDB, getImageFromDB, getRole } from "../services/backendService";
import { shouldPostBid } from "../redux/slices/bidSlice.js";
import CloseButton from "./cards/CloseButton";
import Link from "next/link";

export default function LoginForm() {
  const dispatch = useDispatch();
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const amount = useSelector((state) => {
    return state.placeBid.bid.amount;
  });
  const address = useSelector((state) => {
    return state.placeBid.bid.address;
  });
  const emailNotice = useSelector((state) => {
    return state.placeBid.displayEmailNotice;
  });

  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const elements = e.target.elements;
    const data = {
      email: elements.email.value,
      password: elements.password.value,
    };
    loginRequest(data);
  };

  async function loginRequest(data) {
    try {
      const result = await loginFetch(data);
      if (result.status) {
        dispatch(setIsLoggedIn(true));
        dispatch(setLoginPopup(true));
        if (amount && address) {
          // Save bid object to database
          const bidObj = {
            bid: {
              amount,
              address,
            },
            user: result.id,
          };

          const dataPlacebid = await placePendingBidInDB(bidObj);

          if (dataPlacebid.success) {
            const resetBid = {
              bid: null,
              address: {},
            };
            dispatch(updateBid(resetBid));
            dispatch(shouldPostBid(false));
            dispatch(handleShowBidSuccess(true));
            setIsLoading(false);
            dispatch(handleShowLogInForm(false));
          }
        } else {
          setIsLoading(false);
          dispatch(handleShowOverlay(false));
          dispatch(handleShowLogInForm(false));
        }

        // This is where we fetch the user name and image, if there is one
        // Then add it to redux so that it can be seen in the profile menu
        const nameFromFB = await getNameFromDB(result.id);
        if (nameFromFB.success) {
          const firstName = nameFromFB.name.firstName;
          const lastName = nameFromFB.name.lastName;
          dispatch(handleName({ firstName, lastName }));
        }
        const imageFromDB = await getImageFromDB(result.id);
        if (imageFromDB.success) {
          dispatch(handleProfileImage(imageFromDB.profileImage));
        }
       
      } else if (!result.status) {
        setWrongCredentials(true);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  return (
    <div className={`${"component-frame"} ${styles.loginFormComponentFrame}`}>
      <CloseButton componentToClose="LoginForm" />
      <div className={styles.headerFrame}>
        <Image
          alt="PlotEye logo"
          src="/logo_ploteye.svg"
          intrinsic
          width="200"
          height="150"></Image>
        {emailNotice && <p>{translations.newPasswordText}</p>}
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={styles.formContainer}>
        <div className={styles.formInput}>
          <label
            className="customField"
            htmlFor="email">
            {translations.emailInput}
          </label>
          <input
            className="inputField"
            onBlur={(e) => onLostFocus(e)}
            id="email"
            name="email"
            placeholder="anna.andersson@mail.com"
            title="email"
            type="email"
            autoComplete="email"
            required={true}></input>
          <label
            className="customField"
            htmlFor="password">
            {translations.passwordInput}
          </label>
          <input
            className="inputField"
            onBlur={(e) => onLostFocus(e)}
            id="password"
            name="password"
            placeholder="********"
            title="password"
            type="password"
            autoComplete="current-password"
            required={true}></input>
        </div>
        {wrongCredentials && (
          <p className={styles.error}>{translations.loginError}</p>
        )}
        <div className={styles.formContainer}>
          <div className={styles.TOS}>
            <label>{translations.iAgree}</label>
            <Link href="https://coconut-octahedron-jt6r.squarespace.com/terms-of-service">
              <div> {translations.terms}</div>
            </Link>{" "}
            <label>{translations.and}</label>
            <Link href="https://coconut-octahedron-jt6r.squarespace.com/privacy-policy">
              <div> {translations.policy}</div>
            </Link>
          </div>
        </div>
        <button className={`${styles.loginBtn} ${"clear-color"}`}>
          {isLoading ? (
            <LoadingIcon title="loadIcon" />
          ) : (
            <p className={styles.loginText}>
              <TbMailFast size={32} />
              {translations.loginBtn}
            </p>
          )}
        </button>
      </form>
    </div>
  );
}
