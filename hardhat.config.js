require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config({path:__dirname+'/.env'})
const { API_URL, PRIVATE_KEY } = process.env;
module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: "./app/src/artifacts",
  },
  defaultNetwork: "sepolia", 
   networks: {    
     hardhat: {},   
     sepolia: {     
      url: API_URL,      
      accounts: [PRIVATE_KEY],   
     }
   }
};
