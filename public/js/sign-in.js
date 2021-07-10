const firstnameInput = document.getElementById('firstname');
const lastnameInput = document.getElementById('lastname');
const dniInput = document.getElementById('dni');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

async function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = {
            status: response.status,
            statusText: response.statusText,
            response: await response.json(),
        };
        throw error;
    }
}

const request = (url, options = {}) => {
    options.credentials = "include";
    options.mode = "cors";
    options.cache = "default";
    options.body = JSON.stringify(options.body);
    options.headers = {
        ...options.headers,
        "Content-Type": "application/json",
    };

    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(checkStatus)
            .then((response) => response.json())
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    });
};

btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    request("/user", {
        method: "POST",
        body: { 
            firstname: firstnameInput.value, 
            lastname: lastnameInput.value,
            dni: dniInput.value,
            email: emailInput.value,
            password: passwordInput.value
        },
    }).then((res) => {
        localStorage.setItem("ejercicio_token", res.token);
        localStorage.setItem('ejercicio_admin', res.admin);
        window.location.replace('/public/login.html');
    }).catch(err => {
      console.log(err);
    });
});