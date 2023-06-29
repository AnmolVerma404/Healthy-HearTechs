// import axios from 'axios';
// import Swal from 'sweetalert2';
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.7.12/+esm';
import { Toast } from '../../utils/swal';
import { backendUrl } from '../../utils/url';

const submit = document.getElementById('jsButtonSubmit');

submit.addEventListener('click', async e => {
	const form = document.querySelector('form');
	if (form.checkValidity()) {
		e.preventDefault();
		const name = document.getElementById('jsName').value;
		const phone_number = document.getElementById('jsMobileNumber').value;
		const email = document.getElementById('jsEmail').value;
		const password = document.getElementById('jsPassword').value;
		const confirmPassword = document.getElementById('jsConfirmPassword').value;
		try {
			const response = await axios.post(backendUrl + '/api/auth/signup', {
				email,
				name,
				password,
				phone_number,
				confirmPassword,
			});
			await Toast.fire({
				icon: 'success',
				title: 'Signing Up',
			});
			window.location.href = '/src/views/signin.html';
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: error.response.status.toString(),
				text: error.response.data.message,
			});
			console.log(error);
		}
	} else {
		console.log('Wrong');
	}
});
