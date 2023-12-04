---
layout: "../../../layouts/BlogLayout.astro"
title: Haz que VoiceOver en iOS lea elementos separados como un solo elemento con el role="text"
date: 2023-12-04
description: 
draft: false
tags: [a11y, html]
---

En iOS, VoiceOver lee cada elemento de forma individual cuando el usuario desliza la pantalla. Si un elemento enlace es compuesto por varios elementos span, VoiceOver no va a leer el enlace entero sino que leerá el elemento span activo (al que el usuario se ha deslizado). Los elementos buttons son una excepcion - VoiceOver leerá todos los elementos hijos de una.

Para estos casos donde quiere que VoiceOver lea todo el texto completo se puede usar el rol no oficial de `text` que hace que VoiceOver lea los elementos separados como se fuesen un solo elemento.

Este role no es oficial pero sí es usado por VoiceOver. Ademas, este rol no debe ser usado directamente en un elemento `<a>`, sino en sus elementos hijos ya que es capaz de sobreescribir el rol implicito de `link` en la etiqueta `<a>`.

```html
<a href="https://agutierrezr.github.io/">
  <!-- Hace que VoiceOver en iOS lea el texto del link entero -->
  <span role="text">
    <span>AGutierrezR</span>
    <span 
      class="material-icons" 
      aria-label="(external)"
      >
      open_in_new
    </span>
  </span>
</a>
```
