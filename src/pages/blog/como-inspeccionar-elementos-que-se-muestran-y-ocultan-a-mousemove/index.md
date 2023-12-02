---
layout: "../../../layouts/BlogLayout.astro"
title: Como inspeccionar elementos que se muestran y ocultan a mousemove
date: 2023-08-27
description: Inspecciona elementos que se muestran y ocultan con Javascript
draft: false
tags: [devtools]
---

Hay elementos que se muestran y esconden en mouse move (por medios de javascript), tales como tooltips o flyouts como los de [Stripe](https://stripe.com/es) y no solo basta con agregar una clase o usar un simple hover para hacer que se muestren.

Este es un post para explicar como evitar que el elemento se oculte y así poder inspeccionarlos con el DevTools.

Para esto tenemos que seguir estos pasos:

1. Abre el **DevTools** para estar preparado, esto lo puedes hacer con `F12`
2. Ahora regresa a la pagina y haz hover sobre el trigger para que aparezca el elemento que queremos inspeccionar
3. **Usando el teclado**, regresa al DevTools (lo puedes hacer presionando otra vez `F12` aunque en algunos casos lo debes hacer dos veces)
4. Aquí debes detener el script, hay varias formas de hacerlo
   1. Ir a la pestaña **Console** y escribir `debugger`
   2. Ir a la pestaña **Source** y presionar `F8` o `cmd + \` en MacOS o `ctrl + \` en Windows

**Nota**: Para cambiar de pestaña en el DevTools solo se tiene que presionar `cmd + [` o `cmd + ]` en MacOS o `ctrl + [` o `ctrl + ]` en Windows
