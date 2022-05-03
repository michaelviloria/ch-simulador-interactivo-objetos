alert(`
Este es un simulador en el cual podrás seleccionar varios productos
de la canasta básica con su respectivo precio en Colombia (COP)
y su cantidad, al final se te mostrará la cantidad de productos
y su valor total de todo lo que hayas seleccionado.
`);

const productos = [
	{
		id: "01",
		nombre: "Arroz",
		precio: 1200,
		cantidad: 0,
		seleccionado: false,
	},
	{
		id: "02",
		nombre: "Papa",
		precio: 1100,
		cantidad: 0,
		seleccionado: false,
	},
	{
		id: "03",
		nombre: "Aceite",
		precio: 3000,
		cantidad: 0,
		seleccionado: false,
	},
];

// Validación de la interacción del usuario con la interfaz mostrada.
function verificarrInteraccionUsuario(accion) {
	if (accion != null) {
		return true;
	} else {
		return false;
	}
}

// Mostrar el precio total de los productos seleccionados.
function mostrarResultados() {
	let resultado = [];
	total = 0;
	productos.forEach((producto) => {
		if (producto.cantidad > 0 && producto.seleccionado === true) {
			resultado.push(`${producto.nombre}: \n Precio: $${producto.precio} | Cantidad: ${producto.cantidad}\n El total es: $${(producto.cantidad * producto.precio)}`);
			total += producto.cantidad * producto.precio;
		}
	});
	resultado.push(`\nEl total de todos los productos es: $${total}`);
	alert(resultado.join(`\n`));
}

// Mensaje de repetir proceso, si es que el usuario desea volver a seleccionar otro producto o modificar uno ya seleccionado.
function mensajeRepetirProceso() {
	let mensaje = prompt(`
	¿Deseas repetir el proceso para seleccionar otros productos?
	1 Si.
	2 No.
	`).toLowerCase();

	if (mensaje == "1" || mensaje == "uno") {
		mensajeSeleccionProducto();
	} else if (mensaje == "2" || mensaje == "dos") {
		mostrarResultados();
	}
}

// Mensaje, proceso de validación y asignación de la cantidad del producto seleccionado anteriormente.
function mensajeCantidadProducto(producto, fallo = false, editar = false) {
	// debugger;
	let mensajeCantidad = "";

	if (fallo === false && editar === false) {
		mensajeCantidad = prompt("Ahora escribe la cantidad que quieras del producto.");
	} else if (fallo === false && editar === true) {
		mensajeCantidad = prompt("Ahora escribe la cantidad para editar este producto.");
	} else if (fallo === true) {
		mensajeCantidad = prompt("Ha ocurrido algo inesperado, porfavor escribe en valor NÚMERICO nuevamente la cantidad del producto.");
	}

	if (verificarrInteraccionUsuario(mensajeCantidad)) {
		mensajeCantidad = parseInt(mensajeCantidad);
		if (isNaN(mensajeCantidad)) {
			mensajeCantidadProducto(producto, true);
		} else {
			productos.forEach(elemento => {
				if (elemento.nombre === producto) {
					elemento.cantidad = mensajeCantidad;
					elemento.seleccionado = true;
				}
			});
			mensajeRepetirProceso();
		}
	} else {
		mensajeCantidadProducto(producto, true);
	}

	productos.forEach(elemento => {
		if (elemento.seleccionado === true && elemento.cantidad === 0) {
			elemento.seleccionado = false;
		}
	});
}

// Verificar seleccion del producto por parte del usuario.
function confirmarSeleccionProducto(seleccion) {
	if (verificarrInteraccionUsuario(seleccion)) {
		seleccion = seleccion.toLowerCase();
		if (seleccion == "") {
			mensajeSeleccionProducto(true);
		} else if (seleccion == "1" || seleccion == "uno") {
			if (productos[0].seleccionado === true) {
				mensajeCantidadProducto("Arroz", false, true);
			} else {
				mensajeCantidadProducto("Arroz");
			}
		} else if (seleccion == "2" || seleccion == "dos") {
			if (productos[1].seleccionado === true) {
				mensajeCantidadProducto("Papa", false, true);
			} else {
				mensajeCantidadProducto("Papa");
			}
		} else if (seleccion == "3" || seleccion == "tres") {
			if (productos[2].seleccionado === true) {
				mensajeCantidadProducto("Aceite", false, true);
			} else {
				mensajeCantidadProducto("Aceite");
			}
		} else {
			mensajeSeleccionProducto(true);
		}
	} else {
		mensajeSeleccionProducto(true);
	}
}

// Inicio del proceso
function mensajeSeleccionProducto(fallo = false) {
	let msjArroz = ``;
	let msjPapa = ``;
	let msjAceite = ``;
	productos.forEach((producto) => {
		if (producto.nombre === "Arroz") {
			msjArroz = `${producto.id} ${producto.nombre} $${producto.precio} la libra.`;
			if (producto.seleccionado === true) {
				msjArroz += " Este producto ha sido seleccionado.";
			}
		} else if (producto.nombre === "Papa") {
			msjPapa = `${producto.id} ${producto.nombre} $${producto.precio} la libra.`;
			if (producto.seleccionado === true) {
				msjPapa += " Este producto ha sido seleccionado.";
			}
		} else if (producto.nombre === "Aceite") {
			msjAceite = `${producto.id} ${producto.nombre} $${producto.precio} el litro.`;
			if (producto.seleccionado === true) {
				msjAceite += " Este producto ha sido seleccionado.";
			}
		}
	});
	let mensaje = "";
	if (fallo === true) {
		mensaje = prompt(`
		Ha sucedido algún problema o no seleccionaste ningún producto, porfavor vuelve a seleccionar uno.
		${msjArroz}
		${msjPapa}
		${msjAceite}
		`);
	} else {
		mensaje = prompt(`
		Por favor escribe un número según tu selección.
		${msjArroz}
		${msjPapa}
		${msjAceite}
		`);
	}
	confirmarSeleccionProducto(mensaje);
}

mensajeSeleccionProducto();
