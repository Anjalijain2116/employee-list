import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import './Addemployee.css'
import { AiOutlineArrowRight } from "react-icons/ai"
import { MdOutlineDateRange } from "react-icons/md"
import { IconContext } from "react-icons"
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { USER_DATA } from "./data";

import 'bootstrap-icons/font/bootstrap-icons.css'
import Select from 'react-select'


import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom'

const options = [

    { value: "PRODUCT DESIGNER", label: "Product Designer" },
    { value: "FLUTTER DEVELOPER", label: "Flutter Developer" },
    { value: "QA TESTER", label: "QA Tester" },
    { value: "PRODUCT OWNER", label: "Product Owner" }
];

const idb= 
window.indexedDB;

const insertData = () =>{
    if(!idb){
        console.log("This browser doesn't support IndexDB");
        return;
    }
    console.log(idb);
    const request= idb.open("test-db",1);

    request.onerror = function(event){
        console.log("Error",event);
        console.log("An error occured with indexDB");
    }

    request.onupgradeneeded = function(event){
         const db=request.result;

         if(!db.objectStoreNames.contains("employeelist")){
            const objectStore=db.createObjectStore("employeelist",{
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

    request.onsuccess =() =>{
        console.log("Database opened successfully");

    // const db = request.result;

    // var tx = db.transaction("employeelist", "readwrite");
    // var userData = tx.objectStore("employeelist");

    // // USER_DATA.forEach((item) => userData.add(item));

    // return tx.complete; 
    };
};

const Addemployee = () => {


    const [username, setUserName] = useState("");
    const [role, setRole] = useState(null);
    const [id1, setId1]= useState(Math.random() * 100);
    const [allUsers, setAllUsers] = useState([]);

    const colourStyles = {
        control: styles => ({ ...styles, backgroundColor: 'white', border: "none", padding: "0, 0" }),
       
    };

    const [s_date, setS_date] = useState(new Date(NaN));
    const [e_date, setE_date] = useState(new Date(NaN));

    useEffect(() => {
        insertData();
        // getAllData();
        // getAgeWiseData();
      }, []);

    function handleChange(e) {
        setUserName(() => e.target.value)
    }
    function handleChange1(role) {
        // console.log(e.value);
        setRole(role)
    }
    function handleChange2(e) {
        setS_date(() => e.target.value)
    }
    function handleChange3(e) {
        setE_date(() => e.target.value)
    }

    // const getAllData = () => {
    //     const dbPromise = idb.open("test-db", 1);
    //     dbPromise.onsuccess = () => {
    //       const db = dbPromise.result;
    
    //       var tx = db.transaction("employeelist", "readonly");
    //       var employeelist = tx.objectStore("employeelist");
    //       const users = employeelist.getAll();
    
    //       users.onsuccess = (query) => {
    //         setAllUsers(query.srcElement.result);
    //       };
    
    //       tx.oncomplete = function () {
    //         db.close();
    //       };
    //     };
    //   };

    function handleClick(event) {

        

        const dbPromise= idb.open("test-db",1);


        if(username && role && s_date && e_date){
            dbPromise.onsuccess =()=>{
                const db=dbPromise.result;

                  

                var tx=db.transaction('employeelist', 'readwrite');

                var employeelist= tx.objectStore('employeelist');
                
               setId1(id1+1);
                const employees= employeelist.put({
                    id:id1 ,
                    username,
                    role,
                    s_date,
                    e_date,
                })

                employees.onsuccess =(query)=> {
                    tx.oncomplete = function(){
                        db.close();
                    };
                    // alert("user added");
                    // setUserName("")
                    // setRole("")
                    // setS_date(new Date(NaN))
                    // setE_date(new Date(NaN))
                    // 
                    // getAllData();
                };
                // {console.log(employeelist.length)}
                employees.onerror =() =>{
                    console.log(event);
                    alert("Error");
                    
                };
            };
        }
        setUserName("")
        setRole("")
        setS_date(new Date(NaN))
        setE_date(new Date(NaN))
       
       
    };

    function handleClick1(event) {
        setUserName("")
        setRole("")
        setS_date(new Date(NaN))
        setE_date(new Date(NaN))

    }

    return (
        <div className="employee">

            <Navbar title="Add Employee details" />
            {/* {console.log(employeelist.length)} */}

            <div className="form-outer">
                <div className="container">



                    <div className="form-input">
                        <span className="icon"><i className="bi bi-person" aria-hidden="true"></i></span>
                        <input id="text-input" type="text" name="name" placeholder="Enter your name" value={username} onChange={handleChange} />

                    </div>

                    <div className="form-input flexbox">
                        <div className='icon ic2'>
                            <span className="icon ic2"><i className="bi bi-folder" aria-hidden="true"></i></span>
                        </div>

                        <div className='input' >
                            {/* <div>{SlectedOtopion}</div> */}
                            {/* onClick={setSelection =>(true)}     */}
                            <Select id='xyz' styles={colourStyles} options={options} placeholder={role ? `Selected: ${role.label}` : 'Select role'} value={role} onChange={handleChange1} />

                        </div>
                        {/* <div className='icon '>
                            <span className=''
                        </div> */}
                    </div>

                    <div className="form-input maindate" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", maxWidth:"100%" }}>

                        <div className='from-date' style={{ display: "flex", flexDirection: "row" }}>
                            <div className='date1'>

                                <span className="icon date1"><i className="bi bi-calendar4-event" aria-hidden="true"></i></span>
                            </div>
                            <div className='inputs'>

                                <input id="date-input1" type="date" name="date" value={s_date} onChange={handleChange2} />

                            </div>
                        </div>
                        {/* <AiOutlineArrowRight size={40} /> */}
                        <span className="icon aro"><i className="bi bi-arrow-right" aria-hidden="true"></i></span>


                        <div className='from-date' style={{ display: "flex", flexDirection: "row" }}>
                            <div className='date1'>
                                <span className="icon date1"><i className="bi bi-calendar4-event" aria-hidden="true"></i></span>
                            </div>
                            <div className='inputs'>
                                <input id="date-input2" type="date" name="date"  value={e_date} onChange={handleChange3} />
                            </div>
                        </div>

                    </div>




                </div>
            </div>

            
                <div className="buttondiv">

                    <div className="bottom-right-buttons">
                        <Link to="/employeepage">
                        <button onClick={handleClick1} className="btn btn-primary button1">Cancel</button>
                        </Link>
                        <button onClick={handleClick} className="btn btn-secondary button2">Save</button>
                    </div>
                </div>
           
            {/* const [ifSelectionClicked, setS] = useState("false");
            {ifSelectionClicked && 
            <div className='select_role'>
                {options.map((item)=>{
                    return (
                        <div className='option'>{item}</div>
                    )
                })}
                
            </div>} */}


        </div>
    )
}
export default Addemployee

