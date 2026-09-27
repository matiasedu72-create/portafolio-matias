# Portafolio Matías — GitHub Pages

Esta copia conserva exactamente los archivos actuales de la web: HTML, CSS, JavaScript e imágenes. No requiere compilación ni instalación.

## Publicación en portafolio-matias
1. Descomprime este ZIP.
2. Sube su contenido a la raíz de la rama main del repositorio portafolio-matias. index.html debe quedar directamente en la raíz, no dentro de otra carpeta. No subas solamente el ZIP.
3. En Settings > Pages, selecciona Deploy from a branch, main y / (root), y guarda.
4. Abre la dirección que GitHub muestre cuando termine la publicación. Para un repositorio de proyecto normalmente tendrá el formato https://TU-USUARIO.github.io/portafolio-matias/.

Las rutas de imágenes, estilos y JavaScript son relativas, compatibles con ese subdirectorio. El favicon está incluido dentro del HTML. .nojekyll permite servir estos archivos como sitio estático.

## Formulario
Se conserva el endpoint AJAX de FormSubmit con su identificador, campos obligatorios, protección honeypot y mensajes de respuesta. No requiere un servidor propio ni secretos de GitHub. Después de publicar, envía una consulta real desde la URL definitiva para verificar recepción; si FormSubmit pide confirmar la nueva dirección del sitio, sigue el correo de activación. No pruebes el envío abriendo index.html como file://.

## Recursos externos y contenido actual
Las tipografías usan Google Fonts y el envío depende de FormSubmit, igual que en la versión original; necesitan conexión a Internet. Los perfiles sociales y el enlace del proyecto M&C mantienen sus destinos actuales.
Alsacia conserva el espacio pendiente de imágenes presente en la web actual. El PDF entregado no se ha incorporado para respetar la instrucción de no cambiar contenido. Los Reels reservados permanecen dentro de una plantilla inactiva.

## Comprobaciones realizadas
- Archivos web copiados sin modificaciones y verificados byte a byte dentro del ZIP.
- Rutas locales resueltas bajo /portafolio-matias/ y recursos existentes.
- Anclas internas existentes y configuración de FormSubmit conservada.
- Sintaxis del JavaScript comprobada.
La publicación real en tu cuenta y una prueba de correo desde su URL definitiva quedan pendientes.

Documentación oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
