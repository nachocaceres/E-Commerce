// ITEMS / LIBROS A LA VENTA EN CARDS
fetch("./data/libros.json")
  .then((response) =>response.json())
  .then((data)=>{
    libros = data;
    console.log(libros)
    const mostrarLibros = (libros) => {

      const contenedorLibros = document.getElementById("contenedor-libros");
    
      libros.forEach((libro) => {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = ` 
        <div class="col">
        <div class="card h-100 shadow-sm"> <img
        src="${libro.imagen}"
        class="card-img-top" alt="Foto del libro">
        <div class="card-body">
        <div class="clearfix mb-3"> <span class="float-start badge rounded-pill bg-primary"><i class="fa-solid fa-book"></i>
        Book</span> <span class="float-end price-hp">$ ${libro.precio}</span> </div>
        <h5 class="card-title">${libro.titulo}</h5>
        <p class="card-text">Autor: ${libro.autor}</p>
        <button id="agregar${libro.id}" type="button" class="btn btn-primary btn-lg text-center my-4 boton-agregar">Agregar <i class="fa-duotone fa-cart-arrow-up"></i></button>
        </div>
        </div>
        </div>
        `
        contenedorLibros.appendChild(div);
    
        const boton = document.getElementById(`agregar${libro.id}`);
        boton.addEventListener("click", () => {
          agregarCarrito(libro.id)
          Toastify({
            text: `El libro " ${libro.titulo} " fue agregado correctamente`,
            className: "info",
            style: {
              background: "#83b06a",
            }
          }).showToast();
        })
      })
    }
    
    mostrarLibros(libros)
  })



//CARRITO DE COMPRAS

let carrito = []

const botonVaciar = document.getElementById("vaciar-carrito")

const contadorCarrito = document.getElementById("contador-carrito")

const precioTotal = document.getElementById("total")

const vaciarCarrito = document.getElementById("vaciar")

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"))
    actCarrito()
  }
})

vaciarCarrito.addEventListener("click", () => {
  carrito.length = 0;
  actCarrito();
  Toastify({
    text: `El carrito fue vaciado correctamente`,
    className: "info",
    style: {
      background: "#83b06a",
    }
  }).showToast();
})

const agregarCarrito = (libroId) => {
  const existe = carrito.some(libro => libro.id == libroId)
  if (existe) { 
    const libro = carrito.map(libro => { 
      if (libro.id == libroId) {
        libro.cantidad++
      }
    })
  } else {
    const item = libros.find((libro) => libro.id == libroId);
    carrito.push(item);
  }
  actCarrito();
}

const contenedorCarrito = document.getElementById("carrito-contenedor")

const eliminarCarrito = (libroId) => {
  const item = carrito.find((libro) => libro.id == libroId);
  const index = carrito.indexOf(item);
  carrito.splice(index, 1)
  actCarrito();
  Toastify({
    text: `El libro fue eliminado correctamente`,
    className: "info",
    style: {
      background: "#a63737",
    }
  }).showToast();
}

const actCarrito = () => {
  contenedorCarrito.innerHTML = ""
  carrito.forEach((libro) => {
    const div = document.createElement("div");
    div.className = ("container");
    div.innerHTML = `
    
    <p>Titulo del libro: ${libro.titulo}</p>
    <p>Precio: $ ${libro.precio}</p>
    <p>Cantidad: <span id="cantidad">${libro.cantidad}</span></p>
    <button onclick = "eliminarCarrito(${libro.id})" class="btnDlt"><i class="fa-solid fa-trash-can"></i></button>
    <hr>
    `

    contenedorCarrito.appendChild(div);

    localStorage.setItem("carrito", JSON.stringify(carrito));
  })  
  contadorCarrito.innerText = carrito.length
  precioTotal.innerText = `$ ${carrito.reduce((acc, libro) => acc + (libro.cantidad * libro.precio), 0)}`
}  


//COMPLETAR COMPRA

const comprar = document.getElementById("comprar");


function denegarCompra(){
    Swal.fire({
      title: 'Compra cancelada!',
      text: 'Por favor, coloque objetos dentro de su carrito.',
      icon: 'error',
      confirmButtonColor: '#0000FF'
    })
  }
  function completarCompra(){
      Swal.fire({
        title:'Compra completada!',
        text:'Le enviamos un email con los datos del envio.',
        icon:'success',
        confirmButtonColor: '#0000FF'
      })
      carrito.length = 0;
      actCarrito();
  }

  comprar.addEventListener("click", () => {
    carrito.length != 0 ? completarCompra() : denegarCompra();
  })
  