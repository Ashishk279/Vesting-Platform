import React, { useState, useContext } from 'react'
import { contractAddress } from '../utils/Vesting';
import { ConnectMetamaskContext } from '../context/Connect'
const Home = () => {
    const [userInput, setUserInput] = useState('');
    const [userInput1, setUserInput1] = useState('');
    const [userAddress, setUserAddress] = useState('')
    const [role, setRole] = useState('')
    const { ercContract, contract } = useContext(ConnectMetamaskContext)
    
    const AllocateTokens = async () => {
        try {console.log(ercContract)
            const approve = await ercContract.approve(contractAddress, userInput);
            console.log(approve);
            await approve.wait();
            const allocate = await contract.allocateTokens(userInput);
            await allocate.wait();
            console.log(allocate);
            alert(`Your Tokens Allocated Successfully: ${allocate.hash}`);
        } catch (error) {
            alert(`There is some error: ${error.reason}`)
        }
    }

   
    const AddBeneficiary = async () => {
        try {
            const add = await contract.addBeneficiary(userAddress, role, userInput1);
            await add.wait();
            console.log(add);
            alert(`Beneficiary added Successfully: ${add.hash}`);
        } catch (error) {
            alert(`There is some error: ${error.reason}`)
        }
    }

    const StartVesting = async () => {
        try {
            const vesting = await contract.startVesting();
            await vesting.wait();
            console.log(vesting);
            alert(`Vesting Start Successfully: ${vesting.hash}`);
        } catch (error) {
            console.log("There is some error: ", error.reason);
            alert(`Error Occured: ${error.reason}`)
        }
    }
    return (
        <div className='container '>
            <h1 className='text-center my-3'>Welcome to the Vesting Platform</h1>
            <div className='d-flex flex-row mb-3 justify-content-center my-3'>
                <div className="card mx-3" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">Allocate Tokens</h5>
                        <div className="input-group mb-3">
                            <input type="number" className="form-control" aria-label="Amount (to the nearest dollar)" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder='Enter the tokens'  required />
                        </div>
                        <button className="btn btn-primary" type="submit" onClick={AllocateTokens}>AllocateTokens</button>
                    </div>
                </div>
                <div className="card mx-3" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">Add Beneficiary</h5>
                        <div className="input-group mb-3 d-flex flex-column">
                            <div>
                            <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} placeholder='0x...' required />
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
                            <div>
                            <input type="number" className="form-control" aria-label="Amount (to the nearest dollar)" value={userInput1} onChange={(e) => setUserInput1(e.target.value)} placeholder='Enter the tokens' required />
                            </div>
                        </div>
                        <button className="btn btn-primary" type="submit" onClick={AddBeneficiary}>AddBeneficiary</button>
                    </div>
                </div>
                <div className="card mx-3" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">Start Vesting</h5>

                        <button className="btn btn-primary" type="submit" onClick={StartVesting}>VestingStart</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home