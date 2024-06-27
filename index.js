
let usuario = [];
let maquina = [];
let ronda = 0;


document.querySelector("#boton").onclick = comenzarJuego;

cambiarEstado("Toca Comenzar para empezar a jugar")
numeroRonda("Ronda -")
bloquearUsuario();

function comenzarJuego(){    
    reiniciarJuego();    
    turnos(); 
    
}
function reiniciarJuego(){
    usuario = [];
    maquina = [];
    ronda = 0;
    
}

function turnos(){
    bloquearUsuario();
    cambiarEstado("Es el turno de la maquina");

    const $box = boxRandom();    
    maquina.push($box);

    const retrasoJugador = (maquina.length + 1) * 1000;

    maquina.forEach(function($box, index){
        const retraso = (index + 1) * 1000;
        setTimeout(function(){
            pintarBox($box);
        } , retraso);
    });
    
    setTimeout(function(){
        cambiarEstado("Es tu turno!");
        desbloquearUsuario();
    } , retrasoJugador);
    
    usuario = [];
    ronda++;
    numeroRonda(ronda);
    
}

function manejarUsuario(event){
    const $box = event.target;
    pintarBox($box);
    usuario.push($box);

    const $boxMaquina = maquina[usuario.length -1];
    if ($box.id !== $boxMaquina.id){
        perdiste();
        return;
    }

    if (usuario.length === maquina.length){
        bloquearUsuario();
        setTimeout(turnos, 1000);
    }
}

function boxRandom(){
    const $box = document.querySelectorAll(".box");
    const boxRandom = Math.floor(Math.random() * $box.length);          
    
    return $box[boxRandom];
}

function pintarBox(box){
    box.style.opacity = 1;
    setTimeout(function(){  
        box.style.opacity = 0.3;          
    }, 500);    

}


function cambiarEstado(estado){
    const $estado = document.querySelector('#estado');
    $estado.textContent = estado;  


}

function numeroRonda(ronda){
    document.querySelector("#ronda").textContent = ronda;
}

function bloquearUsuario(){
    document.querySelectorAll(".box").forEach(function($box) {
        $box.onclick = function(){
            console.log("El input del usuario esta bloqueado");
             };      

        });
}

function desbloquearUsuario(){
    document.querySelectorAll(".box").forEach(function($box) {
        $box.onclick = manejarUsuario;
    });
}    
function perdiste(){
    bloquearUsuario();
    cambiarEstado("Perdiste! toca comenzar para jugar de nuevo", true);
}

