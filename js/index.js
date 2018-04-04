    'use strict'

    // elementos del DOM
    const formData = document.getElementById('formData');
    const error = document.getElementById('error');

    // API
    const API_URL = 'https://zeratul.herokuapp.com/api/login';

    // Listener
    formData.addEventListener('submit', getData);

    // funciones
    function getData(event) {
        event.preventDefault();

        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        const params = { username, password } // crear objeto con ES6
        // console.log(params);
        // console.log(username, password);
        login(params);
    }
    function login(params) {
        // console.log(params);
        fetch(
            API_URL,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "aplication/json"
                },
                body: JSON.stringify(params)
            }
        )
        .then((response) => response.json()) //me aseguro que responda un json
        .then(function (response) {
             // console.log(response);
            if (!response.code) {
                console.log('guardar en local storage');
                window.localStorage.setItem("user", JSON.stringify(response)); // guardo en el navegador

                setTimeout(function(){
                    window.location.replace('panel/index.html');
                }, 2000)

            } else{
                error.innerHTML = response.error;
            }

        })
        .catch(function(error) {
            console.log(error);
        })
    }

    (function isLogged() {
        const user = JSON.parse(window.localStorage.getItem('user'));
        if (user) window.location.replace('panel/index.html')
    })();


