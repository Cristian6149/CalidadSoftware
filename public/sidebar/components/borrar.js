Vue.component("categoria",{
    data(){
        return {
            veribalance:'balance',
            registrosActivos:[],
            registrosPatrimonios:[],
            registrosPasivos:[],
            registroDetalle1:[],
            registroDetalle2:[],
            RegistroElegido:[],
            titleCategoria:"",
            titleBalance:"",
            dataNueva:"",
            dataNuevaBalance:"",
            estadoDataNueva:false,
            IDcategoria1:0,
            IDcategoria2:0,
            nombreNuevoDetalle:"",
            descripcionNuevoDetalle:"",
            monto:0
        }
    },
    mounted(){
        this.getCategoriaActivos(),
        this.getCategoriaPasivos(),
        this.getCategoriaPatrimonios(),
        this.getDetalles(-2),
        this.getRegistroElegido(-2)
    },
    methods:{
        setTitleModal(balance,categoria){
            this.titleBalance=balance;
            this.titleCategoria=categoria;
        },
        getRegistroElegido(id){
            const self= this;
            switch (id) {
                case 1:
                    self.RegistroElegido=self.registrosActivos;
                    self.dataNuevaBalance="ACTIVO"
                    break;
                case 2:
                    self.RegistroElegido=self.registrosPasivos;
                    self.dataNuevaBalance="PASIVO"
                    break;
                case 3:
                    self.RegistroElegido=self.registrosPatrimonios;
                    self.dataNuevaBalance="PATRIMONIO"
                    ;
                    break;
                default:
                    self.RegistroElegido=[];
                    break;
            }    
        },
        async getCategoriaActivos(){
            const self = this;
            const result= await axios.get(`http://localhost:9000/api/categoria/1/balance`);
            self.registrosActivos= result.data.map(e=>{
                return e;
            })
        },
        async getCategoriaPasivos(){
            const self = this;
            const result= await axios.get(`http://localhost:9000/api/categoria/2/balance`);
            self.registrosPasivos= result.data.map(e=>{
                return e;
            })
        },
        async getCategoriaPatrimonios(){
            const self = this;
            const result= await axios.get(`http://localhost:9000/api/categoria/3/balance`);
            self.registrosPatrimonios= result.data.map(e=>{
                return e;
            })
        },
        async getDetalles(id){
            const self = this;
            const result = await axios.get(`http://localhost:9000/api/detalle/${id}/categoria`);
            const result2 = await axios.get(`http://localhost:9000/api/detalle/${id}/categoria2`);
            self.registroDetalle1=result.data.map(e=>{
                return e;
            })
            self.registroDetalle2=result2.data.map(res=>{
                return res;
            })
        },
        setDetalle(cat1,cat2,nombre,descripcion,monto){
          axios.post('http://localhost:9000/api/detalle',{
             "cat1":cat1,
             "cat2":cat2,
             "nombre":nombre,
             "descripcion":descripcion,
             "monto":monto
          })
          axios.post('http://localhost:9000/api/categoria',{
            "cat1":cat1,
            "monto":monto
          })
          axios.post('http://localhost:9000/api/categoria2',{
            "cat2":cat2,
            "monto":monto
          })
        }
        
    },template://html
     `
     <div class="container">
     <table >
      <tr><th>ACTIVOS</th></tr>
       <tr v-for="activos in registrosActivos">
         <td>{{activos.nombre}}</td>
         <td>S/.{{activos.subTotal}}</td>
          <button @click="getDetalles(activos.ID_categoria),setTitleModal('ACTIVO',activos.nombre)" class="btn btn-success btn-block btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">ver detalle</button>
          <button @click="IDcategoria1=activos.ID_categoria" class="btn btn-danger btn-block btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop">agregar</button>
       </tr>
     <br>
     <tr><th>PASIVOS</th></tr>
        <tr v-for="pasivos in registrosPasivos">
          <td>{{pasivos.nombre}}</td>
          <td>S/.{{pasivos.subTotal}}</td>
          <button  @click="getDetalles(pasivos.ID_categoria),setTitleModal('PASIVO',pasivos.nombre)" class="btn btn-success btn-block btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">ver detalle</button>
          <button class="btn btn-danger btn-block btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop">agregar</button>
      </tr>
     <br>
      <tr><th>PATRIMONIOS</th></tr>
       <tr v-for="patrimonios in registrosPatrimonios">
        <td>{{patrimonios.nombre}}</td>
        <td>  S/.{{patrimonios.subTotal}}</td>
        <button  @click="getDetalles(patrimonios.ID_categoria),setTitleModal('PATRIMONIO',patrimonios.nombre)" class="btn btn-success btn-block btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">ver detalle</button>
        <button class="btn btn-danger btn-block btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop">agregar</button>
      </tr>
     </table>
     <button class="btn btn-primary">CALCULAR</button>
     <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">{{titleBalance}} : {{titleCategoria}}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <table>
        <tr v-for="detalle1 in registroDetalle1"><td>{{detalle1.nombre}}</td>   S/.<td>{{detalle1.monto}}</td></tr>
        <tr v-for="detalle2 in registroDetalle2"><td>{{detalle2.nombre}}</td>   S/.<td>{{detalle2.monto}}</td></tr>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<!--VENTANA MODAL 2-->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">REGISTRO</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <label>INGRESE MONTO      S/.<input type="number" v-model="monto"></label>
        <label>INGRESE NOMBRE       :<input type="text" v-model="nombreNuevoDetalle"></label>
        <label>INGRESE DESCRIPCION  :<input type="text" v-model="descripcionNuevoDetalle"></label>
          <h2>relacionar con -> </h2><button class="btn btn-danger">calcular</button>
           <button @click="getRegistroElegido(1)">ACTIVO</button>
           <button @click="getRegistroElegido(2)">PASIVO</button>
           <button @click="getRegistroElegido(3)">PATRIMONIO</button>
           <table>
             <tr v-for="register in RegistroElegido">
               <td>{{register.nombre}}</td>
               <button @click="dataNueva=register.nombre,estadoDataNueva=true,IDcategoria2=register.ID_categoria">selecionar</button>
             </tr>
           </table>
           <h1 v-if="estadoDataNueva==true">{{dataNuevaBalance}}  : {{dataNueva}}</h1>
      </div>
      <div class="modal-footer" v-if="estadoDataNueva==true">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >CANCELAR</button>
        <button @click="setDetalle(IDcategoria1,IDcategoria2,nombreNuevoDetalle,descripcionNuevoDetalle,monto)" onclick="location.reload()" type="button" class="btn btn-primary" data-bs-dismiss="modal">AGREGAR</button>
      </div>
    </div>
  </div>
</div>
     </div>
    `
})