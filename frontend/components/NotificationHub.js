import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./NotificationHub.module.css";
import {
  hideAll,
  handleShowNotificationHub,
} from "../redux/slices/componentSlice";
import languagesJson from "../languages.json";
import { showNewPin } from "../redux/slices/mapSlice";
import Image from "next/image";
import { handleNotifications } from "../redux/slices/userSlice";
import { RiNotification3Line } from "react-icons/ri";

function NotificationHub() {
  const dispatch = useDispatch();

  function handleClosing() {
    dispatch(hideAll());
    dispatch(showNewPin(false));
  }

  const isLoggedIn = useSelector((state) => {
    return state.login.isLoggedIn;
  });

  const notifications = useSelector((state) => {
    return state.user.notifications;
  });

  function toggleOffNotification() {
    dispatch(handleNotifications(false));
    dispatch(handleShowNotificationHub(false));
  }

  const profileImageToDisplay = useSelector((state) => state.user.profileImage);

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <h1 className="componentHeader">{translations.notifications}</h1>
      </section>

      <section className={styles.notiBox}>
        <h2>{translations.today}</h2>

        <div className={styles.notiContainer}>
          <div className={styles.imageContainer}>
            {profileImageToDisplay ? (
              <Image
                alt="profileImage"
                width
                src={profileImageToDisplay}
              />
            ) : (
              <Image
                alt="profileImage"
                src="/profilePic.svg"
                intrinsic
                width="59.9"
                height="59.9"></Image>
            )}
          </div>
          <li>
            #User1 placed a bid on your plot at thisstreet 1A. You can choose to
            accept or deny this bid here.
          </li>
        </div>

        <div className={styles.notiContainer}>
          <div className={styles.imageContainer}>
            <Image
              alt="houseImage"
              id="placebidMapPin"
              src="/house.svg"
              intrinsic
              width="59.9"
              height="59.9"></Image>
          </div>
          <li>
            Your plot thisstreet 1A has been saved 3 times today. Click here to
            see the statistics.
          </li>
        </div>

        <div className={styles.notiContainer}>
          <div className={styles.imageContainer}>
            <Image
              alt="propertyImage"
              id="placebidMapPin"
              src="/property.png"
              intrinsic
              width="59.9px"
              height="59.9px"></Image>
          </div>
          <li>
            Your bid on thisstreet 34 has been outbid. Place a new bid here.
          </li>
        </div>
      </section>

      <section className={styles.notiBox}>
        <h2>{translations.thisWeek}</h2>
        <div className={styles.notiContainer}>
          <div className={styles.imageContainer}>
            <Image
              alt="propertyImage"
              id="placebidMapPin"
              src="/property.png"
              intrinsic
              width="59.9px"
              height="59.9px"></Image>
          </div>
          <li>
            Your bid on thisstreet 34 has been outbid. Place a new bid here.
          </li>
        </div>
      </section>

      <div
        className={styles.line}
        onClick={
          isLoggedIn ? () => toggleOffNotification() : () => showLogin()
        }></div>
    </div>
  );
}

export default NotificationHub;
