import React, { useState } from "react";
import style from "./RegistrationInfo.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  handleShowRegistrationInfo,
  handleShowRegisterDonePage,
} from "../../redux/slices/componentSlice";
import { showNewPin } from "../../redux/slices/mapSlice";
import LoadingIcon from "../loadingIcons/LoadingIcon";
import { BsHouseDoorFill } from "react-icons/bs";
import { BiWrench, BiEditAlt } from "react-icons/bi";
import { IoMdGrid } from "react-icons/io";
import Image from "next/image";

function RegistrationInfo() {
  const dispatch = useDispatch();
  const { city, postcode, country, street } = useSelector((state) => {
    return state.chosenProperty;
  });

  function handleRegisterDone() {
    dispatch(handleShowRegistrationInfo(false));
    dispatch(handleShowRegisterDonePage(true));
  }

  function handleClosing() {
    dispatch(showNewPin(false));
    dispatch(handleShowRegistrationInfo(false));
  }

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  return (
    <div className={style.componentFrame}>
      <div className={style.imageContainer}>
        <Image
          alt="addPlot image"
          src="/addPlot.png"
        />
      </div>
      <section className={style.addressFrame}>
        <h3>{street}</h3>
        <section className={style.smallInfo}>
          <section className={style.cityAndCountry}>
            <p className={style.bidParagraph}>
              {postcode} {">"} {city} {">"} {country}
            </p>
          </section>
        </section>
      </section>

      <div className={style.addPlot}>
        <p className={style.breadText}>{translations.correctInfo}</p>
        <p className={style.tinyText}>{translations.editLater}</p>
        <div className={style.propertyInfo}>
          <li>
            <BsHouseDoorFill
              className={style.icons}
              size={20}
            />
            144 kvm
            <BiEditAlt
              className={style.edit}
              size={20}
            />
          </li>
          <li>
            <IoMdGrid
              className={style.icons}
              size={20}
            />
            111 kvm
            <BiEditAlt
              className={style.edit}
              size={20}
            />
          </li>
          <li>
            <BiWrench
              className={style.icons}
              size={20}
            />
            1845
            <BiEditAlt
              className={style.edit}
              size={20}
            />
          </li>
        </div>
        <p className={style.aboutText}>{translations.aboutThePlot}</p>
        <textarea
          className={style.messageBox}
          placeholder={translations.describePlot}
          maxLength={500}></textarea>

        <button
          onClick={handleClosing}
          className={style.cancel}>
          {" "}
          {translations.cancel}
        </button>
        <button
          className={style.notDoneBtn}
          onClick={handleRegisterDone}>
          {translations.addInfo}
        </button>
      </div>
    </div>
  );
}

export default RegistrationInfo;
