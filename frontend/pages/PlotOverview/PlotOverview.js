import styles from "./PlotOverviewPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateBid } from "../../redux/slices/bidSlice.js";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  handleShowPlaceBid,
  handleShowOverlay,
  handleShowLogIn,
  hideAll,
} from "../../redux/slices/componentSlice.js";
import { useEffect, useState } from "react";
import { onLostFocus } from "../../services/inputService";
import languagesJson from "../../languages.json";
import {
  BiConversation,
  BiEraser,
  BiLock,
  BiFace,
  BiAbacus,
  BiPencil,
} from "react-icons/bi";

import Link from "next/link";
import {
  handleShowUserFeedback,
  handleShowRegisterCardSwiper,
} from "../../redux/slices/componentSlice";
import { IoMdGrid } from "react-icons/io";
import { BsHouseDoorFill, BsPeople } from "react-icons/bs";
import { BiWrench, BiRectangle } from "react-icons/bi";
import LogIn from "../../components/login";
import React from "react";
import ReactInputMask from "react-input-mask-next";
import Layout from "../../components/Layout";
import FavoriteButton from "../../components/favoritePlots/favoriteButton";

export default function PlotOverview() {
  const router = useRouter();
  const dispatch = useDispatch();
  const coords = useSelector((state) => {
    return state.map.coords;
  });
  const address = useSelector((state) => {
    return state.map.address;
  });
  const [formattedValue, setFormattedValue] = useState("");

  /*   const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showInfo, setshowInfo] = useState(false);
  const [info, setinfo] = useState({});
  const [selected, setSelected] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [favoriteProperty, setFavoriteProperty] = useState(null); */

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
  const [checked, setChecked] = useState(false);

  let currencyToUse = useSelector((state) => {
    return state.user.currency;
  });
  let enterBidForm = useSelector((state) => {
    return translations.enterBid.toUpperCase();
  });

  const bidAmount = useSelector((state) => {
    return state.placeBid.bid.amount;
  });
  //console.log(bidAmount);

  const isLoggedIn = useSelector((state) => {
    return state.login.isLoggedIn;
  });

  const ShowLogIn = useSelector((state) => {
    return state.componentHandler.ShowLogIn;
  });

  const showRegisterCardSwiper = useSelector((state) => {
    return state.componentHandler.showRegisterCardSwiper;
  });
  //console.log(showRegisterCardSwiper);

  const removeLogin = () => {
    dispatch(handleShowLogIn(false));
  };

  const submitBid = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    // If user is not logged in, show the sign up modal
    if (!isLoggedIn) {
      console.log("your are not logged in");
      dispatch(handleShowOverlay(true));
      dispatch(handleShowLogIn(true));
    }

    if (isLoggedIn) {
      console.log("you are logged in");
      dispatch(updateBid({ address: address, bid: e.target.bid.value.replace(/[^\d]/g, "") }));
      router.push("/PlotOverview/BidSummary");
    }
  };

  const openFeedback = () => {
    dispatch(handleShowUserFeedback(true));
    dispatch(handleShowPlaceBid(false));
  };

  const getFormattedValue = (value) => {
    const numericValue = value.replace(/[^\d]/g, "");
    if (!value) return "";
  
    const length = numericValue.length;
    const blocks = [];
    
    if (length%3){
      blocks.push(numericValue.slice(0, length%3));
    }

    let start = length%3;
    while (start < length) {
      blocks.push(numericValue.slice(start, start + 3));
      start += 3;
    }
    return blocks.join(" ");
  };
  
  const handleChange = (event) => {
    const input = event.target.value;
    const formatted = getFormattedValue(input);
    setFormattedValue(formatted);

    // Here, you can also update the original value if you need it
    // by removing the spaces and storing it separately.
  };

  return (
    <>
      <div className={styles.mainBox}>
        <div className={styles.flexColumn}>
          <div className={styles.imgContainer}>
            <Image
              width={100}
              height={100}
              alt=""
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
                  <p className={styles.bidParagraph}>
                    {address.country} {">"} {address.postcode} {">"}{" "}
                    {address.city}
                  </p>
                </section>
              </div>

              {/* information about the plot */}

              {showRegisterCardSwiper && removeLogin()}

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
                  1964
                </li>
                <FavoriteButton property={{ address }} />
              </div>
            </div>
          </div>

          <div className={styles.mainSection}>
            {/* Bid box */}
            <div className={styles.evaluation}>
              <div className={styles.valuation}>
                <div className={styles.valuationPlot}>
                  <h2>{translations.ploteyesValuation}</h2>
                  <p> ≈ 50 000 {currencyToUse}</p>
                </div>
              </div>
              <div className={styles.valuationLinks}>
                <ul>
                  <li>
                    <Link href="">{translations.readMore}</Link>
                  </li>
                  <li>
                    <Link
                      href=""
                      onClick={() => {
                        openFeedback();
                      }}>
                      <div> {translations.feedback}</div>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* the css for bid form is here and some of it in the css */}
              <form
                onSubmit={(event) => submitBid(event)}
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
                      value={formattedValue}
                      onChange={handleChange}
                      inputMode="numeric"
                      name="bid"
                      min="1"
                      placeholder={enterBidForm}
                      required
                    />

                    <span
                      className="placeholder"
                      style={{ left: "80%", fontSize: "14px" }}>
                      {currencyToUse}
                    </span>
                  </label>
                  <section className={styles.buttonSection}>
                    <div className={styles.groupButtons}>
                      <div className={styles.buttons}>
                        <button
                          title={translations.reset.toUpperCase()}
                          className="submitBtn"
                          type="reset"
                          style={{
                            backgroundColor: "#393939",
                            color: "#fff",
                          }}>
                          {translations.reset}
                        </button>

                        <button
                          className={`${"dark-green"}`}
                          type="Next">
                          {
                            /* isLoading ? <LoadingIcon /> :  */ translations.placeBidBtn
                          }
                        </button>
                      </div>
                      <div className={styles.line}></div>
                      <div className={styles.properties}>
                        <h3>{translations.evaluateProperties}</h3>
                        <p>{translations.evaluateProperties1}</p>
                        <ul>
                          <li>{translations.evaluateProperties2}</li>
                          <li>{translations.evaluateProperties3}</li>
                          <li>{translations.evaluateProperties4}</li>
                          <li>{translations.evaluateProperties5}</li>
                          <li>{translations.evaluateProperties6}</li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </div>
              </form>
            </div>

            <div className={styles.safePurchase}>
              <div className={styles.about}>
                <h2>{translations.aSafePurchase}</h2>
                <ul>
                  {" "}
                  {/* Commented out the "hard-coded" translation and insert with the translation props, see below */}
                  <li>
                    {" "}
                    <BiAbacus size={20} /> {translations.SafePurchase0}{" "}
                    {/* You&apos;re <b>never</b> bound to buy the property you bid on. */}
                  </li>
                  <li>
                    {" "}
                    <BiConversation size={20} /> {translations.SafePurchase1}
                    {/* {" "} The bid is made as proposal <b>only</b>. */}
                  </li>
                  <li>
                    {" "}
                    <BsPeople size={20} /> {translations.SafePurchase2}
                    {/* How you proceed is up to you and the <b>land owner</b>. */}
                  </li>
                  <li>
                    {" "}
                    <BiEraser size={20} /> {translations.SafePurchase3}
                    {/* Change your mind <b>at any step </b> in the bid process. */}
                  </li>
                  <li>
                    {" "}
                    <BiFace size={20} /> {translations.SafePurchase4}
                    {/* The land owner can <b>accept</b> or <b>deny</b>deny your bid proposal. */}
                  </li>
                  <li>
                    {" "}
                    <BiPencil size={20} /> {translations.SafePurchase5}
                    {/* Add an{" "} <b>optional</b> comment to make your bid stand out. */}
                  </li>
                  <li>
                    {" "}
                    <BiLock size={20} /> {translations.SafePurchase6}
                    {/*Your data is <b>always</b> secured. */}
                  </li>
                </ul>
                {/*    <div className={styles.checkBox}>
               <input type="checkbox" name="checkBoxText" onChange={() => setChecked(!checked)} checked={checked}/>
               <label  for="checkBoxText" >Hide this information      
               </label>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

PlotOverview.getLayout = function getLayout(plotOverview) {
  return <Layout>{plotOverview}</Layout>;
};
