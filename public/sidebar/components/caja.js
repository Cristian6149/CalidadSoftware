Vue.component("caja", {
    data(){
        return{
            titleventa:"VENTAS",
            titleDineroRetirado:"RETIROS",
            opcionCaja:"",
            tipo:'',
            nameCaja:'',
            descripcion:'',
            monto:0,
            registroMovimientos:[]
        }
    },
    methods:{
    guardaIngreso(){
         let veri = confirm("estas seguro de continuar?")
         if(veri){
          axios.post('http://localhost:8000/api/caja',{
            tipo:this.tipo,
            name:this.nameCaja,
            descripcion:this.descripcion,
            monto:this.monto
        }).then(res=>{
          alert("INGRESO GUARDADO")
          console.log(res)
          this.opcionCaja=""
          this.tipo=''
          this.nameCaja=''
          this.descripcion=''
          this.monto=0
          closeModal6()
        })
         }else{
          this.opcionCaja=""
          this.tipo=''
          this.nameCaja=''
          this.descripcion=''
          this.monto=0
          alert("INGRESO CANCELADO")
          closeModal6()
         }
      },
    guardaRetiro(){
      let veri = confirm("estas seguro de continuar?")
      if(veri){
        axios.post('http://localhost:8000/api/caja',{
            tipo:this.tipo,
            name:this.nameCaja,
            descripcion:this.descripcion,
            monto:this.monto
        }).then(res=>{
          alert("RETIRO GUARDADO")
          console.log(res)
          this.opcionCaja=""
          this.tipo=''
          this.nameCaja=''
          this.descripcion=''
          this.monto=0
          closeModal6()
        })
       
      }else{
        this.opcionCaja=""
          this.tipo=''
          this.nameCaja=''
          this.descripcion=''
          this.monto=0
       alert("RETIRO CANCELADO")
       closeModal6()
      }}
   },
    template://html
     `
    <div> 
     <div class="cotenido-tabla-caja">
       <table>
            <tr>
              <th>detalle</th>
              <th colspan="3">monto</th> 
            </tr>
            <tr class="efectivo">
              <td>tienda</td>
              <td>S/.</td>
              <td><div class="contenedor" @click="opcionCaja='retirar',tipo='EGRESO',nameCaja='tienda'" onclick="openModal6()"><!--inicio contenedor-->
                      <div class="icono">
                      <ion-icon name="skull-outline"></ion-icon>
                        <div class="texto eliminar">
                         <p >RETIRAR</p>
                        </div>
                      </div>
                    </div></td><!--fin contenedor-->
                    <td><div class="contenedor" @click="opcionCaja='agregar',tipo='INGRESO',nameCaja='tienda'" onclick="openModal6()"><!--inicio contenedor-->
                    <div class="icono">
                    <ion-icon name="cash-outline"></ion-icon>
                      <div class="texto modificar">
                       <p >AGREGAR</p>
                      </div>
                    </div>
                  </div></td><!--fin contenedor-->
            </tr>
            <tr class="intebank">
              <td>interbank</td>
              <td>S/.</td>
              <td><div class="contenedor" @click="opcionCaja='retirar',tipo='EGRESO',nameCaja='interbank'" onclick="openModal6()"><!--inicio contenedor-->
              <div class="icono">
              <ion-icon name="skull-outline"></ion-icon>
                <div class="texto eliminar">
                 <p >RETIRAR</p>
                </div>
              </div>
            </div></td><!--fin contenedor-->
            <td><div class="contenedor" @click="opcionCaja='agregar',tipo='INGRESO',nameCaja='interbank'" onclick="openModal6()"> <!--inicio contenedor-->
            <div class="icono">
            <ion-icon name="cash-outline"></ion-icon>
              <div class="texto modificar">
               <p >AGREGAR</p>
              </div>
            </div>
          </div></td><!--fin contenedor-->
            </tr>
            <tr class="bcp">
              <td >bcp</td>
              <td>S/.</td>
              <td><div class="contenedor" @click="opcionCaja='retirar',tipo='EGRESO',nameCaja='bcp'" onclick="openModal6()"><!--inicio contenedor-->
              <div class="icono">
              <ion-icon name="skull-outline"></ion-icon>
                <div class="texto eliminar">
                 <p >RETIRAR</p>
                </div>
              </div>
            </div></td><!--fin contenedor-->
            <td><div class="contenedor" @click="opcionCaja='agregar',tipo='INGRESO',nameCaja='bcp'" onclick="openModal6()"><!--inicio contenedor-->
            <div class="icono">
            <ion-icon name="cash-outline"></ion-icon>
              <div class="texto modificar">
               <p >AGREGAR</p>
              </div>
            </div>
          </div></td><!--fin contenedor-->
            </tr>
        </table>
     </div>
      <!-- Ventana Modal -->
       <div id="myModal6" class="modal6">
         <div class="modal-content6">
           <span class="close6" onclick="closeModal6()">&times;</span>
           
           <div v-show="opcionCaja=='agregar'">
             <h3>INGRESO</h3>
             <h3>{{nameCaja}}</h3>
             <label>ingrese razon:<input type="text" v-model="descripcion" /></label>
             <label>ingrese monto:<input type="number" v-model="monto"/></label>
             <button @click="guardaIngreso()">Guardar Ingreso</button>
           </div>
           <div v-show="opcionCaja=='retirar'">
             <h3>RETIRO</h3>
             <h3>{{nameCaja}}</h3>
             <label>ingrese razon:<input type="text"  v-model="descripcion"/></label>
             <label>ingrese monto:<input type="number" v-model="monto"/></label>
             <button @click="guardaRetiro()">Guardar Retiro</button>
           </div>

          </div><!--xfinal modal-->
        </div><!--fin modal-->

     </div><!--div principal final-->
     `   
})