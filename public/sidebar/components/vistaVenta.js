Vue.component("vista_ventas", {
  data() {
  return {
    titulo1: "REGISTRO DE VENTAS",
    ventas: [],
    detalleSeleccionado: [],
    VENTAS_TOTALES: 0,
    GANANCIA_TOTAL: 0,
    VENTASREALIZADAS: []
  };
},
  mounted() {
  const self = this;

  store({
    VENTASREALIZADAS(val) {
      self.ventas = val;
    },
    GANANCIA_TOTAL(val) {
      self.GANANCIA_TOTAL = val;
    },
    VENTA_TOTAL(val) {
      self.VENTAS_TOTALES = val;
    }
  });

  // 🔥 Llama SOLO a la ruta que indicaste
  this.getVentas();
},
  methods: {
  async getVentas() {
    try {
      const result = await axios.get("http://localhost:8000/api/venta");

      this.VENTAS_TOTALES = 0;
      this.GANANCIA_TOTAL = 0;

      store(
        "VENTASREALIZADAS",
        result.data.map(res => {
          this.VENTAS_TOTALES += res.total;
          this.GANANCIA_TOTAL += res.totalganancia;
          return res;
        })
      );

      store("GANANCIA_TOTAL", this.GANANCIA_TOTAL);
      store("VENTA_TOTAL", this.VENTAS_TOTALES);

      console.log("Ventas cargadas:", result.data);

    } catch (error) {
      console.error("Error al obtener ventas:", error);
    }
  },

  async getDetalles(id) {
    const result = await axios.get(`http://localhost:8000/api/detalle/${id}`);
    this.detalleSeleccionado = result.data;
  }
},
  template:  //html
   `
    <div>
  <h1>{{ titulo1 }}</h1>

  <table border="2">
    <tr>
      <th>CLIENTE</th>
      <th>FECHA COMPRA</th>
      <th>TOTAL</th>
      <th>G.VENTA</th>
      <th>ACCIÓN</th>
    </tr>

    <tr v-for="data in ventas" :key="data._id">
      <td>{{ data.nombre }}</td>
      <td>{{ data.fecha }}</td>
      <td>{{ data.total }}</td>
      <td>{{ data.totalganancia }}</td>
      <td>
        <button @click="getDetalles(data._id); openModal2()">Ver detalle</button>
      </td>
    </tr>

    <tr>
      <td colspan="2"></td>
      <td><b>VENTAS TOTALES:</b> {{ VENTAS_TOTALES }}</td>
      <td><b>GANANCIA TOTAL:</b> {{ GANANCIA_TOTAL }}</td>
    </tr>
  </table>

  <button>Imprimir reporte</button>
</div>

    `,
});
