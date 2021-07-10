const token = localStorage.getItem('token');
let nameWelcome = document.getElementById('nameWelcome');
let moneyElement = document.getElementById('money'); 
let dataFullname = document.getElementById('dataFullName');
let dataAccount = document.getElementById('dataAccount');
let dataEmail = document.getElementById('dataEmail');

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

request("/user/me", {
    method: "GET",
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
    .then((res) => {
        console.log(res);
        renderView(res.data)
    })
    .catch((err) => {
        console.log(err);
});

function renderView(data) {
    nameWelcome.innerText = data.firstname;
    moneyElement.innerText = `$${data.amount}`;
    dataFullname.innerText = `${data.firstname} ${data.lastname}`;
    dataAccount.innerText = data.account;
    dataEmail.innerText = data.email;
}