console.log('Sign UP JS');

const submit = document.getElementById('jsButtonSubmit');

// const onSubmit = () =>{
submit.addEventListener('click', async e => {
	const form = document.querySelector('form');
	if (form.checkValidity()) {
		const name = document.getElementById('jsName').value;
		const mobileNumber = document.getElementById('jsMobileNumber').value;
		const email = document.getElementById('jsEmail').value;
		const password = document.getElementById('jsPassword').value;
		const confirmPassword = document.getElementById('jsConfirmPassword').value;
		console.log(
			'Clicked',
			name,
			mobileNumber,
			email,
			password,
			confirmPassword
		);
	} else {
		console.log('Wrong');
	}
});

// }

// onSubmit();
