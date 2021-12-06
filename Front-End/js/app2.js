const iniciarRifa = document.querySelector("#iniciarRifa");
const rifaSelect = document.querySelector("#rifas-select");

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
        let index = 0;
        let arrListas = listaRifas.rifasDisponibles;
        codigoRifas = listaRifas.codigoRifas;
        console.log(arrListas);
        if(arrListas.length > 0){
            arrListas.forEach(rifa => {
                console.log(rifa);
                console.log("--");
                let opt = document.createElement("option");
                opt.value = index;
                opt.innerHTML = rifa;
                rifaSelect.appendChild(opt);
                index++;
            });
        }
    })
    .catch(err => console.log(err));
});

//Boton para iniciar Rifa
iniciarRifa.addEventListener('click', (event) => {
    event.preventDefault();
    const rifaSeleccionada = rifaSelect.options[rifaSelect.selectedIndex].text;
    const rifaCodigoSelect = codigoRifas[rifaSelect.value];
    
    location.href = `http://localhost:5501/Front-End/rifa.html?rifa=${rifaCodigoSelect}`;
});


