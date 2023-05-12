import axios from 'axios';
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
            window.location.href = '/src/views/signin.html';
        } catch (error) {
            swal(error.response.data.message, error.response.status.toString(), "error");
            console.log(error);
        }
	} else {
		console.log('Wrong');
	}
});
