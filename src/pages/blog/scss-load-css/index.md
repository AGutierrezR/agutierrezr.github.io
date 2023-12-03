---
layout: "../../../layouts/BlogLayout.astro"
title: Controla el scope de tus import CSS con meta.load-css en Sass
date: 2023-12-03
description: 
draft: false
tags: [scss]
---

En contraste con la regla `@import` de Sass, el nuevo `@use` solo puede ser usado al inicio de un archivo, antes de cualquier declaración. Usarlo dentro de un selector de CSS no esta permitido. Por ejemplo:

```scss
.dark-theme {
  // Funciona
  @import "./dark-theme.scss";

  // NO funciona
  @use "./dark-theme.scss";
}
```

Pero sigue existiendo una forma de controlar el scope de las importaciones. La función `meta.load-css` nos permite importar un archivo SCSS dentro de un selector y hacer que el scope se quede ne ese selector:

```scss
@use "sass:meta";

.dark-theme {
  @include meta.load-css("./dark-theme.scss");
}
```

A diferencia de `@import`, `meta.load-css` no afecta el parent selector `&` en la importacion del archivo. Dado el siguiente archivo:

```scss
// dark-theme.scss
button {
  & + & {
    margin-inline-start: 1rem;
  }
}
```

Importarlo con `@import` puede resultar en un selector CSS que tecnicamente es valido pero puede ser uno que no queremos:

```scss
// Usando @import da como resultado:
.dark-theme button + .dark-theme button {
  margin-inline-start: 1rem;
}
```

**Nota**: Si usamos un `@mixin` le pasaria lo mismo al selector CSS que si usaremos un `@import`.

Usando `meta.load-css` no rompe el parent selector:

```scss
// Ussando meta.load-css da como resultado:
.dark-theme button + button {
  margin-inline-start: 1rem;
}
```
