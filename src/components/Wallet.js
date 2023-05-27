import React, { useRef,useState,useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {  Link } from "react-router-dom";
import WalletService from "../services/wallet.service";
import AuthService from '../services/auth.service'




const Wallet = () => {
  const form = useRef();
  
  const [walletName, setWalletName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userWallet,setUserWallet] = useState({});
  const currentUser = AuthService.getCurrentUser();
  
const onCreateWallet = (e) =>{
  
  e.preventDefault();

    setMessage("");
    // setLoading(true);

    form.current.validateAll();

    
      WalletService.createNewWallet({walletName:walletName,userID:currentUser?.userID}).then(()=>{
        window.location.reload()
      },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      )

    
}

const walletDetails = () =>{
  
  
  WalletService.walletByUser(currentUser?.userID).then((obj)=>{
    
    setUserWallet(obj.data.data[0])
  },(error) => {
    const resMessage =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();

    setLoading(false);
    setMessage(resMessage);
  })
}

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};

useEffect(()=>{
  walletDetails()
},[])
  return (
    <div className="col-md-12">
      <div className="card card-container">
        

        {!userWallet && (<Form onSubmit={onCreateWallet} ref={form}>
          <div className="form-group">
            <label htmlFor="wallet-name">Wallet Name</label>
            <Input
              type="text"
              className="form-control"
              name="Wallet Name"
              
              onChange={(e)=>setWalletName(e.target.value)}
              validations={[required]}
            />
          </div>

          

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Submit</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          
        </Form>)}

        {userWallet && (
          <>
          <Link to={`/transactions/${userWallet?._id}`} className="nav-link">
            {userWallet.walletName}
              </Link>
            <b>Balance: </b><span>{userWallet.balance}</span> </>
        )}
      </div>
      

    </div>
  );
};

export default Wallet;
