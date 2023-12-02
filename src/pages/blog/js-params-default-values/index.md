---
layout: "../../../layouts/BlogLayout.astro"
title: Los parámetros de funciones pueden tener un valor por defecto basado en otro parámetro
date: 2023-12-02
description: 
draft: false
tags: [javascript]
---

Una función con parámetros puede tener valores por defectos que serán usados cuando el consumidor no proporcione un valor para dicho parámetro (ya sea omitiendolo o pasandole un `undefined`). El valor por defecto no tiene que ser un valor estatico. Se pueden ejecutar expresiones y usar valores previos de la función.

```js
function someFunction(
  value,
  max = value.length,
  suffix = value.length > max ? "..." : ""
) {
  console.log(value, max, suffix)
}

someFunction("hello") // max = 5, suffix = ""
someFunction("hello", 2) // max = 2, suffix = "..."
someFunction("hello", undefined, ".....") // max = 5, suffix = "....."
```
