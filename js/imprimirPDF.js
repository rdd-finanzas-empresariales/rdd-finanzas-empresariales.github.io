function imprimirDiv() {

    var contenido = $("#tema").html();
    var contenidoEscondido = `
        <div id="tema-escondido" class="pt-2 pb-5 px-4" style="width: 22cm !important;">
            ${contenido}
        </div>
    `;
    $("body").append(contenidoEscondido);

    $("#tema-escondido .no-imprimir").remove();
    $("#tema-escondido .opcionCorrecta").removeClass("opcionCorrecta");

    $("#tema-escondido #nombreCompleto").attr("placeholder", $("#tema #nombreCompleto").val().toUpperCase());
    $("#tema-escondido #grupo").attr("placeholder", $("#tema #grupo").val().toUpperCase());

    window.jsPDF = window.jspdf.jsPDF;

    var pdf = new jsPDF({
        format: [416, ($("#tema-escondido").height() / 2)],
        putOnlyUsedFonts: true
    });

    var html = `
        <html>
            <head>
                <title>
                    Evaluación
                </title>
            </head>
            <body>
                <div id="tema-escondido" class="pt-2 pb-5 px-4" style="width: 22cm !important;">
                    ${$("#tema-escondido").html()}
                </div>
            </body>
        </html>
    `;

    var nombreAlumno = $("#tema #nombreCompleto").val().toUpperCase();
    var grupoAlumno = $("#tema #grupo").val().toUpperCase();

    var nombreArchivo = "Evaluación " + nombreAlumno + " (" + grupoAlumno + ")";

    pdf.html(html, {
        callback: function (pdf) {
            pdf.deletePage(2);
            pdf.save(nombreArchivo + ".pdf");
            $("#tema-escondido").remove();
        },
        html2canvas: {
            scale: 0.5
        }
    });

}