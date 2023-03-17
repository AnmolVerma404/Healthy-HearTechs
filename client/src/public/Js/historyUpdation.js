import axios from 'axios';
import cookie from 'cookie';
import { backendUrl } from '../../utils/url';

const formSubmit = document.getElementById('jsFormSubmit');

formSubmit.addEventListener('click', async e => {
	e.preventDefault();
	const doctorName = document.getElementById('jsDoctorName').value;
	const phone = document.getElementById('jsPhone').value;
	const hospitalName = document.getElementById('jsHospitalName').value;
	const medicalCondition = document.getElementById('jsMedicalCondition').value;
	const appointDate = document.getElementById('jsAppointDate').value;
	const cookieObj = cookie.parse(document.cookie);
	try {
		const response = await axios.post(backendUrl + '/api/record', {
			doctorName,
			phone,
			hospitalName,
			medicalCondition,
			appointDate,
			jwt: cookieObj.jwt
		});

		if (response.status === 201) {
			console.log('Added successfully');
			document.getElementById('jsHistoryForm').reset();
			window.location.href = "../../index.html";
		} else if (response.status == 500) {
			console.log('Backend Error');
		}
	} catch (error) {
		console.log('Error:', error);
	}
});
