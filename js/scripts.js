// cargaRenglones();

function inicializa(){
    let ultRenEdit = "";
    limpiaRenglones();
    cargaRenglones();
}

function agregaRenglon()
{
    let resultado = validaCaptura();
    if (resultado == false){
        return;
    }
    let codigo = document.getElementById("codigo").value;    
    let descripcion = document.getElementById("descripcion").value.trim();    
    let existencia = document.getElementById("existencia").value;    
    let precio = document.getElementById("precio").value.replace("$","").replace(",", "").replace(",","");
    
    let indice = localStorage.getItem("contador");
    indice = parseInt(indice);
    indice += 1;
        
    let renglon = document.getElementById("renglones");

    let detalle = document.createElement("tr");
    detalle.className = "detalle";
    detalle.id = indice;
    
    let elemento1 = document.createElement("td"); 
    elemento1.id = "codigoId" + indice;
    elemento1.className = "renCodigo";
    elemento1.className = "cent";
    let texto1 = document.createTextNode(codigo);
    elemento1.appendChild(texto1);     

    let elemento2 = document.createElement("td");
    elemento2.id = "descripId" + indice; 
    elemento2.className = "renDescrip";
    elemento2.className = "izq";
    let texto2 = document.createTextNode(descripcion); 
    elemento2.appendChild(texto2);     

    let elemento3 = document.createElement("td");
    elemento3.id = "existId" + indice;
    elemento3.className = "renInventario";
    elemento3.className = "dere";
    let texto3 = document.createTextNode(entero(existencia));
    elemento3.appendChild(texto3);     

    let elemento4 = document.createElement("td");
    elemento4.id = "precioId" + indice; 
    elemento4.className = "renPrecio";
    elemento4.className = "dere";;
    let texto4 = document.createTextNode(moneda(precio)); 
    elemento4.appendChild(texto4);     

    let elemento5 = document.createElement("td");
    let boton1 = document.createElement('button');  
    boton1.className = "edita";
    boton1.type = 'submit';
    boton1.addEventListener("click", editaRenglon, false)
    boton1.innerText = 'Editar';   
    elemento5.appendChild(boton1);

    let elemento6 = document.createElement("td"); 
    let boton2 = document.createElement('button'); 
    boton2.className = "elimina"; 
    boton2.type = 'submit';
    boton2.setAttribute("onclick", "eliminaRenglon(this)");
    boton2.innerText = 'Borrar';
    elemento6.appendChild(boton2);    

    detalle.appendChild(elemento1);
    detalle.appendChild(elemento2);
    detalle.appendChild(elemento3);
    detalle.appendChild(elemento4);
    detalle.appendChild(elemento5);
    detalle.appendChild(elemento6);

    renglon.appendChild(detalle);

    let objReg = {codigo: codigo, descrip: descripcion, exist: existencia, precio: precio};
    localStorage.setItem("Registro" + indice, JSON.stringify(objReg));
    
    localStorage.setItem("contador", indice);
    
    limpiaRenglones();
}

function editaRenglon()
{
    cambiaBotones("ed");

    let idEd = $(this).parents("tr").attr('id');
    ultRenEdit =  idEd;

    let codigoEd = $(this).parents("tr").find("td")[0].innerHTML;
    let descripEd = $(this).parents("tr").find("td")[1].innerHTML;
    let existEd = $(this).parents("tr").find("td")[2].innerHTML;
    let precioEd = $(this).parents("tr").find("td")[3].innerHTML;

    document.getElementById("codigo").value = codigoEd;
    document.getElementById("descripcion").value = descripEd;
    document.getElementById("existencia").value = existEd.replace(",","");
    document.getElementById("precio").value = precioEd.replace("$","").replace(",","").replace(",","");
}

function actualizaRenglon()
{   
    let resultado = validaCaptura();
    if (resultado === false){
        return;
    } 
    
    let renEdit = ultRenEdit;
    if(renEdit == null || renEdit == "") {alert("No hay datos por actualizar"); return; }

    let idCodigo = "codigoId" + renEdit;
    let idDescrip = "descripId" + renEdit;
    let idExist = "existId" + renEdit;
    let idPrecio = "precioId" + renEdit;

    let codigo = document.getElementById("codigo").value;    
    let descripcion = document.getElementById("descripcion").value.trim();    
    let existencia = document.getElementById("existencia").value;    
    let precio = document.getElementById("precio").value.replace("$","").replace(",", "").replace(",","");

    document.getElementById(idCodigo).innerHTML = codigo
    document.getElementById(idDescrip).innerHTML = descripcion;  
    let editaExist = existencia
    editaExist = entero(editaExist);
    document.getElementById(idExist).innerHTML = editaExist;
    let editaPrecio = precio;
    editaPrecio = moneda(editaPrecio);
    document.getElementById(idPrecio).innerHTML = editaPrecio;

    let objReg = {codigo: codigo, descrip: descripcion, exist: existencia, precio: precio};
    localStorage.setItem('Registro' + renEdit, JSON.stringify(objReg))

    cambiaBotones("ac");
    limpiaRenglones()    
}

function eliminaRenglon(ren)
{    
    let clave = $(ren).parents("tr").find("td")[0].innerHTML;
    let texto = $(ren).parents("tr").find("td")[1].innerHTML;
    if (confirm(`¿Deseas borrar el siguiente artículo?                                                                                                                            ${clave} - ${texto}`))
    {
        let llave = $(ren).parents("tr").attr("id");
        $(ren).closest("tr").remove();
        localStorage.removeItem("Registro" + llave);
    }    
    limpiaRenglones()
}

