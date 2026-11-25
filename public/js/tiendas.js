const API = "/api/tiendas";

const formProducto = document.getElementById("formProducto");
const formBuscar = document.getElementById("formBuscar");
const cuerpoTabla = document.getElementById("cuerpoTabla");

const campoID = document.getElementById("id");

const ciudad = document.getElementById("ciudad");
const direccion = document.getElementById("direccion");
const telefono = document.getElementById("telefono");
const responsable = document.getElementById("responsable");
const apertura = document.getElementById("apertura");
const cierre = document.getElementById("cierre");

const buscarId = document.getElementById("buscarId");
const mostrarTodos = document.getElementById("mostrarTodos");

function dibujarTabla(tiendas) {
  cuerpoTabla.innerHTML = "";

  if (tiendas.length === 0) {
    cuerpoTabla.innerHTML = `
      <tr>
        <td colspan='8' class='text-center'>No hay tiendas</td>
      </tr>
    `;
    return;
  }

  tiendas.forEach((tienda) => {
    cuerpoTabla.innerHTML += `
      <tr>
        <td>${tienda.id}</td>
        <td>${tienda.ciudad}</td>
        <td>${tienda.direccion}</td>
        <td>${tienda.telefono}</td>
        <td>${tienda.responsable}</td>
        <td>${tienda.apertura}</td>
        <td>${tienda.cierre}</td>
        <td>
          <button
            type="button"
            onclick="editarTienda(${tienda.id})"
            class='btn-sm btn-solid theme-primary'
          >
            Editar
          </button>
          <button
            type="button"
            onclick="eliminarTienda(${tienda.id})"
            class='btn-sm btn-outline theme-danger'
          >
            Eliminar
          </button>
        </td>
      </tr>`;
  });
}

async function editarTienda(id) {
  try {
    const respuesta = await fetch(`${API}/${id}`);
    const resultado = await respuesta.json();

    if (!resultado.ok) {
      console.error("El ID no corresponde a ningún producto");
      return;
    }

    const tienda = resultado.data;

    campoID.value = tienda.id;
    ciudad.value = tienda.ciudad;
    direccion.value = tienda.direccion;
    telefono.value = tienda.telefono;
    responsable.value = tienda.responsable;
    apertura.value = tienda.apertura;
    cierre.value = tienda.cierre;
  } catch (e) {
    console.error(e);
  }
}

async function eliminarTienda(id) {
  const rpta = confirm("¿Está seguro de eliminar?");
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

    cargarTiendas();
    alert(resultado.message);
  } catch (e) {
    console.error(e);
  }
}

async function guardarTienda() {
  const tienda = {
    ciudad: ciudad.value,
    direccion: direccion.value,
    telefono: telefono.value,
    responsable: responsable.value,
    apertura: apertura.value,
    cierre: cierre.value,
  };

  try {
    const editando = campoID.value !== "";

    const url = editando ? `${API}/${campoID.value}` : API;

    const metodo = editando ? "PUT" : "POST";

    const respuesta = await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tienda),
    });

    const resultado = await respuesta.json();

    if (!resultado.ok) {
      console.error("No se pudo registrar la tienda");
      return;
    }

    cargarTiendas();
    formProducto.reset();
    ciudad.focus();
  } catch (e) {
    console.error(e);
  }
}

async function buscarTienda(id) {
  try {
    const respuesta = await fetch(`${API}/${id}`);
    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      dibujarTabla([]);
      return;
    }

    dibujarTabla([resultado.data]);
  } catch (e) {
    console.error(e);
  }
}

async function cargarTiendas() {
  try {
    const respuesta = await fetch(API);
    const resultado = await respuesta.json();
    dibujarTabla(resultado.data);
  } catch (e) {
    console.error(e);
  }
}

cargarTiendas();

formBuscar.addEventListener("submit", function (e) {
  e.preventDefault();
  buscarTienda(buscarId.value);
});

formProducto.addEventListener("submit", function (e) {
  e.preventDefault();

  const rpta = confirm("¿Está seguro de registrar la tienda?");
  if (!rpta) {
    return;
  }

  guardarTienda();
});

mostrarTodos.addEventListener("click", function () {
  formBuscar.reset();
  cargarTiendas();
});
