Vue.component("cuentas",{
    data(){
        return{
            title:"MENU DE CUENTAS",
            registroSaldo:[],
            registroPrestamoCortoPlazo:[],
            registroPrestamoLargoPlazo:[],
            registroCapitalSocial:[],
            section:"",
            retiro:"",
            idretiro:"",
            saldoretiro:"",
            nombreNuevo:"",
            saldoNuevo:"",
            newSaldo:0,
            band:false,
            sumaTotalCuenta:0,
            sumaTotalCortoPlazo:0,
            sumaTotalLargoPlazo:0,
            sumaTotalCapitalSocial:0,
            mandarCompleto:0
        }
    },
    mounted(){
        this.getSaldo();
        this.getPrestamoCortoPlazo();
        this.getPrestamoLargoPlazo();
        this.getCapitalSocial();
    },
    methods:{
       async getSaldo(){
        this.sumaTotalCuenta=0;
         const result = await axios.get('http://localhost:8000/api/cuentas');
         this.registroSaldo = result.data.map(res=>{
          this.sumaTotalCuenta+=res.saldo;
          return res;
         })
         store('TOTAL_BANCO', this.sumaTotalCuenta)
        
       },
       async getPrestamoCortoPlazo(){
        this.sumaTotalCortoPlazo=0;
        const result = await axios.get('http://localhost:8000/api/registroprestamocortoplazo')
        this.registroPrestamoCortoPlazo = result.data.map(res=>{
          this.sumaTotalCortoPlazo+=res.saldo;
         return res;
        })
        store('TOTAL_CORTOPLAZO',this.sumaTotalCortoPlazo)
      },
       async getPrestamoLargoPlazo(){
        this.sumaTotalLargoPlazo=0;
        const result = await axios.get('http://localhost:8000/api/registroprestamolargoplazo')
        this.registroPrestamoLargoPlazo = result.data.map(res=>{
          this.sumaTotalLargoPlazo+=res.saldo;
         return res;
        })
        store('TOTAL_LARGOPLAZO',this.sumaTotalLargoPlazo)
      },
     
      async getCapitalSocial(){
        this.sumaTotalCapitalSocial=0;
        const result = await axios.get('http://localhost:8000/api/registrocapitalsocial')
          this.registroCapitalSocial = result.data.map(res=>{
          this.sumaTotalCapitalSocial+=res.saldo;
         return res;
        })
         store('SUMA_CAPITALSOCIAL',this.sumaTotalCapitalSocial)
       },
      async setSaldo(){
        const self = this;       
        let nuevoSaldo =self.band ? parseInt(self.saldoretiro)+parseInt(self.retiro) : parseInt(self.saldoretiro)-parseInt(self.retiro);
        await axios.post(`http://localhost:8000/api/registrocuenta/${self.idretiro}`,{
          saldo:nuevoSaldo
        })
          this.sumaTotalCuenta=0;
          let resultado= await axios.get('http://localhost:8000/api/cuentas');
          this.registroSaldo=resultado.data.map(e=>{
            this.sumaTotalCuenta+=e.saldo;
            return e
          })
          let dataEnvio = self.band ?parseInt(self.retiro) : parseInt(self.retiro)*(-1)
           store('TOTAL_BANCO',dataEnvio)   
       },
      async setPrestamoCortoPlazo(){
        const self = this;
        let nuevoSaldo =self.band ? parseInt(self.saldoretiro)+parseInt(self.retiro) : parseInt(self.saldoretiro)-parseInt(self.retiro);

       await axios.post(`http://localhost:8000/api/registrocortoplazo/${self.idretiro}`,{
        saldo:nuevoSaldo
       })

       this.sumaTotalCortoPlazo=0;
       const result = await axios.get('http://localhost:8000/api/registroprestamocortoplazo')
       this.registroPrestamoCortoPlazo = result.data.map(res=>{
         this.sumaTotalCortoPlazo+=res.saldo;
        return res;
       })
       let dataEnvio = self.band ?parseInt(self.retiro) : parseInt(self.retiro)*(-1)
       store('TOTAL_CORTOPLAZO',dataEnvio)



       },
      async setPrestamoLargoPlazo(){
        const self = this;
        let nuevoSaldo =self.band ? parseInt(self.saldoretiro)+parseInt(self.retiro) : parseInt(self.saldoretiro)-parseInt(self.retiro);
       await axios.post(`http://localhost:8000/api/registrolargoplazo/${self.idretiro}`,{
        saldo:nuevoSaldo
       })
/****************** */
this.sumaTotalLargoPlazo=0;
       const result = await axios.get('http://localhost:8000/api/registroprestamolargoplazo')
       this.registroPrestamoLargoPlazo = result.data.map(res=>{
         this.sumaTotalLargoPlazo+=res.saldo;
        return res;
       })
       let dataEnvio = self.band ?parseInt(self.retiro) : parseInt(self.retiro)*(-1)
       store('TOTAL_LARGOPLAZO',dataEnvio)

/****************************************** */

       },    
     async setCapitalSocial(){
      const self = this;
      let nuevoSaldo =self.band ? parseInt(self.saldoretiro)+parseInt(self.retiro) : parseInt(self.saldoretiro)-parseInt(self.retiro);
       await axios.post(`http://localhost:8000/api/registrocapital/${self.idretiro}`,{
        saldo:nuevoSaldo
       })


      /****************** */
this.sumaTotalCapitalSocial=0;
const result = await axios.get('http://localhost:8000/api/registrocapitalsocial')
this.registroCapitalSocial = result.data.map(res=>{
  this.sumaTotalCapitalSocial+=res.saldo;
 return res;
})
let dataEnvio = self.band ?parseInt(self.retiro) : parseInt(self.retiro)*(-1)
store('SUMA_CAPITALSOCIAL',dataEnvio)

/****************************************** */




      },
      async newCuenta(){
        axios.post(`http://localhost:8000/api/registrocuenta`,{
          nombre:this.nombreNuevo,
          saldo:parseInt(this.saldoNuevo)
        })
        this.sumaTotalCuenta=0;
        const result = await axios.get('http://localhost:8000/api/cuentas');
        this.registroSaldo = result.data.map(res=>{
         this.sumaTotalCuenta+=res.saldo;
         return res;
        })
        store('TOTAL_BANCO', parseInt(this.saldoNuevo))
        this.nombreNuevo=""
        this.saldoNuevo=""
      },

      async newCortoPlazo(){
        axios.post(`http://localhost:8000/api/registroprestamocortoplazo`,{
          nombre:this.nombreNuevo,
          saldo:this.saldoNuevo
        })

        this.sumaTotalCortoPlazo=0;
        const result = await axios.get('http://localhost:8000/api/registroprestamocortoplazo')
        this.registroPrestamoCortoPlazo = result.data.map(res=>{
          this.sumaTotalCortoPlazo+=res.saldo;
         return res;
        })
        store('TOTAL_CORTOPLAZO',parseInt(this.saldoNuevo))
        this.nombreNuevo=""
          this.saldoNuevo=""
      },

      async newLargoPlazo(){
        axios.post(`http://localhost:8000/api/registroprestamolargoplazo`,{
          nombre:this.nombreNuevo,
          saldo:this.saldoNuevo
        })

        this.sumaTotalLargoPlazo=0;
        const result = await axios.get('http://localhost:8000/api/registroprestamolargoplazo')
        this.registroPrestamoLargoPlazo = result.data.map(res=>{
          this.sumaTotalLargoPlazo+=res.saldo;
         return res;
        })
        store('TOTAL_LARGOPLAZO',parseInt(this.saldoNuevo))
        this.nombreNuevo=""
          this.saldoNuevo=""
      },

      async newCapitalSocial(){
        axios.post(`http://localhost:8000/api/registrocapitalsocial`,{
          nombre:this.nombreNuevo,
          saldo:this.saldoNuevo
        })

        this.sumaTotalCapitalSocial=0;
        const result = await axios.get('http://localhost:8000/api/registrocapitalsocial')
          this.registroCapitalSocial = result.data.map(res=>{
          this.sumaTotalCapitalSocial+=res.saldo;
         return res;
        })
         store('SUMA_CAPITALSOCIAL',parseInt(this.saldoNuevo))
         this.nombreNuevo=""
          this.saldoNuevo=""
      }
  },
    template://html
    `
    <div>
      <h1>{{title}}</h1>
      <h4>SALDO EN CUENTA</h4>
       <table border="2d">
         <tr>
          <th>E. BANCARIA</th>
          <th>M. DISPONIBLE</th>
         </tr>
         <tr v-for="data in registroSaldo">
          <td>{{data.nombre}}</td>
          <td>{{data.saldo}}</td>
          <button @click="section='retirarSaldo',idretiro=data._id,saldoretiro=data.saldo,band=false" onclick="openModal4()">retirar</button>
          <button @click="section='retirarSaldo',idretiro=data._id,saldoretiro=data.saldo,band=true" onclick="openModal4()">depositar</button>
        </tr>
        <h4>TOTAL : S/{{sumaTotalCuenta}}</h4>
        <button @click="section='agregarCuenta'" onclick="openModal4()">agregar</button>
      </table>

      <h4>PRESTAMOS BANCARIOS ->CORTO PLAZO<- i/o otrs</h4>
       <table border="2d">
         <tr>
          <th>E. BANCARIA</th>
          <th>M. PRESTADO</th>
          <th></th>
         </tr>
         <tr v-for="data in registroPrestamoCortoPlazo">
         <td>{{data.nombre}}</td>
         <td>{{data.saldo}}</td>
         <button @click="section='retirarCortoPlazo',idretiro=data._id,saldoretiro=data.saldo,band=false" onclick="openModal4()">disminuir</button>
         <button @click="section='retirarCortoPlazo',idretiro=data._id,saldoretiro=data.saldo,band=true" onclick="openModal4()">aumentar</button>
        </tr>
        <h4>TOTAL : S/{{sumaTotalCortoPlazo}}</h4>
        <button @click="section='agregarCortoPlazo'" onclick="openModal4()">agregar</button>
      </table>

      <h4>PRESTAMOS BANCARIOS ->LARGO PLAZO<- i/o otrs</h4>
      <table border="2d">
        <tr>
         <th>E. BANCARIA</th>
         <th>M. PRESTADO</th>
         <th></th>
        </tr>
        <tr v-for="data in registroPrestamoLargoPlazo">
        <td>{{data.nombre}}</td>
        <td>{{data.saldo}}</td>
        <button @click="section='retirarLargoPlazo',idretiro=data._id,saldoretiro=data.saldo,band=false" onclick="openModal4()">disminuir</button>
        <button @click="section='retirarLargoPlazo',idretiro=data._id,saldoretiro=data.saldo,band=true" onclick="openModal4()">aumentar</button>
       </tr>
       <h4>TOTAL : S/{{sumaTotalLargoPlazo}}</h4>
       <button @click="section='agregarLargoPlazo'" onclick="openModal4()">agregar</button>
     </table>

      <h4>Capital Social i/o otrs</h4>
       <table border="2d">
         <tr>
          <th>Nom. Socio</th>
          <th>M. Efectuado</th>
          <th></th>
         </tr>
         <tr v-for="data in registroCapitalSocial">
         <td>{{data.nombre}}</td>
         <td>{{data.saldo}}</td>
         <button @click="section='retirarCapitalSocial',idretiro=data._id,saldoretiro=data.saldo,band=false" onclick="openModal4()">retirar</button>
         <button @click="section='retirarCapitalSocial',idretiro=data._id,saldoretiro=data.saldo,band=true" onclick="openModal4()">aumentar</button>
        </tr>
        <h4>TOTAL : S/{{sumaTotalCapitalSocial}}</h4>        
        <button @click="section='agregaCapitalSocial'" onclick="openModal4()">agregar</button>
      </table>
      

      <div><!--inicio modal-->
        <div id="myModal4" class="modal4">
         <div class="modal-content4">
          <span class="close4" onclick="closeModal4()">&times;</span>
           <div><!--contenido-->
               <div v-show="section=='retirarSaldo'">
                     <h1 v-show="band==false">retirarSaldo {{band}}</h1>
                     <h1 v-show="band==true">aumentarSaldo {{band}}</h1>
                     <input type=number placeholder="ingrese mont. " v-model="retiro"/>
                     <button @click="setSaldo()" onclick="closeModal4()">agregar</button>
                     <button   onclick="closeModal4()">cancelar</button>            
               </div>
               <div v-show="section=='agregarCuenta'">
               <h1>agregarCuenta</h1>
               <input type="text" placeholder="ingrese nombre" v-model="nombreNuevo"/>
               <input type="number" placeholder="ingrese monto" v-model="saldoNuevo"/>
               <button @click="newCuenta()" onclick="closeModal4()">agregar</button>
                     <button   onclick="closeModal4()">cancelar</button>
               </div>           
               <div v-show="section=='retirarCortoPlazo'">
                      <h1 v-show="band==false">retirarCortoPlazo {{saldoretiro}}</h1>
                      <h1 v-show="band==true">aumentarCortoPlazo {{saldoretiro}}</h1>
                      <input type=number placeholder="ingrese mont. " v-model="retiro"/>
                      <button @click="setPrestamoCortoPlazo()" onclick="closeModal4()">agregar</button>
                      <button   onclick="closeModal4()">cancelar</button> 
               </div>
               <div v-show="section=='agregarCortoPlazo'">
                      <h1>agregarCortoPlazo</h1>
                      <input type="text" placeholder="ingrese nombre" v-model="nombreNuevo"/>
               <input type="number" placeholder="ingrese monto" v-model="saldoNuevo"/>
               <button @click="newCortoPlazo()" onclick="closeModal4()">agregar</button>
                     <button   onclick="closeModal4()">cancelar</button>
               </div>
               <div v-show="section=='retirarLargoPlazo'">
                      <h1 v-show="band==false">retirarLargoPlazo</h1>
                      <h1 v-show="band==true">aumentarLargoPlazo</h1>
                      <input type=number placeholder="ingrese mont. " v-model="retiro"/>
                     <button @click="setPrestamoLargoPlazo()" onclick="closeModal4()">agregar</button>
                     <button   onclick="closeModal4()">cancelar</button>  
               </div>
               <div v-show="section=='agregarLargoPlazo'">
                      <h1>agregarLargoPlazo</h1>
                      <input type="text" placeholder="ingrese nombre" v-model="nombreNuevo"/>
               <input type="number" placeholder="ingrese monto" v-model="saldoNuevo"/>
               <button @click="newLargoPlazo()" onclick="closeModal4()">agregar</button>
                     <button   onclick="closeModal4()">cancelar</button>
               </div>
               <div v-show="section=='retirarCapitalSocial'">
                      <h1 v-show="band==false">retirarCapitalSocial</h1>
                      <h1 v-show="band==true">aumentarCapitalSocial</h1>
                      <input type=number placeholder="ingrese mont. retirar" v-model="retiro"/>
                     <button @click="setCapitalSocial()" onclick="closeModal4()">agregar</button>
                     <button   onclick="closeModal4()">cancelar</button>  
               </div>
               <div v-show="section=='agregaCapitalSocial'">
                      <h1>agregarCapitalSocial</h1>
                      <input type="text" placeholder="ingrese nombre" v-model="nombreNuevo"/>
                      <input type="number" placeholder="ingrese monto" v-model="saldoNuevo"/>
                      <button @click="newCapitalSocial()" onclick="closeModal4()">agregar</button>
                      <button   onclick="closeModal4()">cancelar</button>
               </div>
           </div><!--contenido--> 
         </div> 
       </div>
      </div><!--fin modal-->
    </div>
    `
})