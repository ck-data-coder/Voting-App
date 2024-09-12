import React, { useEffect, useState } from 'react';
import './downloadvotercard.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Userheader from './Userheader';

const Downloadvotercard = () => {
    const [epic, setEpic] = useState({ epic_no: '' });
    const [verifydisable, setVerifyDisable] = useState(true);
    const [inputdisable, setInputdisable] = useState(false);
    const navigate = useNavigate();

    function epicChange(e) {
        setEpic({ ...epic, [e.target.name]: e.target.value });
    }

    function veryfyClick(e) {
        e.preventDefault();
        console.log(epic);
        const token = localStorage.getItem('token');
        axios.post("http://localhost:8080/downloadvotercard", epic, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            responseType: 'blob',
        }).then((res) => {
            toast.success("Voter card downloaded successfully");

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'votercard.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
            setInputdisable(true);
            setVerifyDisable(true)
        }).catch((err) => {
            try {
                console.log(err);
                if (err.response.status === 403) {
                    toast.error("Session expired, please login again");
                    return;
                }
                else if (err.response.status === 400) {
                    toast.error("login as a User");
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
                    className="download-input"
                    disabled={inputdisable}
                />
                <button className="download-verify-button" disabled={verifydisable} onClick={veryfyClick}>
                    Verify
                </button>
            </div>
            </center>
        </>
    );
}

export default Downloadvotercard;
