Vue.component("almacen", {
  data() {
    return {
      title: "INVENTARIO",
      listaProductos: [],
      productoTemporal:{},
      productoSeleccionadoName: "",
      productoSeleccionadoId: "",
      productoSeleccionadoStock: 0,
      ventanamodal: "",
      nombreNuevoProducto: "",
      precioBaseNuevoProducto: "",
      precioVentaNuevoProducto: "",
      stockNuevoProducto: "",
      sumaTotalStock: 0,
      codigoMaximo:0,
      contador:0,
      getProductoBuscar:""
    };
  },
  mounted() {
    const self = this;
    store({
      productos(val) {
        self.listaProductos = val;
      },
    });
    this.getProductos();
  },
  computed: {
    formatoContador() {
      return this.contador.toString().padStart(4, '0');
    }
  },
  methods: { 
   async getProductos(event) {
      this.sumaTotalStock = 0;
      const result = await axios.get(`http://localhost:8000/api/productos/?q=${this.getProductoBuscar}`);
      store(
        "productos",
        result.data.productos.map((res) => {
          this.sumaTotalStock += res.stock * res.precioBase;
          this.codigoMaximo=res.codigo > this.codigoMaximo ? res.codigo : this.codigoMaximo
          return res;
        })
      );
      console.log(this.codigoMaximo)
      store("TOTAL_INVENTARIO", this.sumaTotalStock);
    },
    agregarProducto() {
      this.codigoMaximo=this.newCod()
      axios.post("http://localhost:8000/api/agregarProducto", {
        name:this.productoTemporal.name,
        precioBase:this.productoTemporal.precioBase,
        precioVenta:this.productoTemporal.precioVenta,
        stock:this.productoTemporal.stock,
        codigo:this.codigoMaximo
        })
        .then((response) => {
          store("productos@push", response.data.data);
          this.clearProductoTemporal()
        });
    },
    async eliminarProducto(name,ids,cod){
      let veri = confirm(`¿Estás seguro eliminar producto ->${name}?`);
      if(veri){
        let moti=prompt("Por favor, ingresa motivo a eliminar:", "******")
        axios.post(`http://localhost:8000/api/delete/?id=${ids}`)
        store(`productos@removeBy/codigo/${cod}`)
       }
    },
    clearProductoTemporal(){
      this.productoTemporal={
        name:'',
        precioBase:0,
        precioVenta:0,
        stock:0
      };
      console.log(this.productoTemporal)
    },
    ModificarProducto() {
      console.log("modificar producto aver ->",this.productoTemporal)
      axios.post(
        `http://localhost:8000/api/productos/${this.productoTemporal._id}`,
        {
          name:this.productoTemporal.codigo,
          precioBase:this.productoTemporal.precioBase,
          precioVenta:this.productoTemporal.precioVenta,
          stock:this.productoTemporal.stock,
          codigo:this.productoTemporal.codigo
        }
      ).then(()=>{
        store("productos@set",{
          name:this.productoTemporal.name,
          precioBase:this.productoTemporal.precioBase,
          precioVenta:this.productoTemporal.precioVenta,
          stock:this.productoTemporal.stock,
          codigo:this.productoTemporal.codigo
          },(item) => item._id == this.productoTemporal._id
          );
          this.clearProductoTemporal();
        }
      )

      /*let productoEncontrado = self.listaProductos.find(function(producto) {
              return toString(producto._id) === toString(this.productoSeleccionadoId);
            });
            if (productoEncontrado) {
              productoEncontrado.stock=this.productoSeleccionadoStock + parseInt(this.nuevoStock);
            }
            store('productos',self.listaProductos)*/
      //let newStok = this.nuevoStock * this.productoSeleccionadoPrice;
      //store("TOTAL_INVENTARIO", newStok);

     /*  store(
        "productos@set",
        {
          stock: this.suma,
        },
        (item) => item._id == this.productoSeleccionadoId
      ); */
    },
    seleccionarProducto(id,cod,name,prBs,prVt, stock) {
      let motivoModificar=prompt("DIGITE MOTIVO A MODIFICAR !!","modificar por.....?")
      let veri = confirm("estas seguro a modificar producto?")
      if(veri){
        this.productoTemporal={
          _id:id,
          codigo:cod,
          name:name,
          precioBase:prBs,
          precioVenta:prVt,
          stock:stock
        };
        this.ventanamodal='stock'
        openModal3()
      }else{
        alert("no se modifico produto")
      }
    },modificar(key){
      let value = prompt("**NUEVO VALOR**","digite nuevo valor..")
      Object.keys(this.productoTemporal).forEach(element=>{
        if(element===key){
          this.productoTemporal[element]=value
        }
      })
    },
    newCod(){
      let n=parseInt(this.codigoMaximo)+1
      let newCod=n.toString().padStart(4,'0');
      return newCod
    },
    generarCodigo(cod) {
      // Llamada a JsBarcode para generar el código de barras
      JsBarcode(this.$refs.codigoBarras,cod);
    },
  },
  //html
  template://html
   `
       <div>
        <h1 class="alamacen-estatico">{{title}}</h1>
        <div v-on:keydown="getProductos($event)">
           <h3 class="has-text-weight-bold">BUSCAR:</h3>
           <input placeholder="digite producto a buscar" type="text" v-model="getProductoBuscar"/>
        </div>
        <div class="chat-container">
         <table class="tableModal">
         <tr class="chat-container-header">
           <th>CODIGO</th>
           <th>PRODUCTO</th>
           <th>P.COMPRA</th>
           <th>P.VENTA</th>
           <th >STOCK</th>
           <th>-</th>
            <th>-</th>
         </tr>
          
           <tr  v-for="data in listaProductos">
              <td>{{data.codigo}}</td>
              <td>{{data.name}}</td>
              <td>{{data.precioBase}}</td>
              <td>{{data.precioVenta}}</td>
              <td  >{{data.stock}}</td>
              <!--<div> inicio iconos-->
                    <td><div class="contenedor"><!--inicio contenedor-->
                      <div class="icono"  @click="seleccionarProducto(data._id,data.codigo,data.name,data.precioBase,data.precioVenta,data.stock)">
                        <ion-icon name="create"></ion-icon>
                        <div class="texto modificar">
                         <p >MODIFICAR</p>
                        </div>
                      </div>
                    </div></td><!--fin contenedor-->

                    <td><div class="contenedor"><!--inicio contenedor-->
                      <div class="icono"  @click="eliminarProducto(data.name,data._id,data.codigo),ventanamodal='stock'">
                      <ion-icon name="trash-sharp"></ion-icon>
                        <div class="texto eliminar">
                         <p >ELIMINAR</p>
                        </div>
                      </div>
                    </div></td><!--fin contenedor-->

                    <td><div class="contenedor"><!--inicio contenedor-->
                      <div class="icono"  @click="generarCodigo(data.codigo),ventanamodal='verqr'" onclick="openModal3()">
                      <ion-icon name="qr-code-sharp"></ion-icon>
                        <div class="texto qr">
                         <p >VER QR</p>
                        </div>
                      </div>
                    </div></td><!--fin contenedor-->
              <!--</div>FIN ICONOS -->
           </tr>
        
         </table>
         </div>
         <ion-icon name="add-sharp"></ion-icon>
         <button @click="ventanamodal='agregarProducto'" onclick="openModal3()">agregar productos</button>
         
         
         <!-- Ventana Modal -->
               <div id="myModal3" class="modal3">
                <div class="modal-content3">
                 <span class="close3" @click="clearProductoTemporal()" onclick="closeModal3()">&times;</span>
                   <div v-show="ventanamodal=='stock'">
                       <h2>MODIFICAR</h2>
                       <table>
                       <tr v-for="(clave, index) in Object.keys(productoTemporal)" :key="index">
                       <td>{{ clave }}</td>
                       <td>{{ productoTemporal[clave] }}</td>
                       <td><div class="contenedor"><!--inicio contenedor-->
                      <div class="icono">
                        <ion-icon name="create" @click="modificar(clave)"></ion-icon>
                        <div class="texto modificar">
                         <p >MODIFICAR</p>
                        </div>
                      </div>
                    </div></td><!--fin contenedor-->
                     </tr>
                       </table>
                       <h3>stock actual -> {{productoSeleccionadoStock}}</h3>
                       <button @click="clearProductoTemporal()" onclick="closeModal3()" >cancelar</button>
                       <button @click="ModificarProducto()" onclick="closeModal3()" >agregar</button>
                    </div>  <!--fin div agregar stock--> 
                    <div v-show="ventanamodal=='agregarProducto'">          
                       <h2>NUEVO PRODUCTO</h2>                       
                       <label >NOMBRE:  <input  type="text" v-model="productoTemporal.name" /></label>                       
                       <label >PR.BASE: <input type="number" v-model="productoTemporal.precioBase" /></label>                       
                       <label >PR.VENTA:<input type="number" v-model="productoTemporal.precioVenta" /></label>
                       <label >STOCK:   <input type="number" v-model="productoTemporal.stock" /></label>
                       <button  onclick="closeModal3()">cancelar</button><!--codigomaximo--menos menos -->
                       <button @click="agregarProducto()" onclick="closeModal3()">agregar</button>
                    </div><!--fin div agregar producto--> 
                    <div v-show="ventanamodal=='verqr'">
                       <div class="codigBarra"><svg ref="codigoBarras"></svg> 
                        <button class="btn btn-success">imprimir</button>
                        <button class="btn btn-danger" onclick="closeModal3()">salir</button>
                       </div>
                    </div><!--fin div verqr-->    
                  </div>
               </div>
    <!--xfinal modal-->

   
       </div>
    `,
});
