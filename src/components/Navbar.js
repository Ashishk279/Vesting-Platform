import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/money.png";
import { ConnectMetamaskContext } from '../context/Connect'

const Navbar = () => {
  const { address, connectToWallet, balance } = useContext(ConnectMetamaskContext)
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" style={{width:"54px", height:'48px'}}/>
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="claimToken">ClaimTokens</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/getVestingInfo">VestingInfo</Link>
            </li>
          </ul>
        </div>
        <div className='d-flex flex-col'>
        <button className="btn btn-outline-primary" onClick={connectToWallet}>Connect</button>
        
        </div>
      </div>
    </nav>
    <div className='d-flex flex-column align-items-end' style={{margin:"0 106px"}}>
    <span className=''>Address: {address}</span>
    <span className=''>Balance: {balance}</span>
    </div>
    </>
    
  );
}

export default Navbar