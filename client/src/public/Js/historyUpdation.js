// import axios from 'axios';
// import cookie from 'cookie';
// import Swal from 'sweetalert2';
import cookie from 'https://cdn.jsdelivr.net/npm/cookie@0.5.0/+esm';
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.7.12/+esm';
import { backendUrl } from '../../utils/url';
import { Toast } from '../../utils/swal';

const formSubmit = document.getElementById('jsFormSubmit');

formSubmit.addEventListener('click', async e => {
	e.preventDefault();
	const doctorName = document.getElementById('jsDoctorName').value;
	const phone = document.getElementById('jsPhone').value;
	const hospitalName = document.getElementById('jsHospitalName').value;
	const medicalCondition = document.getElementById('jsMedicalCondition').value;
	const appointDate = document.getElementById('jsAppointDate').value;
	const cookieObj = cookie.parse(document.cookie);
	console.log(cookieObj.jwt);
	if (cookieObj.jwt == 'null') {
		Swal.fire({
			icon: 'warning',
			title: "Error 401",
			text: "Sign Up/In First Please!!!",
		});
		return;
	}
	try {
		const response = await axios.post(backendUrl + '/api/record', {
			doctorName,
			phone,
			hospitalName,
			medicalCondition,
			appointDate,
			jwt: cookieObj.jwt,
		});

		if (response.status === 201) {
			console.log('Added successfully');
			await Toast.fire({
				icon: 'success',
				title: 'Updating your Records',
			});
			document.getElementById('jsHistoryForm').reset();
			window.location.href = '../../index.html';
		} else if (response.status == 500) {
			console.log('Backend Error');
		}
	} catch (error) {
		Swal.fire({
			icon: 'error',
			title: error.response.status.toString(),
			text:error.response.data.message,
		});
		console.log('Error:', error);
	}
});
