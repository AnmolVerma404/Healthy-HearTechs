// import axios from "axios";
// import Swal from 'sweetalert2';
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.7.12/+esm';
import { backendUrl } from "../../utils/url";
import { Toast } from '../../utils/swal';

const submit = document.getElementById("jsSubmitButton");

submit.addEventListener("click", async (event) => {
  const form = document.querySelector("form");
  if (form.checkValidity()) {
    event.preventDefault();
    const email = document.getElementById("jsEmail").value;
    const password = document.getElementById("jsPassword").value;
    try {
      const response = await axios.post(backendUrl + "/api/auth/login", {
        email,
        password,
      });
      console.log("Coolkie: ",response.data.token);
      document.cookie = `jwt=${response.data.token}; path=/`;
      await Toast.fire({
        icon: 'success',
        title: 'Logging you inside'
      });
      window.location.href = "../../index.html";
    } catch (error) {
			Swal.fire({
				icon: 'error',
				title: error.response.status.toString(),
				text:error.response.data.message,
			});
      // swal(error.response.data.message, error.response.status.toString(), "error");
      console.log(error);
    }
  } else {
    console.log("The entered fields are incorrect");
  }
});
