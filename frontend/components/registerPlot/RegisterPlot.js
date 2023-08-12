import { useSelector, useDispatch } from "react-redux";
import style from "./RegisterPlot.module.css";
import {
  handleShowRegisterModal,
  handleShowOwnershipUpload,
} from "../../redux/slices/componentSlice";
import { fetchTilesetData } from "../../utilities/utils";
import languagesJson from "../../languages.json";
import { addProperty } from "../../redux/slices/propertySlice";
import { showNewPin } from "../../redux/slices/mapSlice";
import Image from "next/image";

function RegisterPlot() {
  const dispatch = useDispatch();
  const address = useSelector((state) => {
    return state.map.address;
  });
  const coords = useSelector((state) => {
    return state.map.coords;
  });

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  function handleClosing() {
    dispatch(showNewPin(false));
    dispatch(handleShowRegisterModal(false));
  }

  async function handlePlotRegistration() {
    const premiumInfo = await fetchTilesetData(coords);

    const propertyObj = {
      street: address.street,
      postcode: address.postcode,
      city: address.city,
      country: address.country,
      premiumInfo,
    };

    dispatch(addProperty(propertyObj));
    dispatch(handleShowRegisterModal(false));
    dispatch(handleShowOwnershipUpload(true));
  }

  return (
    <div className={style.componentFrame}>
      <div className={style.header}>
        <h2>{translations.registerPlotHeader}</h2>
      </div>
      <div className={style.borderFrame}>
        <section className={style.addressFrame}>
          <div className={style.imgContainer}>
            <Image
              width={100}
              height={100}
              alt="property image"
              src="/property.png"
              id="placebidMapPin"
            />
          </div>
          <h3 className={`${style.bidAddress} ${style.indent}`}>
            {address.street}
          </h3>
          <p className={style.bidParagraph}>
            {address.country} {">"} {address.city}
          </p>
        </section>

        <section className={style.buttonSection}>
          <p className={style.confirmText}>
            {translations.registerPlotConfirmation}
          </p>
          <section className={style.buttonsContainer}>
            <button
              className={style.confirm}
              onClick={handlePlotRegistration}>
              {translations.thisPlotMine}
            </button>
            <button
              className={style.deny}
              onClick={handleClosing}>
              {translations.cancel}
            </button>
          </section>
        </section>
      </div>
    </div>
  );
}

export default RegisterPlot;
