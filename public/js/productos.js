const API = "/api/productos";

//Gestión del DOM
const formProducto = document.getElementById("formProducto");
const formBuscar = document.getElementById("formBuscar");
const cuerpoTabla = document.getElementById("cuerpoTabla");

//Cajas del formulario de registro
const campoID = document.getElementById("id");
const marca = document.getElementById("marca");
const descripcion = document.getElementById("descripcion");
const precio = document.getElementById("precio");
const stock = document.getElementById("stock");

const buscarId = document.getElementById("buscarId");
const mostrarTodos = document.getElementById("mostrarTodos");

//Renderiza los datos obtenidos API REST en el cuerpo de la tabla
function dibujarTabla(productos) {
  cuerpoTabla.innerHTML = "";

  // console.log(productos);
  //Si no hay productos registrados en la BD ...
  if (productos.length === 0) {
    cuerpoTabla.innerHTML = `<tr><td colspan='6' class='text-center'>No hay productos</td></tr>`;
    return;
  }

  //Si encontramos productos (al men
  productos.forEach((p) => {
    cuerpoTabla.innerHTML += /*html*/ `
      <tr>
        <td>${p.id}</td>
        <td>${p.marca}</td>
        <td>${p.descripcion}</td>
        <td>${p.precio}</td>
        <td>${p.stock}</td>
        <td>
          <button type="button" onclick="editarProducto(${p.id})" class='btn-sm btn-solid theme-primary'>Editar</button>
          <button type="button" onclick="eliminarProducto(${p.id})" class='btn-sm btn-outline theme-danger'>Eliminar</button>
        </td>
      </tr>`;
  });
}

// BUSCADOR ...
// Conectamos al BACKEND para buscar el ID
async function editarProducto(id) {
  try {
    const respuesta = await fetch(`${API}/${id}`);
    const resultado = await respuesta.json();

    if (!resultado.ok) {
      console.error("El ID no corresponde a ningún producto");
      return;
    }

    //En caso exista
    const producto = resultado.data;

    //Campos formulario Atributos del objeto
    campoID.value = producto.id;
    marca.value = producto.marca;
    descripcion.value = producto.descripcion;
    precio.value = producto.precio;
    stock.value = producto.stock;
  } catch (e) {
    console.error(e);
  }
}

async function eliminarProducto(id) {
  const rpta = confirm("¿Está seguro de eliminar");
  if (!rpta) {
    return;
  }

  try {
    const respuesta = await fetch(`${API}/${id}`, { method: "DELETE" });
    const resultado = await respuesta.json();

    if (!resultado.ok) {
      console.error("No se pudo eliminar");
      return;
    }

    cargarProductos();
    alert(resultado.message);
  } catch (e) {
    console.error(e);
  }
}

// ¿Cómo accedemos a los datos? -> BACKEND
async function cargarProductos() {
  try {
    //http://localhost:3000 <> https://miempresa.com
    //agregar el valor de API
    const respuesta = await fetch(API);
    const resultado = await respuesta.json();
    dibujarTabla(resultado.data);
  } catch (e) {
    console.error(e);
  }
}

//Función para registrar un nuevo producto -> BACKEND
async function guardarProducto() {
  //Crear objeto JS -> enviar datos
  const producto = {
    marca: marca.value,
    descripcion: descripcion.value,
    precio: precio.value,
    stock: parseInt(stock.value),
  };

  try {
    //Debemos evaluar si registramos o actualizamos un producto
    //true - false
    const editando = campoID.value !== '';

    //Construiremos una URL que varia en funcion de la acción
    const url = editando ? `${API}/${campoID.value}` : API;

    //EL método puede variar
    const metodo = editando ? "PUT" : "POST";

    //Enviamos por el método POST, un JSON, convertido del objeto "producto"
    const respuesta = await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });

    const resultado = await respuesta.json();

    if (!resultado.ok) {
      console.error("No se pudo registrar el producto");
      return;
    }

    cargarProductos();
    formProducto.reset();
    marca.focus();
  } catch (e) {
    console.error(e);
  }
}

// Búsqueda es a través PK -> BACKEND
async function buscarProducto(id) {
  try {
    const respuesta = await fetch(`${API}/${id}`);
    const resultado = await respuesta.json();

    //Si no encontramos registro
    if (!respuesta.ok) {
      dibujarTabla([]);
      return;
    }

    //data es un objeto {} por lo que lo enviamos como arreglo [{}]
    dibujarTabla([resultado.data]);
  } catch (e) {
    console.error(e);
  }
}

formBuscar.addEventListener("submit", function (e) {
  e.preventDefault();
  buscarProducto(buscarId.value);
});

//Controlar el evento SUBMIT (envio) del formulario
formProducto.addEventListener("submit", function (e) {
  e.preventDefault(); //Stop

  const rpta = confirm("¿Está seguro de registrar el producto?");
  if (!rpta) {
    return;
  }

  guardarProducto(); //Esta función gestiona el proceso
});

mostrarTodos.addEventListener("click", function () {
  formBuscar.reset();
  cargarProductos();
});

cargarProductos();
