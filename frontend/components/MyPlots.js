import styles from "./MyPlots.module.css";
import { AiOutlineEdit } from "react-icons/ai";
import { useState, useEffect } from "react";
import { fetchOwnerProperties, verifyJWT } from "../services/backendService";
import { useSelector, useDispatch } from "react-redux";
import languagesJson from "../languages.json";
import { handlePlotView } from "../redux/slices/mapSlice";
import {
  handleShowMyPlots,
  handleShowPlotDetails,
} from "../redux/slices/componentSlice";
import BiggerLoadingIcon from "./loadingIcons/BiggerLoadingIcon";
import { setIsLoggedIn } from "../redux/slices/loginSlice";
import Image from "next/image";

export default function MyPlots() {
  const [myPlots, setMyPlots] = useState();
  const dispatch = useDispatch();

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  useEffect(() => {
    async function findMyProperties() {
      const isLoggedIn = await verifyJWT();
      if (isLoggedIn) {
        if (isLoggedIn.loggedIn) {
          const user = isLoggedIn.user;
          try {
            const result = await fetchOwnerProperties(user);
            if (result.success) {
              setMyPlots(result.myproperties);
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          forceLogOut();
        }
      }
    }
    findMyProperties();
  }, []);

  function forceLogOut() {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(setIsLoggedIn(false));
    dispatch(handleShowMyPlots(false));
  }

  function handleChangeView() {
    dispatch(handlePlotView(true));
    dispatch(handleShowMyPlots(false));
  }

  const handleClickPlot = (plot) => {
    let area = 0;
    let circumference = 0;
    let district = "Unknown";
    let description = translations.noDescription;
    if (plot.premiumInfo) {
      if (plot.premiumInfo.area) {
        area = plot.premiumInfo.area;
      }
      if (plot.premiumInfo.circumference) {
        circumference = plot.premiumInfo.circumference;
      }
      if (plot.premiumInfo.district) {
        district = plot.premiumInfo.district;
      }
    }
    if (plot.description) {
      description = plot.description;
    }

    const plotDetails = {
      show: true,
      myPlot: true,
      address: plot.address,
      bids: plot.bidders.length,
      roomQuantity: 0,
      houseArea: 0,
      houseAreaUnits: "m²",
      plotArea: area,
      plotAreaUnits: "m²",
      yearBuilt: translations.unknownYearBuilt,
      ownerType: translations.unknownOwnerType,
      houseType: translations.unknownHouseType,
      circumference: circumference,
      district: district,
      description: description,
    };

    dispatch(handleShowMyPlots(false));
    dispatch(handleShowPlotDetails(plotDetails));
  };

  return (
    <div
      style={{ padding: "0" }}
      className={`${"component-frame"} ${styles.container}`}>
      <div className={styles.header}></div>
      <div className={styles.greenBorder}>
        <p>{translations.myPlots}</p>
      </div>
      {myPlots ? (
        <div className={styles.body}>
          <ul className={styles.myPlotsList}>
            {myPlots.map((plot) => (
              <li
                className={styles.list}
                key={plot._id}
                onClick={() => handleClickPlot(plot)}>
                <div className={styles.plotItem}>
                  <Image
                    width="100"
                    height="100"
                    src="/house.svg"
                    alt="houseImage"
                  />
                  <div className={styles.dropButton}>
                    <AiOutlineEdit />
                  </div>
                  <div className={styles.plotProperties}>
                    <p className={styles.address}>{plot.address.street}</p>
                    <p>
                      {plot.address.postcode} {plot.address.city}{" "}
                      {plot.address.country}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <BiggerLoadingIcon />
      )}

      <div
        className={styles.newPlotFrame}
        onClick={handleChangeView}>
        <p className={styles.newPlotDescriptionW}>
          {translations.addNewProperty} <span>+</span>
        </p>
      </div>
      {}
    </div>
  );
}
