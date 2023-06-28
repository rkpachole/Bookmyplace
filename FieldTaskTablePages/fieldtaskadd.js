import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TableHeader from '../directives/tableHeader';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import { unSetUserToken } from '../features/authSlice';
import { getToken, removeToken } from '../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { useDispatch } from 'react-redux';
import { selectClasses } from '@mui/material';


const Fieldtaskadd = () => {

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

    // taskfield table////


    const [id, setId] = useState()
    const [field, setfield] = useState()
    const [placeholder_message, setplaceholder_message] = useState()
    const [error_message, seterror_message] = useState()
    const [note, setnote] = useState()
    const [task, settask] = useState()
    const [description, setdescription] = useState()
    const [pyname, setpyname] = useState()
    const [notes, setnotes] = useState()
    const [inactive, setinactive] = useState("")
    // const [CustomData, setCustomData] = useState([])
    const [datasave, setData] = useState([]);
    const [newData, setNewData] = useState({
        id: id,

        field: field,
        placeholder_message: placeholder_message,
        error_message: error_message,
        note: note,
        task: task,
        description: description,
        pyname: pyname,
        notes: notes,
        inactive: inactive,
    });
    const LoginFunctiontaskfield = (event) => {
        event.preventDefault();
        setData([...datasave, newData]);
        let Data = {
            id: id,

            field: field,
            placeholder_message: placeholder_message,
            error_message: error_message,
            note: note,
            task: task,
            description: description,
            pyname: pyname,
            notes: notes,
            inactive: inactive,
        }
        setfield("")
        setplaceholder_message("")
        seterror_message("")
        setnote("")
        settask()
        setdescription("")
        setpyname("")
        setnotes("")
        setinactive("")
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        };
        fetch(`https://teammember.techpanda.art/api/user/taskfieldmaster/`, {
            method: 'POST',
            body: JSON.stringify(Data),
            headers: headers,
        })
            .then((Response) => Response.json())
            .then((Response) => {
                console.log('RESPONSE apiiii-11111111------------->>>>', Response)


            })
            .catch((error) => {
                console.error("ERROR FOUND" + error);
            })
    }


    // selectClassesfield////
    const [getcountry, setCountry] = useState([]);
    const [getCountryid, setCountryid] = useState("");
    const [getrowdata, setGetrowdata] = useState([]);
    useEffect(() => {
        const getcountrydata = async () => {
            const reqData = await fetch("https://teammember.techpanda.art/api/user/fieldmaster/");
            const resData = await reqData.json();
            setCountry(await resData);
        };
        getcountrydata();
    }, []);
    const handlecountry = (event) => {
        const getCountryid = event.target.value;
        setCountryid(getCountryid);
    };
    useEffect(() => {
        const getCountryrowdata = async () => {
            const reqCountryrowdata = await fetch(
                `https://teammember.techpanda.art/api/user/fieldmaster/${getCountryid}`
            );
            const reqcountryrowdata = await reqCountryrowdata.json();
            setGetrowdata(await reqcountryrowdata);
        };
        getCountryrowdata();
    }, [getCountryid]);



    ////slectsearchtask////
    const [getcountry1, setCountry1] = useState([]);
    const [getCountryid1, setCountryid1] = useState("");
    const [getrowdata1, setGetrowdata1] = useState([]);
    useEffect(() => {
        const getcountrydata1 = async () => {
            const reqData = await fetch("https://teammember.techpanda.art/api/user/taskmaster/");
            const resData = await reqData.json();
            setCountry1(await resData);
        };
        getcountrydata1();
    }, []);
    const handlecountry1 = (event) => {
        const getCountryid1 = event.target.value;
        setCountryid1(getCountryid1);
    };
    useEffect(() => {
        const getCountryrowdata1 = async () => {
            const reqCountryrowdata1 = await fetch(
                `https://teammember.techpanda.art/api/user/taskmaster/${getCountryid1}`
            );
            const reqcountryrowdata1 = await reqCountryrowdata1.json();
            setGetrowdata1(await reqcountryrowdata1);
        };
        getCountryrowdata1();
    }, [getCountryid1]);

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
                                <h3>Task Field Master - Add Task Field Master Record</h3>
                            </div>
                        </div>

                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-xl-12'>
                            
                            <form className="form-area"
                                onSubmit={LoginFunctiontaskfield}>
                                    <div className='text-right mb-3'>
                                        <button className='main-btn'>
                                            <span>Save</span>
                                        </button>
                                        <Link to='/taskfieldmaster'>
                                            <button className='main-btn'>
                                                <span>Back</span>
                                            </button>
                                        </Link>
                                    </div>
                                <div className="container fluid">
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
                                                                {/* <input placeholder="Enter task" list='fieldsearchtfnnpdt' type="text" className="form-control"
                                                                    onChange={(event) => settask(event.target.value)}
                                                                /> */}
                                                                <select
                                                                    name="country"
                                                                    className="form-control p-2"
                                                                    onInput={(e) => handlecountry1(e)}
                                                                    // value={task}
                                                                    onChange={(event) => settask(event.target.value)}
                                                                >
                                                                    <option value="">--Select field</option>
                                                                    {getcountry1.map((resCountry, index) => (
                                                                        <option key={index} value={resCountry.id}>
                                                                            {resCountry.task}
                                                                        </option>
                                                                    ))}
                                                                </select>

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
                                                                <input className="form-control" list='fieldsearchtfnnpd' type="text" placeholder="Enter Description"
                                                                    value={getrowdata1.description} onChange={(e) => handlecountry1(e)}/>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Pyname</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='fieldsearchtfnnp' type="text" placeholder="Enter Pyname"
                                                                    value={getrowdata1.pyname} onChange={(event) => setpyname(event.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Note</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='fieldsearchtfnn' type="text"
                                                                    value={getrowdata1.notes} onChange={(event) => setnotes(event.target.value)} placeholder="Enter Note" />

                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Inactive</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield' type="text"
                                                                    value={getrowdata1.inactive} onChange={(event) => setinactive(event.target.value)} placeholder="Enter Inactive" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                        {/* fieldtable  */}


                                        <div className="col-sm-6">
                                            <div className="fieldtasktable-area">
                                                <form>
                                                    <div className="form-group mb-3">
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Field Name</h6></div>
                                                            <div className="col-sm-6">
                                                                {/* <input className="form-control" list='fieldsearchtf' type="text" placeholder="field"
                                                                    value={field} onChange={(event) => setfield(event.target.value)}
                                                                /> */}
                                                                <select
                                                                    name="country"
                                                                    className="form-control p-2"
                                                                    onInput={(e) => handlecountry(e)}
                                                                    onChange={(event) => setfield(event.target.value)}
                                                                // value={field}
                                                                >
                                                                    <option value="">--Select field</option>
                                                                    {getcountry.map((resCountry, index) => (
                                                                        <option key={index} value={resCountry.id}>
                                                                            {resCountry.field}
                                                                        </option>
                                                                    ))}
                                                                </select>

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
                                                                <input className="form-control" type="text"
                                                                    placeholder="Enter Placeholder Message"
                                                                    value={getrowdata.placeholder_message} list='fieldsearchtftt' onChange={(event) => setplaceholder_message(event.target.value)}
                                                                />

                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Error Message</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='fieldsearchtfttee' type="text" placeholder="Enter Error Message"
                                                                    value={getrowdata.error_message} onChange={(event) => seterror_message(event.target.value)}

                                                                />

                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Note</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='fieldsearchtftteerr' type="text" placeholder="Enter Note"
                                                                    value={getrowdata.note} onChange={(event) => setnote(event.target.value)}
                                                                />

                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Inactive</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" type="text"
                                                                    value={getrowdata.inactive} onChange={(event) => setinactive(event.target.value)} placeholder="Enter Inactive" />
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
                                            <div className="col-sm-6">
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <div className="form-label">Note</div>
                                                    </div>
                                                    <div className="col-sm-8">
                                                        <input className="form-control" list='tasksearchnote' type="text" placeholder="note" />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" defaultValue="option2" />
                                                    <label className="form-check-label" htmlFor="exampleRadios2">
                                                        Task Field Record Restricted
                                                    </label>
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
export default Fieldtaskadd