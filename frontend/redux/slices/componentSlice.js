import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showChangeToEditProfile: false,
  showAdminInterface: false,
  showSearchPopUp: false,
  showOverlay: false,
  showProfileDropdown: false,
  showRightMenuDropdown: false,
  showSettings: false,
  showProfilePage: false,
  showMyBids: false,
  showMyAcceptedBids: false,
  showMyDeniedBids: false,
  showMyPendingBids: false,
  showMyPlots: false,
  showSavedPlots: false,
  showChangePassword: false,
  showLanguageAndRegion: false,
  showDisplayLanguage: false,
  showNotSignedInLanguages: false,
  showAccountSettings: false,
  showProfileSettings: false,
  showPaymentAndPoints: false,
  showChangeCurrency: false,
  showRegistrationInfo: false,
  showOwnershipUpload: false,
  showBidContainer: false,
  showEmailVerification: false,
  showChangeProfile: false,
  showChangeEmail: false,
  showChangeToEditProfile: false,
  showChangeBirthDate: false,
  showChangePhoneNumber: false,
  showChangeAddress: false,
  showAbout: false,
  showTermsOfService: false,
  showPrivacyPolicy: false,
  showChangeGender: false,
  showPlaceBid: false,
  showBidSuccess: false,
  showBidHelp: false,
  showUserFeedback: false,
  showSignup: false,
  showLogIn: false,
  showLogInForm: false,
  showLoginSwiper: false,
  showWhyLogInBox: false,
  showEmailSignup: false,
  showRegisterCardSwiper: false,
  showRegisterModal: false,
  showResetPassword: false,
  showHelpAndSupportPage: false,
  showNotificationSettings: false,
  showNotificationHub: false,
  showTopNav: false,
  showRegisterDonePage: false,
  showPlotDetails: {
    show: false,
    myPlot: false, //true for "My Plots" view, false for my "Bids View"
    address: {
      street: "Nulla Nulla Road",
      postcode: "555 55",
      city: "Nulla Nulla Town",
      country: "Nulla Nulla Land",
    },
    bidAmount: 3400000,
    bidCurrency: "SEK",
    bids: 1,
    plotViews: 0,
    roomQuantity: 6,
    houseArea: 97,
    houseAreaUnits: "m²",
    plotArea: 8,
    plotAreaUnits: "m²",
    yearBuilt: 1984,
    ownerType: "Ownership",
    houseType: "Single-Family Home",
    circumference: 91,
    district: "Nulla Nulla Region",
    description: "No description added.",
  },
};

