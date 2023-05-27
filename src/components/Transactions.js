import React, { useRef,useState,useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import TransactionService from "../services/transaction.service";
import WalletService from '../services/wallet.service'

const Transactions = () =>{
    const [walletRecharge, setWalletRecharge] = useState(0);
    const location = useLocation();
    const [allTransaction,setAllTransaction] = useState([])
    const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [paginationData,setPaginationData] = useState({});
  const walletID = location.pathname.split('/')[2];
    const form = useRef();
    const onRechargeDone = (e) =>{
        e.preventDefault();

    setMessage("");
    // setLoading(true);

    form.current.validateAll();
    TransactionService.createNewTransaction({
        transactionAmount:walletRecharge,
        walletId:walletID,
        transactionType:'Credit'
    }).then(async ()=>{
        
       await WalletService.updateWallet({transactionAmount:walletRecharge, walletId:walletID, transactionType:'Credit'})
       window.location.reload()
    },(error)=>{
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
    const allTransactions = (page) =>{
TransactionService.transactionsByWalletId(walletID,page).then((obj)=>{
    
    setPaginationData({currentPage:obj?.data?.currentPage,
    totalPages:Array.from({length: obj?.data?.totalPages}, (_, i) => i + 1),totalRecords:obj?.data?.totalRecords})
    setAllTransaction(obj?.data?.data)
})
    }
    
    useEffect(()=>{
        allTransactions(1)
    },[])
    const required = (value) => {
        if (!value) {
          return (
            <div className="invalid-feedback d-block">
              This field is required!
            </div>
          );
        }
      };
    return(   
        <React.Fragment>
             <div className="col-md-12">
    <div className="card card-container">
    { (<Form onSubmit={onRechargeDone} ref={form}>
    <div className="form-group">
            <label htmlFor="wallet-recharge">Wallet Recharge Amount</label>
            <Input
              type="number"
              className="form-control"
              name="walletRecharge"
              onChange={(e)=>setWalletRecharge(e.target.value)}
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

          
</div>
</div>
{allTransaction && (<table className="table">
    <thead>
        <tr>
        <td>Transaction Type</td><td>Transaction Status</td><td>Transaction Amount</td><td>Transaction Date</td>
        </tr>
    </thead>
    {allTransaction.map((el)=>(<tr key={el?._id}>
        
 <td>{el?.transactionType}</td><td style={{color: el?.status=== 'Debit'? 'red': 'green'}}>{el?.status}</td><td>{el?.transactionAmount}</td><td>{new Date(el?.date).toString()}</td>
       
    </tr>))}
    <tr className="pagination">
        
        {paginationData?.totalPages?.map((i)=>(<td className={`page-item ${parseInt(paginationData?.currentPage) === i ? "active" :"" }`} key={i+"page"} onClick={()=>allTransactions(i)}><Link className="page-link" to={''} >{i}</Link></td>))}
    </tr>
</table>)}
</React.Fragment>

)
}
export default Transactions