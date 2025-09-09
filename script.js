// Mini Business Intelligence Tool - Main JavaScript
let biTool = {
    data: [],
    filteredData: [],
    headers: [],
    chart: null,
    currentTheme: 'light',

    init: function() {
        console.log('Initializing BI Tool...');
        
        // Get elements
        this.elements = {
            csvInput: document.getElementById('csv-input'),
            csvFile: document.getElementById('csv-file'),
            parseBtn: document.getElementById('parse-btn'),
            clearBtn: document.getElementById('clear-btn'),
            messages: document.getElementById('messages'),
            dataTable: document.getElementById('data-table'),
            columnFilter: document.getElementById('column-filter'),
            filterInput: document.getElementById('filter-input'),
            xAxisSelect: document.getElementById('x-axis-select'),
            yAxisSelect: document.getElementById('y-axis-select'),
            chartType: document.getElementById('chart-type'),
            chartColor: document.getElementById('chart-color'),
            generateChartBtn: document.getElementById('generate-chart-btn'),
            exportChartBtn: document.getElementById('export-chart-btn'),
            themeToggle: document.getElementById('theme-toggle'),
            dataChart: document.getElementById('data-chart')
        };

        // Initialize theme
        const savedTheme = localStorage.getItem('bi-theme') || 'light';
        this.setTheme(savedTheme);
        
        // Bind events
        this.bindEvents();
        
        console.log('BI Tool initialized successfully');
    },

    bindEvents: function() {
        console.log('Binding events...');
        
        // Theme toggle
        if (this.elements.themeToggle) {
            this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // CSV processing
        if (this.elements.parseBtn) {
            this.elements.parseBtn.addEventListener('click', () => {
                console.log('Parse button clicked');
                this.processCSV();
            });
        }
        
        if (this.elements.clearBtn) {
            this.elements.clearBtn.addEventListener('click', () => this.clearAll());
        }
        
        // File upload
        if (this.elements.csvFile) {
            this.elements.csvFile.addEventListener('change', (e) => this.handleFileUpload(e));
        }
        
        // Filtering
        if (this.elements.columnFilter) {
            this.elements.columnFilter.addEventListener('change', () => this.filterData());
        }
        
        if (this.elements.filterInput) {
            this.elements.filterInput.addEventListener('input', () => this.filterData());
        }
        
        // Chart generation
        if (this.elements.generateChartBtn) {
            this.elements.generateChartBtn.addEventListener('click', () => this.generateChart());
        }
        
        if (this.elements.exportChartBtn) {
            this.elements.exportChartBtn.addEventListener('click', () => this.exportChart());
        }
    },

    toggleTheme: function() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    },

    setTheme: function(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('bi-theme', theme);
        
        if (this.elements.themeToggle) {
            const themeIcon = this.elements.themeToggle.querySelector('.theme-icon');
            if (themeIcon) {
                if (theme === 'dark') {
                    themeIcon.textContent = '☀️';
                    this.elements.themeToggle.setAttribute('aria-label', 'Cambiar a modo claro');
                } else {
                    themeIcon.textContent = '🌙';
                    this.elements.themeToggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
                }
            }
        }
    },

    processCSV: function() {
        console.log('processCSV called');
        const csvText = this.elements.csvInput.value.trim();
        
        if (!csvText) {
            this.showMessage('Por favor ingrese datos CSV o cargue un archivo.', 'warning');
            return;
        }

        try {
            // Simple CSV parsing
            const lines = csvText.split('\n').filter(line => line.trim());
            if (lines.length < 2) {
                this.showMessage('El CSV debe tener al menos una fila de encabezados y una fila de datos.', 'error');
                return;
            }

            // Parse headers
            const headers = lines[0].split(',').map(h => h.trim());
            
            // Parse data
            const data = [];
            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',').map(v => v.trim());
                const row = {};
                headers.forEach((header, index) => {
                    row[header] = values[index] || '';
                });
                data.push(row);
            }

            this.data = data;
            this.headers = headers;
            this.filteredData = [...data];
            
            this.renderTable();
            this.populateColumnSelectors();
            this.populateColumnFilter();
            this.showMessage(`Datos procesados correctamente. ${data.length} filas encontradas.`, 'success');
            
        } catch (error) {
            console.error('Error in processCSV:', error);
            this.showMessage(`Error al procesar CSV: ${error.message}`, 'error');
        }
    },

    renderTable: function() {
        const thead = this.elements.dataTable.querySelector('thead');
        const tbody = this.elements.dataTable.querySelector('tbody');
        
        // Clear existing content
        thead.innerHTML = '';
        tbody.innerHTML = '';
        
        if (this.filteredData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="100%" style="text-align: center; padding: 2rem;">No hay datos para mostrar</td></tr>';
            return;
        }

        // Create header row
        const headerRow = document.createElement('tr');
        this.headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        // Create data rows
        this.filteredData.forEach(row => {
            const tr = document.createElement('tr');
            this.headers.forEach(header => {
                const td = document.createElement('td');
                td.textContent = row[header] || '';
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
    },

    populateColumnSelectors: function() {
        // Clear and populate X-axis selector
        if (this.elements.xAxisSelect) {
            this.elements.xAxisSelect.innerHTML = '<option value="">Seleccionar columna</option>';
            this.headers.forEach(header => {
                const option = document.createElement('option');
                option.value = header;
                option.textContent = header;
                this.elements.xAxisSelect.appendChild(option);
            });
        }

        // Clear and populate Y-axis selector
        if (this.elements.yAxisSelect) {
            this.elements.yAxisSelect.innerHTML = '<option value="">Seleccionar columna</option>';
            this.headers.forEach(header => {
                const option = document.createElement('option');
                option.value = header;
                option.textContent = header;
                this.elements.yAxisSelect.appendChild(option);
            });
        }
    },

    populateColumnFilter: function() {
        // Clear and populate column filter selector
        if (this.elements.columnFilter) {
            this.elements.columnFilter.innerHTML = '<option value="">Todas las columnas</option>';
            this.headers.forEach(header => {
                const option = document.createElement('option');
                option.value = header;
                option.textContent = header;
                this.elements.columnFilter.appendChild(option);
            });
        }
    },

    filterData: function() {
        const selectedColumn = this.elements.columnFilter.value;
        const filterValue = this.elements.filterInput.value.toLowerCase().trim();
        
        if (!filterValue) {
            // If no filter value, show all data
            this.filteredData = [...this.data];
        } else if (!selectedColumn) {
            // Filter across all columns
            this.filteredData = this.data.filter(row => {
                return this.headers.some(header => {
                    const cellValue = (row[header] || '').toString().toLowerCase();
                    return cellValue.includes(filterValue);
                });
            });
        } else {
            // Filter specific column
            this.filteredData = this.data.filter(row => {
                const cellValue = (row[selectedColumn] || '').toString().toLowerCase();
                return cellValue.includes(filterValue);
            });
        }
        
        this.renderTable();
        
        // Update status message
        const totalRows = this.data.length;
        const filteredRows = this.filteredData.length;
        if (filterValue) {
            this.showMessage(`Mostrando ${filteredRows} de ${totalRows} filas.`, 'info');
        }
    },

    generateChart: function() {
        const xColumn = this.elements.xAxisSelect.value;
        const yColumn = this.elements.yAxisSelect.value;
        const chartType = this.elements.chartType.value;
        
        if (!xColumn || !yColumn) {
            this.showMessage('Por favor seleccione las columnas para ambos ejes.', 'warning');
            return;
        }

        try {
            // Prepare chart data
            const labels = [];
            const values = [];
            
            this.filteredData.forEach(row => {
                labels.push(row[xColumn] || '');
                values.push(parseFloat(row[yColumn]) || 0);
            });

            // Generate different colors for each data point
            const colors = this.generateColors(labels.length, this.elements.chartColor.value);

            // Destroy existing chart
            if (this.chart) {
                this.chart.destroy();
            }

            // Create new chart
            const ctx = this.elements.dataChart.getContext('2d');
            this.chart = new Chart(ctx, {
                type: chartType === 'horizontalBar' ? 'bar' : chartType,
                data: {
                    labels: labels,
                    datasets: [{
                        label: yColumn,
                        data: values,
                        backgroundColor: colors,
                        borderColor: colors,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    indexAxis: chartType === 'horizontalBar' ? 'y' : 'x',
                    plugins: {
                        title: {
                            display: true,
                            text: `${yColumn} por ${xColumn}`
                        },
                        legend: {
                            display: chartType === 'pie' || chartType === 'doughnut'
                        }
                    }
                }
            });

            this.elements.exportChartBtn.disabled = false;
            this.showMessage('Gráfico generado correctamente.', 'success');

        } catch (error) {
            this.showMessage(`Error al generar gráfico: ${error.message}`, 'error');
        }
    },

    exportChart: function() {
        if (!this.chart) {
            this.showMessage('No hay gráfico para exportar.', 'warning');
            return;
        }
        
        const canvas = this.elements.dataChart;
        const link = document.createElement('a');
        link.download = `grafico-${new Date().toISOString().slice(0, 10)}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        this.showMessage('Gráfico exportado correctamente.', 'success');
    },

    clearAll: function() {
        this.data = [];
        this.filteredData = [];
        this.headers = [];
        
        this.elements.csvInput.value = '';
        if (this.elements.csvFile) this.elements.csvFile.value = '';
        
        this.elements.dataTable.querySelector('thead').innerHTML = '';
        this.elements.dataTable.querySelector('tbody').innerHTML = '';
        
        if (this.elements.xAxisSelect) this.elements.xAxisSelect.innerHTML = '<option value="">Seleccionar columna</option>';
        if (this.elements.yAxisSelect) this.elements.yAxisSelect.innerHTML = '<option value="">Seleccionar columna</option>';
        if (this.elements.columnFilter) this.elements.columnFilter.innerHTML = '<option value="">Todas las columnas</option>';
        if (this.elements.filterInput) this.elements.filterInput.value = '';
        
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
        
        this.elements.exportChartBtn.disabled = true;
        this.hideMessage();
        
        this.showMessage('Todos los datos han sido limpiados.', 'success');
    },

    handleFileUpload: function(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.name.toLowerCase().endsWith('.csv')) {
            this.showMessage('Por favor seleccione un archivo CSV válido.', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.elements.csvInput.value = e.target.result;
            this.showMessage('Archivo cargado correctamente. Haga clic en "Procesar Datos".', 'success');
        };
        reader.onerror = () => {
            this.showMessage('Error al leer el archivo.', 'error');
        };
        reader.readAsText(file);
    },

    showMessage: function(message, type = 'info') {
        this.elements.messages.textContent = message;
        this.elements.messages.className = `messages show ${type}`;
        
        if (type !== 'error') {
            setTimeout(() => this.hideMessage(), 5000);
        }
    },

    hideMessage: function() {
        this.elements.messages.classList.remove('show');
    },

    generateColors: function(count, baseColor) {
        const colors = [];
        const hsl = this.hexToHsl(baseColor);
        
        for (let i = 0; i < count; i++) {
            const hue = (hsl.h + (i * 360 / count)) % 360;
            const saturation = Math.max(40, hsl.s - (i * 5)); // Vary saturation slightly
            const lightness = Math.max(30, Math.min(70, hsl.l + (i % 2 === 0 ? 10 : -10))); // Alternate lightness
            colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
        }
        
        return colors;
    },

    hexToHsl: function(hex) {
        // Convert hex to RGB first
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        
        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing BI Tool...');
    biTool.init();
});
