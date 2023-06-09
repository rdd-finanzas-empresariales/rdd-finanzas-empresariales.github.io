$(document).ready(function() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const tema = urlParams.get('tema') ?? "introduccion";

    if(window.innerWidth <= 1300) {
        //Marcar el tema seleccionado
        $(`#tDrop-${tema}`).addClass('selected');

        //Mostrar el título
        var titulo = "RDD Unidad 1: " + $(`#tDrop-${tema} h4`).text();
        if($(`#tDrop-${tema} h5`).text() != "") {

            titulo += " " + $(`#tDrop-${tema} h5`).text();

        }
        $("#tituloPagina").text(titulo);
        
        //Cargar el contenido
        const divTema = $("#tema");
        divTema.html("");
        divTema.load(`html/${tema}.html`);

        var temasToggle = $("div[id^=aDrop-]").toArray();
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
                    $("#" + $(this).attr("id").split("-")[1] + "Drop").slideDown("slow");
                    $("#" + $(this).attr("id") + " i").removeClass("fa-plus");
                    $("#" + $(this).attr("id") + " i").addClass("fa-minus");

                } else {

                    $(this).removeClass("selected");
                    $("#" + $(this).attr("id").split("-")[1] + "Drop").slideUp("slow");
                    $("#" + $(this).attr("id") + " i").removeClass("fa-minus");
                    $("#" + $(this).attr("id") + " i").addClass("fa-plus");

                }

            });

        });

        $("#aDrop-" + $(`#tDrop-${tema}`).parent().attr("id")).click();

        var temas = $("div[id^=tDrop-]").toArray();
        temas.forEach(function(tema) {

            $(tema).click(function() {

                //Cambiar url
                const nextURL = "?tema=" + $(this).attr("id").replace("tDrop-", "");
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
                divTema.load(`html/${$(this).attr("id").replace("tDrop-", "")}.html`);

                //Cambiar el tema seleccionado
                $(temas).removeClass("selected");
                $(tema).addClass("selected");

                $("#menuDrag").click();

            });

        });

    } else {

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

    }

    // Menu para celulares

    $("#menuDrag").css({
        "top": $("html").scrollTop() + 150 + "px",
        "right": "0px"
    });

    var isDragging = false;
    var actualDraggabletop = $("#menuDrag").css("top").replace("px", "");

    $(document.body).on('touchmove', onScroll);
    $(window).on('scroll', onScroll); 

    function onScroll() {
        if(isDragging) return;
        $("#menuDrag").css({
            "top": $("html").scrollTop() + 150 + "px"
        });
        actualDraggabletop = $(this).css("top").replace("px", "");
    };

    $("#menuDrag").draggable({
        scroll: false,
        containment: "#principal",
        snap: "#principal",
        start: function(){
            isDragging  = true;
            $(this).css({
                'right':"auto",
                'left': 'auto',
            })
        },
        stop: function() {
            actualDraggabletop = $(this).css("top").replace("px", "");
            isDragging = false;
            var horizontalLimit = window.innerWidth / 2;
            if($(this).position().left + $(this).width() > horizontalLimit) {
                $(this).animate({
                    right: "auto",
                    left: window.innerWidth - $(this).width() + "px"
                }, 300);
            } else {
                $(this).animate({
                    right: "auto",
                    left: "0px"
                }, 300);
        
            }
        }
    });

    $("#menuDrag").click(function() {
        if($("#dragHamburguer").hasClass("d-block")) {
            $(this).animate({
                "top": $("html").scrollTop() + 150 + "px"
            }, 300);
            $("#dragHamburguer").removeClass("d-block");
            $("#dragHamburguer").addClass("d-none");
            $("#dragCross").addClass("d-block");
            $("#dragCross").removeClass("d-none");
            $("#menuDrop").css({"top": $("html").scrollTop() + 210 + "px"});
            // $('html, body, #principal, #tema, #contenido').css({
            //     "overflow-y": 'hidden',
            //     height: '100vh'
            // });
            $(this).draggable("disable");
            setTimeout(() => $("#menuDrop").slideDown(300), 300);
        }
        else {
            $("#menuDrop").slideUp(300);
            setTimeout(() => {
                $(this).animate({
                    "top": actualDraggabletop + "px"
                }, 300);
                $("#dragCross").removeClass("d-block");
                $("#dragCross").addClass("d-none");
                $("#dragHamburguer").addClass("d-block");
                $("#dragHamburguer").removeClass("d-none");
                $('html, body, #principal, #tema, #contenido').css({
                    "overflow-y": "auto",
                    height: "100%"
                });
                $(this).draggable("enable");
            }, 300);
        }
    });

});