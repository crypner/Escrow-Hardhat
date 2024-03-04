import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import deploy from './deploy';
import Escrow from './Escrow';

const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}


 
function App() {
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  
  

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }
    getAccounts();   
  }, [account]);

  async function newContract() {
    const beneficiary = document.getElementById('beneficiary').value;
    const arbiter = document.getElementById('arbiter').value;
    const value = ethers.utils.parseEther(document.getElementById('eth').value);
    const escrowContract = await deploy(signer, arbiter, beneficiary, value);


    const escrow = {
      address: escrowContract.address,
      arbiter,
      beneficiary,
      value: value.toString(),
      handleApprove: async () => {        
        document.getElementById(escrowContract.address).remove();
        document.querySelector("._" + escrowContract.address).classList.add('pending');
        document.querySelector("._" + escrowContract.address).innerText =
            "Approval in progress";
        escrowContract.on('Approved', () => {
          document.querySelector("._" + escrowContract.address).classList.remove('pending');
          document.querySelector("._" + escrowContract.address).classList.add('complete');
          document.querySelector("._" + escrowContract.address).innerText =
            "✓ It's been approved!";
        });

        await approve(escrowContract, signer);
      },
    };
    setEscrows([...escrows, escrow]);
  }

  return (
    <>
      <div className="contract">
        <h2> New Contract </h2>
        <label>
          Arbiter Address
          <input type="text" id="arbiter" />
        </label>

        <label>
          Beneficiary Address
          <input type="text" id="beneficiary" />
        </label>

        <label>
          Deposit Amount (in ETH)
          <input type="text" id="eth" />
        </label>

        <div
          className="button"
          id="deploy"
          onClick={(e) => {
            e.preventDefault();
            newContract();
          }}
        >
          Deploy
        </div>
      </div>

      <div className="existing-contracts">
        <h2> Existing Contracts </h2>

        <div id="container">
          {escrows.length > 0 ? escrows.map((escrow) => {
            return <Escrow key={escrow.address} {...escrow} />;
          }):
            <p>No Contracts</p>
        }
        </div>
      </div>
    </>
  );
}

export default App;
