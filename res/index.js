function a() {
	$('[name="exec"]').keypress(function(e) {
        if(e.which == 13) {
        new Exec($('[name="exec"]').val());
        $('[name="exec"]').val("");
        }
      });
}
class Exec {
	constructor(cmd) {
		var firArray = cmd.split(" ");
		var firWord = firArray[0];
		firArray.shift();
		var space = firArray.join(" ");
        var acepttURL = $DIRECTORY + '/' + firWord + ".php";


		if(firWord !== 'cd' && firWord !== 'init' && firWord !== 'select' ) {
	    	var apres = $DIRECTORY + '/' + $FILE + '> ' + cmd;
		$('.exec').append(
		'<br />' + apres + '<br />');
		}
		else {
			$('.exec').append('<br />');
		}
		if(firWord == 'cd' || firWord == 'init' || firWord == 'select' || firWord == 'dir') {
              acepttURL = '/' + firWord + '.php';
		}




	    $.ajax({
	    	url: acepttURL,
	    	data: {
	    		actualDir: $DIRECTORY,
	    		actualFile: $FILE,
	    		args: space
	    	},
	    	type: "POST"
	    }).done(function(respons) {
	    	$('.exec').append(respons);

	    	return {
	    		key: 200,
	    		result: respons
	    	};
	    }).fail(function(a,b,c) {
	    	$('.exec').append(`
<hr>Ocurrió un error al cargar el comando. #` + a.status + ` <hr />
	    		`);

	    })



	

	}
}

