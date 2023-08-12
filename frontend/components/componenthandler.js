import { useEffect } from "react";
import Faq from "../pages/Faq.js";
import { useSelector, useDispatch } from "react-redux";
import { setDisplaySplashScreen } from "../redux/slices/splashSlice.js";
import PlaceBid from "./placebid.js";
import BidSuccess from "./bidsuccess.js";
import BidHelp from "./BidHelp.js";
import UserFeedback from "./feedback.js";
import SignUp from "./signup.js";
import LogIn from "./login.js";
import LogInForm from "./loginForm.js";
import LoginSwiper from "./cards/loginSwiper.js";
import WhyLoginBox from "./whyLoginBox.js";
import VerifyEmailLogin from "./verifyEmailLogin.js";
import RegisterPlot from "./registerPlot/RegisterPlot.js";
import MyBids from "./myBidsComponents/MyBids";
import MyPlots from "./MyPlots.js";
import Settings from "./settings/Settings.js";
import Privacy from "./settings/About/policy/Privacy.js";
import Condition from "./settings/About/Terms/Condition.js";
import ChangePassword from "./settings/Account/Password/ChangePassword.js";
import ChangeBirthDate from "./settings/Account/BirthDate/ChangeBirthDate";
import ChangeEmail from "./settings/Account/Email/ChangeEmail";
import ChangePhoneNumber from "./settings/Account/Phone/ChangePhoneNumber";
import AccountSettings from "./settings/Account/AccountSettings";
import ProfileSettings from "./settings/Account/Profile/ProfileSettings";
import LanguageRegion from "./settings/languageAndRegion/LanguageRegion.js";
import DisplayLanguage from "./settings/languageAndRegion/DisplayLanguage.js";
import NotSignedInLanguages from "./settings/languageAndRegion/NotSignedInLanguages.js";
import PaymentAndPoints from "./settings/paymentAndPoints/PaymentAndPoints.js";
import ChangeCurrency from "./settings/paymentAndPoints/ChangeCurrency.js";
import PlotDetails from "./PlotDetails.js";
import UploadOwnership from "./registerPlot/UploadOwnership.js";
import RegistrationInfo from "./registerPlot/RegistrationInfo.js";
import ResetPassword from "./account/resetPassword.js";
import BidContainer from "./myBidsComponents/BidContainer.js";
import EmailVerification from "./cards/registerEmailVerification.js";
import ProfilePage from "./settings/ProfilePage.js";
import ChangeAddress from "./settings/Account/Address/ChangeAddress.js";
import ChangeGender from "./settings/Account/Gender/ChangeGender.js";
import HelpAndSupportPage from "./settings/helpAndSupport/HelpAndSupportPage.js";
import NotificationSettings from "./settings/Notification/NotificationSettings.js";
import NotificationHub from "./NotificationHub.js";
import TopNav from "./topNav.js";
import RegisterDonePage from "./registerPlot/RegisterDonePage.js";
import RegisterCardSwiper from "./cards/registerCardSwiper";
import AdminInterface from "./adminInterface/AdminInterface.js";
export default function ComponentHandler() {
  const dispatch = useDispatch();

  const showAdminInterface = useSelector(
    (state) => state.componentHandler.showAdminInterface
  );
  const showPlacebid = useSelector(
    (state) => state.componentHandler.showPlaceBid
  );

  const showFaq = useSelector((state) => state.componentHandler.showFaq);
  const showBidsuccess = useSelector(
    (state) => state.componentHandler.showBidSuccess
  );
  const showBidhelp = useSelector(
    (state) => state.componentHandler.showBidHelp
  );
  const showFeedback = useSelector(
    (state) => state.componentHandler.showUserFeedback
  );
  const showSignup = useSelector((state) => state.componentHandler.showSignup);
  const showLogin = useSelector((state) => state.componentHandler.showLogIn);
  const showLoginForm = useSelector(
    (state) => state.componentHandler.showLogInForm
  );
  const showLoginSwiper = useSelector(
    (state) => state.componentHandler.showLoginSwiper
  );
  const showWhyLogInBox = useSelector(
    (state) => state.componentHandler.showWhyLogInBox
  );
  const showVerifyEmailLogin = useSelector(
    (state) => state.componentHandler.showVerifyEmailLogin
  );

  const showRegisterCardSwiper = useSelector(
    (state) => state.componentHandler.showRegisterCardSwiper
  );
  const registerPlot = useSelector((state) => state.map.registerPlotView);
  const showMyBids = useSelector((state) => state.componentHandler.showMyBids);
  const showRegisterModal = useSelector(
    (state) => state.componentHandler.showRegisterModal
  );
  const showMyPlots = useSelector(
    (state) => state.componentHandler.showMyPlots
  );
  const showSettings = useSelector(
    (state) => state.componentHandler.showSettings
  );
  const showTermsOfService = useSelector(
    (state) => state.componentHandler.showTermsOfService
  );
  const showPrivacyPolicy = useSelector(
    (state) => state.componentHandler.showPrivacyPolicy
  );
  const showChangePassword = useSelector(
    (state) => state.componentHandler.showChangePassword
  );
  const showLanguageAndRegion = useSelector(
    (state) => state.componentHandler.showLanguageAndRegion
  );
  const showDisplayLanguage = useSelector(
    (state) => state.componentHandler.showDisplayLanguage
  );
  const showNotSignedInLanguages = useSelector(
    (state) => state.componentHandler.showNotSignedInLanguages
  );
  const showAccountSettings = useSelector(
    (state) => state.componentHandler.showAccountSettings
  );
  const showProfileSettings = useSelector(
    (state) => state.componentHandler.showProfileSettings
  );
  const showPaymentAndPoints = useSelector(
    (state) => state.componentHandler.showPaymentAndPoints
  );
  const showChangeCurrency = useSelector(
    (state) => state.componentHandler.showChangeCurrency
  );
  const showPlotDetails = useSelector(
    (state) => state.componentHandler.showPlotDetails.show
  );
  const showRegistrationInfo = useSelector(
    (state) => state.componentHandler.showRegistrationInfo
  );
  const showResetPassword = useSelector(
    (state) => state.componentHandler.showResetPassword
  );
  const showOwnershipUpload = useSelector(
    (state) => state.componentHandler.showOwnershipUpload
  );
  const showBidContainer = useSelector(
    (state) => state.componentHandler.showBidContainer
  );
  const showEmailVerification = useSelector(
    (state) => state.componentHandler.showEmailVerification
  );
  const showChangeEmail = useSelector(
    (state) => state.componentHandler.showChangeEmail
  );
  const showChangeBirthDate = useSelector(
    (state) => state.componentHandler.showChangeBirthDate
  );
  const showChangePhoneNumber = useSelector(
    (state) => state.componentHandler.showChangePhoneNumber
  );
  const showChangeAddress = useSelector(
    (state) => state.componentHandler.showChangeAddress
  );
  const showProfilePage = useSelector(
    (state) => state.componentHandler.showProfilePage
  );
  const showChangeGender = useSelector(
    (state) => state.componentHandler.showChangeGender
  );
  const showHelpAndSupportPage = useSelector(
    (state) => state.componentHandler.showHelpAndSupportPage
  );
  const showNotificationSettings = useSelector(
    (state) => state.componentHandler.showNotificationSettings
  );
  const showNotificationHub = useSelector(
    (state) => state.componentHandler.showNotificationHub
  );

  const showTopNav = useSelector((state) => state.componentHandler.showTopNav);

  const showRegisterDonePage = useSelector(
    (state) => state.componentHandler.showRegisterDonePage
  );

  useEffect(() => {
    async function shouldDisplaySplashScreen() {
      const isLocalStorage = await fetchLocalStorage();

      if (isLocalStorage) {
        dispatch(setDisplaySplashScreen(false));
      } else {
        dispatch(setDisplaySplashScreen(true));
      }
    }
    shouldDisplaySplashScreen();
  }, []);

  async function fetchLocalStorage() {
    try {
      const fromLS = localStorage.getItem("SplashScreen");
      if (fromLS) {
        return fromLS;
      } else {
        return false;
      }
    } catch (err) {}
  }

  return (
    <div>
      {showPlacebid && !registerPlot && <PlaceBid />}
      {showBidsuccess && <BidSuccess />}
      {showBidhelp && <BidHelp />}
      {showEmailVerification && <EmailVerification />}
      {showFeedback && <UserFeedback />}
      {showSignup && <SignUp />}
      {showLogin && <LogIn />}
      {showLoginForm && <LogInForm />}
      {showLoginSwiper && <LoginSwiper />}
      {showWhyLogInBox && <WhyLoginBox />}
      {showVerifyEmailLogin && <VerifyEmailLogin />}
      {showRegisterCardSwiper && <RegisterCardSwiper />}
      {showMyBids && <MyBids />}
      {showMyPlots && <MyPlots />}
      {showSettings && <Settings />}
      {showTermsOfService && <Condition />}
      {showPrivacyPolicy && <Privacy />}
      {showChangePassword && <ChangePassword />}
      {showLanguageAndRegion && <LanguageRegion />}
      {showDisplayLanguage && <DisplayLanguage />}
      {showNotSignedInLanguages && <NotSignedInLanguages />}
      {showAccountSettings && <AccountSettings />}
      {showProfileSettings && <ProfileSettings />}
      {showPaymentAndPoints && <PaymentAndPoints />}
      {registerPlot && showRegisterModal && <RegisterPlot />}
      {showChangeCurrency && <ChangeCurrency />}
      {showRegistrationInfo && <RegistrationInfo />}
      {showResetPassword && <ResetPassword />}
      {showOwnershipUpload && <UploadOwnership />}
      {showPlotDetails && <PlotDetails />}
      {showBidContainer && <BidContainer />}
      {showChangeBirthDate && <ChangeBirthDate />}
      {showChangeEmail && <ChangeEmail />}
      {showChangePhoneNumber && <ChangePhoneNumber />}
      {showChangeAddress && <ChangeAddress />}
      {showProfilePage && <ProfilePage />}
      {showChangeGender && <ChangeGender />}
      {showHelpAndSupportPage && <HelpAndSupportPage />}
      {showNotificationSettings && <NotificationSettings />}
      {showNotificationHub && <NotificationHub />}

      {showTopNav && <TopNav />}
      {showAdminInterface && <AdminInterface />}
      {showRegisterDonePage && <RegisterDonePage />}
      {showFaq && <Faq />}
    </div>
  );
}
