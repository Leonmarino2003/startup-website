import React from "react";
import Layout from "../components/Layout";
import AccountSettings from "../components/settings/Account/AccountSettings";

const Profile = () => {
  return <AccountSettings />;
};

Profile.getLayout = function getLayout(profile) {
  return <Layout>{profile}</Layout>;
};

export default Profile;
