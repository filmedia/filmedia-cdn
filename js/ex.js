 $(function() {
   	$("#ratingCount").html('{{$ratingCount}}'+' avis');

      $('#example').barrating({
        theme: 'fontawesome-stars',
        initialRating: '{{$yourRating->rating ?? "0"}}',
        onSelect:function(value,text,event){
				$.ajax({
				   method:"POST",
                   url:'{{route("ratings.store")}}',
                   data:{
					"_token":"{{ csrf_token() }}",
					'idMovie':"{{$movie->id}}",
				    'idUser':"{{$user['user_id'] ?? ''}}",
					'rating':value,
				   },
                   success:function(data){
                   
                   	$("#ratingCount").html(data+' avis');
                   	//message('Votre avis est validé');
       
                   },
                   error:function(err){
                   
                   }

                  });
           }
      });

   			
   

	
            $("#btn-comment").hide();
             

             displayComments();
           $("#content").keyup(function(e){
           	if($(this).val()!=''){
           	 $("#btn-comment").show();
           	}else{
           		 $("#btn-comment").hide();
           	}
           });


	        function displayComments(){
				
				$.ajax({
				method:'GET',
				url:'{{route("comments.show",$movie->id)}}',
				success:function(data){

					$('.comments').html(data);
				},
				error:function(err){
					console.log(err);
				}
			});

		    }


		execute_comment=function(){
			var content=$("#content").val();
			var idMovie="{{$movie->id}}";
			var name="{{$user['user_name'] ?? ''}}";

			

			if($("#content").val()==''){
				$("#error").html('<i class="fa fa-exclamation error"> Vous devez taper quelque chose.</i>');
			}else{
			

			$.ajax({
				method:'POST',
				url:"{{route('comments.store')}}",
				data:{
					"_token": "{{ csrf_token() }}",
					'name':name,
					'id_movie':idMovie,
					'content':content
				},
				timeout:500000,
				
				success:function(data){
					
					
					$("#content").val('');
					
					$("#btn-comment").hide();


					displayComments();
				},
				error:function(err){
					console.log(err);
				}
			});
		}
		}

	$("#btn-comment").on('click',function(){
		execute_comment();
			
		return false;
		});

	$('.btn-fav').on('click', function() {
    var $this = $(this);
  	$this.button('loading');
    setTimeout(function() {
       
       	$.post({
       	url:"{{route('favorites.store')}}",
       	data:{
       		_token:"{{csrf_token()}}",
       		idUser:$("#uid").val(),
       		idMovie:$("#mid").val()
       	},
       	success:function(data){
       	$this.html(data);
       	}
       });

       $this.button('reset');
       },5000);  
	   });
	});