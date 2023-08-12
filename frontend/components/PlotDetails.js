import styles from "./PlotDetails.module.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import languagesJson from "../languages.json";
import {
  handleShowMyBids,
  handleShowMyPlots,
  handleShowPlotDetails,
} from "../redux/slices/componentSlice";
import { addDescription } from "../services/backendService";

export default function PlotDetails() {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const plotDetails = useSelector(
    (state) => state.componentHandler.showPlotDetails
  );

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  function goBack() {
    const newPlotDetails = {
      show: false,
      myPlot: plotDetails.myPlot,
    };

    // If we're in the details view of one of our own plots, go back to
    // My Plots, otherwise go back to My Bids
    if (plotDetails.myPlot) {
      dispatch(handleShowMyPlots(true));
    } else {
      dispatch(handleShowMyBids(true));
    }
    dispatch(handleShowPlotDetails(newPlotDetails));
  }

  function toggleEditMode() {
    setEditMode(!editMode);
  }

  async function saveEdits(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const description = data.get("description");
    const newPlotDetails = {
      show: true,
      myPlot: true,
      address: plotDetails.address,
      bids: plotDetails.bids,
      plotArea: plotDetails.area,
      plotAreaUnits: "m²",
      circumference: plotDetails.circumference,
      district: "Unknown",
      description: description,
    };
    dispatch(handleShowPlotDetails(newPlotDetails));
    setEditMode(false);
    const plotObj = {
      address: plotDetails.address,
      description: description,
    };
    //* Do some form of if check here, if result.success is true then set the description. OR if succes true then do another fetch to database and retrieve the updated info directly from database
    const result = await addDescription(plotObj);
    if (result.success) {
    }
  }

  return (
    <div className={`${"component-frame"} ${styles.container}`}>
      <div className={styles.header}></div>
      <MdKeyboardArrowLeft
        className={styles.icon}
        onClick={goBack}
      />
      <h1 className={styles.nameAdress}>{plotDetails.address.street}</h1>
      <section className={styles.optionsList}>
        <section className={styles.propertiesContainer}>
          {plotDetails.myPlot ? (
            <div className={styles.editsContainer}>
              {editMode ? (
                <div className={`${styles.flexRowCentered}`}>
                  <button
                    className={styles.editBtn}
                    form="editForm">
                    {translations.saveBtn}
                  </button>
                  <button
                    className={styles.editBtn}
                    onClick={toggleEditMode}>
                    {translations.cancel}
                  </button>
                </div>
              ) : (
                <div className={`${styles.flexRow}`}>
                  <div className={styles.bids}>
                    <p>{translations.bid}</p>
                    <p>{plotDetails.bids}</p>
                  </div>
                  <button
                    className={styles.editBtn}
                    onClick={toggleEditMode}>
                    {translations.editBtn}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.flexRowStart}>
              <p style={{ fontWeight: "bold", color: "black" }}>
                {translations.yourBid}
              </p>
              <p>{plotDetails.bidAmount}</p>
              <p>{plotDetails.bidCurrency}</p>
            </div>
          )}
        </section>
        {editMode && (
          <form
            id="editForm"
            onSubmit={(event) => saveEdits(event)}
            width={0}
            height={0}></form>
        )}
        <section className={`${styles.detailsContainer}`}>
          <div className={styles.detailsRow}>
            <p>
              {translations.area}: {plotDetails.plotArea}{" "}
              {plotDetails.plotAreaUnits}
            </p>
            <p>
              {translations.circumference}: {plotDetails.circumference} m
            </p>
          </div>
          <div className={styles.detailsRow}>
            <p>
              {translations.district}: {plotDetails.district}
            </p>
          </div>
        </section>
        {editMode ? (
          <section
            style={{ height: "100%" }}
            className={`${styles.detailsContainer} ${styles.descriptionContainer}`}>
            <div className={styles.detailsRow}>
              <textarea
                form="editForm"
                name="description"
                style={{ color: "var(--darkgrey)" }}
                maxLength={200}
                defaultValue={plotDetails.description}></textarea>
            </div>
          </section>
        ) : (
          <section
            style={{ height: "100%" }}
            className={`${styles.detailsContainer} ${styles.descriptionContainer}`}>
            <div className={styles.detailsRow}>
              <p style={{ color: "var(--darkgrey)" }}>
                {plotDetails.description}
              </p>
            </div>
          </section>
        )}
      </section>
    </div>
  );
}
