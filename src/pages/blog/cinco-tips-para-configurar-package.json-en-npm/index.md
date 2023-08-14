---
layout: "../../../layouts/BlogLayout.astro"
title: 5 tips para configurar el package.json en NPM
date: 2022-08-14
description: Exploraremos cinco consejos de configuración avanzados que pueden potenciar nuestro flujo de trabajo de desarrollo frontend.
draft: false
tags: npm, tips
---

Node.js, npm y package.json son herramientas indispensables en el arsenal de un desarrollador frontend.

En este artículo, exploraremos cinco consejos de configuración avanzados que pueden potenciar nuestro flujo de trabajo de desarrollo frontend.

## 1. Aprovecha los ciclos de vida pre y post de los scripts de npm

Los scripts de NPM vienen con métodos de ciclo de vida incorporados que nos permiten ejecutar comandos antes y después de un script específico. Esta función puede ser inmensamente útil para agilizar tareas como procesos de compilación y flujos de implementación. Echemos un vistazo a un ejemplo:

```json
{
  "name": "npm-lifecycle-example",
  "scripts": {
    "prefoo": "echo prefoo",
    "foo": "echo foo",
    "postfoo": "echo postfoo"
  }
}
```

Cuando ejecutas `npm run foo`, se ejecutará la siguiente secuencia de comandos:

1. `prefoo`
2. `foo`
3. `postfoo`

Este patrón es útil para orquestar flujos de trabajo complejos mediante la concatenación de varios comandos npm. Por ejemplo, puedes configurar un script `prebuild` para preparar el proyecto para producción y un script `postbuild` para realizar operaciones de limpieza.

## 2. Pasa argumentos de manera dinámica a los comandos

Los scripts de NPM nos permiten pasar valores dinámicos como argumentos a nuestros comandos. Para lograr esto, podemos utilizar la sintaxis `$npm_config_{key}` dentro del script. Como por ejemplo:

```json
{
  "name": "passing-flags-into-command",
  "scripts": {
    "pasar-arg": "node scripts/lol.js --name=$npm_config_name"
  }
}
```

Al ejecutar el comando `npm run pasar-arg --name woot`, se ejecutará el script con el argumento proporcionado. Dentro del script (`lol.js` en este caso), podemos acceder al argumento utilizando la biblioteca `minimist`:

```javascript
const argv = require('minimist')(process.argv.slice(2));
console.log(argv.name); // Salida: woot
```

Esta técnica es útil para crear herramientas de línea de comandos ad-hoc dentro del proyecto, mejorando el conjunto de herramientas de desarrollo.

## 3. Reutiliza valores desde la configuración `config` de package.json

Esto evita la repetición y mantiene la consistencia en nuestros scripts al utilizar valores del campo `config` en el archivo `package.json`. Esto es util para escenarios en los que se necesita hacer referencia al mismo valor en varios scripts:

```json
{
  "config": {
    "SESSION_ENDPOINT": "my-value"
  },
  "scripts": {
    "set-env": "REACT_APP_ENDPOINT=$npm_package_config_ENDPOINT react-scripts start"
  }
}
```

Al hacer referencia a la configuración `SESSION_ENDPOINT` en el script, reduces la redundancia y mejoras la mantenibilidad.

## 4. Compatibilidad multiplataforma con cross-env

Establecer variables de entorno en los scripts es sencillo, pero la compatibilidad de multiplataforma puede ser un problema. El paquete `cross-env` aborda esta detalle al permitirnos establecer variables de entorno de una manera que funcione en diferentes plataformas:

```json
{
  "name": "usando-cross-env",
  "scripts": {
    "cross-env": "cross-env NODE_ENV=prod OTHERFLAG=xyz webpack --config webpack.js"
  }
}
```

Al utilizar `cross-env`, nos aseguramos que los scripts funcionen sin problemas en varios sistemas operativos, proporcionando una experiencia de desarrollo consistente para tu equipo.

## 5. Pasa argumentos a otros comandos de npm

En algunos casos, es posible que necesitemos pasar argumentos adicionales a un script npm existente. En lugar de modificar el script original o duplicarlo, puedes usar el separador `--` para pasar argumentos:

```json
{
  "name": "ejemplo-pasar-argumentos",
  "scripts": {
    "my-script": "esw src/components",
    "pass-flags-to-other-script": "npm run my-script -- --watch"
  }
}
```

Al ejecutar `npm run pass-flags-to-other-script`, se pasará el flag `--watch` al comando `my-script`, lo que te permitirá configurar modos diferentes para los scripts de manera eficiente.

## Poniéndolo Todo Junto

Aquí tenemos un ejemplo consolidado que combina todos estos consejos avanzados de configuración en un archivo `package.json`:

```json
{
  "name": "package-json-avanzado",
  "version": "0.1.0",
  "private": true,
  "config": {
    "SESSION_ENDPOINT": "my-value"
  },
  "dependencies": {
    "react": "18.2.0"
  },
  "scripts": {
    "pasar-arg": "node scripts/lol.js --name=$npm_config_name",
    "set-env": "REACT_APP_ENDPOINT=$npm_package_config_ENDPOINT react-scripts start",
    "cross-env": "cross-env NODE_ENV=prod OTHERFLAG=xyz webpack --config webpack.js",
    "my-script": "esw src/components",
    "pass-flags-to-other-script": "npm run my-script -- --watch"
  },
  "devDependencies": {
    "react-scripts": "5.0.1",
    "cross-env": "7.0.3"
  }
}
```

Al incorporar estos patrones de configuración avanzados en nuestro flujo de trabajo de desarrollo frontend, podemos optimizar nuestros scripts npm y nuestro archivo `package.json` para agilizar nuestros procesos, mejorar la mantenibilidad y garantizar la compatibilidad multiplataforma.
