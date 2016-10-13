//include('app.js');

$(document).ready(function(){

	// CARREGAR LISTA DE PESSOAS
	CarregarPessoas();
	

	// MOSTRA O MODAL AO CLICK NO BOTÃO
	$('#btnPesquisaPessoas').on('click', function(){
		$('#mdPesquisaPessoas').modal('show');	
	});

	// SELECIONA A LINHA CLICADA NA TABLELA
	$('#tablePessoas').on('click', 'tbody tr', function(){
	    	console.log(this);
	        $('td input[type="radio"]', this).prop('checked', true);
	    }
	);

	// AO CLICAR DUAS VEZ NA LINHA DA TABELA CARREGA A PESSOA SELECIONADA
	$('#tablePessoas').on('dblclick', 'tbody tr', function(){
	    	console.log($('td input[type="radio"]', this).attr('id'));
	        var selected = $('td input[type="radio"]', this).attr('id');

	        $('#mdPesquisaPessoas').modal('hide');	

	        $('#matricula').val(selected);

	        CarregarPessoa();
	    }
	);

	// SCRIPT DE PESQUISA DO CAMPO 'PESQUISA' DA LISTA DE PESSOAS
	$('#ipPesquisa').on('keyup', function(key) {

		var getValue  = $(this).val().toUpperCase();
		var tbPessoas = $('#tablePessoas tbody tr');
		var rowCount  = $('#tablePessoas tbody tr').length;

		console.log(getValue);

		if (getValue != ''){

			for (var i = 0; i <= rowCount -1; i++) {

				var idCellValue = tbPessoas[i].cells[1].innerText;
				var nameCellValue = tbPessoas[i].cells[2].innerText;
				var activeRow = tbPessoas[i];

				console.log(idCellValue.indexOf(getValue));

				if ( idCellValue.indexOf(getValue) == -1 && nameCellValue.indexOf(getValue) == -1 ) {

					$(activeRow).hide();

				} else {

					$(activeRow).show();
				}
				
			}

		} else if ( getValue == '' && key.keyCode == 8 ){
			// CarregarPessoas();
			$(tbPessoas).show();
		}

	});


});

function CarregarPessoas(){

		var tb_dados;

		$('#mdPesquisaPessoas .modal-body .table').html('Carregando...');

		tb_dados = '<thead>'+
						'<tr>'+
							'<th><input type="radio" id="selectAll" name="pessoas"></th>'+
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
									'<td><input type="radio" id="' + data.records[i].CD_MATRICULA +'" name="pessoas"></td>'+
									'<td>' + data.records[i].CD_MATRICULA + '</td>'+
									'<td>' + data.records[i].NM_COLABORADOR + '</td>'+
									'<td>' + data.records[i].NM_COORDENADOR + '</td>'+
								'</tr>';

	
			};

				tb_dados += '</tbody>';
			console.log(tb_dados);

				$('#mdPesquisaPessoas .modal-header .modal-title').html('Pesquisa de Pessoas');
				$('#mdPesquisaPessoas .modal-body .table').html(tb_dados);
				

		})
		.on('fail',function(e){
			console.log(e);
		});
		
};