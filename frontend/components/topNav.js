import styles from "./topNav.module.css";
import languagesJson from "../languages.json";
import { showNewPin } from "../redux/slices/mapSlice";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getRole, verifyJWT } from "../services/backendService";
import {
  handleShowRegisterCardSwiper,
  handleShowOverlay,
  handleShowAccountSettings,
  hideAll,
  handleShowLogIn,
  handleShowSettings,
  handleShowAdminInterface,
} from "../redux/slices/componentSlice";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../redux/slices/userSlice";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { BiMenu} from "react-icons/bi";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { setIsLoggedIn } from "../redux/slices/loginSlice";
const TopNav = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => {
    return state.login.isLoggedIn;
  });

  const [menuSelected, setMenuSelected] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const userRole = useSelector((state) => state.user.role);
  const router = useRouter();
  const profileImageToDisplay = useSelector((state) => state.user.profileImage);

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  const showRightMenuDropdown = useSelector(
    (state) => state.componentHandler.showRightMenuDropdown
  );

  const showLogin = () => {
    dispatch(handleShowOverlay(true));
    dispatch(handleShowLogIn(true));
    console.log("Login clicked");
  };

  const toAccount = () => {
    dispatch(hideAll());
    dispatch(handleShowAccountSettings(true));
  };

  const goToRegistration = () => {
    if (!isLoggedIn) {
      dispatch(hideAll());
      dispatch(handleShowOverlay(true));
      dispatch(handleShowRegisterCardSwiper(true));
    }
  };
  const showAdminInterface = () => {
    dispatch(hideAll());
    dispatch(handleShowAdminInterface(true));
  };

  const showSidebar = () => {
    dispatch(showNewPin(false));
    if (!showRightMenuDropdown) {
      if(router.pathname !== "/bids") dispatch(hideAll());
      dispatch(handleShowSettings(true));
      dispatch(handleShowOverlay(true));
      setIsRotated(!isRotated);
    }
    if (menuSelected) {
      setMenuSelected(false);
      dispatch(handleShowSettings(false));
      dispatch(handleShowOverlay(false));
    } else {
      setMenuSelected(true);
    }
  };
 
  
  useEffect(() => {
    async function checkIfLoggedIn() {
      // Verify JWT and get user if logged in
      const isLoggedIn = await verifyJWT();
  
      // Exit function if JWT is not verified
      if (!isLoggedIn) {
        dispatch(setIsLoggedIn(false));
        return;
      }
      if (isLoggedIn) {
        if (!isLoggedIn.loggedIn) {
          dispatch(setIsLoggedIn(false));
          return;
        }
        if (!isLoggedIn.user) {
          dispatch(setIsLoggedIn(false));
          return;
        }
      }
  
      // Set logged in to true
      dispatch(setIsLoggedIn(true));
  
      // Get user name from database
      // const nameFromFB = await getNameFromDB(isLoggedIn.user);
      // if (nameFromFB.success && nameFromFB.name) {
      //   const firstName = nameFromFB.name.firstName;
      //   const lastName = nameFromFB.name.lastName;
      //   dispatch(handleName({ firstName, lastName }));
      // }
  
      // Get Role from database
      const userRoleFromDb = await getRole(isLoggedIn.user);
  
      if (userRoleFromDb.success) {
        dispatch(setRole(userRoleFromDb.role));
      }
    }
    if(window.onload || !showRightMenuDropdown){
        checkIfLoggedIn();
      }

  }, [isLoggedIn]);
  

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuSelected(false);
        dispatch(handleShowSettings(false));
        dispatch(handleShowOverlay(false));
        setIsRotated(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef, dispatch]);

  return (
    <header>
      <nav className={styles.topNav}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              alt=" PlotEye logo"
              src="/logo_ploteye.svg"
              intrinsic
              width="200"
              height="150"></Image>
          </Link>
        </div>
        <div className={styles.navigator}>
          <ul
            className={styles.navBar}
            style={{ display: "flex", alignItems: "center" }}>
            <li>
              <Link
                href="/"
                onClick={() => {
                  dispatch(hideAll());
                }}>
                {translations.Home}
              </Link>{" "}
            </li>
            <li style={{ marginRight: "20px" }}>
              <Link href="/about">{translations.about}</Link>
            </li>
            <li style={{ marginRight: "20px" }}>
              <Link href="/bids">{translations.myBids}</Link>
            </li>
            {isLoggedIn ? (
              <Fragment>
                <li style={{ marginRight: "20px" }}>
                  <Link href="/profile">{translations.myProfile}</Link>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li style={{ marginRight: "20px" }}>
                  <Link
                    href=""
                    onClick={goToRegistration}>
                    {translations.CreateAccount}
                  </Link>
                </li>
              </Fragment>
            )}
            {userRole === "admin" ? (
              <Fragment>
                <li style={{ marginRight: "20px" }}>
                  <Link href="/adminDashboard">{translations.AdminDashboard}</Link>
                </li>
              </Fragment>
            ) : null}
          </ul>
        </div>

        <div
          ref={dropdownRef}
          className={styles.menu}
          data-testid="navbar-menubars"
          onClick={showSidebar}>
          <p>{translations.menuBtnText}</p>
          <span style={{ pointerEvents: "none" }}>
            {menuSelected ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </span>
        </div>
        {/* Hamburgare menu */}
        <div className={styles.hamMenu}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              showSidebar();
            }}>
            <BiMenu
              size={35}
              className={`${styles.hamIcon}`}
            />
          </button>
        </div>
        {/*userRole == "admin" && (
          <div className={styles.line}>
            <li
              onClick={() => showAdminInterface()}
              className={styles.nav_text}>
              <p>AdminInterface</p>
            </li>
          </div>
        )*/}
      </nav>
    </header>
  );
};

export default TopNav;
