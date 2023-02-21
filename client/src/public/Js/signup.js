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
            console.log(response)
        } catch (error) {
            console.log(error);
        }
        // console.log(name,phone_number,email,password,confirmPassword);
	} else {
		console.log('Wrong');
	}
});
