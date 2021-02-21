# Z1 FrontEnd

Bootstrap con [Create React App](https://github.com/facebook/create-react-app).

Flujo de la aplicación:

- Pulsando "take picture" se abre la cámara.
- La cámara hará fotos automáticamente en segundo plano y las enviará al backend.
- En la interfaz mostraremos en rojo si el backend devuelve que no es válida.
- En la interfaz mostraremos en verde si el backend devuelve que es válida y automáticamente pasaremos al usuario a la pantalla principal.
- En cualquier momento que el usuario vaya a la pantalla principal, ya sea porque pulse cancelar o porque se toma la foto correctamente, debemos mostrar la última foto que se haya tomado y el estado que haya devuelto el backend sobre ella.

🚀

#### Install and run the project

```
yarn install
yarn start
```

Project will run on http://localhost:3000

📝

#### Notas

- Botón de cancelar: al entrar en /take-picture el usuario tiene 5 segundos para cancelar la operación, si lo hace, se abortará el request, no se modificará el espacio, y volverá a la ruta principal /.

- Redirección: según las indicaciones, cuando la respuesta del servidor es positiva, se redigire al usuario al inicio. Cuando no es negativa, el usuario permanece en /take-picture. Para dar al usuario una salida de vuelta al inicio, el botón de cancelar cambia su literal por "Go back" una vez que se ha tomado la foto.

- He usado una variable de estado llamada NewRequest como bandera para controlar cuando mostrar el feedback del servidor. Cuando ya hay un estado previo, que siempre se puede consultar en la ruta de inicio, pero se va a tomar una nueva foto, no queremos mostrar los resultados anteriores.

- Wouter: he usado Wouter como alternativa más ligera a React Router https://github.com/molefrog/wouter

- Styled Components: todos los estilos están agrupados en styles/components y se importan en los archivos donde son usados

🏗

#### Construído con

- React
- React DOM
- Typescript
- Styled components
- Wouter
