Vue.component("inmuebles",{
    data(){
        return {
            title:"PROPIEDADES, PLANTA Y EQUIPO",
            registropropiedad:[],
            registroequipo:[],
            section:"",
            nuevoValorPropiedad:"",
            nombreNuevo:"",
            descripcionNuevo:"",
            saldoNuevo:"",
            idCollection:"",
            sumaTotalEquipo:0,
            sumaTotalPropiedad:0,
            valorActual:0
        }
    },
    mounted(){
       this.dataEquipo();
       this.dataPropiedad();
    },
    methods:{
      async dataEquipo(){
        this.sumaTotalEquipo=0;
        let data = await axios.get('http://localhost:8000/api/equipo')
        this.registroequipo=data.data.map(e=>{
          this.sumaTotalEquipo+=e.valor;
          return e
        })
        store('TOTAL_EQUIPO', this.sumaTotalEquipo)
      },
      async dataPropiedad(){
        this.sumaTotalPropiedad=0;
        let data = await axios.get('http://localhost:8000/api/propiedades')
        this.registropropiedad=data.data.map(e=>{
          this.sumaTotalPropiedad+=e.valor;
          return e
        })
        store('TOTAL_PROPIEDAD',this.sumaTotalPropiedad)
      },

      async agregarPropiedades(){
        await axios.post('http://localhost:8000/api/propiedades',{
          nombre:this.nombreNuevo,
          descripcion:this.descripcionNuevo,
          valor:this.saldoNuevo
        })

        this.sumaTotalPropiedad=0;
        let data = await axios.get('http://localhost:8000/api/propiedades')
        this.registropropiedad=data.data.map(e=>{
          this.sumaTotalPropiedad+=e.valor;
          return e
        })
        store('TOTAL_PROPIEDAD',parseInt(this.saldoNuevo))
      },

      async agregarEquipo(){
         await axios.post('http://localhost:8000/api/equipo',{
          nombre:this.nombreNuevo,
          descripcion:this.descripcionNuevo,
          valor:parseInt(this.saldoNuevo)
        })

        this.sumaTotalEquipo=0;
        let data = await axios.get('http://localhost:8000/api/equipo')
        this.registroequipo=data.data.map(e=>{
          this.sumaTotalEquipo+=e.valor;
          return e
        })
        store('TOTAL_EQUIPO', parseInt(this.saldoNuevo))
      },

      async actualizarEquipo(){
         await axios.post(`http://localhost:8000/api/equipo/${this.idCollection}`,{
          valor:parseInt(this.nuevoValorPropiedad)
        })

        this.sumaTotalEquipo=0;
        let data = await axios.get('http://localhost:8000/api/equipo')
        this.registroequipo=data.data.map(e=>{
          this.sumaTotalEquipo+=e.valor;
          return e
        })
        let = nuevoValor=0;
        if(parseInt(this.valorActual)>parseInt(this.nuevoValorPropiedad)){
          nuevoValor=parseInt(this.valorActual)-parseInt(this.nuevoValorPropiedad)
        }else{
          nuevoValor=parseInt(this.nuevoValorPropiedad)-parseInt(this.valorActual)
        }
        store('TOTAL_EQUIPO',nuevoValor)
      },

      async actualizarPropiedades(){
         await axios.post(`http://localhost:8000/api/propiedades/${this.idCollection}`,{
          valor:parseInt(this.nuevoValorPropiedad)
        })

        this.sumaTotalPropiedad=0;
        let data = await axios.get('http://localhost:8000/api/propiedades')
        this.registropropiedad=data.data.map(e=>{
          this.sumaTotalPropiedad+=e.valor;
          return e
        })
        let = nuevoValor=0;
        if(parseInt(this.valorActual)>parseInt(this.nuevoValorPropiedad)){
          nuevoValor=parseInt(this.valorActual)-parseInt(this.nuevoValorPropiedad)
        }else{
          nuevoValor=parseInt(this.nuevoValorPropiedad)-parseInt(this.valorActual)
        }
        store('TOTAL_PROPIEDAD',nuevoValor)
      }
    },
    template://html
    `
    <div>
      <h1>{{title}}</h1>
       <h4>PROPIEDADES</h4>
        <table>
         <tr>
           <th>Propiedad Registr.</th>
           <th>Direcc.</th>
           <th>Valor</th>
         </tr>
         <tr v-for="data in registropropiedad">
           <td>{{data.nombre}}</td>
           <td>{{data.descripcion}}</td>
           <td>{{data.valor}}</td>
           <button @click="section='actualizarValorPropiedad',idCollection=data._id,valorActual=data.valor" onclick="openModal5()">actualizar valor</button>
         </tr>
         <h4>TOTAL:  S/ {{sumaTotalPropiedad}}</h4>
         <button @click="section='agregarPropiedad'" onclick="openModal5()">agregar</button>
        </table>

        <h4>EQUIPO</h4>
        <table>
         <tr>
           <th>Equipo Registr.</th>
           <th>Descrip.</th>
           <th>Valor</th>
         </tr>
         <tr v-for="data in registroequipo">
           <td>{{data.nombre}}</td>
           <td>{{data.descripcion}}</td>
           <td>{{data.valor}}</td>
           <button @click="section='actualizarValorEquipo',idCollection=data._id,valorActual=data.valor" onclick="openModal5()">actualizar valor</button>
         </tr>
         <h4>TOTAL:  S/ {{sumaTotalEquipo}}</h4>
         <button @click="section='agregarEquipo'" onclick="openModal5()">agregar</button>
        </table>



        <div><!--inicio modal-->
        <div id="myModal5" class="modal5">
         <div class="modal-content5">
          <span class="close5" onclick="closeModal5()">&times;</span>
           <div><!--contenido-->
               <div v-show="section=='actualizarValorPropiedad'">
                     <h1>Actualizar valor de Propiedad</h1>
                     <input type=number placeholder="ingrese nuevo valor" v-model="nuevoValorPropiedad"/>
                     <button @click="actualizarPropiedades()" onclick="closeModal5()">agregar</button>
                     <button   onclick="closeModal5()">cancelar</button>            
               </div>
               <div v-show="section=='agregarPropiedad'">
                   <h1>agregar Propiedad</h1>
                   <input type="text" placeholder="ingrese nombre" v-model="nombreNuevo"/>
                   <input type="text" placeholder="ingrese descripcion" v-model="descripcionNuevo"/>
                   <input type="number" placeholder="ingrese valor de propiedad" v-model="saldoNuevo"/>
                   <button @click="agregarPropiedades()" onclick="closeModal5()">agregar</button>
                   <button   onclick="closeModal5()">cancelar</button>
               </div>           
                 <div v-show="section=='actualizarValorEquipo'">
                 <h1>Actualizar valor de Equipo</h1>
                 <input type=number placeholder="ingrese nuevo valor" v-model="nuevoValorPropiedad"/>
                 <button @click="actualizarEquipo()" onclick="closeModal5()">agregar</button>
                 <button   onclick="closeModal5()">cancelar</button>            
               </div>
               <div v-show="section=='agregarEquipo'">
                 <h1>agregar Equipo</h1>
                 <input type="text" placeholder="ingrese nombre" v-model="nombreNuevo"/>
                 <input type="text" placeholder="ingrese descripcion" v-model="descripcionNuevo"/>
                 <input type="number" placeholder="ingrese valor de equipo" v-model="saldoNuevo"/>
                 <button @click="agregarEquipo()" onclick="closeModal5()">agregar</button>
                 <button   onclick="closeModal5()">cancelar</button>
               </div> 
           </div><!--contenido--> 
         </div> 
       </div>
      </div><!--fin modal-->



    </div>
    `
})