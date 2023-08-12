import { FaHandHoldingUsd } from "react-icons/fa";
import { BsMap, BsPlusLg, BsHouseDoorFill } from "react-icons/bs";
import {
  BiHomeAlt,
  BiExit,
  BiUser,
  BiBookOpen,
  BiCog,
  BiLogOut,
} from "react-icons/bi";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { RiTranslate2 } from "react-icons/ri";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn } from "../redux/slices/loginSlice";
import { handlePlotView, showNewPin } from "../redux/slices/mapSlice";
import { setDisplaySplashScreen } from "../redux/slices/splashSlice";
import {
  handleShowSettings,
  handleShowProfileDropdown,
  handleShowRightMenuDropdown,
  handleShowOverlay,
  handleShowMyBids,
  handleShowMyPlots,
  handleMyProfileSettings,
  handleShowProfilePage,
  handleDisplayLanguage,
  hideAll,
  handleShowSearchPopUp,
  handleShowLogIn,
  handleNotSignedInLanguages,
  handleShowAdminInterface,
} from "../redux/slices/componentSlice";
import { resetUser } from "../redux/slices/userSlice";
import languagesJson from "../languages.json";
import Link from "next/link";

const Navbar = () => {
  const dispatch = useDispatch();
  const showProfileDropdown = useSelector(
    (state) => state.componentHandler.showProfileDropdown
  );
  const showRightMenuDropdown = useSelector(
    (state) => state.componentHandler.showRightMenuDropdown
  );
  const isLoggedIn = useSelector((state) => {
    return state.login.isLoggedIn;
  });
  const registerPlotView = useSelector((state) => {
    return state.map.registerPlotView;
  });
  const firstName = useSelector((state) => {
    return state.user.name.firstName;
  });
  const lastName = useSelector((state) => {
    return state.user.name.lastName;
  });
  const userRole = useSelector((state) => state.user.role);
  const profileImageToDisplay = useSelector((state) => state.user.profileImage);

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  const showSidebar = () => {
    /*   dispatch(hideAll()); */
    dispatch(showNewPin(false));
    if (!showRightMenuDropdown) {
      dispatch(handleShowSettings(true));
      dispatch(handleShowOverlay(true));
    }
  };
  function showProfilebar() {
    dispatch(hideAll());
    dispatch(showNewPin(false));
    if (!showProfileDropdown) {
      dispatch(handleShowProfileDropdown(true));
      dispatch(handleShowOverlay(true));
      dispatch(handleShowRightMenuDropdown(false));
    }
  }

  const showSplashScreen = () => {
    dispatch(setDisplaySplashScreen(true));
  };

  function showSettings() {
    dispatch(hideAll());
    dispatch(handleShowSettings(true));
    dispatch(handleShowOverlay(true));
  }

  const showAdminInterface = () => {
    dispatch(hideAll());
    dispatch(handleShowAdminInterface(true));
  };
  function showMyBids() {
    dispatch(hideAll());
    dispatch(handleShowMyBids(true));
    dispatch(handleShowOverlay(true));
  }
  function showMyPlots() {
    dispatch(hideAll());
    dispatch(handleShowMyPlots(true));
    dispatch(handleShowOverlay(true));
  }
  function logout() {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(setIsLoggedIn(false));
    dispatch(resetUser());
    dispatch(hideAll());
  }

  function closeall() {
    dispatch(hideAll());
    dispatch(showNewPin(false));
  }

  const showLogin = () => {
    dispatch(hideAll());
    dispatch(handleShowOverlay(true));
    dispatch(handleShowLogIn(true));
  };

  function toProfileSettings() {
    dispatch(hideAll());
    dispatch(handleMyProfileSettings(true));
    dispatch(handleShowOverlay(true));
  }

  function toProfilePage() {
    dispatch(hideAll());
    dispatch(hideAll());
    dispatch(handleShowOverlay(true));
    dispatch(handleShowProfilePage(true));
  }

  function toDisplayLanguage() {
    dispatch(hideAll());
    dispatch(hideAll());
    dispatch(handleDisplayLanguage(true));
    dispatch(handleShowOverlay(true));
  }

  function toNotSignedInLanguages() {
    dispatch(hideAll());
    dispatch(hideAll());
    dispatch(handleNotSignedInLanguages(true));
    dispatch(handleShowOverlay(true));
  }

  function toggleRegisterPlotView(registerPlotView) {
    dispatch(handlePlotView(registerPlotView));
  }

  const searchStatus = useSelector((state) => {
    return state.componentHandler.showSearchPopUp;
  });

  function handleSearch() {
    if (!searchStatus) {
      dispatch(hideAll());
      dispatch(showNewPin(false));
    } else {
      dispatch(hideAll());
      dispatch(showNewPin(false));
    }
  }

  return (
    <>
      {}

      <nav
        data-testid="navbar-hamburgermenu"
        className={
          showRightMenuDropdown
            ? `${styles.nav_menu} ${styles.active}`
            : `${styles.nav_menu}`
        }>
        {/* New Menu */}
        <div className={styles.navbar_profile}>
          {isLoggedIn ? (
            <>
              {profileImageToDisplay ? (
                <div
                  style={{
                    width: "107px",
                    height: "107px",
                    borderRadius: "50%",
                    border: "1px solid #d6ecd8",
                    alignSelf: "center",
                    backgroundImage: `url(${profileImageToDisplay})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                />
              ) : (
                <Image
                  alt="logo"
                  src="/profilePic.svg"
                  intrinsic
                  width="107"
                  height="107"></Image>
              )}

              <p>
                {firstName} {lastName}
              </p>
            </>
          ) : (
            <>
              <Image
                alt="logo"
                src="/profilePic.svg"
                intrinsic
                width="107"
                height="107"></Image>
              <p>Name Lastname</p>
            </>
          )}
        </div>
        {/*Det är tänkt ifall man är inloggad tar mig sig direkt till den pagen, eller blir redirect till log in*/}
        <ul className={styles.nav_menu_items}>
          <div className={styles.line}></div>
          <div className={styles.line}>
            {" "}
            {/* My Profile */}
            <li
              onClick={isLoggedIn ? () => toProfilePage() : () => showLogin()}
              className={styles.nav_text}>
              <BiUser className={styles.icons} />
              <p>{translations.myProfileBtn}</p>
            </li>
          </div>

          <div className={styles.line}>
            {/*Bids & Favorites*/}
            <li
              onClick={isLoggedIn ? () => showMyBids() : () => showLogin()}
              className={styles.nav_text}>
              <IoArrowDownCircleOutline className={styles.icons} />
              <p>{translations.myBidsAndFavoritesBtn}</p>
            </li>
          </div>

          <div className={styles.line}>
            {/*My Plots*/}
            <li
              onClick={isLoggedIn ? () => showMyPlots() : () => showLogin()}
              className={styles.nav_text}>
              <BsHouseDoorFill className={styles.icons} />
              <p>{translations.myPlots}</p>
            </li>
          </div>

          {/* FAQ */}
          <div className={styles.line}>
            <Link href="/Faq">
              <li className={styles.nav_text}>
                <BiBookOpen className={styles.icons} />
                <p>{translations.FAQbtn}</p>
              </li>
            </Link>
          </div>

          {/* Languages */}
          <div className={styles.line}>
            <li
              onClick={
                isLoggedIn
                  ? () => toDisplayLanguage()
                  : () => toNotSignedInLanguages()
              }
              className={styles.nav_text}>
              <RiTranslate2 className={styles.icons} />
              <p>{translations.languages}</p>
            </li>
          </div>

          {/*Settings*/}
          <div className={styles.line}>
            <li
              onClick={isLoggedIn ? () => showSettings() : () => showLogin()}
              className={styles.nav_text}>
              <BiCog className={styles.icons} />
              <p>{translations.settingsBtn}</p>
            </li>
          </div>

          {/* Register Plot */}
          <div className={styles.line}>
            {!registerPlotView ? (
              <li
                onClick={
                  isLoggedIn
                    ? () => toggleRegisterPlotView(true)
                    : () => showLogin()
                }
                className={styles.nav_text}>
                <BiHomeAlt className={styles.icons} />
                <p>{translations.registerPlot}</p>
              </li>
            ) : (
              <li
                onClick={
                  isLoggedIn
                    ? () => toggleRegisterPlotView(false)
                    : () => showLogin()
                }
                className={styles.nav_text}>
                <BsMap className={styles.icons} />
                <p>{translations.mapView}</p>
              </li>
            )}
          </div>

          {isLoggedIn && (
            <div className={styles.line}>
              <li
                onClick={() => logout()}
                className={styles.nav_text}>
                <BiLogOut className={styles.icons} />
                <p>{translations.logOut}</p>
              </li>
            </div>
          )}
          {/* Admin interface */}
          {console.log(userRole)}
          {userRole == "admin" && (
            <div className={styles.line}>
              <li
                onClick={() => showAdminInterface()}
                className={styles.nav_text}>
                <BiCog className={styles.icons} />
                <p>AdminInterface</p>
              </li>
            </div>
          )}

          {}

          {}
          {}
        </ul>
      </nav>

      {isLoggedIn && (
        <nav
          data-testid="navbar-profilemenu"
          className={
            showProfileDropdown
              ? `${styles.profile_menu} ${styles.active}`
              : `${styles.profile_menu}`
          }>
          <div
            className={styles.profile_header}
            onClick={toProfileSettings}>
            <div className={styles.imageContainer}>
              {profileImageToDisplay ? (
                <Image
                  width={100}
                  alt="profileImage"
                  src={profileImageToDisplay}
                />
              ) : (
                <BsPlusLg className={styles.plusIcon} />
              )}
            </div>
            <div className={styles.name_wrapper}>
              <p>
                {firstName ? firstName : ""} {lastName ? lastName : ""}
              </p>
            </div>
          </div>

          <ul
            className={styles.nav_menu_items}
          >
            <li
              className={styles.nav_text}
              onClick={() => showMyBids()}>
              <FaHandHoldingUsd className={styles.icons} />
              <p>{translations.myBids}</p>
            </li>

            <li
              className={styles.nav_text}
              onClick={() => showMyPlots()}>
              <BiHomeAlt className={styles.icons} />
              <p>{translations.myPlots}</p>
            </li>
            {}
            <li
              onClick={showSettings}
              className={styles.nav_text}>
              <IoSettingsOutline className={styles.icons} />
              <p>{translations.settings}</p>
            </li>
            <li
              className={styles.nav_text}
              onClick={() => logout()}>
              <BiExit className={styles.icons} />
              <p>{translations.logOut}</p>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navbar;
