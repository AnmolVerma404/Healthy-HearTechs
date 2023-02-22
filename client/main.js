import axios from "axios";
import { backendUrl } from "./src/utils/url";

const isAuth = document.getElementById('jsAuth');
console.log(document.cookie);

const isAuthenticated = async () =>{
    try {
        // const response = await axios.post(backendUrl+'/api/auth/user');
        // console.log(response);
    } catch (error) {
        console.log('No cookie found');
        isAuth.innerText = "Sign Up/In";
        isAuth.href = "./src/views/signup.html";
    }
}

isAuthenticated();

// isAuth.addEventListener('click',()=>{

// })