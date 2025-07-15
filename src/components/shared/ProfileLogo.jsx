import React from "react";
import EdumanageLogo from "../../assets/Edumanage_logo_main-removebg.png";
const ProfileLogo = () => {
  return (
    <div className="flex items-center">
      <img className="w-11 h-11" src={EdumanageLogo} alt="Edumanage" />
      <p className="">EduManage </p>
    </div>
  );
};

export default ProfileLogo;
