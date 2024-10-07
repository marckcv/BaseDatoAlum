class Alumno {
    constructor(nombre, apellidos, edad) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.materias = [];
        this.calificaciones = {};
    }

    inscribirMateria(materia) {
        if (!this.materias.includes(materia)) {
            this.materias.push(materia);
        }
    }

    obtenerPromedio() {
        const calificaciones = Object.values(this.calificaciones);
        const suma = calificaciones.reduce((acc, cal) => acc + cal, 0);
        return calificaciones.length ? suma / calificaciones.length : 0;
    }
     buscarPorNombre(nombre) {
        return alumnos.filter(alumno => alumno.nombre.toLowerCase() === nombre.toLowerCase());
    }
    
    // Buscar por apellido
     buscarPorApellido(apellido) {
        return alumnos.filter(alumno => alumno.apellidos.toLowerCase() === apellido.toLowerCase());
    }
    
    // Obtener promedio del grupo
    obtenerPromedioGrupo() {
        const sumaPromedios = alumnos.reduce((acc, alumno) => acc + alumno.obtenerPromedio(), 0);
        return alumnos.length ? sumaPromedios / alumnos.length : 0;
    }
    
    // Ordenar alumnos por calificación
    ordenarAlumnosPorCalificacion(ascendente = true) {
        return alumnos.sort((a, b) => {
            const promedioA = a.obtenerPromedio();
            const promedioB = b.obtenerPromedio();
            return ascendente ? promedioA - promedioB : promedioB - promedioA;
        });
    }
}

const alumnos = [];

document.getElementById('form-alumno').addEventListener("submit", function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const edad = document.getElementById('edad').value;
    const nuevoAlumno = new Alumno(nombre, apellidos, edad);
    alumnos.push(nuevoAlumno);
    actualizarListaAlumnos();
});

function actualizarListaAlumnos() {
    const lista = document.getElementById('alumnos');
    lista.innerHTML = '';
    alumnos.forEach(alumno => {
        const li = document.createElement('li');
        li.textContent = `${alumno.nombre} ${alumno.apellidos} - Edad: ${alumno.edad}`;
        lista.appendChild(li);
    });
}
function actualizarSelectorAlumnos() {
    const select = document.getElementById('alumno-select');
    select.innerHTML = '';
    alumnos.forEach((alumno, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${alumno.nombre} ${alumno.apellidos}`;
        select.appendChild(option);
    });
}

// Evento para inscribir a un alumno en una materia
document.getElementById('inscribir-materia-form').addEventListener("submit", function(event) {
    event.preventDefault();
    const alumnoIndex = document.getElementById('alumno-select').value;
    const materia = document.getElementById('materia').value;
    if (alumnoIndex !== '' && materia !== '') {
        alumnos[alumnoIndex].inscribirMateria(materia);
        alert(`Alumno inscrito en ${materia}`);
    }
});

// Llama a esta función después de agregar un nuevo alumno
document.getElementById('alumno-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const edad = document.getElementById('edad').value;
    const nuevoAlumno = new Alumno(nombre, apellidos, edad);
    alumnos.push(nuevoAlumno);
    actualizarVista();
    actualizarSelectorAlumnos();
});

// Inicializa el selector de alumnos al cargar la página
actualizarSelectorAlumnos();