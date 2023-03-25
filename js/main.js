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

    var temasToggle = $("div[id^=a-]").toArray();
    temasToggle.forEach(function(temaToggle) {

        $(temaToggle).click(function() {

            if(!$(this).hasClass("selected")) {

                temasToggle.forEach(function(temaToggleTempo) {
                    if($(temaToggle).attr("id") != $(temaToggleTempo).attr("id")) {
                        if($(temaToggleTempo).hasClass("selected")) {
                            $(temaToggleTempo).click();
                        }
                    }
                });

                $(this).addClass("selected");
                $("#" + $(this).attr("id").split("-")[1]).slideDown("slow");
                $("#" + $(this).attr("id") + " i").removeClass("fa-plus");
                $("#" + $(this).attr("id") + " i").addClass("fa-minus");

            } else {

                $(this).removeClass("selected");
                $("#" + $(this).attr("id").split("-")[1]).slideUp("slow");
                $("#" + $(this).attr("id") + " i").removeClass("fa-minus");
                $("#" + $(this).attr("id") + " i").addClass("fa-plus");

            }

        });

    });

    $("#a-" + $(`#t-${tema}`).parent().attr("id")).click();

    var temas = $("div[id^=t-]").toArray();
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