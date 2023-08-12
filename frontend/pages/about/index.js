import styles from "./about.module.css";
import {
  hideAll,
  handleShowSettings,
  handleShowOverlay,
} from "../../redux/slices/componentSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import languagesJson from "../../languages.json";
import Image from "next/image";

const About = () => {
  const router = useRouter();

  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  const dispatch = useDispatch();

  const showSidebar = () => {
    dispatch(hideAll());

    dispatch(handleShowSettings(true));
    dispatch(handleShowOverlay(true));
  };

  const handleClick = (e, path) => {
    if (path === "/about") {
      dispatch(hideAll());
      dispatch(handleShowSettings(false));
      dispatch(handleShowOverlay(false));
    }
  };

  return (
    <>
      <div className={styles.contentContainer}>
        <div className={styles.aboutContainer}>
          <div>
            <h1>{translations.about}</h1>
            <p>{translations.aboutFirst}</p>
            <p>{translations.aboutSecond}</p>
          </div>

          <Image
            alt=""
            className={styles.aboutImage}
            src="/aboutBottomLeft.png"
            width="200"
            height="300"
          />
        </div>
        <div className={styles.aboutContainer}>
          <Image
            alt=""
            className={styles.aboutImage}
            src="/aboutTopRight.png"
            width="200"
            height="300"
          />

          <div>
            <h1>{translations.ourVision}</h1>
            <p>{translations.ourVisiontext}</p>
          </div>
        </div>
      </div>
    </>
  );
};

About.getLayout = function getLayout(about) {
  return <Layout>{about}</Layout>;
};

export default About;
