import React, { useState, useContext } from 'react'
import { ConnectMetamaskContext } from '../context/Connect'

const GetVestingInfo = () => {
  const [role, setRole] = useState('')
 const [userAddress, setuserAddress] = useState('');
 const { contract} = useContext(ConnectMetamaskContext)

 const VestingSchedule = async () => {
  try{
  const getDetails = await contract.vestingSchedules(userAddress, role);
  console.log(getDetails);
  const detail1 = document.getElementById('detail1');
  detail1.innerHTML = `beneficiary: ${getDetails.beneficiary}`;
  const detail2 = document.getElementById('detail2');
  detail2.innerHTML = `cliff: ${getDetails.cliff}`;
  const detail3 = document.getElementById('detail3');
  detail3.innerHTML = `duration: ${getDetails.duration}`;
  const detail6 = document.getElementById('detail6');
  detail6.innerHTML = `totalTokens: ${getDetails.totalTokens}`;
  const detail4 = document.getElementById('detail4');
  detail4.innerHTML = `widthdrawTokenPerMonth: ${getDetails.widthdrawTokenPerMonth}`;
  const detail5 = document.getElementById('detail5');
  detail5.innerHTML = `noOfTokensWithdraw: ${getDetails.noOfTokensWithdraw}`;
  }
  catch(err){
    alert("Error Occured: ", err);
  }
 }
  return (
    <div className='container '>
      <h1 className='text-center my-3'>Welcome to the Vesting Platform</h1>
      <div className='d-flex flex-row mb-3 justify-content-center my-3'>
        <div className="card mx-3" style={{ width: "25rem" }}>
          <div className="card-body">
            <h5 className="card-title">Beneficiary Vesting Info</h5>
            <div className="input-group mb-3 d-flex flex-column">
              <div>
              <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" value={userAddress} onChange={(e) => setuserAddress(e.target.value)} placeholder='Address 0x...' required />
              </div>
              <div>
              <select id="SelectLoanType" className="form-select my-3" aria-label="Default select example" value={role}
                onChange={(e) => setRole(e.target.value)} >
                <option value="" disabled>Select Role</option>
                <option value="0">User</option>
                <option value="1">Partner</option>
                <option value="2">Team</option>
              </select>
            </div>
            </div>
            <button className="btn btn-primary" type="submit" onClick={VestingSchedule}>VestingSchedule</button>
          </div>

          <span className='mx-2' id="detail1"></span>
          <span className='mx-2' id="detail2"></span>
          <span className='mx-2' id="detail3"></span>
          <span className='mx-2' id="detail6"></span>
          <span className='mx-2' id="detail4"></span>
          <span className='mx-2' id="detail5"></span>
          
        </div>
      </div>
    </div>
  )
}

export default GetVestingInfo