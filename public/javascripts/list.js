$(document).ready(function(){
	//添加用户信息
	// $('#addUser').live("click" , function(e){
	$('body').on("click" , '#addUser' , function(e){
		e.preventDefault();
		let name = $('#name').val(),
			age = $('#age').val();
		console.log(name,age);
		$.ajax({
			type:'GET',
			url:'/users/addUser?name='+name+'&age='+age,
			dataType:'JSON',
			success:function(data){
				if(data['code'] === 200){
					location.href = '/users/queryAll';
				}
			}
		});
	})
	//删除
	// $('.del').live("click" ,function(){
	$('body').on("click" , '.del' , function(e){
		let id = $(this).attr('data-id'),
			that = this;
		if(confirm('确定删除该项?')){
			$.ajax({
				type:'get',
				url:'./deleteUser?id='+id,
				success:function(){
					alert('success');
					$(that).parent().parent().fadeOut();
				}
			});
		}else{
			return false;
		}
	});
	//编辑信息
	// $('.edit').live("click" ,function(){
	$('body').on("click" , '.edit' , function(e){	
		let id = $(this).attr('data-id'),
			age = $(this).attr('data-age'),
			name = $(this).attr('data-name');
			$('#id').val(id);
			$('#age').val(age);
			$('#name').val(name);
		$('#myModal').modal();
	});
	// $('#save').live("click" ,function(){
	$('body').on("click" , '#save' , function(e){	
		let age = $('#age').val(),
			id = $('#id').val(),
			name = $('#name').val();
		$.ajax({
			type:'post',
			url:'./updateUser',
			dataType:'JSON',
			data:{
				id:id,
				name:name,
				age:age
			},
			success:function(data){
				if(data['affectedRows']){
					$('#myModal').modal('hide');
					location.reload();
				}
			}
		});
	});
	//过滤信息
	// $('#search').live("click" ,function(e){
	$('body').on("click" , '#search' , function(e){		
		e.preventDefault();
		let id = $('#searchId').val();
		$.ajax({
			type:'GET',
			url:'/users/query?id='+id,
			success:function(data){
				console.log(data);
				$('#infoContainer').empty().append(`
					<tr>
						<td>${data[0]['id']}</td>
						<td>${data[0]['name']}</td>
						<td>${data[0]['age']}</td>
						<td>
							<a class='btn btn-danger del' data-id="${data[0]['id']}">删除</a>
							<a class='btn btn-primary edit' data-id="${data[0]['id']}" data-name="${data[0]['name']}" data-age="${data[0]['age']}">编辑</a>
						</td>
					</tr>
				`);
				
			}
		})
	})

});