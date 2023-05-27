import axios from "axios";
import {headers} from '../common/utils'
const TRANSACTION_API = 'http://localhost:3001/transaction/';

const createNewTransaction = (data) => {
    return axios.post(TRANSACTION_API + "createTransaction",data,{headers: headers});
  };
  const transactionsByWalletId = (id,page) => {
    return axios.get(TRANSACTION_API + "getTransaction/"+page+"/"+id,{headers: headers});
  };

  const TransactionService = {
    createNewTransaction,
    transactionsByWalletId
  }
  export default TransactionService