export const componentSlice = createSlice({
  name: "componentHandler",
  initialState,
  reducers: {
    handleShowChangeToEditProfile: (state, action) => {
      state.showChangeToEditProfile = action.payload;
    },
    handleShowAdminInterface: (state, action) => {
      state.showAdminInterface = action.payload;
    },
    handleShowSearchPopUp: (state, action) => {
      state.showSearchPopUp = action.payload;
    },
    handleShowOverlay: (state, action) => {
      state.showOverlay = action.payload;
    },
    handleShowProfileDropdown: (state, action) => {
      state.showProfileDropdown = action.payload;
    },
    handleShowRightMenuDropdown: (state, action) => {
      state.showRightMenuDropdown = action.payload;
    },
    handleShowSettings: (state, action) => {
      state.showSettings = action.payload;
    },
    handleShowMyBids: (state, action) => {
      state.showMyBids = action.payload;
    },
    handleShowMyAcceptedBids: (state, action) => {
      state.showMyAcceptedBids = action.payload;
    },
    handleShowMyDeniedBids: (state, action) => {
      state.showMyDeniedBids = action.payload;
    },
    handleShowMyPendingBids: (state, action) => {
      state.showMyPendingBids = action.payload;
    },
    handleShowMyPlots: (state, action) => {
      state.showMyPlots = action.payload;
    },

    handleShowChangePassword: (state, action) => {
      state.showChangePassword = action.payload;
    },
    handleShowLanguageAndRegion: (state, action) => {
      state.showLanguageAndRegion = action.payload;
    },
    handleDisplayLanguage: (state, action) => {
      state.showDisplayLanguage = action.payload;
    },
    handleNotSignedInLanguages: (state, action) => {
      state.showNotSignedInLanguages = action.payload;
    },
    handleShowAccountSettings: (state, action) => {
      state.showAccountSettings = action.payload;
    },
    handleMyProfileSettings: (state, action) => {
      state.showProfileSettings = action.payload;
    },
    handleShowPaymentAndPoints: (state, action) => {
      state.showPaymentAndPoints = action.payload;
    },
    handleShowChangeCurrency: (state, action) => {
      state.showChangeCurrency = action.payload;
    },
    handleShowPlotDetails: (state, action) => {
      state.showPlotDetails = action.payload;
    },
    handleShowRegistrationInfo: (state, action) => {
      state.showRegistrationInfo = action.payload;
    },
    handleShowOwnershipUpload: (state, action) => {
      state.showOwnershipUpload = action.payload;
    },
    handleShowBidContainer: (state, action) => {
      state.showBidContainer = action.payload;
    },
    handleShowEmailVerification: (state, action) => {
      state.showEmailVerification = action.payload;
    },
    handleShowChangeEmail: (state, action) => {
      state.showChangeEmail = action.payload;
    },
    handleShowChangeProfile: (state, action) => {
      state.showChangeProfile = action.payload;
    },
    handleShowChangeBirthDate: (state, action) => {
      state.showChangeBirthDate = action.payload;
    },
    handleShowChangeAddress: (state, action) => {
      state.showChangeAddress = action.payload;
    },
    handleShowChangePhoneNumber: (state, action) => {
      state.showChangePhoneNumber = action.payload;
    },
    handleShowAbout: (state, action) => {
      state.showAbout = action.payload;
    },
    handleShowTermsOfService: (state, action) => {
      state.showTermsOfService = action.payload;
    },
    handleShowPrivacyPolicy: (state, action) => {
      state.showPrivacyPolicy = action.payload;
    },
    handleShowProfilePage: (state, action) => {
      state.showProfilePage = action.payload;
    },
    handleShowChangeGender: (state, action) => {
      state.showChangeGender = action.payload;
    },
    handleShowChangeToEditProfile: (state, action) => {
      state.showChangeToEditProfile = action.payload;
    },
    handleShowPlaceBid: (state, action) => {
      state.showPlaceBid = action.payload;
    },
    handleShowBidSuccess: (state, action) => {
      state.showBidSuccess = action.payload;
    },
    handleShowBidHelp: (state, action) => {
      state.showBidHelp = action.payload;
    },
    handleShowUserFeedback: (state, action) => {
      state.showUserFeedback = action.payload;
    },
    handleShowSignup: (state, action) => {
      state.showSignup = action.payload;
    },
    handleShowLogIn: (state, action) => {
      state.showLogIn = action.payload;
    },
    handleShowLogInForm: (state, action) => {
      state.showLogInForm = action.payload;
    },
    handleShowLoginSwiper: (state, action) => {
      state.showLoginSwiper = action.payload;
    },
    handleShowWhyLogInBox: (state, action) => {
      state.showWhyLogInBox = action.payload;
    },
    handleShowVerifyEmailLogin: (state, action) => {
      state.showVerifyEmailLogin = action.payload;
    },
    handleShowEmailSignup: (state, action) => {
      state.showEmailSignup = action.payload;
    },
    handleShowRegisterCardSwiper: (state, action) => {
      state.showRegisterCardSwiper = action.payload;
    },
    handleShowRegisterModal: (state, action) => {
      state.showRegisterModal = action.payload;
    },
    handleShowResetPassword: (state, action) => {
      state.showResetPassword = action.payload;
    },
    handleShowHelpAndSupportPage: (state, action) => {
      state.showHelpAndSupportPage = action.payload;
    },
    handleShowNotificationSettings: (state, action) => {
      state.showNotificationSettings = action.payload;
    },
    handleShowNotificationHub: (state, action) => {
      state.showNotificationHub = action.payload;
    },

    handleShowTopNav: (state, action) => {
      state.showTopNav = action.payload;
    },
    handleShowRegisterDonePage: (state, action) => {
      state.showRegisterDonePage = action.payload;
    },
    handleShowSavedPlots: (state, action) => {
      state.showSavedPlots = action.payload;
    },

    hideAll: (state) => {
      state.showChangeToEditProfile = false;
      state.showOverlay = false;
      state.showProfileDropdown = false;
      state.showRightMenuDropdown = false;
      state.showSettings = false;
      state.showLanguageAndRegion = false;
      state.showDisplayLanguage = false;
      state.showNotSignedInLanguages = false;
      state.showMyBids = false;
      state.showMyAcceptedBids = false;
      state.showMyDeniedBids = false;
      state.showMyPendingBids = false;
      state.showMyPlots = false;
      state.showChangePassword = false;
      state.showAccountSettings = false;
      state.showProfileSettings = false;
      state.showPaymentAndPoints = false;
      state.showChangeCurrency = false;
      state.showPlotDetails = { show: false };
      state.showOwnershipUpload = false;
      state.showRegistrationInfo = false;
      state.showBidContainer = false;
      state.showEmailVerification = false;
      state.showChangeProfile = false;
      state.showChangeEmail = false;
      state.showChangeBirthDate = false;
      state.showChangePhoneNumber = false;
      state.showAbout = false;
      state.showTermsOfService = false;
      state.showPrivacyPolicy = false;
      state.showProfilePage = false;
      state.showChangeToEditProfile = false;
      state.showChangeGender = false;
      (state.showChangeAddress = false), (state.showPlaceBid = false);
      state.showBidSuccess = false;
      state.showBidHelp = false;
      state.showUserFeedback = false;
      state.showSignup = false;
      state.showLogIn = false;
      state.showLogInForm = false;
      state.showLoginSwiper = false;
      state.showWhyLogInBox = false;
      state.showVerifyEmailLogin = false;
      state.showEmailSignup = false;
      state.showRegisterCardSwiper = false;
      state.showResetPassword = false;
      state.showEmailVerification = false;
      state.showRegisterModal = false;
      state.showHelpAndSupportPage = false;
      state.showSearchPopUp = true;
      state.showNotificationSettings = false;
      state.showNotificationHub = false;
      state.showTopNav = false;
      state.showRegisterDonePage = false;
    },
  },
});

