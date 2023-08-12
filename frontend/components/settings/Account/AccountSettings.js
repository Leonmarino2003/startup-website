import React, { useState } from "react";
import { useRouter } from "next/router";
import style from "./AccountSettings.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  handleShowChangeProfile,
} from "../../../redux/slices/componentSlice";
import {
  handleGender,
  handleAddress,
  handleFullName,
  handleBirthDate,
  handleEmail,
  handlePhoneNumber,
} from "../../../redux/slices/userSlice";
import languagesJson from "../../../languages.json";

import Image from "next/image";
import {
  getUserInfo,
  updateUserInfoInDB,
} from "../../../services/backendService";

function AccountSettings() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });

  const translations = languagesJson[languageToUse];

  getUserInfo().then((data) => {
    if (data.name) {
      dispatch(handleFullName({ fullName: data.name }));
    }
    if (data.gender) {
      dispatch(handleGender({ gender: data.gender }));
    }
    if (data.birthDate) {
      dispatch(
        handleBirthDate({
          birthDay: data.birthDate.birthDay,
          birthMonth: data.birthDate.birthMonth,
          birthYear: data.birthDate.birthYear,
        })
      );
    }
    if (data.address) {
      dispatch(handleAddress({ address: data.address }));
    }
    if (data.email) {
      dispatch(handleEmail({ email: data.email }));
    }
    if (data.phoneNumber) {
      dispatch(handlePhoneNumber({ phoneNumber: data.phoneNumber }));
    }
  });

  function goBack() {
    router.push("/");
  }

  const [fullNameInp, setFullNameInp] = useState(undefined);
  const [birthDayInp, setBirthDayInp] = useState(undefined);
  const [birthMonthInp, setBirthMonthInp] = useState(undefined);
  const [birthYearInp, setBirthYearInp] = useState(undefined);
  const [genderInp, setGenderInp] = useState(undefined);
  const [emailInp, setEmailInp] = useState(undefined);
  const [phoneNumberInp, setPhoneNumberInp] = useState(undefined);
  const [addressInp, setAddressInp] = useState(undefined);

  const fullName = useSelector((state) => {
    return state.user.fullName;
  });
  const birthDay = useSelector((state) => {
    return state.user.birthDate.birthDay;
  });
  const birthMonth = useSelector((state) => {
    return state.user.birthDate.birthMonth;
  });
  const birthYear = useSelector((state) => {
    return state.user.birthDate.birthYear;
  });
  const gender = useSelector((state) => {
    return state.user.gender;
  });
  const email = useSelector((state) => {
    return state.user.email;
  });
  const phoneNumber = useSelector((state) => {
    return state.user.phoneNumber;
  });
  const address = useSelector((state) => {
    return state.user.address;
  });
  const editProfile = useSelector((state) => {
    return state.componentHandler.showChangeProfile;
  });

  //skapade funktioner till cancel och save rad 92-97
  function saveChangesBtn() {
    dispatch(handleShowChangeProfile(false));

    //Send new info to the database
    updateUserInfoInDB({
      name: fullNameInp,
      gender: genderInp,
      birthDate: {
        birthDay: birthDayInp,
        birthMonth: birthMonthInp,
        birthYear: birthYearInp,
      },
      address: addressInp,
      email: emailInp,
      phoneNumber: phoneNumberInp,
    }).then((data) => {
      getUserInfo();
    });
    
  }

  function cancelChangesBtn() {
    dispatch(handleShowChangeProfile(false));
  }

  function toEditProfile() {
    dispatch(handleShowChangeProfile(true));
  }

  function separateDate(e) {
    const dateObj = new Date(e);
    setBirthYearInp(dateObj.getFullYear().toString());
    setBirthMonthInp((dateObj.getMonth() + 1).toString().padStart(2, "0"));
    setBirthDayInp(dateObj.getDate().toString().padStart(2, "0"));
  }

  return (
    <div className={`${style.page}`}>
      <div className={style.home1}>
        <div className={style.layout}>
          <div className={style.profile}>
            <h1>
              <div className={style.img}>
                <Image
                  alt=""
                  src="/profilePic.svg"
                  intrinsic
                  width="200"
                  height="200"></Image>
              </div>
              <div className={style.textStyle1}>
                <li>{fullName ? fullName : "--"}</li>
                <li className={style.textStyle}>
                  {email.length > 0 ? email : "Get email from database"}
                </li>
                <li className={style.textStyle}>
                  {phoneNumber ? phoneNumber : "--"}
                </li>
                <button
                  className={style.onclickStyle}
                  onClick={toEditProfile}>
                  Edit Profile
                </button>
              </div>
            </h1>
          </div>
        </div>
        <div className={style.layout}>
          <div className={style.profile1}>
            <section className={style.settingChoices}>
              <h6 className={style.textSize}>{translations.fullName}</h6>
              {editProfile ? (
                <input
                  placeholder="Ex. Amanda Karlsson"
                  onChange={(e) => {
                    setFullNameInp(e.target.value);
                  }}
                  defaultValue={fullName}
                />
              ) : (
                <li>{fullName ? fullName : "--"}</li>
              )}
            </section>
            <section className={style.settingChoices}>
              <h6 className={style.textSize}>{translations.gender}</h6>
              {editProfile ? (
                <input
                  onChange={(e) => {
                    setGenderInp(e.target.value);
                  }}
                  defaultValue={gender}
                  placeholder="Ex. Male/Female"
                />
              ) : (
                <li>{gender ? gender : "--"}</li>
              )}
            </section>
            <section className={style.settingChoices}>
              <h6 className={style.textSize}>{translations.birthday}</h6>
              {editProfile ? (
                <input
                  type="date"
                  placeholder="Ex. 1999-01-01"
                  min="1900-01-01"
                  onChange={(e) => {
                    separateDate(e.target.value);
                  }}
                  defaultValue={`${birthYear}-${birthMonth}-${birthDay}`}
                />
              ) : (
                <li>
                  {birthYear ? birthYear : ""}
                  {"-"}
                  {birthMonth ? birthMonth : ""}
                  {"-"}
                  {birthDay ? birthDay : ""}
                </li>
              )}
            </section>
          </div>
        </div>
        <div className={style.layout}>
          <div className={style.profile2}>
            <section className={style.settingChoices}>
              <h6 className={style.textSize}>{translations.phoneNumber}</h6>
              {editProfile ? (
                <input
                  type="number"
                  className={style.phoneNumberInput}
                  placeholder="Ex. 0123456789"
                  onChange={(e) => {
                    setPhoneNumberInp(e.target.value);
                  }}
                  defaultValue={phoneNumber}
                />
              ) : (
                <li>{phoneNumber ? phoneNumber : "--"}</li>
              )}
            </section>
            <section className={style.settingChoices}>
              <h6 className={style.textSize}>{translations.emailInput}</h6>
              {editProfile ? (
                <input
                  placeholder="Ex. ploteye@gmail.com"
                  defaultValue={email}
                  onChange={(e) => {
                    setEmailInp(e.target.value);
                  }}
                />
              ) : (
                <li>{email ? email : "--"}</li>
              )}
            </section>
            <section className={style.settingChoices}>
              <h6 className={style.textSize}>{translations.address}</h6>
              {editProfile ? (
                <input
                  placeholder="Ex. Madbäcksvägen 16"
                  defaultValue={address}
                  onChange={(e) => {
                    setAddressInp(e.target.value);
                  }}
                />
              ) : (
                <li>{address ? address : "--"}</li>
              )}
            </section>
          </div>
        </div>

        <div className={style.header3}>
          <Image
            alt=""
            src="/Ploteye_image_L.svg"
            intrinsic
            width="200"
            height="200"
          />
        </div>
      </div>

      {editProfile && (
        <section className={style.formButtons}>
          <button
            className={style.cancelBtn}
            onClick={cancelChangesBtn}>
            {translations.cancelChangesBtn}
          </button>
          <button
            className={style.saveBtn}
            onClick={saveChangesBtn}
            type="submit">
            {translations.saveChangesBtn}
          </button>
        </section>
      )}
    </div>
  );
}


export default AccountSettings;
