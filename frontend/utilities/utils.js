import {
  getBirthDateFromDB,
  getGenderFromDB,
  getPhoneNumberFromDB,
  getEmailFromDB,
  verifyJWT,
} from "../services/backendService";
import {
  handlePhoneNumber,
  handleBirthDate,
  handleGender,
  handleEmail,
} from "../redux/slices/userSlice";
import { setIsLoggedIn } from "../redux/slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";

export async function fetchTilesetData(coords) {
  const response = await fetch(
    `https://api.mapbox.com/v4/liastartup.anlbmit7/tilequery/${coords.lng},${coords.lat}.json?access_token=${process.env.NEXT_PUBLIC_MB_ACCESS_TOKEN}`
  );
  const data = await response.json();
  if (data.features.length >= 1) {
    data.features[0].properties.Area = parseInt(
      data.features[0].properties.Area
    );
    data.features[0].properties.Omkrets = parseInt(
      data.features[0].properties.Omkrets
    );
    const premiumInfo = {
      area: data.features[0].properties.Area,
      circumference: data.features[0].properties.Omkrets,
      district: data.features[0].properties.trakt,
    };
    return premiumInfo;
  } else {
    console.log("DATA NOT FOUND");
    return null;
  }
}

export function formatMovementDates(date, locale) {
  function calcDaysPasses(date1, date2) {
    return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  }

  const daysPassed = calcDaysPasses(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
}

export async function getAccountData() {
  const dispatch = useDispatch();
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
  // Get phonenumber from database
  const phoneNumberFromFB = await getPhoneNumberFromDB(isLoggedIn.user);
  if (phoneNumberFromFB.success) {
    const phoneNumber = phoneNumberFromFB.phoneNumber;
    dispatch(handlePhoneNumber({ phoneNumber }));
  }
  // Get user birthdate from database
  const birthDateFromFB = await getBirthDateFromDB(isLoggedIn.user);
  if (birthDateFromFB.success) {
    const birthDay = birthDateFromFB.birthDate.birthDay;
    const birthMonth = birthDateFromFB.birthDate.birthMonth;
    const birthYear = birthDateFromFB.birthDate.birthYear;
    dispatch(handleBirthDate({ birthDay, birthMonth, birthYear }));
  }
  // Get user gender from database
  const genderFromFB = await getGenderFromDB(isLoggedIn.user);
  if (genderFromFB.success) {
    const gender = genderFromFB.gender;
    dispatch(handleGender({ gender }));
  }
  // Get user email from database
  const emailFromFB = await getEmailFromDB(isLoggedIn.user);
  if (emailFromFB.success) {
    const email = emailFromFB.email;
    dispatch(handleEmail({ email }));
  }
}
