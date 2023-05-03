/* Ivà Domingo | idomingos@uoc.edu | UOC-2023 */
var result = "La suma de ";
let num1 = Number(prompt("Introdueix un nombre entre 1 i 50"));
let num2 = Number(prompt("Introduiex un segon nombre entre 1 i 50"));
if (validar(num1) && validar(num2)){
	result = result + num1.toString() + " + " + num2.toString() + " : " + (num1 + num2).toString();
	result = result + "\nEl " + num1.toString() + (primer(num1) ? " és primer" : " no és primer") + " i el " + num2.toString() + (primer(num2) ? " és primer" : " no és primer");  
	result = result + "\nEl " + num1.toString() + (parell(num1) ? " és parell" : " és senar") + " i el " + num2.toString() + (parell(num2) ? " és parell" : " és senar");
	if(num1 < num2){
		if(parell(num1)){
			series(num1, num2, "up");
		}
		else{
			series(num1 + 1, num2, "up");
		}
	}
	else if(num1 > num2){
		if(parell(num1)){
			series(num1 -1, num2, "down");
		}
		else{
			series(num1, num2, "down");
		}
	}
	else{
		result = "La suma és : " + (num1 + num2) + "\nEl " + num1 + (primer(num1) ? " és primer" : " no és primer") + "\nEl " + num2 + (parell(num2) ? " és parell" : " és senar");
		series(num1, num2, "down");
	}
	window.alert(result);
}
else{
	window.alert("Els nombres introduïts han de ser nombres enters positius entre 1 i el 50.");
}

// Funció de validació 
function validar(num){
	//Valida que la variable correspon a un nombre.
	if (Number.isNaN(num)){
		return false;
	}
	// Que el nombre estigui dins del rang.
	if(num<1 || num > 50){
		return false;
	}
	return true;
}

// Comprova si és un nombre primer.
function primer(num){
    let flag = true;
    for(let i = 2; i <= Math.round(num/2); i++){
	// Si la resta d'una operació de divisió és 0, el nombre és divisible per ell mateix per 1 i per aquest nombre (i), i en conseqüència no és primer.
    	if (num % i == 0) {
		flag = false;
            	break;
        }
    }
    return flag;
}

// Comprova si és un nombre parell.
function parell(num){
	return (num % 2 ) == 0 ? true : false;
}

// Calcula una serie de nombres
function series(n1, n2, dir){
	//let result = " ";
	result = result + "\n" + n1.toString();
	// parells de menys a a més
	if (dir == 'up'){
		while (n1 + 2 <= n2){
			n1 = n1 + 2;
			result = result + " " + n1.toString();
		}
	}
	// Senars de més a menys
	else if (dir == 'down'){
		while (n1 - 2 >= n2){
			n1 = n1 - 2;
			result = result + " " + n1.toString();
		}
	}
}
