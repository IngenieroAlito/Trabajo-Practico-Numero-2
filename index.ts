import readlineSync from '/workspaces/Trabajo-Practico-Numero-2/node_modules/prompt-sync';
type Tarea = {
  Titulo: string;
  Descripcion: string;
  Estado: string;
  Creacion: Date;
  UltimaEdicion: Date;
  Vencimiento: Date;
  Dificultad: number;
};
let tareas: Tarea[] = [];
function MostrarTarea(t: Tarea): void {
  console.log(
    "Titulo: " + t.Titulo +
    " | Descripcion: " + t.Descripcion +
    " | Estado: " + t.Estado +
    " | Creacion: " + t.Creacion +
    " | Ultima Edicion: " + t.UltimaEdicion +
    " | Vencimiento: " + t.Vencimiento +
    " | Dificultad: " + t.Dificultad
  );
}
function VerMisTareas(): void {
  if (tareas.length === 0) {
    console.log("No hay tareas cargadas");
    return;
  }
  for (let i = 0; i < tareas.length; i++) {
    console.log("Tarea numero " + (i + 1));
    MostrarTarea(tareas[i]);
  }
}
function BuscarUnaTarea(): void {
  const Buscar = readlineSync.question("Introduce el titulo exacto de la tarea para buscarla: ");
  let encontrado = false;
  let i = 0;
  while (i < tareas.length && encontrado === false) {
    if (tareas[i].Titulo === Buscar) {
      encontrado = true;
      console.log("Tarea encontrada: ");
      MostrarTarea(tareas[i]);
    }
    i = i + 1;
  }
  if (encontrado === false) {
    console.log("Tarea no encontrada");
  }
}
function AgregarUnaTarea(): void {
  console.log("Agregar una tarea");
  const Titulo: string = readlineSync.question("Titulo (100): ") || "";
  const Descripcion: string = readlineSync.question("Descripcion (500): ") || "";
  const Estado: string | number = readlineSync.question("Pendiente, en curso o terminada: ") || "";
  const Creacion: Date = new Date(readlineSync.question("Creada el: ") || "");
  const UltimaEdicion: Date = new Date(readlineSync.question("La ultima edicion fue: ") || "");
  const Vencimiento: Date = new Date(readlineSync.question("Vence el: ") || "");
  const Dificultad: string | number = readlineSync.question("Dificultad: ") || "";
  const nuevaTarea: Tarea = {
    Titulo: Titulo,
    Descripcion: Descripcion,
    Estado: String(Estado),
    Creacion: Creacion,
    UltimaEdicion: UltimaEdicion,
    Vencimiento: Vencimiento,
    Dificultad: Number(Dificultad),
  };
  tareas.push(nuevaTarea);
  console.log("Tarea guardada");
}
function EditarTarea(): void {
  const Opcion1 = readlineSync.question("¿Vas a editar la tarea? (s/S, para negar escribe cualquier otra cosa): ");
  if (Opcion1 === "s" || Opcion1 === "S") {
    const numero = readlineSync.question("Ingresa el número de la tarea que vas a editar: ");
    const indice = Number(numero) - 1;
    if (indice >= 0 && indice < tareas.length) {
      console.log("Editando tarea...: " + tareas[indice].Titulo);
      const nuevoTitulo = readlineSync.question("Nuevo título: ");
      if (nuevoTitulo !== null && nuevoTitulo !== "") {
        tareas[indice].Titulo = nuevoTitulo;
      }
      const nuevaDescripcion = readlineSync.question("Nueva descripción: ");
      if (nuevaDescripcion !== null && nuevaDescripcion !== "") {
        tareas[indice].Descripcion = nuevaDescripcion;
      }
      const nuevoEstado = readlineSync.question("Nuevo estado: ");
      if (nuevoEstado !== null && nuevoEstado !== "") {
        tareas[indice].Estado = nuevoEstado;
      }
      const nuevoVencimiento = readlineSync.question("Nueva fecha de vencimiento: ");
      if (nuevoVencimiento !== null && nuevoVencimiento !== "") {
        tareas[indice].Vencimiento = new Date(nuevoVencimiento);
      }
      const nuevaDificultad = readlineSync.question("Nueva dificultad: ");
      if (nuevaDificultad !== null && nuevaDificultad !== "") {
        tareas[indice].Dificultad = Number(nuevaDificultad);
      }
      tareas[indice].UltimaEdicion = new Date();
      console.log("Tarea editada");
    } else {
      console.log("Número de tarea inválido");
    }
  }
}
let opcion: number;
do {
  console.log("1- Ver tareas");
  console.log("2- Buscar tareas");
  console.log("3- Agregar tareas");
  console.log("4- Editar una tarea");
  console.log("5- Salir");
  opcion = Number(readlineSync.question("Ingresa una opción: "));
  switch (opcion) {
    case 1:
      VerMisTareas();
      break;
    case 2:
      BuscarUnaTarea();
      break;
    case 3:
      AgregarUnaTarea();
      break;
    case 4:
      EditarTarea();
      break;
    case 5:
      console.log("Chau");
      break;
    default:
      console.log("Opción invalida");
  }
} while (opcion !== 5);
