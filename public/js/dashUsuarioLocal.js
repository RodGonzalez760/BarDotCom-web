$(document).ready( function () {
    $.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
    });
    /*
     * Data table pedido
     */
    var tablaPedidos=$('#tablaPedidos').DataTable({
		//idioma de datatable
		"bProcessing": false,
		"serverSide": true,
		"width" : "100%",
		"language": {
		    	"sProcessing":     "Procesando...",
		        "sLengthMenu":     "Mostrar _MENU_ registros",
		        "sZeroRecords":    "No se encontraron resultados",
		        "sEmptyTable":     "Ningún dato disponible en esta tabla",
		        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
		        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
		        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
		        "sInfoPostFix":    "",
		        "sSearch":         "Buscar:",
		        "sUrl":            "",
		        "sInfoThousands":  ",",
		        "sLoadingRecords": "Cargando...",
		        "oPaginate": {
		            "sFirst":    "Primero",
		            "sLast":     "Último",
		            "sNext":     "Siguiente",
		            "sPrevious": "Anterior"
		        },
		        "oAria": {
		            "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
		            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
		        }
        },
        //configuracion de la peticion ajax
		"ajax":{
            url: $('#tablaPedidos').data('url'),
			type: 'post',
			error: function(error){
				//en caso de error
				Swal.fire(
                    'Error!',
                    'Ha ocurrido un error. Contacte al adminstrador',
                    'error'
                )
			}
		},
		//columnas que llenaran la tabla
		"columns": [
			{ "data": "idCliente"},
			{ "data": "idMesa"},
            { "data": "idItem"},
            { "data": "cantidadItem"},
            { "data": "fecha"},
        ],
        //se le agrega la columna con los botones
		"columnDefs": [
			{
			  "targets": 5,
			  "data": "parametros",
			  "render": function ( data, type, full, meta ) { 
			    return data;
			  }
			}
		],
		"initComplete": function(settings, json) {
			//se le cargan los eventos a los botones
            entregarPedido();
            eliminarPedido();
		},
		"createdRow": function ( row, data, index ) {
            $(row).find("td").eq(2).addClass("actions");
		}
	});
	setInterval( function () {// Actualizar tablar cada 30 segundos
		tablaPedidos.ajax.reload();
	}, 30000 );
    /*
     * Data table cuenta
     */
    var tablaCuentas=$('#tablaCuentas').DataTable({
		//idioma de datatable
		"bProcessing": false,
		"serverSide": true,
		"width" : "100%",
		"language": {
		    	"sProcessing":     "Procesando...",
		        "sLengthMenu":     "Mostrar _MENU_ registros",
		        "sZeroRecords":    "No se encontraron resultados",
		        "sEmptyTable":     "Ningún dato disponible en esta tabla",
		        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
		        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
		        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
		        "sInfoPostFix":    "",
		        "sSearch":         "Buscar:",
		        "sUrl":            "",
		        "sInfoThousands":  ",",
		        "sLoadingRecords": "Cargando...",
		        "oPaginate": {
		            "sFirst":    "Primero",
		            "sLast":     "Último",
		            "sNext":     "Siguiente",
		            "sPrevious": "Anterior"
		        },
		        "oAria": {
		            "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
		            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
		        }
        },
        //configuracion de la peticion ajax
		"ajax":{
            url: $('#tablaCuentas').data('url'),
			type: 'post',
			error: function(error){
				//en caso de error
				Swal.fire(
                    'Error!',
                    'Ha ocurrido un error. Contacte al adminstrador',
                    'error'
                )
			}
		},
		//columnas que llenaran la tabla
		"columns": [
			{ "data": "idCliente"},
            { "data": "idMesa"},
            { "data": "total"},
			{ "data": "fecha"},
        ],
        //se le agrega la columna con los botones
		"columnDefs": [
			{
			  "targets": 4,
			  "data": "parametros",
			  "render": function ( data, type, full, meta ) { 
			    return data;
			  }
			}
		],
		"initComplete": function(settings, json) {
			//se le cargan los eventos a los botones
            entregarCuenta();
            eliminarCuenta();
		},
		"createdRow": function ( row, data, index ) {
            $(row).find("td").eq(2).addClass("actions");
		}
	});
	setInterval( function () {// Actualizar tablar cada 30 segundos
		tablaCuentas.ajax.reload();
	}, 30000 );
    /*
     * Editar pedido
     */
    function entregarPedido() {
    }
    /*
     * Editar cuenta
     */
    function entregarCuenta() {
	}
    /*
     * Eliminar pedido
     */
    function eliminarPedido() {
    	$('.btn-eliminarPedido').click(function(event) {
			swal.fire({
			  title: '¿Está seguro?',
			  text: '¿Desea eliminar el pedido hecho en: '+$(this).data("ing")+'?',
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#d33',
			  cancelButtonColor: '#bdbdbd',
			  confirmButtonText: 'Si, eliminar!'
			}).then((result) => {
				if (result.value) {
					destroyPedido($(this).data('url'),$(this).data('id'));
				}
			})
		});
    }
    function destroyPedido(url, id) {
		$.ajax({                        
			type: 'post',                 
			url: url,                     
			data: {id:id},
			success: function(data)             
			{
                tablaPedidos.ajax.reload(function(){
                    entregarPedido();
            		eliminarPedido();
                });
                Swal.fire(
                    'Realizado exitósamente',
                    'La operación se ha realizado con éxito',
                    'success'
                )
			},
			error:function(error){
				Swal.fire(
                    'Error!',
                    'Ha ocurrido un error. Contacte al adminstrador',
                    'error'
                )
			}
	   });
    }
    /*
     * Eliminar cuenta
     */
    function eliminarCuenta() {
    	$('.btn-eliminarCuenta').click(function(event) {
			swal.fire({
			  title: '¿Está seguro?',
			  text: '¿Desea eliminar la cuenta hecha en: '+$(this).data("ing")+'?',
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#d33',
			  cancelButtonColor: '#bdbdbd',
			  confirmButtonText: 'Si, eliminar!'
			}).then((result) => {
				if (result.value) {
					destroyCuenta($(this).data('url'),$(this).data('id'));
				}
			})
		});
    }
    function destroyCuenta(url, id) {
		$.ajax({                        
			type: 'post',                 
			url: url,                     
			data: {id:id},
			success: function(data)             
			{
                tablaCuentas.ajax.reload(function(){
                    entregarCuenta();
            		eliminarCuenta();
                });
                Swal.fire(
                    'Realizado exitósamente',
                    'La operación se ha realizado con éxito',
                    'success'
                )
			},
			error:function(error){
				Swal.fire(
                    'Error!',
                    'Ha ocurrido un error. Contacte al adminstrador',
                    'error'
                )
			}
	   });
	}
	/* 
	 * Mensaje respuesta
	 */
	if(respuesta == 2){
        Swal.fire(
            'Error!',
            '¡No hay suficiente stock!',
            'error'
        )
    }
    if(respuesta == 1){
        Swal.fire(
            'Realizado exitósamente',
            'La operación se ha realizado con éxito',
            'success'
        )
    }
    if(respuesta == 0){
        Swal.fire(
            'Error!',
            'Ha ocurrido un error. Contacte al adminstrador',
            'error'
        )
    }
} );