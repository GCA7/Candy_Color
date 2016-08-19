     var apiURL = "http://localhost:7659/api/";
     $(document).ready(function () {
         debugger;
    var revisar = false;
    var contToques = 0;
    var movimiento1 = -1;
    var movimiento2 = -1;
    var partida = -1;
    trarerEstadísticas();
    $.post(apiURL + "partida", { id: '0' })
                .done(function (data) {
                    partida = data.id;
                    Paint(data);
                    listo(0);
                });
           
    $("body").on("click", "td", function () {
        if (movimiento1 == $(this).attr("numero") || movimiento2 == $(this).attr("numero")) {
            return;
        }

        if (contToques == 0) {
            movimiento1 = $(this).attr("numero");
            contToques++;
        }
        else {
            contToques++;
            movimiento2 = $(this).attr("numero");
        }

        if (movimiento2 > -1) {
            $.ajax({
                url: apiURL + "partida/" + partida,
                type: 'PUT',
                data: { 'usuario': 0, 'movimiento1': movimiento1, 'movimiento2': movimiento2 },
                success: function (data) {
                    Paint(data,"true");
                    movimiento1 = -1;
                    movimiento2 = -1;
                    contToques = 0;
                    revisar = true;
                }
            });
        }           
             
              
    });

});

function Paint(data) {
    $("#container").html("");
    var table = "";
    var color = "red";
    table += "<table id='tableCandy'>";
    for (var i = 0; i < data.elementos.length; i++) {
        if (i == 0 || i == 9 || i == 18 || i == 27 || i == 36 || i == 45 || i == 54 || i == 63)
            table += "<tr>";

        if (data.elementos[i].color == 0)
            color = "rojo.png";

        if (data.elementos[i].color == 1)
            color = "azul.png";

        if (data.elementos[i].color == 2)
            color = "amarillo.png";

        if (data.elementos[i].color == 3)
            color = "naranja.png";

        if (data.elementos[i].color == 4)
            color = "verde.png";

        table += "<td  id='" + data.elementos[i].id + "' numero='" + data.elementos[i].id + "'><img src='content/img/"+ color + "' ></td>";
        if (i == 8 || i == 17 || i == 26 || i == 35 || i == 44 || i == 53 || i == 62 || i == 71)
            table += "</tr>";
    }
    mvrest = '';
    puntos = '';
    mvrest ="<h1 class='animate zoomIn'>"+data.movimientosrestantes + "'</h1>";
    puntos = "<h1 class='animate zoomIn ' id='puntosf'>" + data.puntos + "</h1>";
         
    table += "</table>";
    $("#container").html(table);
            
    $("#movrestantes").html(mvrest);
    $("#puntos").html(puntos);
    if (data.movimientosrestantes == 0) {
        debugger;       
        puntos="<form  method=''><div class='input-group'><span class='input-group-addon' id='basic-addon1'>@</span><input type=text"+
            "class='form-control' placeholder='Username' aria-describedby='basic-addon1' required id='username'><button type='submit' onclick='terminarpartida();' class='btn btn-success'"+
            ">Success</button></div></form>";
        $("#container").html(puntos);
    } else {

        if (data.mover == "si") {

            listo(1);
        }
    }
}
function listo(a) {
    $.get("http://localhost:7659/api/" + "partida", { id: '1', mover: a })
                  .done(function (data) {
                      Paint(data);
                  });
}
function terminarpartida() {
    debugger;
    var puntos=document.getElementById('puntosf').innerHTML ;
    if (!document.getElementById('username').value == "") {
        $.post("http://localhost:7659/api/" + "estadisticas", { usuario: document.getElementById('username').value,puntaje:puntos})
                  .done(function (data) {
                      location.href("http://localhost:53075");
                  });
    }
}
function trarerEstadísticas() {
    $.get("http://localhost:7659/api/" + "estadisticas")
.done(function (data) {
    alert(data[0].puntaje);
});
}
