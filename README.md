# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## OBSERVACIONES EN LA CREACIÓN DE APLICACION FACTURA

### Importante 
-cuando se crea una factura no estoy mostrando, mensaje de trabajo terminado exitosamente debido a que queria que se realizara el flujo completo primeramente.\
-aun no se visualiza ppr completo la factura despues de creada.\
-la carpeta FacturacionBack es la parte que se realizo para codificar base de datos.\
-la base de datos se encuentra alojada en un servidor, es decir que puedes ingresar a esta url y consumir directamente para ver el manejo https://facturacionback20210813172116.azurewebsites.net/swagger/index.html

### puntos a mejorar 

-el login tiene creado en base de datos una tabla para validar y logearse pero no esta aun implementada, ingrea si tiene los campos email y password tiene datos.\
-algunos de los textos tipo link estan sin funcionamiento debido al tiempo no se crearon ventanas, para que cuyos enlaces redireccionaran.\
-las tablas que muestran detalle al crear cliente, producto y factura, tienen colores que no armonizan con el dashboard.\
-algunos botones para agregar y/o eliminar se encuentrar sin color por el tiempo, y sin funcionamiento.\
-algunos textfield no tiene placeholder.\
-textos sin alineacion, tamaño ni espesor.\
-icono de notificaciones hay que cambiarlo por uno que indique salir, puesto que tiene la funcionalidad para salir de la app pero el icono no informa eso.\
-algunos de los campos de formulario despues de crear y/o editar no se estan seteando despues de realizar dicha accion(deben borrar sus valores y quedar vacios para nueva accion"

### Para tener en cuenta 

la aplicacion tiene un flujo completo : .\
*ingresar por medio de un login.\
*ingresar a lo objetivo, es decir a crear una factura.\
*se puede crear, editar, eliminar y listar datos de clientes, productos.\
*se puede agregar productos a la factura y eliminarlos en tiempo real.\
*se realiza ruteos .\
*comprende un menu sin problemas de direcionamiento

### conclucion para entregar 

la aplicacion cumple con dichos requerimientos pedidos en la prueba, pero se queda debiendo mensajes de alertas para llevar un flujo mas visual y entendible.\
no realize la aplicacion con contexto por el tiempo, para crear dichas ventanas y la parte del backend 
no entro a hablar mucho del backend(base de datos) debido a que lo que se busca es mostrar el proceso y flujo en la parte visual.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
