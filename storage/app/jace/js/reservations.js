$(function() {	
	var baseurl = window.location.origin;
	var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
	
	// Datatable #reservations-all-datatable	 	
	$('#reservations-all-datatable').DataTable({ 
		"ajax": {
			"url": "/get-all-reservations",
			"data": function(json) {
				return json;
			}
		},
		"columns": [
			{"data": "priority"}, 
			{"data": "first_name"},
			{"data": "middle_name"},
			{"data": "last_name"},
			{"data": "status"}, 
			{"data": "insurance"},
			{"data": "updated_at"},
			{"data": "actions"}
		],
		fixedHeader: true,
		autoWidth: false,
		"lengthMenu": [[50, 100, 200, 500, -1], [50, 100, 200, 500, "All"]]		
	});	
	
	$('#reservations-all-datatable').on('click', ".btn-delete-reservation", function(e) {	
		var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
		var that = $(this);		
		e.preventDefault();
		
		swal({
			title: "Are you sure?",
			text: "Deleted reservations will be removed from database.",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, delete reservation!",
			cancelButtonText: "No, cancel please!",
			closeOnConfirm: false,
			closeOnCancel: false
		}, function (isConfirm) {
			if (isConfirm) {
				var id = that.attr('data-id');		
				
				$.ajax({
					type: "POST",
					url: '/delete-reservation',
					dataType: 'json',
					data: {
						'_method':'POST',
						'_token':CSRF_TOKEN, 
						'id':id
					},
					success: function (res) {	
					},
					error: function(msg){
						console.log(msg);
					}				
				});	
				
				swal("Reservation Deleted!", "Reservation records now removed from database.", "success");	
				that.closest('tr').remove();
			} else {
				swal("Canceled!", "Reservation records still exists on database.", "error");
			}
		});
	});	
	
	// Update reservation
	$('#reservations-datatable').on('click', ".btn-update-reservation", function(e) {	
		var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
		var that = $(this);		
		e.preventDefault();
		
		$.ajax({
			type: "POST",
			url: '/update-reservation',
			dataType: 'html',
			data: {
				'_method':'POST',
				'_token':CSRF_TOKEN, 
				'id':that.attr('data-id'),
				'status':that.attr('data-status')
			},
			success: function (res) {	
				that.closest('tr').attr('style', 'background-color: #ccffcc !important');
				that.closest('tr').fadeIn("slow");	
				location.reload();	
			},
			error: function(msg){
				console.log(msg);
			}				
		});		
	});	
});