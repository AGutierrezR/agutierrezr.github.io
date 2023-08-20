---
layout: "../../../layouts/BlogLayout.astro"
title: ¿Por que usar Ramda?
date: 2022-08-20
description: 
draft: false
tags: javascript, functional
---

Para los que no están familiarizados con Function Programming, Ramda parece que no tiene mucho que ofrecer. La mayoría de las capacidades de este ya están cubiertas por librerías como **LoDash** y **Underscore**.

Si se quiere seguir escribiendo código de manera imperativa y de forma orientada a objetos, Ramda no tiene mucho que ofrecer.

Sin embargo, proporciona estilo diferente de programar, un estilo es puramente funcional: Ramda hace simple que se pueda escribir lógica compleja a través de composición funcional. Cabe destacar que cualquier librería con una función `compose` nos permitirá hacer composición funcional; lo que realmente importa es que "lo haga fácil".

Veamos como funciona Ramda.

Hagamos un ejemplo con un simple "TODO list". Vamos a comenzar imaginando que tenemos la siguiente lista de datos

```js
const tasks = [
  {
    "complete": false,
    "username": "Mabel",
    "dueDate": "2016-11-18",
    "title": "Zaku evik."
  },
  {
    "complete": true,
    "username": "Mabel",
    "dueDate": "2021-01-09",
    "title": "Zesikin fitek."
  },
  /*, ... */
]
```

