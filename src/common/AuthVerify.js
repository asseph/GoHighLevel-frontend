import React from "react";
import {useLocation,useNavigate,useParams} from "react-router-dom";


const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const withRouter = Component => props =>{
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  return (
    <Component
      {...props}
      location={location}
      navigate={navigate}
      params={params}
    />
  );
}
const AuthVerify = (props) => {
  
  
    
        const user = JSON.parse(localStorage.getItem("currentUser"));
          if (user) {
      const decodedJwt = parseJwt(user.token);

      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
    

  return <div></div>;
};

export default withRouter(AuthVerify);
