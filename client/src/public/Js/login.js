import axios from "axios";
import { backendUrl } from "../../utils/url";

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
      console.log(response);
      console.log(response.data.token);
      document.cookie = `session=${response.data.token}; domain=localhost`;
      window.location.href = "../../index.html";
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("The entered fields are incorrect");
  }
});
