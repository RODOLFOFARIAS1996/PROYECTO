
// Variables globales
let menuAbierto = false;

// Función para alternar el menú móvil
$(document).ready(function () {
    let menuAbierto = false;

    $('.boton-menu-movil').on('click', function () {
        if (!menuAbierto) {
            $('.menu-principal')
            .addClass('menu-movil-abierto')
            .stop()
            .slideDown(300);
            menuAbierto = true;
        } else {
            $('.menu-principal')
            .removeClass('menu-movil-activo')
            .stop()
            .slideUp(300);
            menuAbierto = false;
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('formularioContacto');

    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        let valido = true;

        // Limpiar errores anteriores
        document.querySelectorAll('.error').forEach(span => span.textContent = '');

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const asunto = document.getElementById('asunto').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        if (nombre === '') {
            document.getElementById('error-nombre').textContent = 'El nombre es obligatorio.';
            valido = false;
        }

        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            document.getElementById('error-email').textContent = 'El correo es obligatorio.';
            valido = false;
        } else if (!regexCorreo.test(email)) {
            document.getElementById('error-email').textContent = 'El formato del correo no es válido.';
            valido = false;
        }

        if (asunto === '') {
            document.getElementById('error-asunto').textContent = 'El asunto es obligatorio.';
            valido = false;
        }

        if (mensaje.length < 10) {
            document.getElementById('error-mensaje').textContent = 'El mensaje debe tener al menos 10 caracteres.';
            valido = false;
        }

        if (valido) {
            alert('Formulario enviado correctamente.');
            formulario.reset();
        }
    });
});






// Función para mostrar departamento
function mostrarDepartamento(departamento) {
    // Ocultar todos los contenidos de departamento
    const contenidos = document.querySelectorAll('.contenido-departamento');
    contenidos.forEach(contenido => {
        contenido.classList.remove('activo');
    });
    
    // Remover clase activa de todos los departamentos
    const departamentos = document.querySelectorAll('.departamento');
    departamentos.forEach(dep => {
        dep.classList.remove('activo');
    });
    
    // Mostrar el contenido seleccionado
    const contenidoSeleccionado = document.getElementById(departamento);
    if (contenidoSeleccionado) {
        contenidoSeleccionado.classList.add('activo');
    }
    
    // Agregar clase activa al departamento clickeado
    event.currentTarget.classList.add('activo');
    
    // Actualizar imagen del departamento
    const imagenDepartamento = document.querySelector('.imagen-departamento img');
    const imagenes = {
        'ortopedia': 'img/Orthopaedic.jpg',
        'cardiologia': 'img/Cardiology.jpg',
        'neurologia': 'img/Neurology.jpg',
        'urologia': 'img/Urology.jpg'
    };
    
    if (imagenes[departamento]) {
        imagenDepartamento.src = imagenes[departamento];
        imagenDepartamento.alt = `Departamento de ${departamento}`;
    }
}







// Función para destacar sección activa en navegación
function destacarSeccionActiva() {
    const secciones = document.querySelectorAll('section[id]');
    const enlacesNav = document.querySelectorAll('.menu-principal a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let seccionActual = '';
        
        secciones.forEach(seccion => {
            const rect = seccion.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                seccionActual = seccion.getAttribute('id');
            }
        });
        
        enlacesNav.forEach(enlace => {
            enlace.classList.remove('activo');
            if (enlace.getAttribute('href') === `#${seccionActual}`) {
                enlace.classList.add('activo');
            }
        });
    });
}



// Función para carrusel de testimonios (opcional)
function carruselTestimonios() {
    const testimonios = document.querySelectorAll('.testimonio');
    let testimonioActual = 0;
    
    function mostrarTestimonio(indice) {
        testimonios.forEach((testimonio, i) => {
            testimonio.style.display = i === indice ? 'block' : 'none';
        });
    }
    
    function siguienteTestimonio() {
        testimonioActual = (testimonioActual + 1) % testimonios.length;
        mostrarTestimonio(testimonioActual);
    }
    
    // Auto-rotar testimonios cada 5 segundos
    if (testimonios.length > 0) {
        setInterval(siguienteTestimonio, 5000);
    }
}



// Función para mostrar/ocultar botón de scroll to top
function botonScrollTop() {
    const boton = document.createElement('button');
    boton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    boton.className = 'boton-scroll-top';

    document.body.appendChild(boton);

    window.addEventListener('scroll', () => {
         boton.style.display = 'flex';
            boton.style.justifyContent = 'center';
            boton.style.alignItems = 'center';
        
    });

    boton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}




// Exportar funciones para uso global

window.mostrarDepartamento = mostrarDepartamento;



function toggleFAQ(element) {
  const respuesta = element.nextElementSibling;
  const estaAbierta = respuesta.classList.contains("abierta");

  // Cierra todo
  document.querySelectorAll(".respuesta").forEach(r => {
    r.classList.remove("abierta");
    r.style.maxHeight = null;
  });
  document.querySelectorAll(".pregunta").forEach(p => p.classList.remove("abierta"));

  // Si estaba cerrada, la abre
  if (!estaAbierta) {
    respuesta.classList.add("abierta");
    respuesta.style.maxHeight = respuesta.scrollHeight + "px";
    element.classList.add("abierta");
  }
}
document.addEventListener('DOMContentLoaded', () => {
    botonScrollTop(); // Aquí se ejecuta tu función
});
function abrirModal() {
  const modal = document.getElementById("modal-video");
  const iframe = document.getElementById("iframe-video");
  iframe.src = "https://www.youtube.com/embed/ftlTVugRd84?si=0Vu8dnOwCLUBxLll"; // Reemplaza con tu video
  modal.style.display = "block";
}

function cerrarModal() {
  const modal = document.getElementById("modal-video");
  const iframe = document.getElementById("iframe-video");
  iframe.src = ""; // Detiene el video
  modal.style.display = "none";
}
// Cerrar al hacer clic fuera del contenido del modal
window.onclick = function(event) {
  const modal = document.getElementById("modal-video");
  const iframe = document.getElementById("iframe-video");
  if (event.target === modal) {
    iframe.src = ""; // Detener el video
    modal.style.display = "none";
  }
}
document.addEventListener('keydown', function(event) {
  if (event.key === "Escape") {
    cerrarModal();
  }
});






