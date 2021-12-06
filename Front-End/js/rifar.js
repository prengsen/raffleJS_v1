//Agregar Formulario para ingresar correo.
//Agegar Validación de Correo.
//Almacenar en localStorage.
//mecanismo de rifa.

let names = [];
const namesDiv = document.querySelector('#names');

/*let names = ["ileanaserra2020@gmail.com",
"keec.4991@gmail.com",
"aletensan@gmail.com",
"beatrizepineda@gmail.com"];*/
let tid;
function reset() {
    clearTimeout(tid);
    $('#names').empty();
    let namesLength = names.length;
    names.forEach(function(name) {
        let index =  (Math.round(Math.random()*namesLength));
        $('#names').append(`<div class="name alive " > ${name} </div>`);
        console.log(index);
    });
}

let idRifaX = 0;

window.addEventListener("load", ()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idRifa = urlParams.get('rifa');
    idRifaX = idRifa;
    console.log(idRifa);

    const url = `http://localhost:3000/get-registrados`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'idRifa': idRifa,
        })
    })
    .then(response => response.json())
    .then(registrados => {
        registrados.registrados.forEach(item => {
            names.push(item.correo);
            let namesLength = registrados.length;
            let index =  (Math.round(Math.random()*namesLength));
            $('#names').append(`<div class="name alive " > ${item.correo} </div>`);
            console.log(index);
        });
    });
    
    console.log(names);
    reset();

});




let audio = new Audio('redoblante.mp3');


function pickWinner() {
    //let num = $('.alive').length;
    let i = (Math.round(Math.random()*names.length));        
    if (names.length > 3) {
        audio.play();
        $('.alive').eq(i).removeClass('alive').animate({opacity: '0', transform: 'scale(1.5)'}, 50);
        names.splice(i, 1);
        setTimeout(pickWinner, 70);
    } else {
        let ganadores = document.querySelectorAll('.alive');
        let ganador1 = ganadores[0].textContent;
        let ganador2 = ganadores[1].textContent;
        let ganador3 = ganadores[2].textContent;
        console.log(ganador1);
        let strGanadores = `<div id='principal'> <ul> 
            <h1> <li>  ${ganador1} </li> </h1> 
            <br> <h1> <li> ${ganador2} </li>  </h1> 
            <br> <h1> <li>  ${ganador3} </li> </h1> 
            </ul> </div>`;
        
        strGanadores = `<div class="w3-modal"></div>
            <div class="w3-modal-content">
            <header class="w3-container w3-teal" style="padding-top: 10px;"> 
                <h2>GANADORES!!!</h2>
            </header>
            <div class="w3-container">
                <ul> 
                    <h1> <li>  ${ganador1} </li> </h1> 
                    <br> <h1> <li> ${ganador2} </li>  </h1> 
                    <br> <h1> <li>  ${ganador3} </li> </h1> 
                </ul>
            </div>
            <footer class="w3-container w3-teal">
                <img src="/patroc.png" style=" max-width: 100%;
                max-height: 100%;"/>
            </footer>
            </div>
        </div>`;

        document.querySelector("#myDialog").innerHTML = strGanadores;
        audio.pause();
        audio = new Audio('gano.mp3');
        audio.play();
        document.querySelector("#myDialog").showModal(); 

        //escribimos ganadores
        let ganadoresWrite = [ganador1, ganador2, ganador3];
        const url = `http://localhost:3000/ganadores`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'ganadores': ganadoresWrite,
                'idRifa': idRifaX
            })
        })
        .then(response => response.json())
        .then(datos => console.log(datos))
        .catch(err => console.log(err));
    }
}
  
$('#go').click(pickWinner);
$('#reset').click(reset);

//reset();

function setBack(){
    $('#main').style
}

