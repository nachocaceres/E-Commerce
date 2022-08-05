let libros = [
  { titulo: "Estructura e interpretación de programas informáticos", autor: "Harold Abelson, Gerald Jay Sussman, Julie Sussman", imagen: "./assets/libro0.jpg", precio: 1100, id:1 },
  { titulo: "Clean Code", autor: "Robert C. Martin", imagen: "./assets/libro1.jpg", precio: 950, id:2 },
  { titulo: "No me hagas pensar", autor: "Steve Krug", imagen: "./assets/libro2.jpg", precio: 1900, id:3 },
  { titulo: "Introducción a los algoritmos", autor: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford", imagen: "./assets/libro3.jpg", precio: 1450, id:4 },
  { titulo: "Código completo: Un manual práctico de construcción de software", autor: "Steve McConnell", imagen: "./assets/libro4.jpg", precio: 3000, id:5},
  { titulo: "Patrones de diseño de Head First: Una guía para el cerebro", autor: "Eric Freeman, Bert Bates, Kathy Sierra, Elisabeth Robson", imagen: "./assets/libro5.jpg", precio: 920, id:6 },
  { titulo: "Soft Skills: el manual de vida del desarrollador de software", autor: "John Sonmez", imagen: "./assets/libro6.jpg", precio: 1350, id:7},
  { titulo: "El arte de la programación informática", autor: "Donald E. Knuth", imagen: "./assets/libro7.jpg", precio: 1200, id:8 }
]

// ITEMS / LIBROS A LA VENTA EN CARDS

const mostrarLibros = (libros) =>{
  
  const contenedorLibros = document.getElementById("contenedor-libros");
  
  libros.forEach((libro) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="col">
    <div class="card h-100 shadow-sm"> <img
    src="${libro.imagen}"
    class="card-img-top" alt="...">
    <div class="card-body">
    <div class="clearfix mb-3"> <span class="float-start badge rounded-pill bg-primary"><i class="fa-solid fa-book"></i>
    Rog</span> <span class="float-end price-hp">$ ${libro.precio}</span> </div>
    <h5 class="card-title">${libro.titulo}</h5>
    <p class="card-text">Autor: ${libro.autor}</p>
    <button id="agregar${libro.id}" class="text-center my-4 boton-agregar"> <a href="#" class="btn btn-warning">Agregar</a> </button>
    
    </div>
    </div>
    </div>
    `
    contenedorLibros.appendChild(div);
    
    const boton = document.getElementById(`agregar${libro.id}`);
    boton.addEventListener("click", ()=>{
      agregarCarrito(libro.id)
    })
  })
}

mostrarLibros(libros)

//CARRITO DE COMPRAS

const carrito = []

const agregarCarrito = (libroId)=>{
  const item = libros.find((libro) => libro.id == libroId);
  carrito.push(item);
  actCarrito()
  console.log(carrito);
}

const contenedorCarrito = document.getElementById("carrito-contenedor")

const actCarrito = () => { 
  contenedorCarrito.innerHTML = ""
  carrito.forEach((libro) => {
    const div = document.createElement("div");
    div.className = ("container")
    div.innerHTML = `
    
    <p>Titulo del libro: ${libro.titulo}</p>
    <p>Precio: ${libro.precio}</p>
    <p>Cantidad: <span id="cantidad">${libro.cantidad}</span></p>
    <button onclick = "eliminarCarrito(${libro.id})" class="btnDlt">X</button>
    <hr>
    `
    contenedorCarrito.appendChild(div)
  })
}

const eliminarCarrito = (libroId) => {
  const item = carrito.find((libro) => libro.id == libroId)
  const index = carrito.indexOf(item)
  carrito.splice(index, 1)
  actCarrito()
}
  
//MODAL
if(document.getElementById("btnModal")){
  var modal = document.getElementById("myModal");
  var btn = document.getElementById("btnModal");
  var span = document.getElementsByClassName("close")[0];
  var body = document.getElementsByTagName("body")[0];
  
  btn.onclick = function() {
    modal.style.display = "block";
    
    body.style.position = "static";
    body.style.height = "100%";
    body.style.overflow = "hidden";
  }

  span.onclick = function() {
    modal.style.display = "none";

    body.style.position = "inherit";
    body.style.height = "auto";
    body.style.overflow = "visible";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";

      body.style.position = "inherit";
      body.style.height = "auto";
      body.style.overflow = "visible";
    }
  }
}