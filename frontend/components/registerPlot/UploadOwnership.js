import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./UploadOwnership.module.css";
import {
  handleShowOwnershipUpload,
  handleShowRegistrationInfo,
} from "../../redux/slices/componentSlice";
import { showNewPin } from "../../redux/slices/mapSlice";
import { storage } from "../../services/firebase";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  fetchOwnerProperties,
  saveOwnerDocToDB,
  verifyJWT,
  registerPendingProperty,
} from "../../services/backendService";
import { MdDone } from "react-icons/md";
import {
  BiCheckCircle,
  BiSidebar,
  BiIdCard,
  BiLike,
  BiUpload,
} from "react-icons/bi";
import LoadingIcon from "../loadingIcons/LoadingIcon";
import languagesJson from "../../languages.json";

function UploadOwnership() {
  const dispatch = useDispatch();
  const [ownerDoc, setOwnerDoc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { city, postcode, country, street, premiumInfo } = useSelector(
    (state) => {
      return state.chosenProperty;
    }
  );

  function handleClosing() {
    dispatch(showNewPin(false));
    dispatch(handleShowOwnershipUpload(false));
  }

  function handleProceeding() {
    dispatch(handleShowRegistrationInfo(true));
    dispatch(handleShowOwnershipUpload(false));
  }

  async function uploadFile() {
    if (ownerDoc === null) return;
    const fileRef = ref(storage, `ownershipDocs/${ownerDoc.name + v4()}`);

    uploadBytes(fileRef, ownerDoc).then(() => {
      getDownloadURL(fileRef)
        .then(async (url) => {
          const isLoggedIn = await verifyJWT();
          const user = {
            user: isLoggedIn.user,
          };
          const userProperties = await fetchOwnerProperties(user);
          const propertyId =
            userProperties.myproperties[userProperties.myproperties.length - 1]
              ._id;

          const tryToSaveDoc = await saveOwnerDocToDB(
            url,
            isLoggedIn.user,
            propertyId
          );
          if (tryToSaveDoc) {
            handleClosing();
          } else {
            console.log("error");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  async function handleRegisterProperty() {
    const isLoggedIn = await verifyJWT();
    if (isLoggedIn) {
      if (!isLoggedIn.user) return;
    }

    const addressObj = {
      street,
      postcode,
      city,
      country,
    };

    const registerBody = {
      userId: isLoggedIn.user,
      address: addressObj,
    };
    const data = await registerPendingProperty(registerBody);
    if (data.success) {
      uploadFile();
    } else {
      setError(true);
      setIsLoading(false);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  return (
    <div className={style.componentFrame}>
      <h2 className={style.register}>{translations.youRegOwner}</h2>
      <section className={style.addressFrame}>
        <h3>{street}</h3>
        <section className={style.cityAndCountry}>
          <p>
            {country} {">"} {postcode} {">"} {city}
          </p>
        </section>
      </section>
      <section className={style.infoBox}>
        <div className={style.stage}>
          <div className={style.elipse}>
            <BiCheckCircle />
          </div>
          <p>{translations.toVerify}</p>
        </div>
        <div className={style.stage}>
          <div className={style.elipse}>
            <BiSidebar />
          </div>
          <p>{translations.toSkatte}</p>
        </div>
        <div className={`${style.uploadStage} ${style.stage}`}>
          <div className={style.dotAndText}>
            <div className={style.elipse}>
              <BiIdCard />
            </div>
            <p>{translations.uploadDoc}</p>
          </div>
          {ownerDoc && <MdDone className={style.doneIcon} />}
          <input
            type="file"
            id="file"
            accept=".jpeg,.png,.pdf"
            onChange={(e) => setOwnerDoc(e.target.files[0])}
          />
          <label htmlFor="file">
            <BiUpload />
          </label>
        </div>
        <div className={style.stage}>
          <div className={style.elipse}>
            <BiLike />
          </div>
          <p>{translations.pressDone}</p>
        </div>
      </section>

      <div className={style.addPlot}>
        <p className={style.breadText}>{translations.byClickAdd}</p>

        <button
          onClick={handleClosing}
          className={style.cancel}>
          {" "}
          {translations.cancel}
        </button>

        {ownerDoc ? (
          <button
            className={style.doneBtn}
            onClick={() => {
              setIsLoading(true);
              handleRegisterProperty();
              handleProceeding();
            }}>
            {isLoading ? <LoadingIcon /> : <>{translations.done}</>}
          </button>
        ) : (
          <button
            className={style.notDoneBtn}
            disabled>
            {translations.addPlot}
          </button>
        )}
      </div>
    </div>
  );
}

export default UploadOwnership;