function limpiaRenglones(){
    document.getElementById("codigo").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("existencia").value = "";    
    document.getElementById("precio").value = "";
    ultRenEdit = "";
    cambiaBotones("ac");
    document.getElementById("codigo").focus();    
}

function validaCaptura(){
    let codigo = document.getElementById("codigo").value;    
    let descripcion = document.getElementById("descripcion").value;    
    let existencia = document.getElementById("existencia").value;    
    let precio = document.getElementById("precio").value.replace("$","").replace(",", "").replace(",","");
    
    let mensaje = "Es obligatorio capturar:  ";
    codigo === "" ? mensaje += "Código.  " : "";
    descripcion === "" ? mensaje += "Descripción.  " : "";
    existencia === "" ?  mensaje += "Existencia.  " : "";
    precio === "" ? mensaje += "Precio." : "";
    
    let res1 = true;    
    if(mensaje != "Es obligatorio capturar:  "){
        res1 = false;
        alert(mensaje);
        return false;
    }

    let mensaje2 = "Excepciones en la captura:  ";
        codigo.length < 8 || codigo.length > 8 ? mensaje2 += "Código debe ser de 8 caracteres.  " : "";
        descripcion.length > 50 ? mensaje2 += "Descripcion no debe ser mayor a 50 caracteres.  " : "";
        isNaN(existencia) || existencia === "0" || existencia.length > 6 ? mensaje2 += "Existencia debe ser númerica, mayor a cero y no debe ser mayor a 6 caracteres.  " : "";
        isNaN(precio) || precio > 999999.99 || precio === "0" ? mensaje2 += "Precio debe ser númerico con o sin decimales, mayor a cero y no debe ser mayor a $999,999.99." : ""; 

    let res2 = true;
    if(mensaje2 != "Excepciones en la captura:  "){
        res2 = false;
        alert(mensaje2);
        return false;
    } 

    if (res1 && res2 === true ){
         return true; 
    }
    else{ 
        return false;
    }
}

function moneda(x){
    return new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD', minimumFractionDigits: 2}).format(x);
}

function entero(x){
    return new Intl.NumberFormat('en-US', {style: 'decimal', minimumFractionDigits: 0}).format(x);
}

function mayusc(captura){
    captura.value = captura.value.toUpperCase();
}

function cambiaBotones(accion){
    let boton;
    if(accion === "ed"){
        boton = document.getElementById("agrega")
        boton.className = "actualizar";        
        boton.innerHTML = "Actualizar";
        boton.setAttribute("onclick", "actualizaRenglon()");
        return;
    } 
    if(accion === "ac"){
        let boton = document.getElementById("agrega")
        boton.className = "agregar";        
        boton.innerHTML = "Agregar";
        boton.setAttribute("onclick", "agregaRenglon()");
        return;
    }      
}

function cargaRenglones()
{    
    if(localStorage.length === 1){ localStorage.setItem("contador", 0); }
    
    for (let i = 0; i < localStorage.length; i++)
    {
        if (localStorage.key(i).substring(8, 0) === "Registro")
        {
            let registro = JSON.parse(localStorage.getItem(localStorage.key(i)));

            let codigo2 = registro.codigo;
            let descripcion2 = registro.descrip;    
            let existencia2 = registro.exist;
            let precio2 = registro.precio; 
            
            let indice = localStorage.key(i).replace("Registro","");
            indice = parseInt(indice);
            
            let renglon = document.getElementById("renglones");

            let detalle = document.createElement("tr");
            detalle.className = "detalle";
            detalle.id = indice;
            
            let elemento1 = document.createElement("td"); 
            elemento1.id = "codigoId" + indice;
            elemento1.className = "renCodigo";
            elemento1.className = "cent";
            let texto1 = document.createTextNode(codigo2);
            elemento1.appendChild(texto1);     

            let elemento2 = document.createElement("td");
            elemento2.id = "descripId" + indice; 
            elemento2.className = "renDescrip";
            elemento2.className = "izq";
            let texto2 = document.createTextNode(descripcion2); 
            elemento2.appendChild(texto2);     

            let elemento3 = document.createElement("td");
            elemento3.id = "existId" + indice;
            elemento3.className = "renInventario";
            elemento3.className = "dere";
            let texto3 = document.createTextNode(entero(existencia2));
            elemento3.appendChild(texto3);     

            let elemento4 = document.createElement("td");
            elemento4.id = "precioId" + indice; 
            elemento4.className = "renPrecio";
            elemento4.className = "dere";;
            let texto4 = document.createTextNode(moneda(precio2)); 
            elemento4.appendChild(texto4);     

            let elemento5 = document.createElement("td");
            let boton1 = document.createElement('button');  
            boton1.className = "edita";
            boton1.type = 'submit';
            boton1.addEventListener("click", editaRenglon, false)
            boton1.innerText = 'Editar';   
            elemento5.appendChild(boton1);

            let elemento6 = document.createElement("td"); 
            let boton2 = document.createElement('button'); 
            boton2.className = "elimina"; 
            boton2.type = 'submit';
            boton2.setAttribute("onclick", "eliminaRenglon(this)");
            boton2.innerText = 'Borrar';
            elemento6.appendChild(boton2);    

            detalle.appendChild(elemento1);
            detalle.appendChild(elemento2);
            detalle.appendChild(elemento3);
            detalle.appendChild(elemento4);
            detalle.appendChild(elemento5);
            detalle.appendChild(elemento6);

            renglon.appendChild(detalle);
        }            
    }
}
