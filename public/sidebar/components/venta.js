Vue.component("ventas",{
    data(){
        return {
            titulo1:"MENU DE VENTAS",
            productosDisponibles:[],
            productoVenta:[],
            productoVentaGuadado:[],
            cantidad_pedido:0,
            TOTAL:0,
            TOTAL_GANANCIA:0,
            nombreCliente:'',
            apellidoCliente:'',
            dniCliente:'',
            categoriaModal:""
        }
    },
    mounted(){
      const self=this
      
       store({productos(val){
            self.productosDisponibles=val
      }}) 

      //this.getProductos();
    },
    methods:{
       formatearFecha(fecha) {
    if (!fecha) return "";

    const f = new Date(fecha);
    const dia = String(f.getDate()).padStart(2, "0");
    const mes = String(f.getMonth() + 1).padStart(2, "0");
    const anio = f.getFullYear();

    return `${dia}/${mes}/${anio}`;
  },
        async getProductosBuscar(data){  
          const self = this;   
         // console.log(self.buscarProducto)
          
          try{
            let result=await axios.get(`http://localhost:8000/api/productos/?q=${data}`);
            //console.log("2",event.value)
            //console.log("busqueda",result.data.productos)
            result.data.productos.map(res=>{
              self.productosDisponibles.push(res)
              console.log(res)
             })
              //store('productos',result)
          }catch(e){
            console.log(e)
          }
            
        },
        getVentas(){
            let VENTASTOTALES=0
            let VENTASGANANCIA=0;
                    axios.get('http://localhost:8000/api/venta').then((res)=>{
                       store('VENTASREALIZADAS',res.data) 
                        for(let e of res.data){
                            VENTASTOTALES+=e.total
                            VENTASGANANCIA+=e.totalganancia;
                          }                           
                           store('GANANCIA_TOTAL',VENTASGANANCIA)
                           store('VENTA_TOTAL',VENTASTOTALES)
                  })       
        },
        seleccionarProducto(produc){
          let veri=this.productoVenta.find(e=>e._id===produc._id)
             if(veri===undefined) this.productoVenta.push({...produc,cantidad:0,subtotal:0});

        },
        sumar(precioVenta,precioBase){
          const ganancia= precioVenta-precioBase;
          this.TOTAL+=precioVenta;
          this.TOTAL_GANANCIA+=ganancia;
        },
        restar(precio,precioBase){
          const ganancia= precio-precioBase;
          this.TOTAL-=precio;
          this.TOTAL_GANANCIA-=ganancia;
        },
        guardarVenta(){
          console.log("producto guardado 1",this.productoVentaGuadado)
          let person = prompt("DIGITE NOMBRE i/o DESCRIPCION DE CLIENTE", "->nombre");
          this.productoVentaGuadado.push({...this.productoVenta,nameCliente:person,total:this.TOTAL})
          console.log("producto guardado 2",this.productoVentaGuadado)
          this.productoVenta=[]
          this.TOTAL=0

        },
        terminarVenta(name,total){
          console.log(name,total)
          let i=0;
          for(let data of this.productoVentaGuadado){
            i++
             if(data.nameCliente==name && data.total==total){
              this.TOTAL=data.total
              Object.keys(data).forEach(e=>{                
                if(!isNaN(e)){
                  console.log("key -> ",e,"-_- value->",data[e])
                  this.productoVenta.push(data[e])
                  this.productoVentaGuadado.splice(i-1,1)
                }
              })
             }
          } 
        },
        registroVenta(){
             // Obtener la fecha actual
              const fechaActual = new Date();

              // Crear una nueva instancia de Date con la misma fecha, pero sin la hora
              const soloFecha = new Date(`${fechaActual.getUTCFullYear()}-${fechaActual.getUTCMonth()+1}-${fechaActual.getUTCDate()}`);
          const self = this;
          axios.post('http://localhost:8000/api/venta/cliente',{
            nombre:self.nombreCliente,
            apellido:self.apellidoCliente,
            dni:self.dniCliente,
            fecha:soloFecha,
            total:self.TOTAL,
            totalganancia:self.TOTAL_GANANCIA
          }).then(res=>{
            const id=res.data.data1._id
            self.nuevoDetalle(id);
            store('VENTASREALIZADAS@push',{
              _id:id,
              nombre:self.nombreCliente,
              apellido:self.apellidoCliente,
              dni:self.dniCliente,
              fecha:soloFecha,
              total:self.TOTAL,
              totalganancia:self.TOTAL_GANANCIA})
              self.nombreCliente=''
              self.apellidoCliente=''
              self.dniCliente=''
          }).catch(e=>{
            console.log(e)
          })
        },
        async nuevoDetalle(idVenta){
          try{
            const self = this; 
            for(let data of self.productoVenta){
              await axios.post('http://localhost:8000/api/venta/detalle',{
                idVenta:idVenta,
                idProducto:data._id,
                subtotal:data.subtotal,
                subtotalGanancia:(data.precioVenta-data.precioBase)*data.cantidad,
                cantidad:data.cantidad
              })
              await axios.post(`http://localhost:8000/api/productos/${data._id}`,{
                stock:data.stock-data.cantidad
              });
              let productoEncontrado = self.productosDisponibles.find(function(producto) {
                return producto._id === data._id;
              });
              if (productoEncontrado) {
                console.log(productoEncontrado)
                productoEncontrado.stock=data.stock-data.cantidad;
              }
              store('productos',self.productosDisponibles)
              let sumaVentaTotal=data.subtotal
              let sumaGanaciaTotal=(data.precioVenta-data.precioBase)*data.cantidad
              store('GANANCIA_TOTAL',sumaGanaciaTotal)
              store('VENTA_TOTAL',sumaVentaTotal)
              store('TOTAL_INVENTARIO',((data.precioVenta-data.precioBase)*data.cantidad)*-1)
             }  
             

           //this.getVentas()         
           const nuevoArray=self.productoVenta.filter(objeto=>objeto._id === 'kcjknccn')
           this.productoVenta=nuevoArray
           this.TOTAL=0
          }catch(e){
            console.log(e)
          }
           
        },
        eliminarRegistro(id,precio,cantidad){
            this.TOTAL-=(precio*cantidad)
          const nuevoArray = this.productoVenta.filter(objeto => objeto._id !== id);
          this.productoVenta=nuevoArray
        },
      getDataCliente(){
          axios.get(`https://apiperu.dev/api/dni/${this.dniCliente}?api_token=7f79affab8ace91630e05ffcae6b44e906e173206016d3a5b7f3153f5a7a7e53`).
          then(datos=>{
            console.log(datos)
   
            this.nombreCliente=datos.data.data.nombres;
            this.apellidoCliente=datos.data.data.apellido_materno+' '+datos.data.data.apellido_paterno
          }).catch(e=>{
            console.log(e)
          })
            

      
        }
    },
    template://html
    `
    <div>
    <h1>{{titulo1}}</h1>
     <div><!--inicio div tabla1-->
     <div class="wrapper">
     <div class="title">
     </div>
     <div class="content">
       <ul id="id1">
       <input id="id2" type="text" spellcheck="false"></ul>
     </div>
     <div class="details">
       <button id="botonRemove">Remove All</button>
     </div>
   </div><!--fin de wrapper-->
   <div class="chat-container">
      <table>
        <tr>
          <th>PRODUCTO</th>
          <th>PRECIO</th>          
          <th>STOCK</th>
          <th></th>
        </tr>
        <tr v-for="produc in productosDisponibles">
          <td>{{produc.name}}</td>
          <td>{{produc.precioVenta}}</td>
          <td>{{produc.stock}}</td>
          <td><button @click="seleccionarProducto(produc)">agregar</button></td>
        </tr>
     </table>
    </div><!--fin div tabla 1-->
    <div><!--inicio div tabla 2-->
    <h1 >REGISTRO COMPRA</h1>
    <div class="chat-container">
      <table>        
          <tr>
            <th>DESCRIPCION</th>
            <th>PRECIO PRODUCTO</th>
            <th>SUBTOTAL</th>
            <th colspan="3">CANTIDAD</th>
            <th>-</th>
            <th>-</th>
          </tr>
          <tr v-for="data in productoVenta">
            <td>{{data.name}}</td>
            <td>{{data.precioVenta}}</td>
            <td>{{data.subtotal=data.precioVenta*data.cantidad}}</td>
            <td><button @click="restar(data.precioVenta,data.precioBase),data.cantidad--">-</button></td>
            <td>{{data.cantidad}}</td>
            <td><button @click="sumar(data.precioVenta,data.precioBase),data.cantidad++">+</button></td>
            <td><ion-icon name="trash-outline" class="btn btn-danger" @click="eliminarRegistro(data._id,data.precioVenta,data.cantidad)"></ion-icon></td>
          </tr>
          <h2>TOTAL :S/.{{TOTAL}}</h2>
      </table>
      </div>
      </div><<!--fin chat-container-->
    </div><!--fin div tabla 2-->

    <div>
       <div><!--inicio modal-->
       <button onclick="openModal()" @click="categoriaModal='venta'">hacer pedido</button>
       <button @click="guardarVenta()">guardar venta</button>
       <button onclick="openModal()" @click="categoriaModal='ventaGuardada'">ventas guardadas</button>

       <!-- Ventana Modal -->
         <div id="myModal" class="modal">
          <div class="modal-content">
           <span class="close" onclick="closeModal()">&times;</span>
           <div v-show="categoriaModal=='venta'">
            <h2>PEDIDOS:</h2>
            <div  class="chat-container"><!--inicio div tabla 2-->
               <table class="tableModal">
                  <tr>
                    <th>DESCRIPCION</th>
                    <th>P/U</th>
                    <th>CANT</th>
                    <th>SUBTOTAL</th>
                  </tr>
                  <tr v-for="data in productoVenta">
                    <td>{{data.name}}</td>
                    <td>{{data.precioVenta}}</td>
                    <td>{{data.cantidad}}</td>
                    <td>{{data.subtotal}}</td>
                  </tr>
                     <h2>TOTAL :S/.{{TOTAL}}</h2>
                 </table>
                </div><!--fin div tabla 2-->
              
            <div><!--data usuario-->
              <h3>Ingrese datos:{{dniCliente}}</h3>
              <input type="number" placeholder="dni cliente" v-model='dniCliente'/>
              <input type="text" placeholder="nombre cliente" v-model='nombreCliente'/>
              <input type="text" placeholder="opcional: apellido cliente" v-model='apellidoCliente'/>  
              
           </div><!--data usuario-->
            <div class="content-button">
              <button @click="getDataCliente()">buscar</button>
                <button type="submit" class="btn btn-success" onclick="closeModal()"  @click="registroVenta()">registrar</button>
                <button type="button" class="btn btn-danger" @click="productosDisponibles=[]" onclick="closeModal()" >cancelar</button>
            </div>
          </div><!--fin div de venta-->
            <div v-show="categoriaModal=='ventaGuardada'">
                <h1>VENTAS GUARDADAS</h1>
              <table>
                  <tr>
                    <th>CLIENTE</th>
                    <th></th>
                  </tr>
                  <tr v-for="data in productoVentaGuadado">
                    <td>{{data.nameCliente}}</td>
                    <button @click="terminarVenta(data.nameCliente,data.total)">terminar venta</button>
                  </tr>
                </table>
              </div><!--fin div de ventaGuarda-->
          </div>          

             <!--xfinal modal-->
       </div><!--fin modal-->

    </div>
    </div>
    </div>
    `
})


