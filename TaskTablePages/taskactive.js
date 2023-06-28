import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TableHeader from '../directives/tableHeader';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import { unSetUserToken } from '../features/authSlice';
import { getToken, removeToken } from '../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { useDispatch } from 'react-redux';


const Taskactive = () => {
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
    const [task, settask] = useState()
    const [description, setdescription] = useState()
    const [pyname, setpyname] = useState()
    const [inactive, setinactive] = useState()
    const [notes, setnotes] = useState()

    const [CustomData, setCustomData] = useState([])
    const [datasave, setData] = useState([]); // state to hold the API data
    const [newData, setNewData] = useState({
        id: id,
        task: task,
        description: description,
        pyname: pyname,
        // inactive: inactive,
        notes: notes,

    }); // state to hold the data to be posted to the
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
                                <h3>Task Master  - Make task Active Again</h3>
                            </div>
                        </div>

                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-xl-12'>
                           
                            <form className="form-area">
                            <div className='text-right mb-3'>
                                    <button className='main-btn'>
                                        <span>Confirm</span>
                                    </button>
                                    <Link to='/taskmaster'><button className='main-btn'>
                                        <span>Back</span>
                                    </button>
                                    </Link>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Task Name</div>
                                        </div>
                                        <div className="col-sm-8">
                                            {/* <input className="form-control" type="text" placeholder="Enter task" /> */}
                                            <input placeholder="Enter task" type="text" className="form-control" value={task} onChange={(event) => settask(event.target.value)} />

                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Description*</div>
                                        </div>
                                        <div className="col-sm-8">
                                            {/* <input className="form-control" type="text" placeholder="Enter Description" /> */}
                                            <input className="form-control" type="text" placeholder="Enter Description" value={description} onChange={(event) => setdescription(event.target.value)} />

                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Pyname *</div>
                                        </div>
                                        <div className="col-sm-8">
                                            {/* <input className="form-control" type="text" placeholder="Enter Pyname" /> */}
                                            <input className="form-control" type="text" placeholder="Enter Pyname" value={pyname} onChange={(event) => setpyname(event.target.value)} />

                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Note</div>
                                        </div>
                                        <div className="col-sm-8">
                                            {/* <input className="form-control" type="text" placeholder="Enter notes" /> */}
                                            <input className="form-control" type="text" placeholder="Enter notes" value={notes} onChange={(event) => setnotes(event.target.value)} />

                                        </div>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <button className='main-btn'>
                                        <span>Confirm</span>
                                    </button>
                                    <Link to='/taskmaster'><button className='main-btn'>
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

export default Taskactive