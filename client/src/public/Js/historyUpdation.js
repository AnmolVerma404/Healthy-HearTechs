import axios from 'axios';
import { backendUrl } from '../../utils/url';

const formSubmit = document.getElementById('jsFormSubmit');

formSubmit.addEventListener('click', async e => {
	e.preventDefault();
	const doctorName = document.getElementById('jsDoctorName').value;
	const phone = document.getElementById('jsPhone').value;
	const hospitalName = document.getElementById('jsHospitalName').value;
	const medicalCondition = document.getElementById('jsMedicalCondition').value;
	const appointDate = document.getElementById('jsAppointDate').value;
	try {
		const response = await axios.post(backendUrl + '/api/records', {
			doctorName,
			phone,
			hospitalName,
			medicalCondition,
			appointDate,
		});

		if (response.status === 201) {
			console.log('Added successfully');
		} else if (response.status == 500) {
			console.log('Backend Error');
		}
	} catch (error) {
		console.log('Error:', error);
	}
});
