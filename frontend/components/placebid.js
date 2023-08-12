import styles from "./placebid.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateBid, shouldPostBid } from "../redux/slices/bidSlice.js";
import {
  handleShowSignup,
  handleShowBidSuccess,
  handleShowPlaceBid,
  handleShowOverlay,
} from "../redux/slices/componentSlice.js";
import { useState } from "react";
import {
  verifyJWT,
  addView,
  placePendingBidInDB,
} from "../services/backendService";
import { onLostFocus } from "../services/inputService";
import languagesJson from "../languages.json";
import LoadingIcon from "./loadingIcons/LoadingIcon";
import { fetchTilesetData } from "../utilities/utils";
import Link from "next/link";
import {
  hideAll,
  handleShowUserFeedback,
} from "../redux/slices/componentSlice";
import { showNewPin, handlePlotView } from "../redux/slices/mapSlice";
//react icons
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoIosArrowUp, IoIosArrowDown, IoMdGrid } from "react-icons/io";
import { BsHouseDoorFill } from "react-icons/bs";
import { MdOutlineHouse } from "react-icons/md";
import { BiWrench, BiRectangle } from "react-icons/bi";
import { BsShieldLockFill } from "react-icons/bs";
import { GiFamilyHouse } from "react-icons/gi";
import FavoriteButton from "./favoritePlots/favoriteButton";
import Image from "next/image";

