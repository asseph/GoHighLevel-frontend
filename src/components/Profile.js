import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
         User: <strong>{currentUser?.email}</strong>
        </h3>
      </header>
      
      <p>
        <strong>Email:</strong> {currentUser?.email}
      </p>
      
    </div>
  );
};

export default Profile;
