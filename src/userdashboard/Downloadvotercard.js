import React, { useEffect, useState } from 'react';
import './downloadvotercard.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Userheader from './Userheader';
import Footer from '../Landingpage/Footer';
import Spinner from '../Landingpage/Spinner';

const Downloadvotercard = () => {
    const [epic, setEpic] = useState({ epic_no: '' });
    const [verifydisable, setVerifyDisable] = useState(true);
    const [inputdisable, setInputdisable] = useState(false);
    const navigate = useNavigate();
    const [spinnerdisplay,setSpinnerDisplay]=useState(false)

    function epicChange(e) {
        setEpic({ ...epic, [e.target.name]: e.target.value });
    }

  
    function veryfyClick(e) {
        e.preventDefault();
        setInputdisable(true);
        setVerifyDisable(true)
        setSpinnerDisplay(true)
        console.log(epic);
        const token = localStorage.getItem('token');
       
        axios.post("/api/downloadvotercard", epic, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            responseType: 'blob',
        }).then((res) => {
            toast.success("Voter card downloaded successfully");
            setSpinnerDisplay(false)
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'voterfile.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
           
        }).catch((err) => {
            try {
                setSpinnerDisplay(false)
                setInputdisable(false);
                setVerifyDisable(false)
                console.log(err);
                if (err.response.status === 403) {
                    toast.error("Session expired, please login again");
                    return;
                }
                else if (err.response.status === 400) {
                    toast.error("login as a User");
                    return;
                }
                else if (err.response.status === 401) {
                    toast.error("please login");
                    return;
                }
                toast.error('Voter not found');
            } catch { }
        });
    }

    useEffect(() => {
        if (epic.epic_no.length === 10) {
            setVerifyDisable(false);
        } else {
            setVerifyDisable(true);
        }
    }, [epic]);

    return (
        <>
        <center>
            <Userheader />
            <div className="download-container">
                <label htmlFor="epic-no" className="download-label"><b>Enter Your Epic-number:</b></label>
                <input
                    type="text"
                    name="epic_no"
                    value={epic.epic_no}
                    placeholder="Enter your epic number"
                    onChange={epicChange}
                    id="download-input"
                    disabled={inputdisable}
                />
                <button className="download-verify-button" disabled={verifydisable} onClick={veryfyClick}>
                    Verify
                </button>
              {spinnerdisplay?  <Spinner></Spinner>:null}
            </div>
            </center>
            <Footer></Footer>
        </>
    );
}

export default Downloadvotercard;
