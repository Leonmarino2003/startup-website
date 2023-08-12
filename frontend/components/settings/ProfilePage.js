import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./ProfilePage.module.css";
import {
  handleShowAccountSettings,
  handleShowSettings,
  hideAll,
  handleShowProfilePage,
  handleShowMyPlots,
  handleShowMyBids,
  handleShowSavedPlots,
} from "../../redux/slices/componentSlice";
import { showNewPin } from "../../redux/slices/mapSlice";
import languagesJson from "../../languages.json";

//import react icons
import { RiProfileLine, RiSettings4Line, RiHeart3Line } from "react-icons/ri";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { BsHouseDoor, BsHouseDoorFill } from "react-icons/bs";
import Image from "next/image";
import { getAccountData } from "../../utilities/utils";

function ProfilePage() {
  const dispatch = useDispatch();
  const profileImageToDisplay = useSelector((state) => state.user.profileImage);
  const isLoggedIn = useSelector((state) => {
    return state.login.isLoggedIn;
  });
  const firstName = useSelector((state) => {
    return state.user.name.firstName;
  });
  const lastName = useSelector((state) => {
    return state.user.name.lastName;
  });
  const email = useSelector((state) => {
    return state.user.email;
  });
  const phoneNumber = useSelector((state) => {
    return state.user.phoneNumber;
  });

  function hideProfilePage() {
    dispatch(handleShowProfilePage(false));
  }

  function toAccount() {
    dispatch(handleShowAccountSettings(true));
    hideProfilePage();
  }

  function toSettings() {
    dispatch(handleShowSettings(true));
    hideProfilePage();
  }

  function toMyPlots() {
    dispatch(handleShowMyPlots(true));
    hideProfilePage();
  }

  function toMyBids() {
    dispatch(handleShowMyBids(true));
    hideProfilePage();
  }

  function toSavedPlots() {
    dispatch(handleShowSavedPlots(true));
    hideProfilePage();
  }

  function handleClosing() {
    dispatch(hideAll());
    dispatch(showNewPin(false));
  }

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  async function checkIfLoggedIn() {
    getAccountData();
  }
  checkIfLoggedIn();

  return (
    <div className={`${"component-frame"} ${styles.container}`}>
      <div className={styles.frame}>
        <section className={styles.header}>
          <div className={styles.closeBtn}>
            <button onClick={handleClosing}>
              {translations.close.toUpperCase()}
            </button>
          </div>
          <section className={styles.changeProfileImage}>
            {isLoggedIn && (
              <div className={styles.imageContainer}>
                {profileImageToDisplay ? (
                  <Image
                    alt="avatar"
                    src={profileImageToDisplay}
                  />
                ) : (
                  <Image
                    alt="avatar"
                    src="/profilePic.svg"
                    intrinsic
                    width="107"
                    height="107"></Image>
                )}
              </div>
            )}
          </section>
        </section>

        <div className={styles.name_wrapper}>
          <p>
            {firstName.length > 0 ? firstName : "--"}{" "}
            {lastName.length > 0 ? lastName : ""}
          </p>
          <li>
            {email.length > 0 ? email : "Get email from database"} |{" "}
            {phoneNumber ? phoneNumber : "--"}{" "}
          </li>
        </div>
        <div className={styles.flexColumn}>
          <div className={styles.item}>
            <section className={styles.languagesList}>
              {/* Button for profile */}
              <button onClick={toAccount}>
                <RiProfileLine className={styles.icons} />
                {translations.accountSettings}
                <MdOutlineArrowForwardIos className={styles.arrow} />
              </button>
              {/* Button for settings */}
              <button onClick={toSettings}>
                <RiSettings4Line className={styles.icons} />
                {translations.settings}
                <MdOutlineArrowForwardIos className={styles.arrow} />
              </button>
            </section>
          </div>
          <div className={styles.item}>
            <section className={styles.languagesList}>
              {/* Button for MyBids */}
              <button onClick={toMyBids}>
                <BsHouseDoor className={styles.icons} />
                {translations.myBids}
                <MdOutlineArrowForwardIos className={styles.arrow} />
              </button>
              {/* Button for MyPlots */}
              <button onClick={toMyPlots}>
                <BsHouseDoorFill className={styles.icons} />
                {translations.myPlots}
                <MdOutlineArrowForwardIos className={styles.arrow} />
              </button>
              {/* Button for SavedPlots */}
              <button onClick={toSavedPlots}>
                <RiHeart3Line className={styles.icons} />
                {translations.savedPlots}
                <MdOutlineArrowForwardIos className={styles.arrow} />
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
