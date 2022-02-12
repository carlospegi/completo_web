

(function () {

    "use strict";

    document.addEventListener('DOMContentLoaded', function () {

        var map = L.map('mapa').setView([4.5318, -75.704201], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([4.5318, -75.704201]).addTo(map)
            .bindPopup('GDLWEBCAMP <br>')
            .openPopup()
            .bindTooltip('hey!')
            .openTooltip()
        /* ------------------------------------------------------------------------------------------------------------- */

        /* campos datos usuario */
        let nombre = document.getElementById("nombre");
        let apellido = document.getElementById("apellido");
        let email = document.getElementById("email");
        let error = document.getElementById("error");

        /* campos boletos */
        let paseDia = document.getElementById("pase_dia");
        let paseCompleto = document.getElementById("pase_completo");
        let paseDosDias = document.getElementById("pase_dos_dia");


        /* campos pago y extras */
        let cantidadCamisa = document.getElementById("camisa_evento");
        let cantidadEtiquetas = document.getElementById("paquete_etiquetas");
        let regalo = document.getElementById("regalo");
        let pago = document.getElementById("total-pago");
        let listaProductos = document.getElementById("lista-productos");
        if (document.getElementById("calcular")) {
            let calcular = document.getElementById("calcular");


            /*  let btnRegistro = document.getElementById("btnRegistro");   */  /* falta rea */
            calcular.addEventListener('click', calcularMontos);
            /* --------------------------------------------------------------------------------------------------- */

            nombre.addEventListener('blur', validarCampos);
            apellido.addEventListener('blur', validarCampos);
            email.addEventListener('blur', validarCampos);
            email.addEventListener('blur', validarEmail)

            function validarCampos() {
                if (this.value == '') {
                    error.style.display = 'block';
                    error.innerHTML = ` Debe llenar campo correctamente`;
                    this.style.border = '1px solid red';
                    error.style.border = '1px solid red'
                } else {
                    error.style.display = 'none';
                    this.style.border = '1px solid green';
                }
            }
            function validarEmail() {
                if (this.value.indexOf('@') > -1) {
                    error.style.display = 'none';
                    this.style.border = '1px solid green';
                } else {
                    error.style.display = 'block';
                    error.innerHTML = ` Debe llevar un @`;
                    this.style.border = '1px solid red';
                    error.style.border = '1px solid red'
                }

            }

            /* ------------------------------------------------------------------------------------------------------------------ */
            paseDia.addEventListener('blur', mostrarDias);
            paseDosDias.addEventListener('blur', mostrarDias);
            paseCompleto.addEventListener('blur', mostrarDias);
            /* ---------------------------------------------------------------------------------------- */


            function calcularMontos(e) {
                e.preventDefault();


                if (regalo.value === "") {
                    alert("DEBE SELECCIONAR UN REGALO");
                    regalo.focus()
                } else {
                    let boletoDia = parseInt(paseDia.value, 10) || 0,
                        boleto2Dias = parseInt(paseDosDias.value, 10) || 0,
                        boletoCompleto = parseInt(paseCompleto.value, 10) || 0,
                        camisas = parseInt(cantidadCamisa.value, 10) || 0,
                        etiquetas = parseInt(cantidadEtiquetas.value, 10) || 0;

                    let totalPagar = (boletoDia * 20) + (boleto2Dias * 45) + (boletoCompleto * 50) + ((camisas * 10) * 0.93) + (etiquetas * 2);
                    pago.innerHTML = "$" + totalPagar.toFixed(2);

                    let listadoProductos = [];

                    if (boletoDia >= 1) {
                        listadoProductos.push(boletoDia + ' pases por dia');

                    }
                    if (boleto2Dias >= 1) {
                        listadoProductos.push(boleto2Dias + ' pases por 2 dias');

                    }
                    if (boletoCompleto >= 1) {
                        listadoProductos.push(boletoCompleto + ' pases completo');
                    }
                    if (camisas >= 1) {
                        listadoProductos.push(camisas + ' camisas');
                    }
                    if (etiquetas >= 1) {
                        listadoProductos.push(etiquetas + ' etiquetas');
                    }

                    listaProductos.innerHTML = '';   /* ------------------   vacio para que al ejecutar de nuevo o cambie valor,, no repita todo array */
                    for (let i = 0; i < listadoProductos.length; i++) {

                        listaProductos.style.display = 'block';
                        listaProductos.innerHTML += listadoProductos[i] + "</br>";
                    }



                }/* else */
            }/* calcularMontos */

            /* ---------------------------------------------------------------------------------------- */
            function mostrarDias() {
                let boletoDia = parseInt(paseDia.value, 10) || 0,
                    boleto2Dias = parseInt(paseDosDias.value, 10) || 0,
                    boletoCompleto = parseInt(paseCompleto.value, 10) || 0

                let diasElejidos = [];

                if (boletoDia > 0) {
                    diasElejidos.push('viernes');
                }
                if (boleto2Dias > 0) {
                    diasElejidos.push('viernes', 'sabado');
                }
                if (boletoCompleto > 0) {
                    diasElejidos.push('viernes', 'sabado', 'domingo')
                }

                for (let i = 0; i < diasElejidos.length; i++) {
                    document.getElementById(diasElejidos[i]).style.display = 'block';

                }

            }/* mostrarDias */



        } // if(calcular)

        /* ------------------------------------------ */
    }) /* DOMContentLoaded */
})();


/* JQUERY */

$(function () {

    /* letering */
    $('.nombre-sitio').lettering();

    $('.programa-evento .info-curso:first').show();
    $('.menu-programa a:first').addClass('activo')
    $('.menu-programa a').on('click', mostrarInfo)


    let windowHeight = $(window).height();   // cuanto mide la pagina
    let barraAltura = $('.barra').innerHeight();  // cuanto mide la baarra altura
    console.log(barraAltura)

    $(window).scroll(function () {  // escucha el scroll unicamente 
        let scroll = $(window).scrollTop();     //trae el valor del scroll exacto #

        if (scroll > windowHeight) {
            $('.barra').addClass('fixed');
            $('body').css({ 'margin-top': barraAltura + 'px' })
        } else {
            $('.barra').removeClass('fixed');
            $('body').css({ 'margin-top': 0 })
        }
    })

    /* menu hamburguesa */

    $('.menu-movil').on('click', function () {
        $('.menu-principal').slideToggle();  // esta en display none

    })


    function mostrarInfo() {
        $('.menu-programa a').removeClass('activo');
        $(this).addClass('activo');
        $('.ocultar').hide();
        let enlace = $(this).attr('href');
        $(enlace).show()
        console.log(this)

        return false;
    }

    /* scroll- barrafija */




    /* -------------------------------------------------------------------------------------------- */
    /* animaciones numeros */

    $('.resumen-evento li:nth-child(1) p').animateNumber({ number: 6 }, 1000);
    $('.resumen-evento li:nth-child(2) p').animateNumber({ number: 15 }, 1000);
    $('.resumen-evento li:nth-child(3) p').animateNumber({ number: 3 }, 1200);
    $('.resumen-evento li:nth-child(4) p').animateNumber({ number: 9 }, 900);


    /*  cuenta regresiva */
    $('.cuenta-regresiva').countdown('2022/10/10', function (event) {
        $('#dias').html(event.strftime('%D'));
        $('#horas').html(event.strftime('%H'));
        $('#minutos').html(event.strftime('%M'));
        $('#segundos').html(event.strftime('%S'));
    });

});