export const {
  handleShowAdminInterface,
  handleShowSearchPopUp,
  handleShowOverlay,
  handleShowProfileDropdown,
  handleShowRightMenuDropdown,
  handleShowSettings,
  handleShowMyBids,
  handleShowMyAcceptedBids,
  handleShowMyDeniedBids,
  handleShowMyPendingBids,
  handleShowMyPlots,
  handleShowChangePassword,
  handleShowLanguageAndRegion,
  handleDisplayLanguage,
  handleNotSignedInLanguages,
  handleShowAccountSettings,
  handleMyProfileSettings,
  handleShowPaymentAndPoints,
  handleShowChangeCurrency,
  handleShowPlotDetails,
  handleShowOwnershipUpload,
  handleShowRegistrationInfo,
  handleShowBidContainer,
  handleShowVerificationEmail,
  handleShowChangeEmail,
  handleShowChangeBirthDate,
  handleShowChangePhoneNumber,
  handleShowAbout,
  handleShowTermsOfService,
  handleShowPrivacyPolicy,
  handleShowProfilePage,
  handleShowChangeGender,
  handleShowChangeProfile,
  handleShowChangeToEditProfile,
  handleShowChangeAddress,
  handleShowHelpAndSupportPage,
  newHideAll,
  handleShowEmailVerification,
  handleShowPlaceBid,
  handleShowBidSuccess,
  handleShowBidHelp,
  handleShowUserFeedback,
  handleShowSignup,
  handleShowLogIn,
  handleShowLogInForm,
  handleShowLoginSwiper,
  handleShowWhyLogInBox,
  handleShowVerifyEmailLogin,
  handleShowEmailSignup,
  handleShowRegisterCardSwiper,
  handleShowRegisterModal,
  handleShowResetPassword,
  handleShowNotificationSettings,
  handleShowNotificationHub,
  handleShowTopNav,
  handleShowRegisterDonePage,
  hideAll,
  handleShowSavedPlots,
} = componentSlice.actions;
export default componentSlice.reducer;
