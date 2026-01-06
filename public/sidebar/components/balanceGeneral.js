/* const { useTodo } = require('../stores/calculator.js') */

Vue.component("balancegeneral",{
  data(){
    return{
        title:"NeverStore2.0.S.A.C",
        tiempo:new Date(),
        ganancia_ventas:0,
        ventas_totales:0 ,
        efectivo_banco:0,
        suma_inventario:0,
        suma_equipo:0,
        suma_propiedad:0,
        suma_socios:0,
        suma_largoPlazo:0,
        suma_cortoPlazo:0,
        total_activosCirculantes:0,
        total_activosNoCirculantes:0,
        total_pasivoCirculantes:0,
        total_pasivoNoCirculantes:0,
        total_patrimonios:0

    }
  },
  mounted(){ 
    const self = this;	
    
   // escuchamos cambios state.products
   store({
    GANANCIA_TOTAL(val){
      self.ganancia_ventas += val
      self.total_patrimonios+=val
    }, 
    VENTA_TOTAL(val){
      self.ventas_totales+=val
        self.total_activosCirculantes+=val
    },
    TOTAL_BANCO(val){
     self.efectivo_banco+=val
     self.total_activosCirculantes+=val
    },
    TOTAL_INVENTARIO(val){
      self.suma_inventario += val
      self.total_activosCirculantes += val
    },
    TOTAL_EQUIPO(val){
      self.suma_equipo+=val
      self.total_activosNoCirculantes+=val
    },
    TOTAL_PROPIEDAD(val){
      self.suma_propiedad+=val
      self.total_activosNoCirculantes+=val
    },
    SUMA_CAPITALSOCIAL(val){
      self.suma_socios+=val
      self.total_patrimonios+=val
    },
    TOTAL_LARGOPLAZO(val){
      self.suma_largoPlazo+=val
      self.total_pasivoNoCirculantes+=val
    },
    TOTAL_CORTOPLAZO(val){
      self.suma_cortoPlazo+=val
      self.total_pasivoCirculantes+=val
       }
      })

     
  },
   methods:{
       
   },
  template://html
  `
  <div>
  <h1>{{title}}</h1>
  <div  id="luzBalance" class="luzBalance">
  <ion-icon name="bulb-outline"></ion-icon>
  </div>
  <h2>Balance General</h2>
  <h3>Fecha: [{{tiempo}}]</h3>
  <h4>Activos</h4>
  <table>
    <tr>
      <th>Activos Circulantes</th>
      <th>Monto ($)</th>
    </tr>
    <tr>
      <td>Cuentas Bancarias</td>
      <td>S/. {{efectivo_banco}}</td>
    </tr>
    <tr>
      <td>Ventas Realizadas</td>
      <td id="ventasTotales">S/. {{ventas_totales}}</td>
    </tr>
    <tr>
      <td>Inventarios</td>
      <td>S/  {{suma_inventario}}</td>
    </tr>
    <tr>
      <th>Total de Activos Circulantes</th>
      <td  id="activocirculante">S/. {{total_activosCirculantes}}</td>
    </tr>
    <tr>
      <th>Activos No Circulantes</th>
      <th></th>
    </tr>
    <tr>
      <td>Propiedades</td>
      <td>S/ {{suma_propiedad}}</td>
    </tr>
    <tr>
      <td>EQUIPOS</td>
      <td>S/ {{suma_equipo}}</td>
    </tr>
    <tr>
      <td>Otros Activos No Circulantes</td>
      <td>$XX,XXX</td>
    </tr>
    <tr>
      <th>Total de Activos No Circulantes</th>
      <td id="activonocirculante">S/. {{total_activosNoCirculantes}}</td>
    </tr>
  </table>

  <h4>Pasivos</h4>
  <table>
    <tr>
      <th>Pasivos Circulantes</th>
      <th>Monto ($)</th>
    </tr>
    <tr>
      <td>Cuentas por Pagar Comerciales</td>
      <td>$XX,XXX</td>
    </tr>
    <tr>
      <td>Préstamos y Deudas a Corto Plazo</td>
      <td>S/. {{suma_cortoPlazo}}</td>
    </tr>
    <tr>
      <th>Total de Pasivos Circulantes</th>
      <td>S/. {{total_pasivoCirculantes}}</td>
    </tr>
    <tr>
      <th>Pasivos No Circulantes</th>
      <th></th>
    </tr>
    <tr>
      <td>Préstamos y Deudas a Largo Plazo</td>
      <td>S/. {{suma_largoPlazo}}</td>
    </tr> 
    <tr>
      <td>Otros Pasivos No Circulantes</td>
      <td>$XX,XXX</td>
    </tr>
    <tr>
      <th>Total de Pasivos No Circulantes</th>
      <td>S/. {{total_pasivoNoCirculantes}}</td>
    </tr>
    <tr>
      <th>Total de Pasivos</th>
      <td>$xx,xxxx</td>
    </tr>
    <tr>
      <th><h4>Patrimonio Neto</h4></th>
      <th></th>
    </tr>
    <tr>
    <td>Resultado de Ejercicio</td>
    <td>S/ . {{ganancia_ventas}}</td>
    </tr>
    <tr>
    <td>Capital Social</td>
    <td>S/. {{suma_socios}}</td>
    </tr>
    <tr>
      <th>Total de Patrimonio</th>
      <td>S/. {{total_patrimonios}}</td>
    </tr>
    </table>
  </div>
  `
})