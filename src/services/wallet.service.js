import axios from "axios";
import {headers} from '../common/utils'

const WALLET_API = "http://localhost:3000/wallet/";


const createNewWallet = (data) => {
  return axios.post(WALLET_API + "createWallet",data,{headers: headers});
};

const walletList = (page) =>{
  
  return axios.get(WALLET_API+"getWallets/"+page, {
    headers: headers
  })
}
const walletByUser = (userID) =>{
  
  return axios.get(WALLET_API+"getWalletByUser/"+userID, {
    headers: headers
  })
}
const walletByID = (id) =>{
  
  return axios.get(WALLET_API+"getwallet/"+id, {
    headers: headers
  })
}
const updateWallet = (data) =>{
  
  return axios.put(WALLET_API+"updateWallet",data, {
    headers: headers
  })
}


const WalletService = {
  createNewWallet,
  walletByUser,
  walletByID,
  updateWallet,
  walletList
}

export default WalletService;
