---
layout: "../../../layouts/BlogLayout.astro"
title: Cómo controlar procesos en la terminal con Ctrl+Z, fg, bg, jobs y kill
date: 2025-03-08
description: Aprende a controlar procesos en la terminal usando Ctrl+Z, jobs, fg, bg y kill. Pausa, mueve al background y gestiona comandos sin abrir otra terminal.
draft: false
tags: [tips, terminal]
---

Si trabajas mucho en la terminal, seguro te ha pasado algo como esto.

Estás ejecutando un comando:

```shell
$ npm run dev
```

Y de repente te das cuenta de que necesitas volver al shell para ejecutar otra cosa.

Una opción es abrir otra terminal. Pero muchas veces **no es necesario**.

Los shells como Bash o Zsh tienen un sistema de **control de procesos en foreground y background** muy potente.

Con él puedes:

* Pausar procesos
* Mandarlos al background
* Volver a traerlos al foreground
* Terminarlos fácilmente

Los comandos principales son:

* `Ctrl+Z`
* `jobs`
* `fg`
* `bg`
* `kill`

Vamos a ver cómo funcionan.

---

# Pausar un proceso en la terminal con Ctrl+Z

Supongamos que estás ejecutando algo en la terminal:

```shell
$ python server.py
```

El proceso está ocupando la terminal.

Si presionas **Ctrl + Z**, verás algo como:

```shell
stopped python server.py
```

El proceso **no se ha terminado**, simplemente está **suspendido**.

Ahora tienes de nuevo el control de la terminal.

### Nota

En algunos sistemas puede aparecer la palabra `suspended` en vez de `stopped`.

Ambos significan lo mismo:

El proceso sigue existiendo, pero está **pausado y no ejecutándose**.

---

# Ver procesos suspendidos con el comando jobs

Para ver qué procesos tienes suspendidos puedes usar:

```shell
$ jobs
```

Y verás algo como:

```shell
[1]+ stopped python server.py
```

Ese `[1]` es el **job id**.

La terminal usa ese número para referirse al proceso.

---

# Traer un proceso al foreground con fg

Si quieres volver al proceso que suspendiste puedes usar:

```shell
$ fg
```

Esto lo traerá al **foreground** otra vez.

Si tienes varios jobs puedes indicar cuál:

```shell
$ fg %1
```

Ahora el proceso vuelve a ocupar la terminal.

---

# Enviar un proceso al background con bg

Después de hacer `Ctrl+Z`, también puedes mandar el proceso al background:

```shell
$ bg
```

Ejemplo de salida:

```shell
[1]+ continued python server.py &
```

Ahora el proceso **sigue ejecutándose**, pero ya no ocupa la terminal.

Puedes seguir usando el shell normalmente.

---

# Ejemplo práctico usando Ctrl+Z y bg

Imagina que estás ejecutando:

```shell
$ npm run dev
```

Y necesitas ejecutar otro comando, por ejemplo:

```shell
git status
```

En lugar de abrir otra terminal puedes hacer esto:

1. Suspender el proceso: `Ctrl + Z`
2. Enviarlo al background: `bg`
3. Ejecutar el otro comando

El servidor seguirá ejecutándose mientras trabajas en la terminal.

---

# Terminar un proceso con kill

Si ya no necesitas el proceso puedes terminarlo.

Primero mira los jobs:

```shell
$ jobs
[1]+ Running npm run dev &
```

Luego puedes matarlo con:

```shell
$ kill %1
```

La sintaxis `%1` se refiere al **job id**.

También puedes matar el último proceso con:

```shell
$ kill %%
```

---

# Resumen rápido

Los comandos más útiles para controlar procesos en la terminal son:

| Acción               | Comando      |
| -------------------- | ------------ |
| Suspender proceso    | `Ctrl + Z`   |
| Ver procesos         | `jobs`       |
| Enviar al foreground | `fg %<id>`   |
| Enviar al background | `bg %<id>`   |
| Terminar proceso     | `kill %<id>` |

---

# Cuándo es útil controlar procesos en la terminal

Esto es especialmente útil cuando:

* Estás ejecutando **servidores locales**
* Necesitas volver al shell rápidamente
* Quieres evitar abrir muchas terminales
* Trabajas mucho en entornos Linux o macOS

No es algo complicado, pero una vez que te acostumbras es difícil dejar de usarlo.

---

# FAQ

## ¿Qué hace Ctrl+Z en la terminal?

`Ctrl+Z` suspende el proceso actual. El proceso no termina, simplemente queda pausado.

## ¿Qué diferencia hay entre fg y bg?

* `fg` trae el proceso al **foreground**.
* `bg` hace que el proceso continúe ejecutándose en **background**.

## ¿Cómo ver los procesos en segundo plano?

Puedes usar el comando:

```shell
$ jobs
```

para ver todos los procesos gestionados por el shell actual.

---

## Fuentes

* [Shell CTRL-C CTRL-Z, fg, bg, jobs](https://www.youtube.com/watch?v=4xN6pdUXj14)
* [Understanding `bg` and `&` to background jobs in Bash - You Suck at Programming #050](https://www.youtube.com/watch?v=IhT5QSTCPps)
* [Master the Linux Command Line: Background & Foreground Jobs to Swap Tasks with the fg and bg Command](https://www.youtube.com/watch?v=Ak7cFJ1-Ewo)


