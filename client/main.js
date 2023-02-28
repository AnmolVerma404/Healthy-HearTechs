import axios from 'axios';
import cookie from 'cookie';
import { backendUrl } from './src/utils/url';

const isAuthenticated = async () => {
	const isAuth = document.getElementById('jsAuth');
	const userEl = document.getElementById('jsUserName');
	try {
		const cookieObj = cookie.parse(document.cookie);
		const response = await axios.post(backendUrl + '/api/auth/user', {
			jwt: cookieObj.jwt,
		});
		console.log(response);
		const name = response.data.data.name;
		if (response.data.success) {
			isAuth.innerText = 'Sign Out';
			isAuth.href = './src/views/signout.html';
			isAuth.classList.add('jsOut');
			userEl.innerText = name.length > 6 ? name.substring(0, 5) + '...' : name;
		} else {
			isAuth.innerText = 'Sign Up/In';
			isAuth.classList.remove('jsOut');
			isAuth.href = './src/views/signup.html';
		}
	} catch (error) {
		console.log('No cookie found');
		isAuth.innerText = 'Sign Up/In';
		isAuth.href = './src/views/signup.html';
	}
};

const homeSearch = () =>{
	const searchButton = document.getElementById('jsHomeSearch');

	searchButton.addEventListener('click',(e)=>{
		e.preventDefault();
		const searchText = document.getElementById('jsHomeSearchText').value;
		if(searchText.length>1){
			window.localStorage.setItem('searchText',searchText);
			window.location.href = "./src/views/medicine_page.html";
		}
	})
}

isAuthenticated();
homeSearch();