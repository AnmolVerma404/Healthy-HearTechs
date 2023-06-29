// import axios from 'axios';
// import cookie from 'cookie';
import cookie from 'https://cdn.jsdelivr.net/npm/cookie@0.5.0/+esm';
import { backendUrl } from '../../utils/url';

const getAllRecord = async () =>{
    try {
		const cookieObj = cookie.parse(document.cookie);
		const response = await axios.post(backendUrl + '/api/auth/user', {
			jwt: cookieObj.jwt,
		});
        const recordResp = await axios.post(backendUrl + '/api/record/allrecords',{
			jwt: cookieObj.jwt,
        });
        setFrontEnd(response.data.data,recordResp.data.record);
    } catch (error) {
        console.log(error);
    }
}

const setFrontEnd = (userData,records) =>{
    const {email,name,phone_number} = userData;
    const recordSize = records.length;
    console.log(userData,records,recordSize);
    const nameEl = document.getElementById('jsName');
    const emailEl = document.getElementById('jsEmail');
    const phoneNumberEl = document.querySelector('.jsPhoneNumber');
    const recordCountEl = document.querySelector('.jsRecordCount');
    nameEl.innerHTML = name;
    emailEl.innerHTML = email;
    phoneNumberEl.innerHTML = phone_number;
    recordCountEl.innerHTML = recordSize;

    const historyEl = document.querySelector('.jsHistory');
    historyEl.innerHTML = "";
    let historyText = "";
    // for(let i = 0;i<recordSize;++i){ //css change
    if(recordSize == 0){
        historyText+=`
        <div class="record1">
            <div class="upper">
                <span id="med1"></span>
                <span id="date1"></span>
            </div>
            <br>
            <span id="hos1">No Record found!!!<span>
        </div>
        `
    }else{
        for(let i = 0;i<2 && i<recordSize;++i){
            historyText+=`
            <div class="record1">
                <div class="upper">
                    <span id="med1">${records[i].medicalCondition} </span>
                    <span id="date1">${records[i].appointDate}</span>
                </div>
                <br>
                <span id="hos1">Hospital Name - ${records[i].hospitalName}, Doctor Name - ${records[i].doctorName}</span>
            </div>
            `
        }
    }
    historyEl.innerHTML+=historyText;
}

getAllRecord();