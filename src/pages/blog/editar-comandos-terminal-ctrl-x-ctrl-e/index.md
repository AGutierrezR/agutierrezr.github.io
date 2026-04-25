---
layout: "../../../layouts/BlogLayout.astro"
title: Editar comandos en la terminal usando tu editor (Ctrl+X Ctrl+E)
date: 2026-03-17
description: Aprende a editar comandos largos en la terminal usando Ctrl+X Ctrl+E. Abre tu editor (vim, VSCode) y modifica comandos fácilmente en Bash o Zsh. 
draft: false
tags: [cli, terminal]
---

Si usas mucho la terminal, seguro te ha pasado esto. Estás escribiendo un comando largo.

Algo tipo:

```bash
curl -X POST \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{ ... }' \
  https://api.example.com
```

Y de repente te das cuenta de que hay un error... al principio. Aquí normalmente tienes varias opciones:

* Usar las flechas ← hasta llegar al sitio
* `Ctrl + A` y moverte otra vez
* Cancelar y empezar de nuevo

Ninguna es especialmente cómoda. Hay una forma mucho mejor.

## Editar comandos en Bash y Zsh con Ctrl+X Ctrl+E

Cuando estás escribiendo un comando en la terminal, puedes hacer:

```text
Ctrl + X  luego  Ctrl + E
```

Y pasa algo bastante útil.

Se abre tu editor (como Vim, Nano o Visual Studio Code) con el comando que llevas escrito.

Puedes editarlo tranquilamente, guardar y cerrar.

Y cuando cierras... el comando se ejecuta automáticamente.

## Ejemplo real editando un comando largo

Imagina que estás escribiendo algo más complejo:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "User-Agent: MyApp/1.0" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
  }' \
  https://api.example.com
```

Y quieres cambiar algo en el JSON.

En lugar de pelearte con la terminal:

```text
Ctrl + X  Ctrl + E
```

Se abre tu editor, realizas las modificaciones, guardas y cierras.

Y el comando se ejecuta automáticamente.

## Cuándo usar Ctrl+X Ctrl+E

Este atajo es especialmente útil en varios casos.

- **Comandos multilínea**: Puedes escribir scripts de shell complejos al momento, incluyendo bucles, condicionales y funciones correctamente estructurados.
- **Edición del historial de comandos**: Cuando quieres modificar un comando complejo de tu historial que resulta difícil de editar directamente en la línea.
- **Construcción a partir de plantillas**: Empieza con una estructura básica de comando y luego amplíala en tu editor hasta convertirla en algo más completo.

## Configurar el editor en la terminal

Este atajo usa el editor definido en la variable de entorno:

```bash
$EDITOR
```

Si no lo tienes configurado, puedes añadirlo en tu `.zshrc` o `.bashrc`:

```bash
export EDITOR=vim
```

O si usas Visual Studio Code:

```bash
export EDITOR="code --wait"
```

💡 El flag `--wait` es importante.

Hace que la terminal espere a que cierres el editor antes de ejecutar el comando.

## Cómo probar Ctrl+X Ctrl+E

Puedes probarlo rápidamente:

1. Escribe algo simple:

```bash
ls -la
```

2. Pulsa:

```text
Ctrl + X  Ctrl + E
```

3. Se abrirá tu editor
4. Guarda y cierra

El comando se ejecutará automáticamente.

## Conclusión

Editar comandos largos en la terminal puede ser incómodo.

Pero con `Ctrl+X Ctrl+E` puedes usar tu editor habitual para hacerlo de forma mucho más cómoda.

No es algo que uses constantemente, pero cuando trabajas con comandos complejos, marca una gran diferencia.

## FAQ

### ¿Qué hace Ctrl+X Ctrl+E en la terminal?

Abre el comando actual en tu editor configurado (`$EDITOR`) para que puedas editarlo antes de ejecutarlo.

### ¿Funciona en Bash y Zsh?

Sí, este atajo funciona en shells como Bash y Zsh.

### ¿Cómo cambiar el editor que se abre?

Configurando la variable de entorno:

```bash
export EDITOR=vim
```

o usando otro editor como VSCode con `code --wait`.

