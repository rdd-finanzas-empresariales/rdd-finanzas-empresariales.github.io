$(document).ready(function() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const tema = urlParams.get('tema') ?? "introduccion";
    
    //Marcar el tema seleccionado
    $(`#t-${tema}`).addClass('selected');

    //Mostrar el título
    var titulo = "RDD Unidad 1: " + $(`#t-${tema} h4`).text();
    if($(`#t-${tema} h5`).text() != "") {
        titulo += " " + $(`#t-${tema} h5`).text();
    }
    $("#tituloPagina").text(titulo);
    
    //Cargar el contenido
    const divTema = $("#tema");
    divTema.html("");
    divTema.load(`html/${tema}.html`);

    var temas = $(".tema").toArray();
    temas.forEach(function(tema) {
        $(tema).click(function() {

            //Cambiar url
            const nextURL = "?tema=" + $(this).attr("id").replace("t-", "");
            const nextTitle = "asd";
            const nextState = { additionalInformation: '' };
            window.history.pushState(nextState, nextTitle, nextURL);

            //Cambiar título
            var titulo = "RDD Unidad 1: " + $(`#${$(this).attr("id")} h4`).text();
            if($(`#${$(this).attr("id")} h5`).text() != "") {
                titulo += " " + $(`#${$(this).attr("id")} h5`).text();
            }
            $("#tituloPagina").text(titulo);

            //Cambiar contenido
            divTema.html("");
            divTema.load(`html/${$(this).attr("id").replace("t-", "")}.html`);

            //Cambiar el tema seleccionado
            $(temas).removeClass("selected");
            $(tema).addClass("selected");

        });
    });

});