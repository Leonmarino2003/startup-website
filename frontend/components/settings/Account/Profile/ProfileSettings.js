import React, { useEffect, useState } from "react";
import styles from "./ProfileSettings.module.css";
import { useDispatch, useSelector } from "react-redux";

import { BsTrash } from "react-icons/bs";
import { FiUpload} from "react-icons/fi";
import {
  handleShowAccountSettings,
  handleMyProfileSettings,
  hideAll,
} from "../../../../redux/slices/componentSlice";
import {
  handleName,
  handleProfileImage,
} from "../../../../redux/slices/userSlice";
import { onLostFocus } from "../../../../services/inputService";
import {
  saveNameInDB,
  saveImageToDB,
  deleteImageFromDB,
  verifyJWT,
} from "../../../../services/backendService";
import { storage } from "../../../../services/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
import BiggerLoadingIcon from "../../../loadingIcons/BiggerLoadingIcon";
import languagesJson from "../../../../languages.json";
import { showNewPin } from "../../../../redux/slices/mapSlice";
import Image from "next/image";
import ChangeBirthDate from "../BirthDate/ChangeBirthDate.js";

function ProfileSettings() {
  const dispatch = useDispatch();
  const [changeName, setChangeName] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const firstName = useSelector((state) => {
    return state.user.name.firstName;
  });
  const lastName = useSelector((state) => {
    return state.user.name.lastName;
  });

  const profileImageToDisplay = useSelector((state) => state.user.profileImage);

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  async function uploadImage() {
    if (profileImage === null) return;
    setIsLoading(true);
    const imageRef = ref(storage, `profileImages/${profileImage.name + v4()}`);

    uploadBytes(imageRef, profileImage).then(() => {
      getDownloadURL(imageRef)
        .then(async (url) => {
          //Save the image in redux
          dispatch(handleProfileImage(url));

          // Save image to db
          const isLoggedIn = await verifyJWT();
          if (isLoggedIn) {
            if (!isLoggedIn.user) {
              setIsLoading(false);
              return;
            }
          }
          saveImageToDB(url, isLoggedIn.user);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    });
  }

  function removeImage() {
    if (profileImageToDisplay === null) return;
    const imageRef = ref(storage, profileImageToDisplay);
    deleteObject(imageRef)
      .then(async () => {
        // Delete the image in redux
        dispatch(handleProfileImage(null));

        // Delete image to db
        const isLoggedIn = await verifyJWT();
        if (isLoggedIn) {
          if (!isLoggedIn.user) return;
        }
        deleteImageFromDB(isLoggedIn.user);
        // console.log("File deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    uploadImage();
  }, [profileImage]);
  /* lägga till */
  async function saveName(e) {
    e.preventDefault();

    const isLoggedIn = await verifyJWT();
    if (isLoggedIn) {
      if (!isLoggedIn.user) return;
    }
    const formData = new FormData(e.target);
    const formFirstName = formData.get("firstName");
    const formLastName = formData.get("lastName");

    const userObj = {
      formFirstName,
      formLastName,

      id: isLoggedIn.user,
    };
    const data = await saveNameInDB(userObj);
    if (data.success) {
      dispatch(handleName({ formFirstName, formLastName }));
      setChangeName(false);
    }
  }

  function goBack() {
    dispatch(handleMyProfileSettings(false));
    dispatch(handleShowAccountSettings(true));
  }

  function handleClosing() {
    dispatch(hideAll());
    dispatch(newHideAll());
    dispatch(showNewPin(false));
  }

  return (
    <div className={`${"component-frame"} ${styles.container}`}>
      <section className={styles.header}>
        <div className={styles.backBtn}>
          <button onClick={goBack}>
            {"<"} {translations.back}
          </button>
        </div>
        <h1 className="componentHeader">{translations.name}</h1>
      </section>
      <section className={styles.changeProfileImage}>
        {profileImageToDisplay ? (
          <>
            <button disabled>
              <FiUpload />
            </button>
          </>
        ) : (
          <>
            <input
              type="file"
              id="file"
              accept=".jpeg,.png"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
            <label htmlFor="file">
              <FiUpload />
            </label>
          </>
        )}

        {isLoading ? (
          <div className={styles.imageContainer}>
            <BiggerLoadingIcon />
          </div>
        ) : (
          <div className={styles.imageContainer}>
            {profileImageToDisplay ? (
              <Image
                alt=""
                src={profileImageToDisplay}
              />
            ) : (
              <Image
                alt=""
                src="/profilePic.svg"
                intrinsic
                width="107"
                height="107"></Image>
            )}
          </div>
        )}

        {!profileImageToDisplay ? (
          <>
            <button
              className={`${styles.delete} ${styles.disabled}`}
              disabled>
              <BsTrash />
            </button>
          </>
        ) : (
          <>
            <button
              className={styles.delete}
              onClick={removeImage}>
              <BsTrash />
            </button>
          </>
        )}
      </section>
      <div className={styles.divider}></div>
      {firstName && lastName && !changeName ? (
        <section className={styles.currentName}>
          <div className={styles.names}>
            <h2>{firstName}</h2>
            <h2>{lastName}</h2>
          </div>
          <input
            onClick={() => {
              setChangeName(true);
            }}>
            {translations.change}
          </input>
        </section>
      ) : (
        <div className={styles.item}>
          <h3>{translations.enterFullName}</h3>
          <section className={styles.nameChange}>
            <form
              className="formContainer"
              onSubmit={saveName}>
              <label
                className="customField"
                htmlFor="firstName">
                <input
                  className="inputField"
                  styles={{ textAlign: "center" }}
                  onBlur={(e) => onLostFocus(e)}
                  name="firstName"
                  maxLength={35}
                  required></input>
                <span className="placeholder">{translations.firstName}</span>
              </label>
              <label
                className="customField"
                htmlFor="lastName">
                <input
                  className="inputField"
                  styles={{ textAlign: "center" }}
                  onBlur={(e) => onLostFocus(e)}
                  name="lastName"
                  maxLength={35}></input>
                <span className="placeholder">{translations.lastName}</span>
              </label>
              <label
                className="customField"
                htmlFor="birthDate">
                <input
                  className="inputField"
                  styles={{ textAlign: "center" }}
                  onBlur={(e) => onLostFocus(e)}
                  name="firstName"
                  maxLength={35}
                  required></input>
                <span className="placeholder">{translations.firstName}</span>
              </label>
              <section className={styles.formButtons}>
                <button
                  className={styles.cancelBtn}
                  onClick={handleClosing}>
                  {translations.cancelBtn}
                </button>
                <button
                  className={styles.saveBtn}
                  type="submit">
                  {translations.saveBtn}
                </button>
              </section>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default ProfileSettings;
