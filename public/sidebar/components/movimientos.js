Vue.component("movimientos",{
    data(){
        return{
            title:"movimientos DESDE COMPONENTE",
            registroMovimientos:[],
            registroMovimientos3:[],
            date1:'',
            date2:'',
            data:[{tipo:[]},{name:[]}]
        }
    },
    methods:{ 
      getMovimientosDetallado(){
        let movimientos=this.registroMovimientos
        if(this.data[0].tipo.length===0 && this.data[1].name.length===0){
          this.registroMovimientos3=this.registroMovimientos
        }else{
          if(this.data[0].tipo.length>0){
            if(this.data[0].tipo.length===2) console.log('no hay nada que hacer tu queres los dos')
            if(this.data[0].tipo.length===1){
              movimientos=movimientos.filter(response=>{return response.tipo === this.data[0].tipo[0]})
            }

          }
          if(this.data[1].name.length>0){
            if(this.data[1].name.length===3) console.log('no hay nada que hacer tu queres los dos')
            if(this.data[1].name.length===1){
              movimientos=movimientos.filter(response=>{return response.name === this.data[1].name[0]})
            }
            if(this.data[1].name.length===2){
              movimientos=movimientos.filter(response=>{return response.name === this.data[1].name[0] || response.name === this.data[1].name[1]})
            }
          }
          this.registroMovimientos3=movimientos;
        }
      },
        getmovimientos(){
            axios.get(`http://localhost:8000/api/caja/?q=${this.date1}&q2=${this.date2}`)
            .then((response)=>{
              this.registroMovimientos=[]
              for(data of response.data){
                this.registroMovimientos.push(data)
              }
              this.getMovimientosDetallado()
              this.date1=''
              this.date2=''
           })
         },
          exitsFilter(item,key){
           if(item==="tipo"){
            if(this.data[0].tipo.length===0){
              this.data[0].tipo.push(key)
              this.getMovimientosDetallado()
            }else{
              let index =this.data[0].tipo.indexOf(key)
              if(index===-1){
                this.data[0].tipo.push(key)
                this.getMovimientosDetallado()
              }else{
                this.data[0].tipo.splice(index,1);
                this.getMovimientosDetallado()
              }
           }
          }
          if(item==="name"){
            if(this.data[1].name.length===0){
              this.data[1].name.push(key)
              this.getMovimientosDetallado()
            }else{
              let index =this.data[1].name.indexOf(key)
              if(index===-1){
                this.data[1].name.push(key)
                this.getMovimientosDetallado()
              }else{
                this.data[1].name.splice(index,1);
                this.getMovimientosDetallado()
              }
           }
          }
   }
  },
    template://html
    `<div>
     <h1>{{title}}</h1>
     <h3>{{date1}}</h3>
     <input type="date" v-model="date1"/>
     <input type="date" v-model="date2"/>
     <div class="contenButtonMovimiento">
     <button @click="exitsFilter('tipo','INGRESO')">INGRESO</button>
     <button @click="exitsFilter('tipo','EGRESO')">EGRESO</button>
     <button @click="exitsFilter('name','interbank')">INTERBANK</button>
     <button @click="exitsFilter('name','bcp')">BCP</button>
     <button @click="exitsFilter('name','tienda')">TIENDA</button>
     <button @click="this.registroMovimientos3=[],getmovimientos()">obtener movimientos</button>
     </div>
     <table>
      <tr>
       <th>fecha</th>
       <th>tipo</th>
       <th>entidad</th>
       <th>descripcion</th>
       <th>monto</th>
      </tr>
      <tr v-for="data in registroMovimientos3">
        <td>{{data.fecha}}</td>
        <td>{{data.tipo}}</td>
        <td>{{data.name}}</td>
        <td>{{data.descripcion}}</td>
        <td>{{data.monto}}</td>
      </tr>
     </table>
    </div>`
})