La lista enteras la tienes en este [gist](https://gist.githubusercontent.com/AGutierrezR/cd72e8774ba829a13634be8c4bc834a5/raw/eb2247b8a53ff87b13e60210ebf8d23615332595/tasks.js)

Y ahora queremos quitar los items que estén completados. Con los métodos incluidos en Array prototype, podríamos hacerlo así:

```js
// JS Vanilla
const incompleteTasks = tasks.filter((task) = !task.complete);
```

Con LoDash haríamos hago así:

```js
// Lo-Dash
const incompleteTasks = _.filter(tasks, { complete: false });
```

De cualquier manera, obtenemos la lista filtrada de tareas. En Ramda, podrías hacerlo así:

```js
const incomplete = R.filter(R.whereEq({ complete: false }))
```

Algo a notar es que en la versión de Ramda, no se hace mención de la lista `task`. Esto es porque Ramda devuelve una función, la cual tenemos que llamar para poder obtener la lista filtrada.

Este es el punto.

Ya que tenemos una función, la podemos combinar con otras para operar en cualquier conjunto de datos que queramos. Imaginemos que tenemos una función `groupByUser` que agrupa los TODOs por usuario, devolviendo un objeto cuyas keys son el username y value es el array de TODOs. Esto nos permite crear una nueva función:

```js
const activeByUser = R.compose(groupByUser, incomplete);
```

que selecciona las tareas incompletas y luego las agrupa por usuario.

```js
{
  "Edwin": [

    {"complete": false, "dueDate": "2019-06-17", "title": "Fufehabut ojujil.", "username": "Edwin"},
    {"complete": false, "dueDate": "2019-06-15", "title": "Rafesub odoca.", "username": "Edwin"},  
    {"complete": false, "dueDate": "2014-02-22", "title": "Uvib oluwu.", "username": "Edwin"},  
    {"complete": false, "dueDate": "2014-01-22", "title": "Nuwedireh tovuzozi.", "username": "Edwin"}
  ],
  "Ivan": [
    {"complete": false, "dueDate": "2019-11-23", "title": "Hifum mihiwo.", "username": "Ivan"},    
    {"complete": false, "dueDate": "2017-05-02", "title": "Zazutiku kukemezasi.", "username": "Ivan"}
  ],
  "Mabel": [
    {"complete": false, "dueDate": "2016-11-18", "title": "Zaku evik.", "username": "Mabel"},
    {"complete": false, "dueDate": "2018-09-15", "title": "Tag berulelam.", "username": "Mabel"}
  ]
}
```

Esto lo haría si se le proporciona los datos, ya que devuelve una función. Si tuvieras que escribir esta función a mano, luciría algo así:

```js
const activeByUser = (tasks) = {
    return groupByUser(incomplete(tasks));
};
```

Eso que no tenemos que hacer a mano se le llama composición. Y la composición es una de las técnicas claves de programación funcional. Veamos que pasa si vamos un poco más allá. Que pasa si necesitamos ordenar cada uno de los usuarios de la lista por `dueDate`:

```js
var sortUserTasks = R.compose(
    R.map(R.sortBy(R.prop("dueDate"))), 
    activeByUser
  );
```

## Todo en uno?

Dado que `compose` nos permite más de dos parámetros, ¿por qué colocar todo en una sola paso?

```js
const sortUserTasks = R.compose(
  R.map(R.sortBy(R.prop('dueDate'))),
  groupByUser,
  R.filter(R.whereEq({ complete: false }))
)
```

Sin usar el `activeByUser` y así nos ahorramos la creación de esa función... Esto podría ser razonable, es cuestión de preferencia. En algunos casos podría hacer que hacer debugging sea más difícil y no agrega mucha legibilidad de código.

De hecho, yo preferiría granular más. Hemos usado una sección interna algo complicada que puede ser reusable. Esto lo podríamos mejorar así:

```js
const sortByDate = R.sortBy(R.prop('dueDate'))
const sortUserTasks = R.compose(
  R.map(sortByDate), activeByUser
)
```

Ahora podemos usar `sortByDate` en cualquier lista de datos (no necesariamente de `task`) que tenga la propiedad `dueDate`.

Pero hay más, ¿qué pasa si queremos una ordenación descendente?, facil

```js
// ...
const sortByDateDescend = R.compose(R.reverse, sortByDate)
const sortUserTasks = R.compose(
  R.map(sortByDateDescend), activeByUser
)
```

Si en un futuro nos piden mostrar los items con fecha más reciente, podemos hacer uso de este `sortByDateDescend`.

## ¿Donde esta la data?

Todavía no hemos usado datos, seamos pacientes. Hasta los momentos solo hemos realizado procesamientos.

Cuando se trabaja en programación funcional, lo que se obtiene es funciones que forman un pipeline. Una función va a darle los datos a la siguiente, la cual va a darle los datos a la siguiente y así hasta el final del flujo.

Lo que hemos realizado hasta ahora es una colección de funciones:

```
incomplete: [Task] - [Task]
sortByDate: [Task] - [Task]
sortByDateDescend: [Task] - [Task]
activeByUser: [Task] - {String: [Task]}
sortUserTasks: {String: [Task]} - {String: [Task]}
```

Y a pesar de que hemos usado las funciones creadas para construir el `sortUserTasks`, se pueden usar por separado sin problema. Por cierto, aquí dejo la implementación de la función `groupByUser` que conforma `activeByUser`

```js
const groupByUser = R.groupBy(R.prop('username'));
```

## Espera, hay mas

Vamos un poco más allá. ¿Y si queremos solo los últimos 5 elementos de la lista? Podemos usar la función `take` directamente de Ramda. Con esta podemos obtener los primeros cinco elementos de cada task de cada usuario:

```js
const topFiveUserTasks = R.compose(R.map(R.take(5)), sortUserTasks);
```

Con esto podemos reducir el objeto devuelto a un subconjunto de propiedades, digamos `title` y `dueDate`. Esto lo podemos hacer con una función Ramda llamada `project`

```js
const importantFields = R.project(['title', 'dueDate']);
const topDataAllUsers = R.compose(R.map(importantFields), topFiveUserTasks);
```

Algunas de estas funciones que hemos creado en el camino fueron diseñadas para ser reusadas para otros propósitos dentro de la aplicación TODO.

```js
const incomplete = R.filter(R.whereEq({ complete: false }))
const sortByDate = R.sortBy(R.prop('dueDate'))
const sortByDateDescend = R.compose(R.reverse, sortByDate)
const importantFields = R.project(['title', 'dueDate']);
const groupByUser = R.groupBy(R.prop('username'));
const activeByUser = R.compose(groupByUser, incomplete);
const sortUserTasks = R.compose(R.map(sortByDate), activeByUser)
const topFiveUserTasks = R.compose(R.map(R.take(1)), sortUserTasks);
const topDataAllUsers = R.compose(R.map(importantFields), topFiveUserTasks);
```

## Muy bien, ahora si a trabajar con datos

En este punto ya tenemos funciones que trabajan con los mismos tipos de datos, un array de TODO items. La estructura de estos items es la siguiente:

- `complete`: Booleano
- `name`: String
- `dueDate`: String, en formato YYYY-MM-DD
- `title`: String
- `username`: String

Entonces, ya tenemos un array de tasks y lo pasamos a la función:

```js
const results = topDataAllUsers(tasks);
```

Y listo, supersimple ¿no? Hemos creado el camino para una consumo simple. Este sería el resultado:

```json
{
  "Edwin": [
    {"dueDate": "2019-06-17", "title": "Fufehabut ojujil."},
    {"dueDate": "2019-06-15", "title": "Rafesub odoca."},
    {"dueDate": "2014-02-22", "title": "Uvib oluwu."},
    {"dueDate": "2014-01-22", "title": "Nuwedireh tovuzozi."}
  ],
  "Ivan": [
    {"dueDate": "2019-11-23", "title": "Hifum mihiwo."},
    {"dueDate": "2017-05-02", "title": "Zazutiku kukemezasi."}
  ],
  "Mabel": [
    {"dueDate": "2018-09-15", "title": "Tag berulelam."},
    {"dueDate": "2016-11-18", "title": "Zaku evik."}
  ]
}
```

Pero lo interesante de esto es que podemos pasar el mismo array de task a `incomplete` y obtener la lista filtrada

```js
const incompleteTasks = incomplete(tasks);
```

Y podemos pasarla a cualquier otra función desde `sortByDate` hasta `sortByDateDescend`, `importantFields`, `groupByUser`, o `activeByUser`. Dado que operan en un tipo similar (un array de tasks) podemos construir una colección de herramientas con combinaciones simples.
