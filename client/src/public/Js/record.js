import axios from 'axios';
import cookie from 'cookie';
import { backendUrl } from '../../utils/url';

const getAllRecord = async () =>{
    try {
		const cookieObj = cookie.parse(document.cookie);
        const recordResp = await axios.post(backendUrl + '/api/record/allrecords',{
			jwt: cookieObj.jwt,
        });
        console.log(recordResp);
    } catch (error) {
		console.log('No cookie found');
        console.log(error);
    }
}

getAllRecord();