export default function PlaceBidTwo({ moreInfo }) {
  const dispatch = useDispatch();
  const coords = useSelector((state) => {
    return state.map.coords;
  });
  const address = useSelector((state) => {
    return state.map.address;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showInfo, setshowInfo] = useState(false);
  const [info, setinfo] = useState({});
  const [selected, setSelected] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [favoriteProperty, setFavoriteProperty] = useState(null);
  const { city, postcode, country, street, premiumInfo } = useSelector(
    (state) => {
      return state.chosenProperty;
    }
  );
  const registerPlotView = useSelector((state) => {
    return state.map.registerPlotView;
  });
  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  function toggleRegisterPlotView(registerPlotView) {
    dispatch(handlePlotView(registerPlotView));
    dispatch(handleShowOverlay(false));
  }

  let currencyToUse = useSelector((state) => {
    return state.user.currency;
  });
  let enterBidForm = useSelector((state) => {
    return translations.enterBid.toUpperCase();
  });
  const submitBidTwo = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const isLoggedIn = await verifyJWT();
    const data = new FormData(e.target);
    const bid = data.get("bid");
    const comment = data.get("comment");
    if (isLoggedIn) {
      if (isLoggedIn.loggedIn) {
        const premiumInfo = await fetchTilesetData(coords);
        const bidObj = {
          bid: {
            amount: bid,
            address,
          },
          premiumInfo: premiumInfo,
          user: isLoggedIn.user,
          message: comment,
        };

        const data = await placePendingBidInDB(bidObj);
        if (data.success) {
          const resetBid = {
            bid: null,
            address: {},
          };
          dispatch(updateBid(resetBid));
          dispatch(handleShowBidSuccess(true));
          setIsLoading(false);
          dispatch(handleShowPlaceBid(false));
        }
        if (!data.success) {
          setError(data.errorMsg);
          setTimeout(() => {
            setError("");
          }, 3000);
          setIsLoading(false);
        }
      }

      if (!isLoggedIn.loggedIn) {
        const bidObj = {
          bid,
          address,
        };
        dispatch(shouldPostBid(true));
        dispatch(updateBid(bidObj));
        dispatch(handleShowSignup(true));
        setIsLoading(false);
        dispatch(handleShowPlaceBid(false));
      }
    }
  };

  async function displayPremInfo(coords) {
    const premiumInfo = await fetchTilesetData(coords);
    if (premiumInfo) {
      setshowInfo(!showInfo);
      setinfo(premiumInfo);
    }
  }

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  function handleClosing() {
    dispatch(hideAll());
    dispatch(showNewPin(false));
  }

  const openFeedback = () => {
    dispatch(handleShowUserFeedback(true));
    dispatch(handleShowPlaceBid(false));
  };

  const addressStreet = {
    street: address.street,
    city: address.city,
    postcode: address.postcode,
  };

  return (
    <div
      className={`${"component-frame"} ${styles.frame}`}
      onLoad={() => addView(addressStreet)}>
      <div className={styles.flexColumn}>
        <div className={styles.topThree}>
          <div>
            {/* close button  */}
            <div className={styles.closeBtn}>
              <div onClick={handleClosing}>
                {translations.close.toUpperCase()}
              </div>
            </div>
          </div>
          <h3>{translations.plotOverview}</h3>
          <AiOutlinePlusCircle
            className={styles.plusCircle}
            size={25}
            color={"#393939"}
          />
        </div>

        <div className={styles.imgContainer}>
          <Image
            width={100}
            height={100}
            alt="propertyImage"
            src="/property.png"
            id="placebidMapPin"
          />
        </div>
        {/* its for the adress */}
        <div className={styles.adressColumn}>
          <div className={styles.flexRow}>
            <div className={styles.adressBox}>
              <h3 className={`${styles.bidAddress}`}>{address.street}</h3>
              <section className={styles.addressFrame}>
                {/*<p className={styles.bidParagraph}>{translations.addressHeader}</p>
          <h3 className={`${styles.bidAddress}`}>
            {address.street}
          </h3>*/}
                <p className={styles.bidParagraph}>
                  {address.country} {">"} {address.postcode} {">"}{" "}
                  {address.city}
                </p>
              </section>
            </div>

            {/* Favorite icon */}
            <div className={styles.icon}>
              <FavoriteButton property={{ address: address }}></FavoriteButton>
            </div>
          </div>
        </div>

        {/* information about the plot */}
        <div className={styles.fastInfo}>
          <li>
            <BsHouseDoorFill
              size={30}
              color={"#393939"}
            />
            144 kvm
          </li>
          <li>
            <IoMdGrid
              size={30}
              color={"#393939"}
            />
            111 kvm
          </li>
          <li>
            <BiWrench
              size={30}
              color={"#393939"}
            />
            ???
          </li>
        </div>

        {/* Bid box */}
        <div className={styles.evaluation}>
          <div className={styles.valuation}>
            <div className={styles.valuationPlot}>
              <h2>{translations.ploteyesValuation}</h2>
              <p> ≈ 50 000 {currencyToUse}</p>
            </div>
            <div className={styles.valuationLinks}>
              <ul>
                <li>
                  <Link href="">{translations.readMore}</Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      openFeedback();
                    }}>
                    <div> {translations.feedback}</div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* the css for bid form is here and some of it in the css */}
          <form
            onSubmit={(event) => submitBidTwo(event)}
            className="formContainer">
            <div className={styles.bids}>
              <label
                className="customField"
                htmlFor="bid">
                <input
                  className="inputField"
                  style={{
                    textAlign: "left",
                    fontSize: "14px",
                    background: "#F8F8F8",
                    boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.06)",
                  }}
                  onBlur={(e) => onLostFocus(e)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  type="number"
                  name="bid"
                  min="50000"
                  placeholder={
                    "                                                           " +
                    currencyToUse
                  }
                  required></input>

                <span
                  className="placeholder"
                  style={{ textAlign: "left", fontSize: "9px" }}>
                  {enterBidForm}
                </span>
              </label>

              <section className={styles.buttonSection}>
                <button
                  title={translations.reset.toUpperCase()}
                  className="submitBtn"
                  type="reset"
                  style={{
                    backgroundColor: "#393939",
                    fontWeight: "15",
                    color: "#fff",
                  }}>
                  {translations.reset}
                </button>
                <button
                  className={`${"dark-green"}`}
                  type="Next">
                  {isLoading ? <LoadingIcon /> : translations.placeBidBtn}
                </button>
              </section>
            </div>
          </form>
        </div>

        {/* about the plot box */}
        <div className={styles.about}>
          <h2>{translations.aboutThePlot}</h2>
          <p>
            Nunc fermentum augue et molestie feugiat. Sed convallis diam sed
            mauris ornare gravida. Duis nec mauris pulvinar, posuere ex et,
            facilisis arcu.
          </p>
        </div>

        {/* code for recent bids currently hard coded*/}
        <div className={styles.recentBids}>
          <h3>{translations.recentBids}</h3>
          <ul>
            <li>{translations.regUser}</li>
            <li>{translations.regUser}</li>
            <li>{translations.regUser}</li>
          </ul>
        </div>

        {/* code for statistics currently hard coded*/}
        <div className={styles.statisticsParent}>
          <div className={styles.statisticsOverlay}>
            <div>
              <BsShieldLockFill size={70} />
            </div>
            <h2>{translations.premiumContent}</h2>
            <h3>{translations.upgradeAccountToUnlock}</h3>
          </div>
          <div className={styles.statistics}>
            <h3>{translations.statistics}</h3>
            <ul>
              <li>{translations.statView}: </li>
              <li>{translations.statBid}: </li>
              <li>{translations.statSaves}: </li>
            </ul>
          </div>
        </div>

        {/* field for security currently hard coded */}
        <div className={styles.security}>
          <details>
            <summary>
              {translations.plotSecurity}
              <IoIosArrowDown
                className={styles.upArrow}
                size={30}
              />
            </summary>
            <div>
              <h3>{translations.plotSecurity1}</h3>
              <li>
                Morbi dignissim turpis a sagittis luctus. Sed quis dolor est.
                Aliquam erat volutpat. In vitae pretium libero. Phasellus non
                velit consectetur, congue libero sit amet
              </li>
            </div>
            <div>
              <h3>{translations.plotSecurity2}</h3>
              <li>
                lacinia nulla. Donec sed ultrices purus. Fusce ut quam lorem.
                Donec rutrum libero mauris, a faucibus ante dignissim sit amet.
              </li>
            </div>
            <div>
              <h3>{translations.plotSecurity3}</h3>
              <li>
                Fusce pretium risus vel nisl blandit, ut ultrices nulla
                elementum. Proin pellentesque lacus ut semper egestas.
              </li>
            </div>
            <div>
              <h3>{translations.plotSecurity4}</h3>
              <li>
                Donec sollicitudin ut leo non fermentum. Pellentesque non felis
                ipsum. Donec faucibus nec sem id luctus.
              </li>
            </div>
          </details>
        </div>

        <div className={styles.availablePlotContainer}>
          <div className={styles.availablePlot}>
            <div className={styles.housePicture}>
              <GiFamilyHouse size={50} />
            </div>
            <div className={styles.availableAllThree}>
              <h2>{translations.available}</h2>
              <h1>{translations.plotHouse}</h1>
              <h3>{translations.notAddedByMember}</h3>
            </div>
          </div>

          <div className={styles.yourHouse}>
            <div className={styles.yourHouseContainer}>
              <div className={styles.smallHouseImg}>
                <MdOutlineHouse size={26} />
              </div>

              <h1>{translations.isThisYourHouse}</h1>
            </div>
            <div>
              <h2>
                {translations.registerThisHouse}{" "}
                <Link
                  onClick={toggleRegisterPlotView}
                  className={styles.greenLink}>
                  {translations.here}
                </Link>
              </h2>
            </div>
          </div>
        </div>

        <div className={styles.space}></div>
        {}
        {error.length > 0 && <p className={styles.errorMsg}>{error}</p>}
        {}
      </div>
    </div>
  );
}
