$(document).ready(function(){

var dbPath = __dirname + "/database/database.accdb";
	adodb = require('node-adodb');
	con = adodb.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=' + dbPath + ';');
	adodb.debug = true;

	$('#cb_materiais').on('change', function(){

		var ths = $(this);

		if (ths.val() != 'SELECIONE'){
			$('#item_info').show('fast');
		}else{
			$('#item_info').hide();
		}
	});

	// reload div

	$('#ei-limpar').on('click', function() {

		$('#cb_materiais').html('');
		$('#entregar-itens-form input[type="text"]').val('');
		$('#item_info').hide();

	});

	// Pesquisa de Pessoas

	$('#btnPesquisaPessoas').on('click', function(){

		var tb_dados;

		tb_dados = '<thead>'+
						'<tr>'+
							'<th><input type="checkbox"></th>'+
							'<th>MATRICULA</th>'+
							'<th>NOME</th>'+
							'<th>COORDENADOR</th>'+				
						'</tr>'+
			  		 '</thead>'+
			  		 '<tbody>';
		con
		.query('select * from tb_cadastro_pessoas')
		.on('done', function(data){
			console.log(data);	  		 
			for (var i = 0; i < data.records.length; i++) {

				tb_dados += 	'<tr>'+
									'<td><input type="checkbox" id="' + data.records[i].CD_MATRICULA +'"></td>'+
									'<td>' + data.records[i].CD_MATRICULA + '</td>'+
									'<td>' + data.records[i].NM_COLABORADOR + '</td>'+
									'<td>' + data.records[i].NM_COORDENADOR + '</td>'+
								'</tr>';
			};

				tb_dados += '</tbody>';
			console.log(tb_dados);

				$('#mdPesquisaPessoas .modal-header .modal-title').html('Pesquisa de Pessoas');
				$('#mdPesquisaPessoas .modal-body .table').html(tb_dados);
				$('#mdPesquisaPessoas').modal('show');

		})
		.on('fail',function(e){
			console.log(e);
		});

		//console.log(tb_dados);

		// tb_dados += '<tbody>'+
		// 				'<tr>'+
		// 					'<td><input type="checkbox"></td>'+
		// 					'<td>3062236</td>'+
		// 					'<td>DENIS CASTELO DE LIMA</td>'+
		// 					'<td>O SABICHÃO</td>'+
		// 				'</tr>'+
		// 			'</tbody>';

		//console.log(tb_dados);
		
		
	});	
		

	$('#matricula').on('keypress',function(e){
		console.log(__dirname);
		console.log(dbPath);
		console.log(con);

		if (e.which == 13){
			console.log('select * from tb_cadastro_pessoas where id = "' + parseInt($('#matricula').val()) + '"');

			var matricula = parseInt($('#matricula').val());

			$('#mdAguarde').modal({
				backdrop: 'static',
				keyboard: false
			});

			con
			.query('select * from tb_cadastro_pessoas where CD_MATRICULA = ' + matricula)
			.on('done', function(data){
				console.log(data);
				if (data.records.length > 0){

					

					$('#nome').val(data.records[0].NM_COLABORADOR);
					$('#turno').val(data.records[0].CD_TURNO);
					$('#funcao').val(data.records[0].NM_FUNCAO);
					$('#coordenador').val(data.records[0].NM_COORDENADOR);
					
					con.query('select CD_MATERIAL,NM_MATERIAL from vw_materiais_pessoas where CD_MATRICULA = ' + matricula)
					.on('done', function(data){
						console.log(data);

						$('#cb_materiais').html('')

						var cb_materiais = '<option value="0">SELECIONE</option>';

						for (var i = 0; i < data.records.length; i++){
							cb_materiais += '<option value="'+ data.records[i].CD_MATERIAL +'">'+ data.records[i].NM_MATERIAL +'</option>';
						}
						
						$('#mdAguarde').modal('hide');

						$('#cb_materiais').append(cb_materiais);



					})
					.on('fail',function(e){
						console.log(e);
					});

				} else{
					alert('Erro matricula invalida!');
					$('#mdAguarde').modal('hide');
					$('#matricula').val('');
				}

			

			})
			.on('fail', function(e){
				console.log(e);
				alert(e.message);
			});

			
		};
	});

	

});
