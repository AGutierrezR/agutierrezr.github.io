---
layout: "../../../layouts/BlogLayout.astro"
title: Los query selectors son aplicados a todo el document a menos que se use :scope
date: 2023-12-01
description: 
draft: false
tags: [javascript]
---

Al llamar a la función `querySelector()` o `querySelectorAll()` en un elemento, es fundamental saber que estas consultas se aplican inicialmente en todo el documento. Sin embargo, la búsqueda de elementos se limita al ámbito del elemento desde el cual se invoca la función.

Por ejemplo, si tenemos el siguiente HTML:

```html
<div class="wrapper">
  <div class="main">
    <div class="content"></div>
  </div>
</div>
```

Ahora, si utilizamos `querySelector()` desde un elemento especifico:

```js
const main = document.querySelector(".main");
const content = main.querySelector(".wrapper .content");
// --> <div class="main"></div>
```

Ese `querySelector()` ejecutado desde el nodo `<div class="main">...</div>` va a devolver el nodo `<div class="content"></div>` a pesar que en `<div class="main"></div>` no está el nodo `<div class="wrapper">...</div>`.

Esto indica que el query va a nivel de document pero luego "verifica" si el nodo está dentro nodo que realiza la query, por lo que este query retornaria `null`

```js
const main = document.querySelector(".main");
const content = main.querySelector(".wrapper");
// --> null
```

Se puede evitar esta "query desde el document" usando la pseudo-class `:scope`. La pseudo-clase `:scope` se usa principalmente con selectores de atributos y combinadores para apuntar a elementos dentro de un contenedor determinado.

```js
const main = document.querySelector(".main");
const content = main.querySelector(":scope .wrapper .content");
// --> null
```

Este es bastante util cuando se quiere hacer un query de los hijos directos

```js
const main = document.querySelector(".main");
const content = main.querySelector(":scope > .child");
```

Al utilizar `:scope` en combinación con el selector `>`, podemos realizar consultas específicas para encontrar los hijos directos de un elemento determinado.
