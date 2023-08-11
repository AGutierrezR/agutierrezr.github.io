---
layout: "../../../layouts/BlogLayout.astro"
title: Usar Angular Directive para extender componentes que te pertenecen
date: 2022-08-11
description: Usando Directivas de Angular para Mejorar la Extensión de Componentes de Terceros
draft: false
tags: angular, directive, typescript
---

Las directivas en Angular son una herramienta que se usa muy poco y que no aprovechamos al máximo. Aunque las directivas estructurales como `*ngIf` y `*ngFor` son comunes para la mayoría, pero ¿qué hay de crear tus propias directivas?.

En este artículo, exploraremos cómo las directivas pueden proporcionar una solución elegante para configurar componentes de terceros de manera uniforme, en lugar de recurrir a componentes contenedores.

## Simplificando la Configuración de Componentes de Terceros con Directiva

Supongamos que trabajamos en un proyecto que utiliza el componente `p-calendar` de **PrimeNG** de esta manera.

```html
<p-calendar
  [(ngModel)]="date"
  required
  id="date"
  name="date"
  dateFormat="dd/mm/yy"
  [showIcon]="true"
  [showButtonBar]="true"
  [monthNavigator]="true"
  [yearNavigator]="true"
  yearRange="1900:2050"
  [firstDayOfWeek]="1"
>
</p-calendar>
```

En este ejemplo, se necesita repetir un bloque de código extenso cada vez que se utiliza el componente `p-calendar`. Esto no solo ensucia el código, sino que también puede llevar a confusiones y errores, ya que olvidar un atributo puede afectar el comportamiento del componente. Además, cualquier cambio en el componente requeriría actualizaciones en todos los lugares donde se utiliza.

Para abordar este problema, podemos crear una directiva que simplifique la configuración del componente `p-calendar` y mantenga un control más claro sobre su comportamiento.

```typescript
import { Directive } from '@angular/core';
import { Calendar } from 'primeng/calendar';

@Directive({
  selector: 'p-calendar',
})
export class CalendarDirective {
  constructor(private calendar: Calendar) {
    this.calendar.dateFormat = 'dd/mm/yy';
    this.calendar.showIcon = true;
    this.calendar.showButtonBar = true;
    this.calendar.monthNavigator = true;
    this.calendar.yearNavigator = true;
    this.calendar.yearRange = '1900:2050';
    this.calendar.firstDayOfWeek = 1;
  }
}
```

Ahora con este directiva podemos hacer uso del componente `p-calendar` de una manera más sencilla:

```html
<p-calendar [(ngModel)]="date" required id="date" name="date"></p-calendar>
```

Hemos pasado de 14 líneas de HTML a solo una. Pero ¿Cómo lo hemos logrado?

El directive usa el selector `p-calendar` para aplicar la lógica a todos los elementos `<p-calendar>`. La instancia de `Calendar` es inyectada dentro del directive (en `constructor(private calendar: Calendar)`) y configurada.

## Personalizando la Configuración y Uso

Si necesitas personalizar la configuración del componente, las directivas también son útiles en estas situaciones. Puedes sobrescribir los valores predeterminados de la directiva en elementos específicos, como se muestra a continuación:

```html
<p-calendar [monthNavigator]="false" [yearNavigator]="false"></p-calendar>
```

Esto es posible gracias a los ciclos de vida de Angular.

## Directiva selectiva

El `selector` también nos permite se un poco más específico, para que en vez de que la directiva cambie el comportamiento de todos los elementos, podamos modificar el comportamiento de elementos específicos.

Las **directivas selectivas** te permiten aplicar modificaciones solo a elementos que cumplan con ciertos criterios. Por ejemplo, imaginemos que se quiere afectar solo los elementos `p-dropdown` con el atributo `codes`:

```typescript
import { Directive, OnInit } from '@angular/core';
import { Dropdown } from 'primeng/dropdown';
import { sortByLabel } from '@core';

@Directive({
  selector: 'p-dropdown[codes]',
})
export class CodesDropdownDirective implements OnInit {
  constructor(private dropdown: Dropdown) {
    // Configuración específica para p-dropdown con el atributo codes
  }

  public ngOnInit(): void {
    // Lógica adicional de inicialización si es necesario
  }
}
```

De esta manera, solo afectamos a los `p-dropdown` con el atributo `codes`

```html
<p-dropdown codes [(ngModel)]="favoriteSport" id="sport" name="sport" required></p-dropdown>
```

## Directiva excluyente

Tambien podemos hacer uso del pseudo selector `:not()`, para que aplique la configuración para todos los casos comunes, pero excluya aquellos que tienen un atributo o factor específico.

```typescript
import { Directive, OnInit } from '@angular/core';
import { Dropdown } from 'primeng/dropdown';
import { sortByLabel } from '@core';

@Directive({
    selector: 'p-dropdown:not(resetDropdown)',
})
export class CodesDropdownDirective implements OnInit {
  constructor(private dropdown: Dropdown) {
    // Configuración específica para p-dropdown:not(resetDropdown) con el atributo codes
  }

  public ngOnInit(): void {
    // Lógica adicional de inicialización si es necesario
  }
}
```

Y en el HTML, se tendria de la siguiente manera:

```html
<!-- Usando la directiva codes por defecto -->
<p-dropdown [(ngModel)]="favoriteSport" required id="sport" name="sport"></p-dropdown>

<!-- Excluyendo el p-dropdown porque contiene el atributo resetDropdown -->
<p-dropdown
  [(ngModel)]="preference"
  resetDropdown
  required
  id="preference"
  name="preference"
></p-dropdown>
```

## Directivas para la Carga de Datos

Las directivas no solo son útiles para configurar componentes, también pueden ser fuentes de datos. Imaginemos que se desea llenar un dropdown con una lista de países. Podemos crear una directiva que haga la llamada a un servicio y proporcione los datos necesarios:

```typescript
import { Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { Dropdown } from 'primeng/dropdown';
import { GeoService, sortByLabel } from '@core';

@Directive({
  selector: 'p-dropdown[countries]',
})
export class CountriesDropdownDirective implements OnInit {
  @Output() loaded = new EventEmitter<ReadonlyArray<Countries>>();

  constructor(private dropdown: Dropdown, private geoService: GeoService) {}

  public ngOnInit(): void {
    this.geoService.getCountries().subscribe((result) => {
      this.dropdown.options = result.map((c) => ({ label: c.label, key: c.id })).sort(sortByValue);
      this.loaded.emit(this.dropdown.options);
    });
  }
}
```

## Conclusión

En resumen, las directivas de Angular son una poderosa, pero poco utilizada herramienta que puede simplificar la configuración y personalización de componentes de terceros. Las directivas nos permiten cumplir con el **principio Open-closed**, extendiendo el comportamiento de los componentes sin modificar su código interno.

Aunque los componentes contenedores también pueden lograr resultados similares, las directivas ofrecen una solución más elegante, especialmente en situaciones donde la configuración puede ser compleja o cambie con frecuencia. Al centrarnos en los elementos que requieren comportamientos o configuraciones específicas, podemos aprovechar al máximo las directivas para mantener un código más limpio y fácil de mantener.
