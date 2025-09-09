# Mini Herramienta de Inteligencia de Negocios -(Parcial Pratico)

Una aplicación web de una sola página (SPA) que funciona como una herramienta básica de inteligencia de negocios, similar a funciones de Excel. Permite procesar datos CSV, visualizarlos en tablas interactivas y generar gráficos configurables.
link
https://cocogzz1.github.io/ing_web/ 

##  Características Principales

###  Funcionalidades 
- **Procesamiento de CSV**: Pegue datos CSV o cargue archivos desde su computadora
- **Tabla Interactiva**: Visualización de datos con filtrado y ordenamiento
- **Gráficos Configurables**: Múltiples tipos de gráficos con personalización
- **Exportación**: Descargue gráficos como imágenes PNG
- **Detección de Errores**: Validación automática de formato CSV

###  Interfaz y Experiencia
- **Diseño Responsive**: Funciona en dispositivos móviles, tablets y escritorio
- **Modo Oscuro**: Alternancia entre tema claro y oscuro
- **Interfaz Intuitiva**: Diseño moderno con iconos y ayudas visuales

###  Accesibilidad (WCAG 2.1 AA)
- **Navegación por Teclado**: Soporte completo para usuarios sin mouse
- **Lectores de Pantalla**: Etiquetas ARIA y anuncios automáticos
- **Alto Contraste**: Colores que cumplen estándares de contraste
- **Texto Escalable**: Soporte para zoom hasta 200%
- **Foco Visible**: Indicadores claros de elementos enfocados

##  Cómo Usar

### 1. Entrada de Datos
- **Opción 1**: Pegue datos CSV directamente en el área de texto
- **Opción 2**: Cargue un archivo CSV desde su computadora
- Haga clic en "Procesar Datos" para analizar la información

### 2. Visualización de Datos
- Los datos aparecerán en una tabla interactiva
- Use los filtros para buscar información específica
- Haga clic en los encabezados para ordenar columnas

### 3. Creación de Gráficos
- Seleccione la columna para el Eje X (etiquetas)
- Seleccione la columna para el Eje Y (valores numéricos)
- Elija el tipo de gráfico deseado
- Personalice el color si lo desea
- Haga clic en "Generar Gráfico"

### 4. Exportación
- Una vez generado el gráfico, use "Exportar como PNG" para descargarlo

##  Tipos de Gráficos Soportados

- **Barras Verticales**: Ideal para comparar categorías
- **Barras Horizontales**: Mejor para etiquetas largas
- **Líneas**: Perfecto para mostrar tendencias temporales
- **Circular (Pie)**: Excelente para mostrar proporciones
- **Dona (Doughnut)**: Variante moderna del gráfico circular

##  Características Técnicas

### Tecnologías Utilizadas
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño responsive con variables CSS y grid/flexbox
- **JavaScript ES6+**: Lógica de aplicación moderna
- **Chart.js**: Biblioteca para generación de gráficos
- **ARIA**: Atributos de accesibilidad web

### Compatibilidad
- **Navegadores**: Chrome, Firefox, Safari, Edge (versiones modernas)
- **Dispositivos**: Escritorio, tablet, móvil
- **Resoluciones**: Desde 320px hasta 4K

##  Cumplimiento de Accesibilidad

### Discapacidades Visuales
- **Ceguera**: Soporte completo para lectores de pantalla (NVDA, JAWS, VoiceOver)
- **Baja Visión**: Alto contraste, texto escalable, foco visible
- **Daltonismo**: Patrones y texturas además de colores

### Discapacidades Motoras
- **Navegación por Teclado**: Todas las funciones accesibles sin mouse
- **Objetivos Táctiles**: Botones de mínimo 44x44px
- **Tiempo Extendido**: Sin límites de tiempo para completar acciones

### Discapacidades Cognitivas
- **Interfaz Clara**: Diseño simple e intuitivo
- **Mensajes de Error**: Explicaciones claras y sugerencias
- **Ayuda Contextual**: Texto de ayuda para cada función

## Atajos de Teclado

- **Ctrl/Cmd + P**: Procesar datos CSV
- **Ctrl/Cmd + G**: Generar gráfico
- **Ctrl/Cmd + E**: Exportar gráfico
- **Ctrl/Cmd + R**: Limpiar todos los datos
- **Ctrl/Cmd + T**: Cambiar tema (claro/oscuro)

##  Diseño Responsive

### Puntos de Ruptura
- **Móvil**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Escritorio**: 1024px+

### Adaptaciones Móviles
- Menús colapsables
- Tablas con scroll horizontal
- Botones de tamaño táctil
- Texto legible sin zoom

##  Estructura del Proyecto

```
/
|-PArcial Pratico
├── index.html          # Estructura principal HTML
├── styles.css          # Estilos CSS con variables y responsive
├── script.js           # Lógica JavaScript de la aplicación
├
├──README.md          # Documentación del proyecto 
```

##  Ejemplo de Datos CSV

```csv
Producto,Ventas,Mes,Región
Laptop,1500,Enero,Norte
Mouse,300,Enero,Norte
Teclado,450,Enero,Sur
Monitor,800,Febrero,Norte
Laptop,1200,Febrero,Sur
Mouse,250,Febrero,Este
```

##  Solución de Problemas

### Errores Comunes
1. **"No se pudieron detectar columnas"**: Verifique que la primera fila contenga encabezados
2. **"Número de columnas no coincide"**: Algunas filas tienen más/menos columnas que los encabezados
3. **"No hay datos válidos"**: El archivo puede estar vacío o mal formateado

### Mejores Prácticas
- Use la primera fila para encabezados de columna
- Separe datos con comas
- Use comillas para texto que contenga comas
- Evite caracteres especiales en encabezados

##  Funciones Avanzadas

### Filtrado de Datos
- Seleccione una columna específica
- Escriba el valor a buscar
- El filtro es insensible a mayúsculas/minúsculas

### Ordenamiento
- Haga clic en cualquier encabezado de columna
- Soporte para ordenamiento numérico y alfabético
- Indicadores visuales de dirección de ordenamiento

### Agregación Automática
- Los gráficos agrupan automáticamente datos duplicados
- Suma valores numéricos para la misma etiqueta
- Ideal para datos con múltiples entradas por categoría

##  Casos de Uso

1. **Análisis de Ventas**: Visualice ventas por producto, región o período
2. **Reportes Financieros**: Gráficos de ingresos, gastos y ganancias
3. **Datos de Encuestas**: Análisis de respuestas y tendencias
4. **Inventario**: Seguimiento de stock y movimientos
5. **Métricas de Rendimiento**: KPIs y indicadores de desempeño

##  Privacidad y Seguridad

- **Procesamiento Local**: Todos los datos se procesan en su navegador
- **Sin Servidor**: No se envían datos a servidores externos
- **Sin Cookies**: No se almacenan datos personales
- **Código Abierto**: Puede revisar todo el código fuente

##  Próximas Mejoras

- [ ] Soporte para más formatos (Excel, JSON)
- [ ] Gráficos de dispersión y área
- [ ] Exportación a PDF
- [ ] Plantillas predefinidas
- [ ] Modo sin conexión (PWA)


---
