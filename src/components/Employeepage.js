import React, { useEffect, useState } from 'react'
import './Employeepage.css'
import Navbar from './Navbar'
import { Link } from 'react-router-dom';


// [
//     {
//         id:1,
//         name:test,
//         from-date:
//         to-date:
//         role:
//     },
//     {

//     }
// ]

const idb =
    window.indexedDB;

const insertData = () => {
    if (!idb) {
        console.log("This browser doesn't support IndexDB");
        return;
    }
    console.log(idb);
    const request = idb.open("test-db", 1);

    request.onerror = function (event) {
        console.log("Error", event);
        console.log("An error occured with indexDB");
    }

    request.onupgradeneeded = function (event) {
        const db = request.result;

        if (!db.objectStoreNames.contains("employeelist")) {
            const objectStore = db.createObjectStore("employeelist", {
                keyPath: "id"
            });

            // objectStore.createIndex("username", "username", {
            //     unique: false,
            //   });
            //   objectStore.createIndex("s_date", "s_date", {
            //     unique: false,
            //   });
            //   objectStore.createIndex("e_date", "e_date", {
            //     unique: false,
            //   });
        }
    };
};

const Employeepage = () => {
    // const [listt, setval] = useState(JSON.parse(localStorage.getItem('employeelist')));




    // var list = [];
    // var curr = [], prev = [];
    // function getItem() {
    //     list = JSON.parse(localStorage.getItem('employeelist'));
    //     // curr=JSON.parse(list);
    //     // curr = list.filter((item)=> item.name==="Anjali");
    //     // prev= list.filter((item)=> item.name==="test");
    // }

    const [AllUserData, setAllUsersData] = useState([]);
    // const [curr, setCurr] = useState([]);

    useEffect(() => {
        insertData();
        getAllData();

    }, []);

    const getAllData = () => {
        const dbPromise = idb.open("test-db", 1);

        dbPromise.onsuccess = () => {

            const db = dbPromise.result;

            const tx = db.transaction('employeelist', 'readonly');

            const employeelist = tx.objectStore('employeelist');

            const employees = employeelist.getAll();

            employees.onsuccess = (query) => {
                setAllUsersData(query.srcElement.result);
            };

            // setCurr(AllUserData.filter(row => true))
            employees.onerror = (query) => {
                alert("Error occured");
            };

            tx.oncomplete = () => {
                db.close();
            };




        };
    };

    const handleDelete = (user) => {
        const dbPromise = idb.open("test-db", 1);

        dbPromise.onsuccess = () => {

            const db = dbPromise.result;

            const tx = db.transaction('employeelist', 'readwrite');

            const employeelist = tx.objectStore('employeelist');

            const deleteuser = employeelist.delete(user?.id);

            deleteuser.onsuccess = (query) => {
                // setAllUsersData(query.srcElement.result);
                // alert("User deleted")
                getAllData();
            };

            // setCurr(AllUserData.filter(row => true))
            deleteuser.onerror = (query) => {
                alert("Error occured");
            };

            tx.oncomplete = () => {
                db.close();
            };




        };
    };




    return (
        <>

            <Navbar title="Employee List" />
            {console.log(AllUserData.filter(row => (new Date(row.e_date) <= new Date())))}
            {console.log(new Date())}

            <div>

                {(AllUserData.length === 0) ? (
                    <div className="mid1">
                        <img className="image1" src="https://cdn-icons-png.flaticon.com/512/554/554857.png" alt="Description of the image" />
                        <p className='p1'>No employeerecords found</p>
                    </div>
                ) : (
                    <div>

                        <div className='employeeh'>Current employees</div>
                        <div className='curr-pre'>
                            {AllUserData.filter(row => (new Date(row.e_date) >= new Date()))?.map((row) => (
                                <div className='elements'>
                                    <div className='thename'>{row.username}</div>
                                    <div className='therole'>
                                        <span>{row.role.label}</span>
                                        {/* <span> <button type="button" className="btn btn-primary btn1 btn2"><span className="check2">Delete</span></button></span> */}
                                        <span className="btn2"><i className="bi bi-trash3" onClick={() => handleDelete(row)} aria-hidden="true"></i></span>
                                    </div>
                                    {/* {console.log(row.s_date)} */}

                                    {/* <div>{row.s_date.toDateString()}</div> */}
                                    <div className='thedate'>{"From " + row.s_date}</div>

                                </div>
                            ))}
                        </div>

                        <div className='employeeh'>Previous employees </div>
                        <div className='curr-pre'>
                            {AllUserData.filter(row => (new Date(row.e_date) < new Date()))?.map((row) => (
                                <div className='elements'>
                                    <div className='thename'>{row.username}</div>
                                    <div className='therole'>
                                        <span>{row.role.label}</span>
                                        {/* <span> <button type="button" className="btn btn-primary btn1 btn2"><span className="check2">Delete</span></button></span> */}
                                        <span className="btn2"><i className="bi bi-trash3" onClick={() => handleDelete(row)} aria-hidden="true"></i></span>
                                    </div>
                                    {/* {console.log(row.e_date)} */}

                                    {/* <div>{row.s_date.toDateString()}</div> */}
                                    <div className='thedate'>{row.s_date + " - " + row.e_date}</div>
                                </div>
                            ))}
                        </div>

                        <div className='swipele'>
                            Hover your cursor over the element's right side to delete it.
                        </div>

                    </div>)
                }
                {/* {console.log(AllUserData.filter(row =>isNaN(row.e_date.getTime())))} */}
                {/*                 
                {curr?.map((row) => (
                    <div>
                        <div>{row.username}</div>
                        <div>{row.role.value}</div>
                        <div>{row.s_date}</div>
                        <div>{row.e_date}</div>
                    </div>
                ))} */}
                {/* <h3>Previous Employee</h3> */}
                {/* {prev.map((item)=>{
                    <div>
                        <div>item.name</div>
                        {/* <div>item.role</div>
                        <div>item.fromDate</div> */}
                {/* </div> */}
                {/* })}  */}
            </div>
            <Link to="/addemployee">
                <button type="button" className="btn btn-primary sticky-button btn1"><span className="check1">+</span></button>
            </Link>
            {/* <button type="button" class="btn btn-primary position-absolute bottom-0 end-0 btn1"><span class="check1">+</span></button> */}
        </>
    )
}
export default Employeepage

