$(document).ready( function () {
    $.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
    });
    /*
     * Data table
     */
    var tabla=$('#tablaLocales').DataTable({
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
            url: $('#tablaLocales').data('url'),
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
			{ "data": "id"},
			{ "data": "nombre"},
			{ "data": "direccion"},
        ],
        //se le agrega la columna con los botones
		"columnDefs": [
			{
			  "targets": 3,
			  "data": "parametros",
			  "render": function ( data, type, full, meta ) { 
			    return data;
			  }
			}
		],
		"initComplete": function(settings, json) {
			//se le cargan los eventos a los botones
            editarLocal();
            eliminarLocal();
		},
		"createdRow": function ( row, data, index ) {
            $(row).find("td").eq(2).addClass("actions");
		}
    });
    /*
     * Editar
     */
    function editarLocal() {
	}
    /*
     * Eliminar
     */
    function eliminarLocal() {
    	$('.btn-eliminar').click(function(event) {
			swal.fire({
			  title: '¿Está seguro?',
			  text: '¿Desea eliminar el local: '+$(this).data("ing")+', incluyendo sus datos?',
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#d33',
			  cancelButtonColor: '#bdbdbd',
			  confirmButtonText: 'Si, eliminar!'
			}).then((result) => {
				if (result.value) {
					destroyLocalComercial($(this).data('url'),$(this).data('id'));
				}
			})
		});
    }
    function destroyLocalComercial(url, id) {
		$.ajax({                        
			type: 'post',                 
			url: url,                     
			data: {id:id},
			success: function(data)             
			{
                tabla.ajax.reload(function(){
                    editarLocal();
            		eliminarLocal();
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
} );