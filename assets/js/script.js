$(document).ready(function () {
    
    let tarjeta = $('.card');
    let buscar = (e) => {
        tarjeta.html("");

        e.preventDefault();

        let nombreUsuario = $('#nombreUsuario');

        if (nombreUsuario.val()) {
            $.ajax({
                type: "GET",
                url: `https://api.github.com/users/${nombreUsuario.val()}`,
                dataType: "json",
                success: function (response) {
                    console.log(response);
                    agregarDatos(response);
                },
                error: function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'El usuario no existe en GitHub',
                        footer: 'Intenta nuevamente'
                    });
                    console.log(error.statusText);
                    console.log(error.status);
                    console.error("El usuario no existe en GitHub");
                    $('#nombreUsuario').val("");
                    nombreUsuario.focus();
                }
            });
        } else {
            alert('Debe ingresar un usuario');
        }
    };

    $('form').on('submit', buscar);


    function agregarDatos(response) {
        tarjeta.append(`
            <img src="${response.avatar_url}" class="card-img-top" alt="${response.name}">
            <div class="card-body">
                <h5 class="card-title">Name: ${response.name ? response.name.toUpperCase() : 'No tiene nombre'}</h5>
                <p class="card-text">Location: ${response.location}. <a href="https://twitter.com/youyuxi" target="_blank"><i class="fab fa-twitter"></i></a> <a href="${response.html_url}" target="_blank"><i class="fab fa-github"></i></a></p>
                <a href="${response.blog}" target="_blank" class="btn btn-primary">Go web site</a>
            </div>
        `);
        let options = {
            title: {
                text: `Información de GitHub del Usuario ${response.name ? response.name.toUpperCase() : 'No tiene nombre'}`,
                fontColor: "#2f4f4f",
                fontSize: 30,
                padding: 10,
                margin: 15,
                backgroundColor: "#FFFFE0",
                borderThickness: 1,
                cornerRadius: 5,
                fontWeight: "bold",            
            },
            animationEnabled: true,
            axisY: {
                title: "Valores"
            },
            legend: {
                verticalAlign: "bottom",
                horizontalAlign: "center"
                },
            data: [              
                {
                    type: "column",
                    dataPoints: [
                        { label: "Public Repos",  y: response.public_repos  },
                        { label: "Public Gists", y: response.public_gists  },
                        { label: "Followers", y: response.followers  },
                        { label: "following",  y: response.following  },
                    ]
                }
            ]
        };

        $("#chartContainer").CanvasJSChart(options);
        $('#nombreUsuario').val("");
        nombreUsuario.focus();
    };
});