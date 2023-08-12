import styles from "./feedback.module.css";
import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { giveFeedback } from "../services/backendService";
import { useDispatch, useSelector } from "react-redux";
import { showNewPin } from "../redux/slices/mapSlice";
import languagesJson from "../languages.json";
import LoadingIcon from "./loadingIcons/LoadingIcon";
import { handleShowUserFeedback } from "../redux/slices/componentSlice";

export default function Feedback() {
  const [stars, setStars] = useState(0);
  const [starsRequired, setStarsRequired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const dispatch = useDispatch();

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const feedback = data.get("comment");
    submitFeedback(stars, feedback);
  };

  async function submitFeedback(stars, comment) {
    if (stars != 0) {
      setIsLoading(true);
      const feedbackObj = {
        stars,
        comment,
      };
      try {
        const data = await giveFeedback(feedbackObj);
        setFeedbackSent(true);
        setIsLoading(false);
      } catch (error) {
        dispatch(handleShowUserFeedback(false));
        setIsLoading(false);
        dispatch(showNewPin(false));
      }
    } else {
      setStarsRequired(true);
      return;
    }
  }

  function closeComponent() {
    dispatch(handleShowUserFeedback(false));
    dispatch(showNewPin(false));
  }

  const setRating = (star) => {
    setStarsRequired(false);
    setStars(star);
  };

  return (
    <div
      style={{ textAlign: "center" }}
      className={`${"component-frame"}`}>
      <CgClose
        size={32}
        className={styles.closeBtn}
        onClick={closeComponent}
      />
      {feedbackSent ? (
        <section>
          <p className={styles.feedbackTitle}>
            {translations.postFeedbackHeader}
          </p>
          <p>{translations.postFeedbackExtra}</p>
          <p>
            <span style={{ fontWeight: "bold" }}>
              {translations.anyQuestions}
            </span>
            {translations.FAQSupport}
          </p>
          <button
            onClick={closeComponent}
            className={`${styles.submitBtn} ${"dark-green"}`}>
            OK
          </button>
        </section>
      ) : (
        <div>
          <p className={styles.feedbackTitle}>{translations.feedbackHeader}</p>
          <section>
            <button
              onClick={() => setRating(1)}
              data-testid="star1"
              className={styles.star}>
              {stars > 0 ? (
                <AiFillStar
                  data-testid="fillstar1"
                  color="orange"
                />
              ) : (
                <AiOutlineStar data-testid="outlinestar1" />
              )}
            </button>
            <button
              onClick={() => setRating(2)}
              data-testid="star2"
              className={styles.star}>
              {stars > 1 ? (
                <AiFillStar
                  data-testid="fillstar2"
                  color="orange"
                />
              ) : (
                <AiOutlineStar data-testid="outlinestar2" />
              )}
            </button>
            <button
              onClick={() => setRating(3)}
              data-testid="star3"
              className={styles.star}>
              {stars > 2 ? (
                <AiFillStar
                  data-testid="fillstar3"
                  color="orange"
                />
              ) : (
                <AiOutlineStar data-testid="outlinestar3" />
              )}
            </button>
            <button
              onClick={() => setRating(4)}
              data-testid="star4"
              className={styles.star}>
              {stars > 3 ? (
                <AiFillStar
                  data-testid="fillstar4"
                  color="orange"
                />
              ) : (
                <AiOutlineStar data-testid="outlinestar4" />
              )}
            </button>
            <button
              onClick={() => setRating(5)}
              data-testid="star5"
              className={styles.star}>
              {stars > 4 ? (
                <AiFillStar
                  data-testid="fillstar5"
                  color="orange"
                />
              ) : (
                <AiOutlineStar data-testid="outlinestar5" />
              )}
            </button>
          </section>
          <form onSubmit={(event) => handleSubmit(event)}>
            <textarea
              className={styles.feedbackInput}
              placeholder={translations.feedbackInputText}
              maxLength={180}
              name="comment"></textarea>
            {starsRequired ? (
              <p className={styles.errorMsg}>
                {translations.feedbackStarsError}
              </p>
            ) : null}
            <button className={`${styles.submitBtn} ${"dark-green"}`}>
              {isLoading ? (
                <LoadingIcon />
              ) : (
                translations.feedbackSendBtn.toUpperCase()
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
