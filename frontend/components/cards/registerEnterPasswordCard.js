import Link from "next/link";
import Image from "next/image";
import styles from "./registerSplashScreen.module.css";
import languagesJson from "../../languages.json";
import { useDispatch, useSelector } from "react-redux";
import { BiMailSend } from "react-icons/bi";
import {
  getImageFromDB,
  getNameFromDB,
  loginFetch,

} from "../../services/backendService";
import { onLostFocus } from "../../services/inputService";
import { useState } from "react";
import { setIsLoggedIn} from "../../redux/slices/loginSlice";
import {
  handleShowOverlay,
  handleShowRegisterCardSwiper,
} from "../../redux/slices/componentSlice";

import { handleName, handleProfileImage } from "../../redux/slices/userSlice";

export default function RegisterEnterPasswordCard(userData) {
  const dispatch = useDispatch();
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      email: userData.userData.email.toLowerCase(),
      password: password,
    };
    loginRequest(data);
  };

  async function loginRequest(data) {
    try {
      const result = await loginFetch(data);
      if (result.status) {
        dispatch(setIsLoggedIn(true));
        setIsLoading(false);
        dispatch(handleShowOverlay(false));
        dispatch(handleShowRegisterCardSwiper(false));

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
    <div className={`${"component-frame"} ${styles.componentFrame}`}>
      <div className={styles.leftCorner}></div>
      <div className={styles.headerFrame}>
        <Image
          alt="PlotEye Logo"
          src="/logo_ploteye.svg"
          intrinsic
          width="319"
          height="118"></Image>
        <Image
          alt="mail Verification image"
          className={styles.img}
          src="mailVerification.svg"
          width="100"
          height="100"
        />
        <p className={styles.verificationHeader}>
          {translations.enterPasswordFromMail}
        </p>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={styles.formContainer}>
          <div className={styles.formInput}>
            <label
              className={`${"customField"} ${styles.loginForm}`}
              htmlFor="password">
              {translations.passwordInput}
            </label>
            <input
              className="inputField"
              onBlur={(e) => onLostFocus(e)}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="********"
              autoComplete="password"
              title="password"
              maxLength={254}
              required={true}></input>

            <div className={styles.formContainer}>
              {wrongCredentials && <p>{translations.loginError}</p>}
              <button
                className={`${styles.loginBtn} ${styles.loginBtnMargin}`}
                onClick={(e) => handleSubmit(e)}>
                <BiMailSend size={32} />
                {translations.signup}
              </button>
              <div className={styles.TOS}>
                <label>{translations.iAgree}</label>
                <Link href="https://coconut-octahedron-jt6r.squarespace.com/terms-of-service">
                  <div>
                  {" "}
                  {translations.terms}
                  </div>
                </Link>{" "}
                <label>{translations.and}</label>
                <Link href="https://coconut-octahedron-jt6r.squarespace.com/privacy-policy">
                  <div>
                  {" "}
                  {translations.policy}.
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.rightCorner}></div>
    </div>
  );
}
