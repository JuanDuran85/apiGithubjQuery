$(document).ready(function () {
    let foto = $('.contenedor');
    console.log (foto)
    foto.show (3000);
    buscarPokeAPI(Math.floor(Math.random()*300));

    let buscarPoke = () => {
        let entradaPoke = $('#entradaPoke');
        buscarPokeAPI(entradaPoke.val());    
    };

    $('#buscando').on('click',buscarPoke);
    $('#entradaPoke').on('keyup',(event)=>{
        if (event.keyCode === 13) {
            event.preventDefault();
            buscarPoke();
        }
    });

    function buscarPokeAPI(valor) {
        $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${valor}`,
            dataType: "json",
            success: function (response) {
                console.log(response);
                let infoPoke = response;
                inyectarCodigo(infoPoke);
            },
            error: function(error){
                console.error(error);
                $('#mostraerPoke').html(`
                    <p>El estado de la busqueda es ${error.status}</p>
                `)
            }
        });
    };

    function inyectarCodigo(infoPoke) {
        $('#mostraerPoke').html(`
            <img src="${infoPoke.sprites.front_default}" alt="${infoPoke.id}">
            <p>Nombre: ${infoPoke.name}</p>
        `);
        $('#movimientos > ul').html("");
        infoPoke.moves.forEach((movimiento,index) => {
            $('#movimientos > ul').append(`
                <li>${index+1} - ${movimiento.move.name}</li>
            `);
        });
    }
});







