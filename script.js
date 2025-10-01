// Seleccionar elementos
const botonesAgregar = document.querySelectorAll(".btn-agregar");
const listaCarrito = document.getElementById("lista-carrito");
const totalSpan = document.getElementById("total");

// Cargar carrito desde localStorage o iniciar vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = carrito.reduce((acc, item) => acc + item.precio, 0);


// Actualizar la interfaz
function actualizarCarrito() {
    listaCarrito.innerHTML = "";

    carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;
    
    // Botón eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "❌";
    btnEliminar.style.marginLeft = "10px";
    btnEliminar.onclick = () => {
        total -= item.precio;
        carrito.splice(index, 1);
        guardarCarrito();
        actualizarCarrito();
    };

    li.appendChild(btnEliminar);
    listaCarrito.appendChild(li);
    });

    totalSpan.textContent = total.toFixed(2);
}

// Guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Evento para cada botón de producto
botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", () => {
    const producto = boton.parentElement;
    const nombre = producto.getAttribute("data-nombre");
    const precio = parseFloat(producto.getAttribute("data-precio"));

    carrito.push({ nombre, precio });
    total += precio;

    guardarCarrito();
    actualizarCarrito();
    });
});

// Al cargar la página, actualizar la vista
actualizarCarrito();
