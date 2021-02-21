# Z1 FrontEnd

Bootstrap con [Create React App](https://github.com/facebook/create-react-app).

Flujo de la aplicación:

- Pulsando "take picture" se abre la cámara.
- La cámara hará fotos automáticamente en segundo plano y las enviará al backend.
- En la interfaz mostraremos en rojo si el backend devuelve que no es válida.
- En la interfaz mostraremos en verde si el backend devuelve que es válida y automáticamente pasaremos al usuario a la pantalla principal.
- En cualquier momento que el usuario vaya a la pantalla principal, ya sea porque pulse cancelar o porque se toma la foto correctamente, debemos mostrar la última foto que se haya tomado y el estado que haya devuelto el backend sobre ella.

🚀

#### Instalar e iniciar

```
yarn install
yarn start
```

Project will run on http://localhost:3000

📝

#### Notas

- Flujo de la app: En Camera.ts la primera función que se lanza es la que gestiona el acceso a la webcam (manageCamera). Cuando el video está listo (lo comprobamos con el evento "canplay"), invoca la función "takeImage", que usa un canvas para captura una imagen y la guarda en el estado. Esta función llama por último a "submitImage" que hace el request al endpoint y gestiona la respuesta.

- Feedback al usuario: como todo ocurre de manera automática en cuanto entramos a /take-picture, he introducido algunas cosas para que el usuario entienda lo que está pasando. Nada más acceder el usuario tiene 5 segundos para cancelar la operación. Si lo hace, se abortará el request, no se modificará el espacio, y volverá a la ruta principal /. Si continua, la imagen se toma y aparece un loader hasta que tenemos una respuesta del servidor. Si es positiva, aparece otra cuenta atrás para que el usuario pueda ver los mensajes de que la imagen es válida antes de la redirección.

- Redirección: según las indicaciones, cuando la respuesta del servidor es positiva, se redigire al usuario al inicio. Cuando no es negativa no, el usuario permanece en /take-picture. Para dar al usuario una salida de vuelta al inicio, el botón de cancelar cambia su literal por "Go back" una vez que se ha tomado la foto y ya la opción de cancelar no es posible.

- LocalStorage: En /take-picture el estado se limpia cada vezen el renderizado inicial, para preparar el componente para hacer una nueva imagen, enviarla al servidor y dar feedback al usuario. Aunque, tenemos la necesidad de conservarlos, porque el usuario tiene que tener siempre disponibles los ultimos resultados en el inicio. Por eso, los resultados se conservan en el localStorage.

- Apagado de cámara: Cuando se termina o se cancela la petición al servidor, la cámara se apaga.

- Error de conexión: Cuando no hay internet, el mensaje de error ("Failed to fetch") se captura en "outcomes" y se presenta como se presentaria la respuesta del servidor

- Wouter: he usado Wouter como alternativa más ligera a React Router https://github.com/molefrog/wouter

- Custom properties: en los global-styles están las variables ui principales del sistema

- Styled Components: todos los estilos están agrupados en styles/components y se importan en los archivos donde son usados

- Clip-path: en /take-picture he usado un div como overlay por encima de la etiqueta de video. Este div tiene un filtro para darle a la imagen el aspecto indicado en la vista. Además tiene una propiedad de clip-path que usa custom properties para crear el frame de la imagen. Podría haber usado un svg para el clip-path y así tener las esquinas redondeadas como en la vista, pero me gustaba la idea de poder tener una solución con unidades relativas y custom properties.

- Recorte de la imagen: En takeImage se usa drawImage para gestionar el recorte del video al espacio del canvas, con las dimensiones que necesita la imagen. Hay algún desvió en los números (quizás relacionado con la diferencia de aspect ratio entre el video en fullwidth y el canvas en 16:9?) que hace que el recorte no sea perfecto, pero se aproxima lo suficiente.

- Hooks: en la carpeta /hooks hay un custom hook useCount que se usa para gestionar las cuentas atrás en Camera.ts y un useWindowSize para darle la dimensión full-width al video.

- Typescript: Llevo estudiando Typescript en mi tiempo libre desde que tuve la primera entrevista con Bea, pero obviamente tengo mucho trabajo por hacer aún. Estaba aprendiendo aún las bases y no había hecho pruebas sobre React. He tipado cuando he podido lo mejor que he sabido. Me he apoyado en los docs de Typescript, en React TypeScript Cheatsheet https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components y en los docs de Styled Components https://styled-components.com/docs/api#typescript.

🏗

#### Construido con

- React
- React DOM
- Typescript
- Styled components
- Wouter

💌

#### Gracias por vuestro tiempo!
