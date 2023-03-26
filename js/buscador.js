function buscar() {

    var conceptos = $("div[id^=g-]").toArray();

    conceptos.forEach(function(concepto) {

        var buscar = $("#buscador-glosario").val().toLowerCase();
        
        var textoConcepto = $(concepto).html();

        var textoLimpio = textoConcepto;
        textoLimpio = textoLimpio.split(`<span class="encontrado">`).join("");
        textoLimpio = textoLimpio.split("</span>").join("");

        $(concepto).html(textoLimpio);
        $(concepto).removeClass("d-none");

        if(buscar == "") {
            return;
        }

        if(!textoLimpio.toLowerCase().includes(buscar)) {

            $(concepto).addClass("d-none");

        } else {

            var nodos = $(concepto).find("*").toArray();
            nodos.forEach(function(nodo) {

                var subNodos = $(nodo).find("*").toArray();

                if(subNodos.length == 0) {

                    var textoNodo = $(nodo).text();

                    if(textoNodo.toLowerCase().includes(buscar)) {

                        var textoResaltado = textoNodo.split(buscar).join(`<span class="encontrado">` + buscar + "</span>");
                        textoResaltado = textoResaltado.split(buscar.charAt(0).toUpperCase() + buscar.substring(1)).join(`<span class="encontrado">` + buscar.charAt(0).toUpperCase() + buscar.substring(1) + "</span>");
                        $(nodo).html(textoResaltado);

                    }

                }

            });
            
        }

    });
    
}