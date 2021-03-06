<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- CSRF token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Inicio CSS general -->
    <link rel="stylesheet" href="{{ asset('css/bootstrap.min.css') }}">
    <!-- CSS particular -->
    @yield('css')
    <!-- Fin CSS general -->
    <!-- Título -->
    <title>@yield('titulo')</title>
</head>
<body>
    @yield('contenido')
    <!-- Inicio JavaScript -->
    <script src="{{ asset('js/jquery-3.4.1.min.js') }}"></script>
    <script src="{{ asset('js/popper.min.js') }}"></script>
    <script src="{{ asset('js/bootstrap.min.js') }}"></script>
    <!-- JavaScript particular -->
    @yield('js')
    <!-- Fin JavaScript -->
</body>
</html>