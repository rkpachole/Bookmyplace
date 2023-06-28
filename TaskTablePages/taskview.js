import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TableHeader from '../directives/tableHeader';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import { unSetUserToken } from '../features/authSlice';
import { getToken, removeToken } from '../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { useDispatch } from 'react-redux';
import axios from 'axios';


const Taskview = () => {

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

    const deleteuser = (uid) => {
        // alert(id);
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        fetch(`https://teammember.techpanda.art/api/user/taskmaster/${uid}`, {
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
                                <h3>Task Master  - View New Task</h3>
                            </div>
                        </div>

                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-xl-12'>
                            

                            <form  className="form-area">
                            <div className='text-right'>
                                    {/* <button className='main-btn'>
                                        <span>Add</span>
                                    </button> */}
                                    <Link to='/taskmaster'><button className='main-btn'>
                                        <span>Back</span>
                                    </button>
                                    </Link>
                                </div>
                                <div className='views-icons' data-dismiss="modal" aria-label="Close">
                                    <a href="taskadd"><i className="fa fa-plus" aria-hidden="true" /></a>
                                    <a href="taskinactive"><i class="fa fa-times" aria-hidden="true"></i></a>
                                    <a href="taskactive"><i class="fa fa-check" aria-hidden="true"></i></a>
                                    <Link to={`/taskmaster/copy/${id}`} >
                                        <i class="fa fa-clipboard" aria-hidden="true"></i>
                                    </Link>
                                    <Link to={`/taskmaster/edit/${id}`} >
                                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                    </Link>
                                    <a><i onClick={()=>deleteuser(id)} class="fa fa-trash" aria-hidden="true"></i></a>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Task Name</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" type="text" placeholder="Enter task" value={task} onChange={e => onInputChange(e)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Description</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" type="text" placeholder="Enter description"value={description} onChange={e => onInputChange(e)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Pyname</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" type="text" placeholder="Enter pyname" value={pyname} onChange={e => onInputChange(e)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Note</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" type="text" placeholder="notes" value={notes} onChange={e => onInputChange(e)} />
                                        </div>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    {/* <button className='main-btn'>
                                        <span>Add</span>
                                    </button> */}
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

export default Taskview