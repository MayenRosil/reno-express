# PruebaTecnicaForza
Repositorio destinado a la resolución y entrega de la Prueba Técnica para el proyecto de "Desarrollador Frontend".

## Descripción
Este repositorio consta de la Prueba Técnica para el puesto de Desarrollador en la empresa Forza.
Consta de los elmentos requeridos durante la realización de la misma, los cuales se irán listando en orden de funcionalidad según el examinado.


### Herramientas utilizadas:
- Balsamiq
- Visual Studio Code
- Google Chrome

### Instalación:
- Descargar el .ZIP con la raíz del proyecto
- Ejecutar el comando ```npm i -f``` en la consola dentro de la carpeta del mismo, esto para instalar los módulos dependientes y forzar su instalación
- Ejecutar el comando ```yarn start``` una vez instaladas las dependencias

### Proceso de Desarrollo:

- Creación de MockUp's.
Primeramente se realizaron bocetos de las pantallas en base a los requerimientos, estos fueron realizados con la aplicación de [Balsamiq](https://balsamiq.com/wireframes/), esto fue para tener una idea de cómo comenzar con el maquetado (Estos están subidos como PDF en la carpeta Docs).

- Petición de Datos.
Para la simluación de datos de un servicio API REST se utilizó un archivo .JSON con datos para manejar el dinamismo en las pantallas.

- Adaptabilidad.
El proyecto se probó tanto en entorno Web en PC como en teléfonos dentro de las herramientas de desarrollo de Google Chrome para ser lo más responsiva posible.


### Requerimientos realizados y faltantes:
A continuación listaré los requerimientos que se realizaron y los que no se pudieron completar.

Realizados:
- Barra de búsqueda. Se muestra una tabla principal con los datos de Código, Nombre y Categoría del producto, la barra de búsqueda permite buscar filtrando cualquiera de estos tres parámetros. El texto que ingrese se valida si coincide con algún valor en cualquiera de esas tres columnas.
- Ordenar Ascendente y Descendente. La tabla permite ordenar de forma ascendente o descendente a partir de cualquiera de las tres columnas principales (Código, Nombre y Categoría).
- Detalle de Prouducto. Cada producto en el listado tiene una columna con un botón para visualizar el detalle del mismo, el cual contiene los demás datos solicitados para cada producto, incluyendo una imagen del mismo, traida desdel el archivo .JSON de datos.
- La aplicación cuenta con una barra de navegación superior, la cual lleva a las vistas de Inventario o Registro de Transacción.
- Vista Registro de Transacción. Esta cuenta con un formulario que valida si los datos solicitados han sido ingresados, dando feedback si alguno falta o si todos han sido llenados.
- Se optó por utilizar la librería web React.js, al ser esta una de las opciones como librerías reactiva de javascript.
- Se simula una petición a un servidor, recuperando datos de un archivo .JSON almacenado localmente en el proyecto.
- Se tiene una carpeta llamada Docs donde se presenta evidencia de los MockUps realizados antes de comenzar a maquetar, esto para tener una idea de cómo debería verse la aplicación.

No realizados:
- Validación mediante un regex en los inputs del formulario de Registro de Transacción, esto no logré hacerlo ya que no pude validar el dato ingresado en esa expresión regular para saber si el valor era seguro y adecuado.
