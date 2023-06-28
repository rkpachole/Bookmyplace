import { Button, CssBaseline, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams, Route, Link } from 'react-router-dom';
import { unSetUserToken } from '../features/authSlice';
import { getToken, removeToken } from '../services/LocalStorageService';
import ChangePassword from './auth/ChangePassword';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { useEffect, useState } from 'react';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import TableHeader from "../directives/tableHeader";
import axios from 'axios';
import _ from 'lodash';



const Taskmaster = () => {
    // let { id1 } = useParams();

    const handleLogout = () => {
        dispatch(unsetUserInfo({ username: "", text: "", company: "", user_code: "" }))
        dispatch(unSetUserToken({ access_token: null }))
        removeToken()
        navigate('/login')
    }
    const navigate = useNavigate()

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

    const [CustomData, setCustomData] = useState([])
    // state to hold the data to be posted to the API
    useEffect(() => {
        get()
        urlapi()
    }, [])
    // // function to handle form submission
    const get = () => {
        // event.preventDefault();
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'authorization': `Bearer ${access_token}`,
        };
        fetch(`https://teammember.techpanda.art/api/user/taskmaster/`, {
            method: 'GET',
            // credentials: 'same-origin',
            headers: headers,
        })
            .then((Response) => Response.json())
            .then((Response) => {
                //  const loggedIn = AsyncStorage.setItem('loggedIn', JSON.stringify(true))
                // setData(Response)

                setpagined(_(Response).slice(0).take(pageSize).value());

                console.log('RESPONS get api-------------->>>>', Response)
                var states = Object.keys(Response).length;
                console.log('length api data states----->>>>>', states)
                let CityArray = [];
                for (var i = 0; i < states; i++) {
                    // console.log('for loop',states)
                    CityArray.push({
                        id: Response[i].id,
                        task: Response[i].task,
                        description: Response[i].description,
                        pyname: Response[i].pyname,
                        inactive: Response[i].inactive,
                        notes: Response[i].notes,
                       
                    })
                }
                console.log('custom aray data', CityArray)
                setCustomData(CityArray)
            })
            .catch((error) => {
                console.error("ERROR FOUND" + error);
            })
    }

    ///delete/////



    const taskshow = useNavigate()

    const taskshowlistdata = (item) => {
        taskshow("/taskfieldmastertwo", {
            state: {
                Item: item,
            }
        });
    }
    // Multi Checkbox
    const [pjl, setPjl] = useState([])

    const getPjl = (e) => {
        // Destructuring
        const { value, checked } = e.target;
        console.log(`${value} is ${checked}`);
        // User checks the box
        if (checked) {
            setPjl([...pjl, value])
        }
        // User unchecks the box
        else {
            setPjl(pjl.filter((e) => e !== value))
        }
    }


    /////searchbar////////

    const [searchTerm, setSearchTerm] = useState('');
    const [searchapi, setsearchapi] = useState([])
    useEffect(() => {
        const searchfetchData = async () => {
            const response = await fetch(`https://teammember.techpanda.art/api/user/taskmaster/`);
            const apiData = await response.json();
            setpagined(apiData);
            setsearchapi(apiData);
        };
        searchfetchData();
    }, []);
    const inputsearch = (e) => {
        if (e.target.value == '') {
            setpagined(searchapi)
        }
        else {
            const filterres = searchapi.filter(item => item.task.toLowerCase().includes(e.target.value.toLowerCase()))
            setpagined(filterres)
        }
        setSearchTerm(e.target.value)

    }

    ///////////plceholder///
    const [searchTerm1, setSearchTerm1] = useState('');
    const [searchapi1, setsearchapi1] = useState([])
    useEffect(() => {
        const searchfetchData1 = async () => {
            const response = await fetch(`https://teammember.techpanda.art/api/user/taskmaster/`);
            const apiData = await response.json();
            setpagined(apiData);
            setsearchapi1(apiData);
        };
        searchfetchData1();
    }, []);
    const inputsearch1 = (e) => {
        if (e.target.value == '') {
            setpagined(searchapi1)
        }
        else {
            const filterres = searchapi1.filter(item => item.description.toLowerCase().includes(e.target.value.toLowerCase()))
            setpagined(filterres)
        }
        setSearchTerm1(e.target.value)

    }

    ///////errormassege///
    const [searchTerm2, setSearchTerm2] = useState('');
    const [searchapi2, setsearchapi2] = useState([])
    useEffect(() => {
        const searchfetchData2 = async () => {
            const response = await fetch(`https://teammember.techpanda.art/api/user/taskmaster/`);
            const apiData = await response.json();
            setpagined(apiData);
            setsearchapi2(apiData);
        };
        searchfetchData2();
    }, []);
    const inputsearch2 = (e) => {
        if (e.target.value == '') {
            setpagined(searchapi2)
        }
        else {
            const filterres = searchapi2.filter(item => item.pyname.toLowerCase().includes(e.target.value.toLowerCase()))
            setpagined(filterres)
        }
        setSearchTerm2(e.target.value)

    }
    //////notes/////
    const [searchTerm3, setSearchTerm3] = useState('');
    const [searchapi3, setsearchapi3] = useState([])
    useEffect(() => {
        const searchfetchData3 = async () => {
            const response = await fetch(`https://teammember.techpanda.art/api/user/taskmaster/`);
            const apiData = await response.json();
            setpagined(apiData);
            setsearchapi3(apiData);
        };
        searchfetchData3();
    }, []);
    const inputsearch3 = (e) => {
        if (e.target.value == '') {
            setpagined(searchapi3)
        }
        else {
            const filterres = searchapi3.filter(item => item.notes.toLowerCase().includes(e.target.value.toLowerCase()))
            setpagined(filterres)
        }
        setSearchTerm3(e.target.value)

    }

    /////serchabar////
    useEffect(() => {
        const searchfetch = async () => {
            const response = await fetch(`https://teammember.techpanda.art/api/user/taskmaster/`);
            const apiData = await response.json();
            setpagined(apiData);
            // setsearchapi2(apiData);
        };
        searchfetch();
    }, [])


    const pageSize = 10;
    const [pagined, setpagined] = useState()
    const [currentpage, setcurrentpage] = useState()


    const pageCount = CustomData ? Math.ceil(CustomData.length / pageSize) : 0;
    // if(pageCount ===1) return null;
    const pages = _.range(1, pageCount + 1)

    const pagination = (pageNo) => {
        setcurrentpage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const pagined = _(CustomData).slice(startIndex).take(pageSize).value();
        setpagined(pagined);
    }


    // urlapi///
    const urlapi = () => {
        let urldata = {
            url_name: "taskmaster"
        }
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        fetch(`http://teammember.techpanda.art/api/user/url/`, {
            method: 'POST',
            body: JSON.stringify(urldata),
            headers: headers,
        })
            .then((Response) => Response.json())
            .then((Response) => {
                console.log('apiiiiurl_name344634846874-11111111------------->>>>', Response)
              
            })
            .catch((error) => {
                console.error("ERROR FOUND" + error);
            })
    }

    return <>
        <TableHeader />
        <section>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-4">
                        <form>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-5">
                                        <label htmlFor="exampleInputEmail1">Company:</label>
                                    </div>
                                    <div className="col-sm-7">
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
                                    <div className="col-sm-5">
                                        <label htmlFor="exampleInputEmail1">User Code:</label>
                                    </div>
                                    <div className="col-sm-7">
                                        <h6 className="newAddUser">{userData.user_code}</h6>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-4">
                        <h3 className='mb-4 text-right'>Task Master Maintenance</h3>
                    </div>

                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" style={{ borderTop: 'none' , width: '180px'}}>
                                <form>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Search task Name"
                                            value={searchTerm}
                                            onInput={(e) => inputsearch(e)} />
                                    </div>
                                </form>
                            </th>
                            <th scope="col" style={{ borderTop: 'none'  }}>
                                <div className="plus-icon">
                                    <a href="taskadd"><i className="fa fa-plus" aria-hidden="true" /></a>
                                </div>
                            </th>
                            <th scope="col" style={{ borderTop: 'none' , width: '180px' }}></th>
                            <th scope="col" style={{ borderTop: 'none' , width: '180px' }}>
                                <form>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Search Description"
                                            value={searchTerm1}
                                            onInput={(e) => inputsearch1(e)} />
                                    </div>
                                </form>
                            </th>
                            <th scope="col" style={{ borderTop: 'none' , width: '180px' }}>
                                <form>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Search Pyname"
                                            value={searchTerm2}
                                            onInput={(e) => inputsearch2(e)} />
                                    </div>
                                </form>
                            </th>
                            <th scope="col" style={{ borderTop: 'none' }}>
                            </th>
                            <th scope="col" style={{ borderTop: 'none' , width: '90px' }}></th>
                            <th scope="col" style={{ borderTop: 'none' , width: '180px' }}>
                                <form>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="search note"
                                            value={searchTerm3}
                                            onInput={(e) => inputsearch3(e)} />
                                    </div>
                                </form>
                            </th>
                            <th scope="col" style={{ borderTop: 'none' , width: '180px' }}></th>
                            <th scope="col" style={{ borderTop: 'none' , width: '180px' }}></th>
                        </tr>
                    </thead>
                </table>


                
                {!pagined ? ("no data") : (

                    <div className="task-table">
                        <div class="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Task Name</th>
                                        <th scope="col"></th>
                                        <th scope="col">Make Copy</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Pyname</th>
                                        <th scope="col">Inactive</th>
                                        <th scope="col">Notes</th>
                                        <th scope="col">Task task</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pagined.map((item, index) => (
                                        <tr key={index} >
                                            <td>
                                                <Link to={`/taskmaster/${item.id}`}>
                                                    {item.task}
                                                </Link>
                                            </td>
                                            <td>
                                                <Link to={`/taskmaster/edit/${item.id}`} >
                                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                                </Link>
                                            </td>
                                            <td className='text-center'> <Link to={`/taskmaster/copy/${item.id}`} >
                                                <a href='taskcopy'><i class="fa fa-clipboard" aria-hidden="true"></i></a>
                                            </Link>
                                            </td>
                                            <td>
                                                <Link to={`/taskmaster/${item.id}`}>
                                                    {item.description}
                                                </Link>
                                            </td>
                                            <td>
                                                <Link to={`/taskmaster/${item.id}`}>
                                                    {item.pyname}
                                                </Link>
                                            </td>
                                            <td className='text-center'>
                                                <input className="form-check-input" type="checkbox" checked={item.inactive} id="defaultCheck1" />
                                                {item.inactive}
                                            </td>
                                            <td>
                                                <Link to={`/taskmaster/${item.id}`}>
                                                    {item.notes}
                                                </Link>
                                            </td>
                                            <td className='text-center'>
                                                <i onClick={() => taskshowlistdata(item)} class="fa fa-eye" aria-hidden="true"></i>
                                            </td>
                                            <td className='text-center'>
                                                <Link to={`/taskdelete/delete/${item.id}`} >
                                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                )}
                <nav className='d-flex justify-content-center'>
                    <ul className='pagination'>
                        {
                            pages.map((page) => (
                                <li className={
                                    page === currentpage ? "page-item active" : "page-item"
                                }>
                                    <p className='page-link'
                                        onClick={() => pagination(page)}
                                    >{page}</p>
                                </li>

                            ))
                        }

                    </ul>
                </nav>
            </div>
        </section>





    </>;
};

export default Taskmaster;