const txtName = document.querySelector("#nombre");
const txtMail = document.querySelector("#correo");
const loginButton = document.querySelector("#loginButton");
const rifasSelect = document.querySelector("#rifas-select");

const backendPort = 4000;

let codigoRifas = 0;

window.addEventListener("load", (event) => {
    const today = (new Date()).getTime();
    const url = `http://localhost:3000/get-rifa`;

    //request al backend
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'fechaIntentoRegistro': today,
        })
    })
    .then(response => response.json())
    .then(listaRifas => {
        //llenamos picker.
       
        let index = 0;
        let arrListas = listaRifas.rifasDisponibles;
        console.log(arrListas);
        codigoRifas = listaRifas.codigoRifas;
        console.log(codigoRifas);
        if(arrListas.length > 0){
            arrListas.forEach(rifa => {
                console.log(rifa);
                console.log("--");
                let opt = document.createElement("option");
                opt.value = index;
                opt.innerHTML = rifa;
                rifasSelect.appendChild(opt);
                index++;
            });
        }
    })
    .catch(err => console.log(err));
    
    


})

loginButton.addEventListener("click", (event) =>{
    event.preventDefault();


    const nombre = txtName.value;
    const mail = txtMail.value;
    const today = (new Date()).getTime();
    //const today = new Date(Date.UTC());

    console.log('-----');
    console.log(nombre);
    console.log(mail);
    console.log(today);

    const url = `http://localhost:3000/registrarme`;
    

    //request al backend
    const rifaCodigoSelect = codigoRifas[rifasSelect.value];

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'nombre': nombre,
            'correo': mail,
            'fechaIntentoRegistro': today,
            'idRifa': rifaCodigoSelect
        })
    })
    .then(response => response.json())
    .then(datos => {
        mostrarRegistro(datos);
    })
    .catch(err => console.log(err));
});

//fiuncion para mostrar el estado del registor
const mostrarRegistro = (estatus) => {
    const estadoRegistor = estatus.registerStatus;
    const nombreRifa = estatus.nombreRifa;
    console.log(estadoRegistor);

    if(estadoRegistor === 0){
        alert(`No hay rifa activa en este momento`);
    } else if(estadoRegistor == 1){
        alert(`Registrado Exitosamente`);
    } else if(estadoRegistor == 1020){
        alert(`Usted ya está registrado para esta rifa.`);
    }
}