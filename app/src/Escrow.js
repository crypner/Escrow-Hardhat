import { ethers } from 'ethers';

export default function Escrow({
  address,
  arbiter,
  beneficiary,
  value,
  handleApprove,
}) {
  const valueInEth = ethers.utils.formatUnits(value, 18);
  return (
    <div className="existing-contract">
      <ul className="fields">
        <li>
          <div> Arbiter: </div>
          <div> <span title={arbiter}>{arbiter.slice(0,7)}...{arbiter.slice(arbiter.length-5,arbiter.length)}</span> </div>
        </li>
        <li>
          <div> Beneficiary: </div>
          <div> <span title={beneficiary}>{beneficiary.slice(0,7)}...{beneficiary.slice(beneficiary.length-5,beneficiary.length)}</span> </div>
        </li>
        <li>
          <div> Value: </div>
          <div> <strong>ETH</strong> {valueInEth} </div>
        </li>
        <div
          className="button"
          id={address}
          onClick={(e) => {
            e.preventDefault();
            handleApprove();
          }}
        >
          Approve
        </div>
        <div
          className={ "_" + address}
        >          
        </div>
        
      </ul>
    </div>
  );
}
