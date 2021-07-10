let labelEmail = document.getElementById("labelEmail");
let labelPassword = document.getElementById("labelPassword");
let inputEmail = document.getElementById("email");
let inputPassword = document.getElementById("password");
let btnSubmit = document.getElementById('submit');

function inputListener(input, label) {
    input.addEventListener("focus", () => {
        label.className = "labelChanged";
        label.classList.add("labelActive");
        input.classList.add("inputActive");
        // label.classList.add('labelChanged')
    });

    input.addEventListener("focusout", () => {
        if (input.value === "") {
            label.className = "labelPlaceholder";
        }
        
        label.classList.remove("labelActive");
        input.classList.remove("inputActive");
    });
}

inputListener(inputEmail, labelEmail);
inputListener(inputPassword, labelPassword);

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
    request("/login", {
        method: "POST",
        body: { email: inputEmail.value, password: inputPassword.value },
    }).then((res) => {
        localStorage.setItem("ejercicio_token", res.token);
        localStorage.setItem('ejercicio_admin', res.admin);
        window.location.replace('/public/index.html');
    }).catch(err => {
      console.log(err);
    });
});

