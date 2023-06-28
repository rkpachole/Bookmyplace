import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TableHeader from '../directives/tableHeader';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import { unSetUserToken } from '../features/authSlice';
import { getToken, removeToken } from '../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { useDispatch } from 'react-redux';
import axios from 'axios';



const Fieldtaskview = () => {
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
        field: "",
        placeholder_message: "",
        error_message: "",
        inactive: "",
        note: "",
        detail_message: ""
    });

    const { field, placeholder_message, error_message, detail_message, inactive, note } = user;
    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadUser();
    }, []);


    const loadUser = async () => {
        const result = await axios.get(`https://teammember.techpanda.art/api/user/fieldmaster/${id}`);
        setUser(result.data);
    };

    const [usert, setUsert] = useState({
        task: "",
        description: "",
        pyname: "",
        inactive: "",
        notes: ""
    });

    const { task, description, pyname, notes } = usert;
    const onInputChanget = e => {
        setUsert({ ...usert, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadUsert();
    }, []);


    const loadUsert = async () => {
        const result = await axios.get(`https://teammember.techpanda.art/api/user/taskmaster/${id}`);
        setUsert(result.data);
    };
    return (
        <>
            <TableHeader />
            <section>
                <div className='container-fluid'>
                    <div className="row">
                        <div className="col-lg-3">
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
                        <div className="col-lg-5">
                            <div className='text-center mb-3'>
                                <h3>Task Piece Master  - View Task Piece record</h3>
                            </div>
                        </div>

                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-xl-12'>

                            <form className="form-area">
                                <div className="container fluid">
                                    <div className="view-icon" data-dismiss="modal" aria-label="Close">
                                        <a href="fieldtaskadd"><i class="fa fa-plus" aria-hidden="true"></i></a>
                                        {/* <a href="fieldtaskedit"><i class="fa fa-pencil" aria-hidden="true"></i></a> */}
                                        <Link to={`/fieldtaskedit/${id}`}>
                                        <i class="fa fa-pencil" aria-hidden="true"></i></Link>
                                        <a href="fieldtaskinactive"><i class="fa fa-times" aria-hidden="true"></i></a>
                                        <a href="fieldtaskactive"><i class="fa fa-check" aria-hidden="true"></i></a>
                                        <Link to="fieldtaskdelete"><i class="fa fa-trash" aria-hidden="true"></i></Link>
                                        {/* <a href="fieldtaskcopy"><i class="fa fa-clipboard" aria-hidden="true"></i></a> */}
                                        <Link to={`/fieldtaskcopy/${id}`}>
                                            <i class="fa fa-clipboard" aria-hidden="true"></i>
                                        </Link>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="fieldtasktable-area">
                                                <form>
                                                    <div className="form-group mb-3">
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'>
                                                                <h6>Task Name</h6>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <input placeholder="Enter task" list='tasksearchtask' type="text" className="form-control"
                                                                    onChange={e => onInputChanget(e)}
                                                                    value={task} readOnly='readOnly'
                                                                />
                                                            </div>
                                                            <div className="col-sm-2 p-0">
                                                                <div className="table-recode" data-dismiss="modal" aria-label="Close">
                                                                    <a href="taskadd" ><i class="fa fa-plus" aria-hidden="true"></i></a>
                                                                    <a href="taskview"><i className="fa fa-eye" aria-hidden="true" /></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Description</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield'
                                                                    onChange={e => onInputChanget(e)}
                                                                    value={description} readOnly='readOnly'
                                                                    type="text" placeholder="Enter Description" />
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Pyname</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield'
                                                                    onChange={e => onInputChanget(e)}
                                                                    value={pyname} readOnly='readOnly'
                                                                    type="text" placeholder="Enter Pyname" />
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Note</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield' type="text" placeholder="Enter Note"
                                                                    onChange={e => onInputChanget(e)}
                                                                    value={notes} readOnly='readOnly'
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Inactive</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield' type="text" placeholder="Enter Inactive" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="fieldtasktable-area">
                                                <form>
                                                    <div className="form-group mb-3">
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Field Name</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield'
                                                                    readOnly='readOnly'
                                                                    onChange={e => onInputChange(e)}
                                                                    value={field}
                                                                    type="text" placeholder="field" />
                                                            </div>
                                                            <div className="col-sm-2 p-0">
                                                                <div className="table-recode" data-dismiss="modal" aria-label="Close">
                                                                    <a href="fieldadd"><i className="fa fa-plus" aria-hidden="true" /></a>
                                                                    <a href="fieldview"><i className="fa fa-eye" aria-hidden="true" /></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Placeholder Message</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield'
                                                                    onChange={e => onInputChange(e)}
                                                                    value={placeholder_message}
                                                                    readOnly='readOnly'
                                                                    type="text" placeholder="Enter Placeholder Message" />
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Error Message</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield'
                                                                    onChange={e => onInputChange(e)}
                                                                    value={error_message} readOnly='readOnly'
                                                                    type="text" placeholder="Enter Error Message" />
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Details Message</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield'
                                                                    onChange={e => onInputChange(e)}
                                                                    value={detail_message} readOnly='readOnly'
                                                                    type="text" placeholder="Enter Error Message" />
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Note</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control"
                                                                    onChange={e => onInputChange(e)}
                                                                    value={note} list='tasksearchfield' readOnly='readOnly'
                                                                    type="text" placeholder="Enter Note" />
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Inactive</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield' type="text" placeholder="Enter Inactive" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="end-record">
                                        <h6>task field Master Record Information</h6>
                                        <div className="row mt-3">
                                            <div className="col-sm-12">
                                                <div className="row">
                                                    <div className="col-sm-2">
                                                        <div className="form-label">Restricted</div>
                                                    </div>
                                                    <div className="col-sm-10">
                                                        <div>
                                                            <div className="form-check form-check-inline">
                                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultValue="option1" />
                                                                <label className="form-check-label" htmlFor="inlineRadio1">Yes</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" defaultValue="option2" />
                                                                <label className="form-check-label" htmlFor="inlineRadio2">No</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 mt-2">
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <div className="form-label">Note</div>
                                                    </div>
                                                    <div className="col-sm-8">
                                                        <input className="form-control" type="text" placeholder="note" />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-right'>
                                        <button className='main-btn'>
                                            <span>Save</span>
                                        </button>
                                        <Link to='/taskfieldmaster'>
                                            <button className='main-btn'>
                                                <span>Back</span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Fieldtaskview