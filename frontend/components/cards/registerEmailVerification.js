import styles from "./registerSplashScreen.module.css";
import languagesJson from "../../languages.json";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  handleShowOverlay,
  handleShowRegisterCardSwiper,
} from "../../redux/slices/componentSlice";
import { useSwiper } from "swiper/react";
import { createPasswordResetCode } from "../../services/backendService";

export default function RegisterEmailVerification(userData) {
  const dispatch = useDispatch();
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];
  const swiper = useSwiper();

  const resendMail = async () => {
    try {
      const newPassword = await createPasswordResetCode(userData.userData);
      console.log("Nytt lösenord:", newPassword);
      alert("Nytt lösenord skickat: " + newPassword);
    } catch (error) {
      console.error(error);
      alert("Fel uppstod vid skickande av nytt lösenord");
    }
  };
  

  /*const resendMail = async () => {
    const result = await createPasswordResetCode(userData.userData.email);
    console.log("result: ", result);
    try {
      alert("new password sent");
    } catch (error) {
      // Hantera felet här
      console.error(error); 
    }
  };*/

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
        
          alt="Undraw access account"
          className={styles.img}
          src="undraw_access_account.svg"
          width="100"
        height="100"
        />
        <p className={styles.verificationHeader}>{translations.sentPassword}</p>
        <div className={styles.passwordContainer}>
          <p className={styles.noPassword}>
            {translations.notReceivedPasswordYet}
          </p>
          <p
            className={styles.resendPassword}
            onClick={() => resendMail()}>
            {translations.resendPassword}
          </p>
        </div>
        <div className={styles.btnContainer}>
          <button
            className={styles.loginBtn}
            onClick={() => {
              userData.onClick({});
              dispatch(handleShowRegisterCardSwiper(false));
              dispatch(handleShowOverlay(false));
            }}>
            {translations.cancel}
          </button>
          <button
            className={styles.loginBtn}
            onClick={() => swiper.slideNext()}>
            {translations.next}
          </button>
        </div>
      </div>
      <div className={styles.rightCorner}></div>
    </div>
  );
}
