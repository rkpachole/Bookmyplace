import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TableHeader from '../directives/tableHeader';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import { unSetUserToken } from '../features/authSlice';
import { getToken, removeToken } from '../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { useDispatch } from 'react-redux';


const Fieldcopy = () => {

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

    const { field, placeholder_message, error_message, inactive, note, detail_message } = user;
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

    const [datasave, setData] = useState([]);
    const [newData, setNewData] = useState({
        id: id,
        field: field,
        placeholder_message: placeholder_message,
        error_message: error_message,
        inactive: inactive,
        note: note,
        detail_message: detail_message,
    });
    const [fieldaddsuc, setfieldaddsuc] = useState(false)
    const [fieldaddin, setfieldaddin] = useState(false)
    const [fielderror, setfielderror] = useState(false)



    const fieldpagerefresh = () => {
        window.location.reload(false);
    }


    // const [text2, settext2] = useState(false) 
    const LoginFunctionfieldcopy = (event) => {
        event.preventDefault();
        setData([...datasave, newData]);
        let Data = {
            id: id,
            field: field,
            placeholder_message: placeholder_message,
            error_message: error_message,
            inactive: inactive,
            note: note,
            detail_message: detail_message,
        }

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
                console.log('RESPONSE apiiii-11111111------------->>>>', Response)
                if (Response.msg == "Created") {
                    // alert("sssssssssfull"),
                    setfieldaddsuc(true)
                } else if (Response.field == "field master with this field already exists.") {
                    // alert("this name and pass"),
                    setfieldaddin(true)
                } else if (Response.field == "This field is required.") {
                    setfielderror(true)
                }
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
                                <h3>Field Master  - Make Copy of Field</h3>
                            </div>
                        </div>

                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-xl-12'>
                            {/* <div className='text-center mb-3'>
                                <h3>Field Master  - Make Copy of Field</h3>
                            </div> */}
                            <form onSubmit={LoginFunctionfieldcopy} className="form-area">
                                <div className='text-right mb-3'>
                                    <button className='main-btn' data-toggle="modal" data-target=".error-popup">
                                        <span>Copy</span>
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
                                            <input className="form-control" type="text" name='field' placeholder="Enter Field" value={field} onChange={e => onInputChange(e)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Placeholder Message</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" type="text" name='placeholder_message' placeholder="Enter placeholder message" value={placeholder_message} onChange={e => onInputChange(e)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Error Message</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" type="text" name='error_message' placeholder="Enter error message" value={error_message} onChange={e => onInputChange(e)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Detail Message</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" type="text" name='detail_message' placeholder="Enter detail_message" value={detail_message} onChange={e => onInputChange(e)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Note</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" type="text" name='note' placeholder="Enter note" value={note} onChange={e => onInputChange(e)} />
                                        </div>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <button className='main-btn' data-toggle="modal" data-target=".error-popup">
                                        <span>Copy</span>
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

            {/* Error modal */}
            <div className="modal fade error-popup" tabIndex={-1} role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header newM">
                            {fieldaddsuc ? (<h2>Your Field is Created.</h2>) : null
                            }
                            {fieldaddin ? (<h3>Field Master with this Field already exists.</h3>) : null
                            }
                            {fielderror ? (<h3>This Field is Required.</h3>) : null
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

export default Fieldcopy