import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import TableHeader from '../directives/tableHeader';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import { unSetUserToken } from '../features/authSlice';
import { getToken, removeToken } from '../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast'


const Fieldview = () => {
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
        detail_message:"",
    });

    const { field, placeholder_message, error_message,detail_message, inactive, note } = user;
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

    const deleteuser = (uid) => {
        toast.error(<h1>Delete field</h1>)
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        fetch(`https://teammember.techpanda.art/api/user/fieldmaster/${uid}`, {
            method: "DELETE",
            headers: headers,
        })
            .then((resp) => {
                console.log(resp)
                // loadUser();
            })
    }
    return (
        <>
            <Toaster />
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
                                <h3>Field Master - View Field</h3>
                            </div>
                        </div>

                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-xl-12'>

                            <form className="form-area">
                                <div className='text-right'>
                                    <button className='main-btn' >
                                        <span>View</span>
                                    </button>
                                    <Link to='/fieldmaster'>
                                        <button className='main-btn'>
                                            <span>Back</span>
                                        </button>
                                    </Link>
                                </div>
                                <div className='views-icons' data-dismiss="modal" aria-label="Close">
                                    <a href="fieldadd"><i className="fa fa-plus" aria-hidden="true" /></a>
                                    {/* <a href="" data-toggle="modal" data-target="#fieldedit"><i class="fa fa-pencil" aria-hidden="true"></i></a> */}
                                    <a href="fieldinactive"><i class="fa fa-times" aria-hidden="true"></i></a>
                                    <a href="fieldactive"><i class="fa fa-check" aria-hidden="true"></i></a>
                                   
                                    <Link to={`/fieldmaster/copy/${id}`} >
                                        <i class="fa fa-clipboard" aria-hidden="true"></i>
                                    </Link>
                                  
                                    <Link to={`/fieldmaster/edit/${id}`} >
                                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                                </Link>
                                    <a><i onClick={() => deleteuser(id)} class="fa fa-trash" aria-hidden="true"></i></a>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Field Name</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" type="text" placeholder="Enter Field" value={field} onChange={e => onInputChange(e)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Placeholder Message</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" type="text" placeholder="Enter placeholder message" value={placeholder_message} onChange={e => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Error Message</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" type="text" placeholder="Enter error message" value={error_message} onChange={e => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Detail Message</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" type="text" placeholder="Enter error message" value={detail_message} onChange={e => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Note</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" type="text" placeholder="Enter note" value={note} onChange={e => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <button className='main-btn' >
                                        <span>View</span>
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
export default Fieldview