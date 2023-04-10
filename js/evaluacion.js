var ejercicios;

$(document).ready(function() {
    
    $("#comenzar").click(function() {

        fetch("js/ejercicios.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
    
            var ejerciciosRevueltos = data.sort(() => 0.5 - Math.random());
            ejercicios = ejerciciosRevueltos.slice(0, 10);

            $("#evaluacion").html("");

            ejercicios.forEach(function(ejercicio, index) {

                var opciones = ``;

                ejercicio["opciones"].forEach(function(opcion, index2) {

                    opciones += `
                        <div id="o-${ejercicio["numPregunta"]}-${index2 + 1}" class="col-10 py-3 d-block mx-auto opcion row d-flex" onclick="seleccionarOpcion(this)">
                            <div class="col-11">
                                ${opcion}
                            </div>
                            <div class="col-1 align-self-center text-center palomita d-none">
                                <i class="fa-solid fa-check"></i>
                            </div>
                            <div class="col-1 align-self-center text-center tache d-none">
                                <i class="fa-solid fa-xmark"></i>
                            </div>
                        </div>
                    `;

                });

                var plantillaEjercicio = `
                    <div id="p-${ejercicio["numPregunta"]}" class="my-5 pregunta">
                        <p>${index + 1}. ${ejercicio["pregunta"]}</p>
                        <div class="text-warning d-none">
                            <p>¡Aún no contestas esta pregunta!</p>
                        </div>
                        <div class="row">
                            ${opciones}
                        </div>
                    </div>
                `;

                $("#evaluacion").append(plantillaEjercicio);

            });

            $("#evaluacion").append("<hr />");

            $("#evaluacion").append(`
                <button onclick="calificar()" class="btn btn-primary d-block mx-auto mt-5">Verificar respuestas</button>
            `);
            
        });

    });

});

function seleccionarOpcion(obj) {

    var opciones = $("[id^='o-" + $(obj).attr("id").split("-")[1] + "-']");
    opciones.removeClass("seleccionada");
    $(obj).addClass("seleccionada");
    var pregunta = $("#p-" + $(obj).attr("id").split("-")[1]);
    pregunta.find(".text-warning").addClass("d-none");

}

function calificar() {

    if(!verificarRespuestas()) return;

    var preguntas = $("[id^='p-'").toArray();

    preguntas.forEach(function(pregunta, index) {

        var respuestaSeleccionada = $(pregunta).find(".seleccionada").attr("id").split("-")[2];
        var respuestaCorrecta = ejercicios[index]["respuesta"];

        if(respuestaCorrecta == respuestaSeleccionada) {
            $(pregunta).addClass("correcta");
            $(pregunta).find(".seleccionada").find(".palomita").removeClass("d-none");
        } else {
            $(pregunta).addClass("incorrecta");
            var selector = "#o-" + $(pregunta).find(".seleccionada").attr("id").split("-")[1] + "-" + respuestaCorrecta;
            $(pregunta).find(selector).addClass("opcionCorrecta");
            $(pregunta).find(".seleccionada").find(".tache").removeClass("d-none");
        }

    });

}

function verificarRespuestas() {

    var preguntas = $("[id^='p-'").toArray();
    var primeraSinResponder = 0;
    
    preguntas.forEach(function(pregunta) {

        var seleccionada = $(pregunta).find(".seleccionada");
        if(seleccionada.length == 0) {

            if(primeraSinResponder == 0) primeraSinResponder = $(pregunta);

            $(pregunta).find(".text-warning").removeClass("d-none");
            
        }

    });

    if(primeraSinResponder == 0) return true;

    id = primeraSinResponder.attr("id");
    
    $('#tema').animate({
        scrollTop: $("#" + id).get(0).offsetTop - 20
    }, 1000);

    return false;

}