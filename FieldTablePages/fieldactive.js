import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TableHeader from '../directives/tableHeader';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import { unSetUserToken } from '../features/authSlice';
import { getToken, removeToken } from '../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { useDispatch } from 'react-redux';


const Fieldactive = () => {

    const dispatch = useDispatch()
    const { access_token } = getToken()
    const { data, isSuccess } = useGetLoggedUserQuery(access_token)

    const [userData, setUserData] = useState({
        text: "",
        username: "",
        user_code: "",
        company: ""

    })

    // Store User Data in Local State
    useEffect(() => {
        if (data && isSuccess) {
            setUserData({
                email: data.email,
                username: data.username,
                user_code: data.user_code,
                company: data.company,
            })
        }
    }, [data, isSuccess])

    // Store User Data in Redux Store
    useEffect(() => {
        if (data && isSuccess) {
            dispatch(setUserInfo({
                email: data.email,
                username: data.username,
                user_code: data.user_code,
                company: data.company
            }))
        }
    }, [data, isSuccess, dispatch])


    const [id, setID] = useState()
    const [field, setfield] = useState()
    const [placeholder_message, setplaceholder_message] = useState()
    const [error_message, seterror_message] = useState()
    const [inactive, setinactive] = useState()
    const [note, setnote] = useState()
    const [datasave, setData] = useState([]); // state to hold the API data
    const [newData, setNewData] = useState({
        id: id,
        field: field,
        placeholder_message: placeholder_message,
        error_message: error_message,
        inactive: inactive,
        note: note,
        // lastupdateuserfield: lastupdateuserfield,
        // lastupdatetaskfield: lastupdatetaskfield,
        // lastupdateipfield: lastupdateipfield,
    }); // state to hold the data to be posted to the API
    const LoginFunctionfield = (event) => {
        event.preventDefault();
        setData([...datasave, newData]);
        let Data = {
            id: id,
            field: field,
            placeholder_message: placeholder_message,
            error_message: error_message,
            inactive: inactive,
            note: note,

        }
        setfield("")
        setplaceholder_message("")
        seterror_message("")
        setinactive("")
        setnote("")

        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        };

        fetch(`https://teammember.techpanda.art/api/user/fieldmaster/`, {
            method: 'POST',

            body: JSON.stringify(Data),
            headers: headers,
        })
            .then((Response) => Response.json())
            .then((Response) => {
                //  const loggedIn = AsyncStorage.setItem('loggedIn', JSON.stringify(true))
                console.log('RESPONSE apiiii-11111111------------->>>>', Response)
                // setData(data)
            })
            .catch((error) => {
                console.error("ERROR FOUND" + error);
            })
    }

    return (
        <>
            <TableHeader />
            <section>
                <div className='container-fluid'>
                    <div className="row">
                        <div className="col-lg-4">
                            <form>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <label htmlFor="exampleInputEmail1">Company:</label>
                                        </div>
                                        <div className="col-sm-4">
                                            <h6 className="newAddUser">{userData.company}</h6>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-4">
                            <form>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-4">
                                        <label htmlFor="exampleInputEmail1">User Code:</label>
                                        </div>
                                        <div className="col-sm-4">
                                            <h6 className="newAddUser">{userData.user_code}</h6>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-4">
                        <div className='text-center mb-3'>
                                <h3>Field Master  - Make Field Active Again</h3>
                            </div>
                        </div>

                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-xl-12'>
                           
                            <form onSubmit={LoginFunctionfield} className="form-area">
                            <div className='text-right mb-3'>
                                    <button className='main-btn'>
                                        <span>Confirm</span>
                                    </button>
                                    <Link to='/fieldmaster'>
                                        <button className='main-btn'>
                                            <span>Back</span>
                                        </button>
                                    </Link>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Field Name</div>
                                        </div>
                                        <div className="col-sm-8">
                                            {/* <input className="form-control" type="text" placeholder="Enter Field" /> */}
                                            <input placeholder="Enter Field" type="text" className="form-control" value={field} onChange={(event) => setfield(event.target.value)} />

                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Placeholder Message</div>
                                        </div>
                                        <div className="col-sm-8">
                                            {/* <input className="form-control" type="text" placeholder="Enter message 1" /> */}
                                            <input className="form-control" type="text" placeholder="Enter placeholder message" value={placeholder_message} onChange={(event) => setplaceholder_message(event.target.value)} />

                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Error Message</div>
                                        </div>
                                        <div className="col-sm-8">
                                            {/* <input className="form-control" type="text" placeholder="Enter message 2" /> */}
                                            <input className="form-control" type="text" placeholder="Enter error message" value={error_message} onChange={(event) => seterror_message(event.target.value)} />

                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Note</div>
                                        </div>
                                        <div className="col-sm-8">
                                            {/* <input className="form-control" type="text" placeholder="Enter note" /> */}
                                            <input className="form-control" type="text" placeholder="Enter note" value={note} onChange={(event) => setnote(event.target.value)} />

                                        </div>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <button className='main-btn'>
                                        <span>Confirm</span>
                                    </button>
                                    <Link to='/fieldmaster'>
                                        <button className='main-btn'>
                                            <span>Back</span>
                                        </button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Fieldactive