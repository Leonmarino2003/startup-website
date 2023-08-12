import { useSelector, useDispatch } from "react-redux";
import style from "./RegisterDonePage.module.css";
import {
  handleShowRegisterDonePage,
  handleShowMyPlots,
} from "../../redux/slices/componentSlice";
import languagesJson from "../../languages.json";
import { showNewPin } from "../../redux/slices/mapSlice";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import Image from "next/image";
function RegisterDonePage() {
  const dispatch = useDispatch();

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  function handleClosing() {
    dispatch(showNewPin(false));
    dispatch(handleShowRegisterDonePage(false));
  }

  function toMyPlots() {
    dispatch(handleShowMyPlots(true));
    dispatch(handleShowRegisterDonePage(false));
  }

  return (
    <div className={style.componentFrame}>
      <div className={style.imageContainer}>
        <Image
          alt="grey house"
          src="/GreyHouse.png"
        />
      </div>
      <div className={style.header}>
        <h2>{translations.yourPlotAdd}</h2>
        <div className={style.imageContainerSecond}>
          <Image
            alt="card done"
            src="/CardDone.png"
          />
        </div>
        <div className={style.itemContainer}>
          <div className={style.textContent}>
            <p>{translations.youCanEdit}</p>
          </div>
          <button
            className={style.navigator}
            onClick={toMyPlots}>
            {translations.goToPlot}
            <MdOutlineArrowForwardIos className={style.arrow} />
          </button>
          <button
            className={style.navigator}
            onClick={handleClosing}>
            {translations.backMap}
            <MdOutlineArrowForwardIos className={style.arrow} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterDonePage;
