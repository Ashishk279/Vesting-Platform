import React, { useContext, useState } from 'react'
import { ConnectMetamaskContext } from '../context/Connect'

const ClaimToken = () => {
  const [role, setRole] = useState('')
  const [role1, setRole1] = useState('')
  const { contract } = useContext(ConnectMetamaskContext)

  const CheckReleasedTokens = async () => {
    try {
      const check = await contract.checkReleasedTokens(role);
      await check.wait();
      console.log(check);
      alert(`Released Tokens : ${check}`);
    } catch (error) {
      alert(`There is some error: ${error.reason}`)
    }
  }

  const ClaimTokens = async () => {
    try {
      const claim = await contract.claimtokens(role);
      await claim.wait();
      console.log(claim);
      alert(`Claim Tokens Successfully : ${claim.hash}`);
    } catch (error) {
      alert(`There is some error: ${error.reason}`)
    }
  }
  return (
    <div className='container '>
      <h1 className='text-center my-3'>Welcome to the Vesting Platform</h1>
      <div className='d-flex flex-row mb-3 justify-content-center my-3'>
        <div className="card mx-3" style={{ width: "25rem" }}>
          <div className="card-body">
            <h5 className="card-title">Check Released Tokens</h5>
            <div>
              <select id="SelectLoanType" className="form-select my-3" aria-label="Default select example" value={role}
                onChange={(e) => setRole(e.target.value)} >
                <option value="" disabled>Select Role</option>
                <option value="0">User</option>
                <option value="1">Partner</option>
                <option value="2">Team</option>
              </select>
            </div>
            <button className="btn btn-primary" type="submit" onClick={CheckReleasedTokens}>CheckTokens</button>
          </div>

        </div>
      <div className="card mx-3" style={{ width: "25rem" }}>
        <div className="card-body">
          <h5 className="card-title">Claim Tokens</h5>
          <div>
            <select id="SelectLoanType" className="form-select my-3" aria-label="Default select example" value={role1}
              onChange={(e) => setRole1(e.target.value)} >
              <option value="" disabled>Select Role</option>
              <option value="0">User</option>
              <option value="1">Partner</option>
              <option value="2">Team</option>
            </select>
          </div>
          <button className="btn btn-primary" type="submit" onClick={ClaimTokens}>CheckTokens</button>
        </div>


      </div>
    </div>
    </div>
  )
}

export default ClaimToken