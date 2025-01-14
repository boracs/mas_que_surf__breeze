<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mi Aplicación React</title>
    @viteReactRefresh   {{-- Debo poner esta linea para evitar el error  app.jsx:11  Uncaught Error: @vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201 at app.jsx:11:13--}}
    @vite('resources/js/app.jsx')
 
</head>
<body>
    <div id="app"></div>
</body>
</html>