import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TableHeader from '../directives/tableHeader';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import { unSetUserToken } from '../features/authSlice';
import { getToken, removeToken } from '../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { useDispatch } from 'react-redux';

const Taskcopy = () => {

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


    const { id } = useParams();
    const [user, setUser] = useState({
        task: "",
        description: "",
        pyname: "",
        inactive: "",
        notes: ""
    });

    const { task, description, pyname, inactive, notes } = user;
    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadUser();
    }, []);


    const loadUser = async () => {
        const result = await axios.get(`https://teammember.techpanda.art/api/user/taskmaster/${id}`);
        setUser(result.data);
    };

    const [datasave, setData] = useState([]);
    const [newData, setNewData] = useState({
        id: id,
        task: task,
        description: description,
        pyname: pyname,
        inactive: inactive,
        notes: notes,
    });
    const [taskaddsuc, settaskaddsuc] = useState(false)
    const [taskaddin, settaskaddin] = useState(false)
    const [taskerror, settaskerror] = useState(false)
    const LoginFunctiontaskcopy = (event) => {
        event.preventDefault();
        setData([...datasave, newData]);
        let Data = {
            id: id,
            task: task,
            description: description,
            pyname: pyname,
            inactive: inactive,
            notes: notes,
        }

        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        fetch(`https://teammember.techpanda.art/api/user/taskmaster/`, {
            method: 'POST',
            body: JSON.stringify(Data),
            headers: headers,
        })
            .then((Response) => Response.json())
            .then((Response) => {
                console.log('RESPONSE apiiii-11111111------------->>>>', Response)
                if (Response.msg == "Created") {
                    // alert("sssssssssfull"),
                    settaskaddsuc(true)
                } else if (Response.task == "task master with this task already exists.") {
                    // alert("this name and pass"),
                    settaskaddin(true)
                } else if (Response.task == "This field is required.") {
                    settaskerror(true)
                }
                else if (Response.description == "This field is required.") {
                    settaskerror(true)
                }
                else if (Response.pyname == "This field is required.") {
                    settaskerror(true)
                }

            })
            .catch((error) => {
                console.error("ERROR FOUND" + error);

            })

    }

    const fieldpagerefresh = () => {
        window.location.reload(false);
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
                                <h3>Task Master  - Make Copy of Task</h3>
                            </div>
                        </div>

                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-xl-12'>

                            <form onSubmit={LoginFunctiontaskcopy} className="form-area">
                            <div className='text-right mb-3'>
                                    <button className='main-btn' data-toggle="modal" data-target=".error-popup">
                                        <span>Add</span>
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
                                            <input className="form-control" type="text" name='task' placeholder="Enter task" value={task} onChange={e => onInputChange(e)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Description*</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" name='description' type="text" placeholder="Enter Description" value={description} onChange={e => onInputChange(e)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Pyname *</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" type="text" name='pyname' placeholder="Enter Pyname" value={pyname} onChange={e => onInputChange(e)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Notes</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" type="text" name='notes' placeholder="Enter notess" value={notes} onChange={e => onInputChange(e)} />
                                        </div>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <button className='main-btn' data-toggle="modal" data-target=".error-popup">
                                        <span>Add</span>
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

            {/* Error modal */}
            <div className="modal fade error-popup" tabIndex={-1} role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header newM">
                            {taskaddsuc ? (<h2>Your Task is Created.</h2>) : null
                            }
                            {taskaddin ? (<h3>Task Master with this Task already exists.</h3>) : null
                            }
                            {taskerror ? (<h3>This Task , description and pyname is Required.</h3>) : null
                            }
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={fieldpagerefresh}>
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Taskcopy