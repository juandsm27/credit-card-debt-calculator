<template>
  <v-row>
    <v-alert            
      color="error"
      icon="$error"
      title="Pago Insuficiente"
      text="El pago no es suficiente para cubrir los intereses"
      v-if="this.validationError"
      >
    </v-alert>
  </v-row>

  <v-row>
    <v-col class="botones pt-md-15" cols="12" md="6">    
      <h1 class="titlepie">Tarjeta <span style="color:rgb(182, 71, 12);">#</span>1</h1>
      <v-divider class="monthly-payment-line-title"></v-divider>
      <v-text-field :prefix="currency" type="number" v-model.number="saldoInicial" label="Saldo" variant="outlined" density="compact"></v-text-field>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field :prefix="currency" type="number" v-model.number="pagoInicial" label="Pago" variant="outlined" density="compact"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field :prefix="percent" type="number" v-model.number="tasaInicial" label="Tasa" variant="outlined" density="compact"></v-text-field>
        </v-col>
      </v-row>
      <div v-for="(inputValue, index) in inputValues" :key="index">
      <h1 class="titlecard">Tarjeta <span style="color:rgb(182, 71, 12);">#</span>{{ (index+2) }}</h1>
      <v-divider class="monthly-payment-line-title"></v-divider>
      <v-text-field :prefix="currency" type="number" v-model.number="inputValues3[index]" label="Saldo" variant="outlined" density="compact"></v-text-field>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field :prefix="currency" type="number" v-model.number="inputValues[index]" label="Pago" variant="outlined" density="compact"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field :prefix="percent" type="number" v-model.number="inputValues2[index]" label="Tasa" variant="outlined" density="compact"></v-text-field>
        </v-col>
      </v-row>
    </div>
    <v-row>
      <v-col class="botongroup">
        <v-btn class="boton mx-1" @click="validate()">Calcular</v-btn>
        <v-btn class="boton2 mx-1 smol" v-on:click="addInput();"><v-icon aria-hidden="false">mdi-plus</v-icon></v-btn>
        <v-btn class="boton2 mx-1 smol" v-on:click="removeInput(index); calculate()" ><v-icon aria-hidden="false">mdi-delete</v-icon></v-btn>
      </v-col>
    </v-row>
    </v-col>  

    <v-col class="pt-md-15" cols="12" md="6">
      <v-row class="pegajoso py-md-15 ">
        <v-col cols="12" class="calculator-investment">
          <div class="monthly-payment-mount">{{ currency }}{{ formattedNumber(saldoShow.toFixed(2)) }}</div>
          <v-divider class="monthly-payment-line"></v-divider>
          <h1 class="monthly-payment-title">Total Pagado</h1>
        </v-col>
        <v-col cols="12" class="calculator-investment">
          <div class="monthly-payment-mount">{{ currency }}{{ formattedNumber(interesShow.toFixed(2)) }}</div>
          <v-divider class="monthly-payment-line"></v-divider>
          <h1 class="monthly-payment-title">Intereses</h1>
        </v-col>
        <v-col cols="12" class="calculator-investment">
          <div class="monthly-payment-mount">{{ formattedNumber(Math.floor(this.anosShow)) }} {{ 'Años y ' }}{{ formattedNumber(this.mesesTotal) }} {{ 'Meses' }}</div>
          <v-divider class="monthly-payment-line"></v-divider>
          <h1 class="monthly-payment-title">Tiempo Total a pagar</h1>
        </v-col>
      </v-row>
    </v-col>
  </v-row> 
  
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-tabs class="tabtext" v-model="tab">
          <v-tab value="mensual">1ra Tarjeta</v-tab>
          <v-tab v-if="this.inputValues[0] > 0" value="t0">2da Tarjeta</v-tab>
          <v-tab v-if="this.inputValues[1] > 0" value="t1">3ra Tarjeta</v-tab>
          <v-tab v-if="this.inputValues[2] > 0" value="t2">4ta Tarjeta</v-tab>
          <v-tab v-if="this.inputValues[3] > 0" value="t3">5ta Tarjeta</v-tab>
          <v-tab v-if="this.inputValues[4] > 0" value="t4">6ta Tarjeta</v-tab>
          <v-tab v-if="this.inputValues[5] > 0" value="t5">7ma Tarjeta</v-tab>
          <v-tab v-if="this.inputValues[6] > 0" value="t6">8va Tarjeta</v-tab>
          <v-tab v-if="this.inputValues[7] > 0" value="t7">9na Tarjeta</v-tab>
          <v-tab v-if="this.inputValues[8] > 0" value="t8">10ma Tarjeta</v-tab>
          <v-tab v-if="this.inputValues[9] > 0" value="t9">11va Tarjeta</v-tab>
        </v-tabs>
        <v-card-text>
          <v-window v-model="tab"> 
            <v-window-item value="mensual">
              <v-table fixed-header  class="w-100"  height="580px">
                <thead>
                  <tr>
                    <th class="text-left">Mes</th>
                    <th class="text-left">Principal</th>
                    <th class="text-left">Principal Total</th>
                    <th class="text-left">Interés</th>
                    <th class="text-left">Interés Total</th>
                    <th class="text-left">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in tablaMensual" :key="item.name">
                    <td>{{ item.mes }}</td>
                    <td>{{ formattedNumber(item.principal_tabla) }}</td>
                    <td>{{ formattedNumber(item.principal_tabla_total) }}</td>
                    <td>{{ formattedNumber(item.interes_tabla) }}</td>
                    <td>{{ formattedNumber(item.interes_tabla_total) }}</td>
                    <td>{{ formattedNumber(item.saldo_tabla) }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-window-item>
            <v-window-item value="t0">
              <v-table fixed-header  class="w-100"  height="580px">
                <thead>
                  <tr>
                    <th class="text-left">Mes</th>
                    <th class="text-left">Principal</th>
                    <th class="text-left">Principal Total</th>
                    <th class="text-left">Interés</th>
                    <th class="text-left">Interés Total</th>
                    <th class="text-left">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in tablaMensual0" :key="item.name">
                    <td>{{ item.mes }}</td>
                    <td>{{ formattedNumber(item.principal_tabla) }}</td>
                    <td>{{ formattedNumber(item.principal_tabla_total) }}</td>
                    <td>{{ formattedNumber(item.interes_tabla) }}</td>
                    <td>{{ formattedNumber(item.interes_tabla_total) }}</td>
                    <td>{{ formattedNumber(item.saldo_tabla) }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-window-item>
            <v-window-item value="t1">
              <v-table fixed-header  class="w-100"  height="580px">
                <thead>
                  <tr>
                    <th class="text-left">Mes</th>
                    <th class="text-left">Principal</th>
                    <th class="text-left">Principal Total</th>
                    <th class="text-left">Interés</th>
                    <th class="text-left">Interés Total</th>
                    <th class="text-left">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in tablaMensual1" :key="item.name">
                    <td>{{ item.mes }}</td>
                    <td>{{ formattedNumber(item.principal_tabla) }}</td>
                    <td>{{ formattedNumber(item.principal_tabla_total) }}</td>
                    <td>{{ formattedNumber(item.interes_tabla) }}</td>
                    <td>{{ formattedNumber(item.interes_tabla_total) }}</td>
                    <td>{{ formattedNumber(item.saldo_tabla) }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-window-item>
            <v-window-item value="t2">
              <v-table fixed-header  class="w-100"  height="580px">
                <thead>
                  <tr>
                    <th class="text-left">Mes</th>
                    <th class="text-left">Principal</th>
                    <th class="text-left">Principal Total</th>
                    <th class="text-left">Interés</th>
                    <th class="text-left">Interés Total</th>
                    <th class="text-left">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in tablaMensual2" :key="item.name">
                    <td>{{ item.mes }}</td>
                    <td>{{ formattedNumber(item.principal_tabla) }}</td>
                    <td>{{ formattedNumber(item.principal_tabla_total) }}</td>
                    <td>{{ formattedNumber(item.interes_tabla) }}</td>
                    <td>{{ formattedNumber(item.interes_tabla_total) }}</td>
                    <td>{{ formattedNumber(item.saldo_tabla) }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-window-item>
            <v-window-item value="t3">
              <v-table fixed-header  class="w-100"  height="580px">
                <thead>
                  <tr>
                    <th class="text-left">Mes</th>
                    <th class="text-left">Principal</th>
                    <th class="text-left">Principal Total</th>
                    <th class="text-left">Interés</th>
                    <th class="text-left">Interés Total</th>
                    <th class="text-left">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in tablaMensual3" :key="item.name">
                    <td>{{ item.mes }}</td>
                    <td>{{ formattedNumber(item.principal_tabla) }}</td>
                    <td>{{ formattedNumber(item.principal_tabla_total) }}</td>
                    <td>{{ formattedNumber(item.interes_tabla) }}</td>
                    <td>{{ formattedNumber(item.interes_tabla_total) }}</td>
                    <td>{{ formattedNumber(item.saldo_tabla) }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-window-item>
            <v-window-item value="t4">
              <v-table fixed-header  class="w-100"  height="580px">
                <thead>
                  <tr>
                    <th class="text-left">Mes</th>
                    <th class="text-left">Principal</th>
                    <th class="text-left">Principal Total</th>
                    <th class="text-left">Interés</th>
                    <th class="text-left">Interés Total</th>
                    <th class="text-left">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in tablaMensual4" :key="item.name">
                    <td>{{ item.mes }}</td>
                    <td>{{ formattedNumber(item.principal_tabla) }}</td>
                    <td>{{ formattedNumber(item.principal_tabla_total) }}</td>
                    <td>{{ formattedNumber(item.interes_tabla) }}</td>
                    <td>{{ formattedNumber(item.interes_tabla_total) }}</td>
                    <td>{{ formattedNumber(item.saldo_tabla) }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-window-item>
            <v-window-item value="t5">
              <v-table fixed-header  class="w-100"  height="580px">
                <thead>
                  <tr>
                    <th class="text-left">Mes</th>
                    <th class="text-left">Principal</th>
                    <th class="text-left">Principal Total</th>
                    <th class="text-left">Interés</th>
                    <th class="text-left">Interés Total</th>
                    <th class="text-left">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in tablaMensual5" :key="item.name">
                    <td>{{ item.mes }}</td>
                    <td>{{ formattedNumber(item.principal_tabla) }}</td>
                    <td>{{ formattedNumber(item.principal_tabla_total) }}</td>
                    <td>{{ formattedNumber(item.interes_tabla) }}</td>
                    <td>{{ formattedNumber(item.interes_tabla_total) }}</td>
                    <td>{{ formattedNumber(item.saldo_tabla) }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-window-item>
            <v-window-item value="t6">
              <v-table fixed-header  class="w-100"  height="580px">
                <thead>
                  <tr>
                    <th class="text-left">Mes</th>
                    <th class="text-left">Principal</th>
                    <th class="text-left">Principal Total</th>
                    <th class="text-left">Interés</th>
                    <th class="text-left">Interés Total</th>
                    <th class="text-left">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in tablaMensual6" :key="item.name">
                    <td>{{ item.mes }}</td>
                    <td>{{ formattedNumber(item.principal_tabla) }}</td>
                    <td>{{ formattedNumber(item.principal_tabla_total) }}</td>
                    <td>{{ formattedNumber(item.interes_tabla) }}</td>
                    <td>{{ formattedNumber(item.interes_tabla_total) }}</td>
                    <td>{{ formattedNumber(item.saldo_tabla) }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-window-item>
            <v-window-item value="t7">
              <v-table fixed-header  class="w-100"  height="580px">
                <thead>
                  <tr>
                    <th class="text-left">Mes</th>
                    <th class="text-left">Principal</th>
                    <th class="text-left">Principal Total</th>
                    <th class="text-left">Interés</th>
                    <th class="text-left">Interés Total</th>
                    <th class="text-left">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in tablaMensual7" :key="item.name">
                    <td>{{ item.mes }}</td>
                    <td>{{ formattedNumber(item.principal_tabla) }}</td>
                    <td>{{ formattedNumber(item.principal_tabla_total) }}</td>
                    <td>{{ formattedNumber(item.interes_tabla) }}</td>
                    <td>{{ formattedNumber(item.interes_tabla_total) }}</td>
                    <td>{{ formattedNumber(item.saldo_tabla) }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-window-item>
            <v-window-item value="t8">
              <v-table fixed-header  class="w-100"  height="580px">
                <thead>
                  <tr>
                    <th class="text-left">Mes</th>
                    <th class="text-left">Principal</th>
                    <th class="text-left">Principal Total</th>
                    <th class="text-left">Interés</th>
                    <th class="text-left">Interés Total</th>
                    <th class="text-left">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in tablaMensual8" :key="item.name">
                    <td>{{ item.mes }}</td>
                    <td>{{ formattedNumber(item.principal_tabla) }}</td>
                    <td>{{ formattedNumber(item.principal_tabla_total) }}</td>
                    <td>{{ formattedNumber(item.interes_tabla) }}</td>
                    <td>{{ formattedNumber(item.interes_tabla_total) }}</td>
                    <td>{{ formattedNumber(item.saldo_tabla) }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-window-item>
            <v-window-item value="t9">
              <v-table fixed-header  class="w-100"  height="580px">
                <thead>
                  <tr>
                    <th class="text-left">Mes</th>
                    <th class="text-left">Principal</th>
                    <th class="text-left">Principal Total</th>
                    <th class="text-left">Interés</th>
                    <th class="text-left">Interés Total</th>
                    <th class="text-left">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in tablaMensual9" :key="item.name">
                    <td>{{ item.mes }}</td>
                    <td>{{ formattedNumber(item.principal_tabla) }}</td>
                    <td>{{ formattedNumber(item.principal_tabla_total) }}</td>
                    <td>{{ formattedNumber(item.interes_tabla) }}</td>
                    <td>{{ formattedNumber(item.interes_tabla_total) }}</td>
                    <td>{{ formattedNumber(item.saldo_tabla) }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>       
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
    validationError: false,
    validacionInicial: 1,
    percent: "%",
    currency: "$",
    saldo: 0,
    tasa: 0,
    pago: 0,
    saldo2: 0,
    tasa2: 0,
    pago2: 0,
    saldoShow: 0,
    interesShow: 0,
    contribucionesShow: 0,
    tab: null,
    tablaMensual: [],
    tablaMensual2: [],
    inputValues: [],
    inputValues2: [],
    inputValues3: [],
    mesesRestantes: 0,
    plazo: 0,
    mesesShow: 0,
    anosAd: 0,
    mesesTotal: 0,
    anosShow: 0,
    ultimoST: 0,
    ultimoPT: 0,
    saldoInicial: '',
    pagoInicial: '',
    tasaInicial: '',
    }
  },
  methods : {
    addInput() {
      this.inputValues.push('');
    },
    removeInput(index) {
      this.inputValues.splice(index, 1);
      this.inputValues2.splice(index, 1);
      this.inputValues3.splice(index, 1);
    },
    validate() {
      this.validacionInicial = (this.saldoInicial*(this.tasaInicial/100))/12
      if (this.pagoInicial > this.validacionInicial) {
        this.validationError = false
        this.calculate();
      } else {
        this.validationError = true
      }
    },
    calculate() { 
      let saldoShow1 = 0;
      let saldoShow2 = 0;
      let saldoShow3 = 0;
      let saldoShow4 = 0;
      let saldoShow5 = 0;
      let saldoShow6 = 0;
      let saldoShow7 = 0;
      let saldoShow8 = 0;
      let saldoShow9 = 0;
      let interesShow1 = 0;
      let interesShow2 = 0;
      let interesShow3 = 0;
      let interesShow4 = 0;
      let interesShow5 = 0;
      let interesShow6 = 0;
      let interesShow7 = 0;
      let interesShow8 = 0;
      let interesShow9 = 0;
      let saldoShow0 = 0;
      let interesShow0 = 0;
      let frequencyCounter = 0;
      let yearsCounter = 0;
      let frequencyCounter0 = 0;
      let yearsCounter0 = 0;
      let frequencyCounter1 = 0;
      let yearsCounter1 = 0;
      let frequencyCounter2 = 0;
      let yearsCounter2 = 0;
      let frequencyCounter3 = 0;
      let yearsCounter3 = 0;
      let frequencyCounter4 = 0;
      let yearsCounter4 = 0;
      let frequencyCounter5 = 0;
      let yearsCounter5 = 0;
      let frequencyCounter6 = 0;
      let yearsCounter6 = 0;
      let frequencyCounter7 = 0;
      let yearsCounter7 = 0;
      let frequencyCounter8 = 0;
      let yearsCounter8 = 0;
      let frequencyCounter9 = 0;
      let yearsCounter9 = 0;
      this.plazo = 0;
      this.plazo0 = 0;
      this.plazo1 = 0;
      this.plazo2 = 0;
      this.plazo3 = 0;
      this.plazo4 = 0;
      this.plazo5 = 0;
      this.plazo6 = 0;
      this.plazo7 = 0;
      this.plazo8 = 0;
      this.plazo9 = 0;
      this.mesesRestantes = 0;
      this.mesesRestantes0 = 0;
      this.mesesRestantes1 = 0;
      this.mesesRestantes2 = 0;
      this.mesesRestantes3 = 0;
      this.mesesRestantes4 = 0;
      this.mesesRestantes5 = 0;
      this.mesesRestantes6 = 0;
      this.mesesRestantes7 = 0;
      this.mesesRestantes8 = 0;
      this.mesesRestantes9 = 0;
      this.anosAd = 0;
      this.mesesTotal = 0;
      this.anosShow = 0;
      this.ultimoST = 0;
      this.ultimoPT = 0;
      let interes = (this.saldoInicial*this.tasaInicial/12)/100;
      let principal = this.pagoInicial - interes;
      let principalTotal = principal;
      let interesTotal = interes;
      let saldoTotal = this.saldoInicial - principal;
      this.tablaMensual = [];
      this.tablaMensual.push({ mes: 1, principal_tabla: principal.toFixed(2), principal_tabla_total: principalTotal.toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: saldoTotal.toFixed(2) });
      for (let index = 2; index <= saldoTotal; index++) {
        interes = (saldoTotal*this.tasaInicial/12)/100;
        principal = this.pagoInicial - interes;
        principalTotal = principal + principalTotal;
        interesTotal = interes + interesTotal;
        saldoTotal = saldoTotal - principal;
        if (saldoTotal < 0) {
        this.tablaMensual.push({ mes: index, principal_tabla: this.ultimoST.toFixed(2), principal_tabla_total: (this.ultimoPT+this.ultimoST).toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: 0 });
        } else {
        this.tablaMensual.push({ mes: index, principal_tabla: principal.toFixed(2), principal_tabla_total: principalTotal.toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: saldoTotal.toFixed(2) });
        this.ultimoST = saldoTotal;
        this.ultimoPT = principalTotal;
        }
        this.mesesRestantes = index%12;
        frequencyCounter++;
        if(frequencyCounter === 12) {
          yearsCounter++;
          frequencyCounter = 0;
          this.plazo = yearsCounter;
        }
      }
      if (this.inputValues[0] > 0) {
        if (this.inputValues[0] > ((this.inputValues3[0]*(this.inputValues2[0]/100))/12)){
        this.validationError = false;
        let interes = (this.inputValues3[0]*this.inputValues2[0]/12)/100;
        let principal = this.inputValues[0] - interes;
        let principalTotal = principal;
        let interesTotal = interes;
        let saldoTotal = this.inputValues3[0] - principal;
        this.tablaMensual0 = [];
        this.tablaMensual0.push({ mes: 1, principal_tabla: principal.toFixed(2), principal_tabla_total: principalTotal.toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: saldoTotal.toFixed(2) });
        for (let index = 2; index <= saldoTotal; index++) {
          interes = (saldoTotal*this.inputValues2[0]/12)/100;
          principal = this.inputValues[0] - interes;
          principalTotal = principal + principalTotal;
          interesTotal = interes + interesTotal;
          saldoTotal = saldoTotal - principal;
          if (saldoTotal < 0) {
          this.tablaMensual0.push({ mes: index, principal_tabla: this.ultimoST.toFixed(2), principal_tabla_total: (this.ultimoPT+this.ultimoST).toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: 0 });
          } else {
          this.tablaMensual0.push({ mes: index, principal_tabla: principal.toFixed(2), principal_tabla_total: principalTotal.toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: saldoTotal.toFixed(2) });
          this.ultimoST = saldoTotal;
          this.ultimoPT = principalTotal;
          }
          this.mesesRestantes0 = index%12;
          frequencyCounter0++;
          if(frequencyCounter0 === 12) {
            yearsCounter0++;
            frequencyCounter0 = 0;
            this.plazo0 = yearsCounter0;
          }
        }
        saldoShow0 = this.inputValues3[0] + interesTotal;      
        interesShow0 = interesTotal;
        } else {
          this.validationError = true;
        }
    }
      if (this.inputValues[1] > 0) {
        if (this.inputValues[1] > ((this.inputValues3[1]*(this.inputValues2[1]/100))/12)){
      let interes = (this.inputValues3[1]*this.inputValues2[1]/12)/100;
      let principal = this.inputValues[1] - interes;
      let principalTotal = principal;
      let interesTotal = interes;
      let saldoTotal = this.inputValues3[1] - principal;
      this.tablaMensual1 = [];
      this.tablaMensual1.push({ mes: 1, principal_tabla: principal.toFixed(2), principal_tabla_total: principalTotal.toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: saldoTotal.toFixed(2) });
      for (let index = 2; index <= saldoTotal; index++) {
        interes = (saldoTotal*this.inputValues2[1]/12)/100;
        principal = this.inputValues[1] - interes;
        principalTotal = principal + principalTotal;
        interesTotal = interes + interesTotal;
        saldoTotal = saldoTotal - principal;
        if (saldoTotal < 0) {
        this.tablaMensual1.push({ mes: index, principal_tabla: this.ultimoST.toFixed(2), principal_tabla_total: (this.ultimoPT+this.ultimoST).toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: 0 });
        } else {
        this.tablaMensual1.push({ mes: index, principal_tabla: principal.toFixed(2), principal_tabla_total: principalTotal.toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: saldoTotal.toFixed(2) });
        this.ultimoST = saldoTotal;
        this.ultimoPT = principalTotal;
        }
        this.mesesRestantes1 = index%12;
        frequencyCounter1++;
        if(frequencyCounter1 === 12) {
          yearsCounter1++;
          frequencyCounter1 = 0;
          this.plazo1 = yearsCounter1;
        }
      }
      saldoShow1 = this.inputValues3[1] + interesTotal;      
      interesShow1 = interesTotal;
        } else {
          this.validationError = true;
        }
    }
      if (this.inputValues[2] > 0) {
        if (this.inputValues[2] > ((this.inputValues3[2]*(this.inputValues2[2]/100))/12)){
      let interes = (this.inputValues3[2]*this.inputValues2[2]/12)/100;
      let principal = this.inputValues[2] - interes;
      let principalTotal = principal;
      let interesTotal = interes;
      let saldoTotal = this.inputValues3[2] - principal;
      this.tablaMensual2 = [];
      this.tablaMensual2.push({ mes: 1, principal_tabla: principal.toFixed(2), principal_tabla_total: principalTotal.toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: saldoTotal.toFixed(2) });
      for (let index = 2; index <= saldoTotal; index++) {
        interes = (saldoTotal*this.inputValues2[2]/12)/100;
        principal = this.inputValues[2] - interes;
        principalTotal = principal + principalTotal;
        interesTotal = interes + interesTotal;
        saldoTotal = saldoTotal - principal;
        if (saldoTotal < 0) {
        this.tablaMensual2.push({ mes: index, principal_tabla: this.ultimoST.toFixed(2), principal_tabla_total: (this.ultimoPT+this.ultimoST).toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: 0 });
        } else {
        this.tablaMensual2.push({ mes: index, principal_tabla: principal.toFixed(2), principal_tabla_total: principalTotal.toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: saldoTotal.toFixed(2) });
        this.ultimoST = saldoTotal;
        this.ultimoPT = principalTotal;
        }
        this.mesesRestantes2 = index%12;
        frequencyCounter2++;
        if(frequencyCounter2 === 12) {
          yearsCounter2++;
          frequencyCounter2 = 0;
          this.plazo2 = yearsCounter2;
        }
      }
      saldoShow2 = this.inputValues3[2] + interesTotal;      
      interesShow2 = interesTotal;
        } else {
          this.validationError = true;
        }
    }
      if (this.inputValues[3] > 0) {
        if (this.inputValues[3] > ((this.inputValues3[3]*(this.inputValues2[3]/100))/12)){
      let interes = (this.inputValues3[3]*this.inputValues2[3]/12)/100;
      let principal = this.inputValues[3] - interes;
      let principalTotal = principal;
      let interesTotal = interes;
      let saldoTotal = this.inputValues3[3] - principal;
      this.tablaMensual3 = [];
      this.tablaMensual3.push({ mes: 1, principal_tabla: principal.toFixed(2), principal_tabla_total: principalTotal.toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: saldoTotal.toFixed(2) });
      for (let index = 2; index <= saldoTotal; index++) {
        interes = (saldoTotal*this.inputValues2[3]/12)/100;
        principal = this.inputValues[3] - interes;
        principalTotal = principal + principalTotal;
        interesTotal = interes + interesTotal;
        saldoTotal = saldoTotal - principal;
        if (saldoTotal < 0) {
        this.tablaMensual3.push({ mes: index, principal_tabla: this.ultimoST.toFixed(2), principal_tabla_total: (this.ultimoPT+this.ultimoST).toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: 0 });
        } else {
        this.tablaMensual3.push({ mes: index, principal_tabla: principal.toFixed(2), principal_tabla_total: principalTotal.toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: saldoTotal.toFixed(2) });
        this.ultimoST = saldoTotal;
        this.ultimoPT = principalTotal;
        }
        this.mesesRestantes3 = index%12;
        frequencyCounter3++;
        if(frequencyCounter3 === 12) {
          yearsCounter3++;
          frequencyCounter3 = 0;
          this.plazo3 = yearsCounter3;
        }
      }
      saldoShow3 = this.inputValues3[3] + interesTotal;      
      interesShow3 = interesTotal;
        } else {
          this.validationError = true;
        }
    }
      if (this.inputValues[4] > 0) {
        if (this.inputValues[4] > ((this.inputValues3[4]*(this.inputValues2[4]/100))/12)){
      let interes = (this.inputValues3[4]*this.inputValues2[4]/12)/100;
      let principal = this.inputValues[4] - interes;
      let principalTotal = principal;
      let interesTotal = interes;
      let saldoTotal = this.inputValues3[4] - principal;
      this.tablaMensual4 = [];
      this.tablaMensual4.push({ mes: 1, principal_tabla: principal.toFixed(2), principal_tabla_total: principalTotal.toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: saldoTotal.toFixed(2) });
      for (let index = 2; index <= saldoTotal; index++) {
        interes = (saldoTotal*this.inputValues2[4]/12)/100;
        principal = this.inputValues[4] - interes;
        principalTotal = principal + principalTotal;
        interesTotal = interes + interesTotal;
        saldoTotal = saldoTotal - principal;
        if (saldoTotal < 0) {
        this.tablaMensual4.push({ mes: index, principal_tabla: this.ultimoST.toFixed(2), principal_tabla_total: (this.ultimoPT+this.ultimoST).toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: 0 });
        } else {
        this.tablaMensual4.push({ mes: index, principal_tabla: principal.toFixed(2), principal_tabla_total: principalTotal.toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: saldoTotal.toFixed(2) });
        this.ultimoST = saldoTotal;
        this.ultimoPT = principalTotal;
        }
        this.mesesRestantes4 = index%12;
        frequencyCounter4++;
        if(frequencyCounter4 === 12) {
          yearsCounter4++;
          frequencyCounter4 = 0;
          this.plazo4 = yearsCounter4;
        }
      }
      saldoShow4 = this.inputValues3[4] + interesTotal;      
      interesShow4 = interesTotal;
        } else {
          this.validationError = true;
        }
    }
      if (this.inputValues[5] > 0) {
        if (this.inputValues[5] > ((this.inputValues3[5]*(this.inputValues2[5]/100))/12)){
      let interes = (this.inputValues3[5]*this.inputValues2[5]/12)/100;
      let principal = this.inputValues[5] - interes;
      let principalTotal = principal;
      let interesTotal = interes;
      let saldoTotal = this.inputValues3[5] - principal;
      this.tablaMensual5 = [];
      this.tablaMensual5.push({ mes: 1, principal_tabla: principal.toFixed(2), principal_tabla_total: principalTotal.toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: saldoTotal.toFixed(2) });
      for (let index = 2; index <= saldoTotal; index++) {
        interes = (saldoTotal*this.inputValues2[5]/12)/100;
        principal = this.inputValues[5] - interes;
        principalTotal = principal + principalTotal;
        interesTotal = interes + interesTotal;
        saldoTotal = saldoTotal - principal;
        if (saldoTotal < 0) {
        this.tablaMensual5.push({ mes: index, principal_tabla: this.ultimoST.toFixed(2), principal_tabla_total: (this.ultimoPT+this.ultimoST).toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: 0 });
        } else {
        this.tablaMensual5.push({ mes: index, principal_tabla: principal.toFixed(2), principal_tabla_total: principalTotal.toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: saldoTotal.toFixed(2) });
        this.ultimoST = saldoTotal;
        this.ultimoPT = principalTotal;
        }
        this.mesesRestantes5 = index%12;
        frequencyCounter5++;
        if(frequencyCounter5 === 12) {
          yearsCounter5++;
          frequencyCounter5 = 0;
          this.plazo5 = yearsCounter5;
        }
      }
      saldoShow5 = this.inputValues3[5] + interesTotal;      
      interesShow5 = interesTotal;
        } else {
          this.validationError = true;
        }
    }
      if (this.inputValues[6] > 0) {
        if (this.inputValues[6] > ((this.inputValues3[6]*(this.inputValues2[6]/100))/12)){
      let interes = (this.inputValues3[6]*this.inputValues2[6]/12)/100;
      let principal = this.inputValues[6] - interes;
      let principalTotal = principal;
      let interesTotal = interes;
      let saldoTotal = this.inputValues3[6] - principal;
      this.tablaMensual6 = [];
      this.tablaMensual6.push({ mes: 1, principal_tabla: principal.toFixed(2), principal_tabla_total: principalTotal.toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: saldoTotal.toFixed(2) });
      for (let index = 2; index <= saldoTotal; index++) {
        interes = (saldoTotal*this.inputValues2[6]/12)/100;
        principal = this.inputValues[6] - interes;
        principalTotal = principal + principalTotal;
        interesTotal = interes + interesTotal;
        saldoTotal = saldoTotal - principal;
        if (saldoTotal < 0) {
        this.tablaMensual6.push({ mes: index, principal_tabla: this.ultimoST.toFixed(2), principal_tabla_total: (this.ultimoPT+this.ultimoST).toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: 0 });
        } else {
        this.tablaMensual6.push({ mes: index, principal_tabla: principal.toFixed(2), principal_tabla_total: principalTotal.toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: saldoTotal.toFixed(2) });
        this.ultimoST = saldoTotal;
        this.ultimoPT = principalTotal;
        }
        this.mesesRestantes6 = index%12;
        frequencyCounter6++;
        if(frequencyCounter6 === 12) {
          yearsCounter6++;
          frequencyCounter6 = 0;
          this.plazo6 = yearsCounter6;
        }
      }
      saldoShow6 = this.inputValues3[6] + interesTotal;      
      interesShow6 = interesTotal;
        } else {
          this.validationError = true;
        }
    }
      if (this.inputValues[7] > 0) {
        if (this.inputValues[7] > ((this.inputValues3[7]*(this.inputValues2[7]/100))/12)){
      let interes = (this.inputValues3[7]*this.inputValues2[7]/12)/100;
      let principal = this.inputValues[7] - interes;
      let principalTotal = principal;
      let interesTotal = interes;
      let saldoTotal = this.inputValues3[7] - principal;
      this.tablaMensual7 = [];
      this.tablaMensual7.push({ mes: 1, principal_tabla: principal.toFixed(2), principal_tabla_total: principalTotal.toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: saldoTotal.toFixed(2) });
      for (let index = 2; index <= saldoTotal; index++) {
        interes = (saldoTotal*this.inputValues2[7]/12)/100;
        principal = this.inputValues[7] - interes;
        principalTotal = principal + principalTotal;
        interesTotal = interes + interesTotal;
        saldoTotal = saldoTotal - principal;
        if (saldoTotal < 0) {
        this.tablaMensual7.push({ mes: index, principal_tabla: this.ultimoST.toFixed(2), principal_tabla_total: (this.ultimoPT+this.ultimoST).toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: 0 });
        } else {
        this.tablaMensual7.push({ mes: index, principal_tabla: principal.toFixed(2), principal_tabla_total: principalTotal.toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: saldoTotal.toFixed(2) });
        this.ultimoST = saldoTotal;
        this.ultimoPT = principalTotal;
        }
        this.mesesRestantes7 = index%12;
        frequencyCounter7++;
        if(frequencyCounter7 === 12) {
          yearsCounter7++;
          frequencyCounter7 = 0;
          this.plazo7 = yearsCounter7;
        }
      }
      saldoShow7 = this.inputValues3[7] + interesTotal;      
      interesShow7 = interesTotal;
        } else {
          this.validationError = true;
        }
    }
      if (this.inputValues[8] > 0) {
        if (this.inputValues[8] > ((this.inputValues3[8]*(this.inputValues2[8]/100))/12)){
      let interes = (this.inputValues3[8]*this.inputValues2[8]/12)/100;
      let principal = this.inputValues[8] - interes;
      let principalTotal = principal;
      let interesTotal = interes;
      let saldoTotal = this.inputValues3[8] - principal;
      this.tablaMensual8 = [];
      this.tablaMensual8.push({ mes: 1, principal_tabla: principal.toFixed(2), principal_tabla_total: principalTotal.toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: saldoTotal.toFixed(2) });
      for (let index = 2; index <= saldoTotal; index++) {
        interes = (saldoTotal*this.inputValues2[8]/12)/100;
        principal = this.inputValues[8] - interes;
        principalTotal = principal + principalTotal;
        interesTotal = interes + interesTotal;
        saldoTotal = saldoTotal - principal;
        if (saldoTotal < 0) {
        this.tablaMensual8.push({ mes: index, principal_tabla: this.ultimoST.toFixed(2), principal_tabla_total: (this.ultimoPT+this.ultimoST).toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: 0 });
        } else {
        this.tablaMensual8.push({ mes: index, principal_tabla: principal.toFixed(2), principal_tabla_total: principalTotal.toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: saldoTotal.toFixed(2) });
        this.ultimoST = saldoTotal;
        this.ultimoPT = principalTotal;
        }
        this.mesesRestantes8 = index%12;
        frequencyCounter8++;
        if(frequencyCounter8 === 12) {
          yearsCounter8++;
          frequencyCounter8 = 0;
          this.plazo8 = yearsCounter8;
        }
      }
      saldoShow8 = this.inputValues3[8] + interesTotal;      
      interesShow8 = interesTotal;
        } else {
          this.validationError = true;
        }
    }
      if (this.inputValues[9] > 0) {
        if (this.inputValues[9] > ((this.inputValues3[9]*(this.inputValues2[9]/100))/12)){
      let interes = (this.inputValues3[9]*this.inputValues2[9]/12)/100;
      let principal = this.inputValues[9] - interes;
      let principalTotal = principal;
      let interesTotal = interes;
      let saldoTotal = this.inputValues3[9] - principal;
      this.tablaMensual9 = [];
      this.tablaMensual9.push({ mes: 1, principal_tabla: principal.toFixed(2), principal_tabla_total: principalTotal.toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: saldoTotal.toFixed(2) });
      for (let index = 2; index <= saldoTotal; index++) {
        interes = (saldoTotal*this.inputValues2[9]/12)/100;
        principal = this.inputValues[9] - interes;
        principalTotal = principal + principalTotal;
        interesTotal = interes + interesTotal;
        saldoTotal = saldoTotal - principal;
        if (saldoTotal < 0) {
        this.tablaMensual9.push({ mes: index, principal_tabla: this.ultimoST.toFixed(2), principal_tabla_total: (this.ultimoPT+this.ultimoST).toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: 0 });
        } else {
        this.tablaMensual9.push({ mes: index, principal_tabla: principal.toFixed(2), principal_tabla_total: principalTotal.toFixed(2), interes_tabla: interes.toFixed(2), interes_tabla_total: interesTotal.toFixed(2), saldo_tabla: saldoTotal.toFixed(2) });
        this.ultimoST = saldoTotal;
        this.ultimoPT = principalTotal;
        }
        this.mesesRestantes9 = index%12;
        frequencyCounter9++;
        if(frequencyCounter9 === 12) {
          yearsCounter9++;
          frequencyCounter9 = 0;
          this.plazo9 = yearsCounter9;
        }
      }
      saldoShow9 = this.inputValues3[9] + interesTotal;      
      interesShow9 = interesTotal;
        } else {
          this.validationError = true;
        }
    }
    if ( this.plazo > this.plazo0 && this.plazo > this.plazo1 && this.plazo > this.plazo2 && this.plazo > this.plazo3 && this.plazo > this.plazo4 && this.plazo > this.plazo5 && this.plazo > this.plazo6 && this.plazo > this.plazo7 && this.plazo > this.plazo8 && this.plazo > this.plazo9 ) {
      this.mesesShow = this.mesesRestantes;
      this.anosShow = this.plazo;
      this.mesesTotal = this.mesesShow;
    } 
    // 0
    if ( this.plazo0 > this.plazo && this.plazo0 > this.plazo1 && this.plazo0 > this.plazo2 && this.plazo0 > this.plazo3 && this.plazo0 > this.plazo4 && this.plazo0 > this.plazo5 && this.plazo0 > this.plazo6 && this.plazo0 > this.plazo7 && this.plazo0 > this.plazo8 && this.plazo0 > this.plazo9 ) {
      this.mesesShow = this.mesesRestantes0;
      this.anosShow = this.plazo0;
      this.mesesTotal = this.mesesShow;
    } 
    // 1
    if ( this.plazo1 > this.plazo && this.plazo1 > this.plazo0 && this.plazo1 > this.plazo2 && this.plazo1 > this.plazo3 && this.plazo1 > this.plazo4 && this.plazo1 > this.plazo5 && this.plazo1 > this.plazo6 && this.plazo1 > this.plazo7 && this.plazo1 > this.plazo8 && this.plazo1 > this.plazo9 ) {
      this.mesesShow = this.mesesRestantes1;
      this.anosShow = this.plazo1;
      this.mesesTotal = this.mesesShow;
    } 
    // 2
    if ( this.plazo2 > this.plazo && this.plazo2 > this.plazo0 && this.plazo2 > this.plazo1 && this.plazo2 > this.plazo3 && this.plazo2 > this.plazo4 && this.plazo2 > this.plazo5 && this.plazo2 > this.plazo6 && this.plazo2 > this.plazo7 && this.plazo2 > this.plazo8 && this.plazo2 > this.plazo9 ) {
      this.mesesShow = this.mesesRestantes2;
      this.anosShow = this.plazo2;
      this.mesesTotal = this.mesesShow;
    } 
    //3
    if ( this.plazo3 > this.plazo0 && this.plazo3 > this.plazo1 && this.plazo3 > this.plazo2 && this.plazo3 > this.plazo && this.plazo3 > this.plazo4 && this.plazo3 > this.plazo5 && this.plazo3 > this.plazo6 && this.plazo3 > this.plazo7 && this.plazo3 > this.plazo8 && this.plazo3 > this.plazo9 ) {
      this.mesesShow = this.mesesRestantes3;
      this.anosShow = this.plazo3;
      this.mesesTotal = this.mesesShow;
    } 
    //4
    if ( this.plazo4 > this.plazo0 && this.plazo4 > this.plazo1 && this.plazo4 > this.plazo2 && this.plazo4 > this.plazo3 && this.plazo4 > this.plazo && this.plazo4 > this.plazo5 && this.plazo4 > this.plazo6 && this.plazo4 > this.plazo7 && this.plazo4 > this.plazo8 && this.plazo4 > this.plazo9 ) {
      this.mesesShow = this.mesesRestantes4;
      this.anosShow = this.plazo4;
      this.mesesTotal = this.mesesShow;
    } 
    //5
    if ( this.plazo5 > this.plazo0 && this.plazo5 > this.plazo1 && this.plazo5 > this.plazo2 && this.plazo5 > this.plazo3 && this.plazo5 > this.plazo4 && this.plazo5 > this.plazo && this.plazo5 > this.plazo6 && this.plazo5 > this.plazo7 && this.plazo5 > this.plazo8 && this.plazo5 > this.plazo9 ) {
      this.mesesShow = this.mesesRestantes5;
      this.anosShow = this.plazo5;
      this.mesesTotal = this.mesesShow;
    } 
    //6
    if ( this.plazo6 > this.plazo0 && this.plazo6 > this.plazo1 && this.plazo6 > this.plazo2 && this.plazo6 > this.plazo3 && this.plazo6 > this.plazo4 && this.plazo6 > this.plazo5 && this.plazo6 > this.plazo && this.plazo6 > this.plazo7 && this.plazo6 > this.plazo8 && this.plazo6 > this.plazo9 ) {
      this.mesesShow = this.mesesRestantes6;
      this.anosShow = this.plazo6;
      this.mesesTotal = this.mesesShow;
    }
    //7
    if ( this.plazo7 > this.plazo0 && this.plazo7 > this.plazo1 && this.plazo7 > this.plazo2 && this.plazo7 > this.plazo3 && this.plazo7 > this.plazo4 && this.plazo7 > this.plazo5 && this.plazo7 > this.plazo6 && this.plazo7 > this.plazo && this.plazo7 > this.plazo8 && this.plazo7 > this.plazo9 ) {
      this.mesesShow = this.mesesRestantes7;
      this.anosShow = this.plazo7;
      this.mesesTotal = this.mesesShow;
    } 
    //8
    if ( this.plazo8 > this.plazo0 && this.plazo8 > this.plazo1 && this.plazo8 > this.plazo2 && this.plazo8 > this.plazo3 && this.plazo8 > this.plazo4 && this.plazo8 > this.plazo5 && this.plazo8 > this.plazo6 && this.plazo8 > this.plazo7 && this.plazo8 > this.plazo && this.plazo8 > this.plazo9 ) {
      this.mesesShow = this.mesesRestantes8;
      this.anosShow = this.plazo8;
      this.mesesTotal = this.mesesShow;
    } 
    //9
    if ( this.plazo9 > this.plazo0 && this.plazo9 > this.plazo1 && this.plazo9 > this.plazo2 && this.plazo9 > this.plazo3 && this.plazo9 > this.plazo4 && this.plazo9 > this.plazo5 && this.plazo9 > this.plazo6 && this.plazo9 > this.plazo7 && this.plazo9 > this.plazo8 && this.plazo9 > this.plazo ) {
      this.mesesShow = this.mesesRestantes9;
      this.anosShow = this.plazo9;
      this.mesesTotal = this.mesesShow;
    }

    // this.mesesShow = this.mesesRestantes + this.mesesRestantes0 + this.mesesRestantes1 + this.mesesRestantes2 + this.mesesRestantes3 + this.mesesRestantes4 + this.mesesRestantes5 + this.mesesRestantes6 + this.mesesRestantes7 + this.mesesRestantes8 + this.mesesRestantes9;
    // this.anosAd = this.mesesShow/12;
    // this.mesesTotal = this.mesesShow%12;
    // this.anosShow = this.plazo + this.anosAd;
    this.saldoShow = this.saldoInicial + interesTotal + saldoShow0 + saldoShow1 + saldoShow2 + saldoShow3 + saldoShow4 + saldoShow5 + saldoShow6 + saldoShow7 + saldoShow8 + saldoShow9;      
    this.interesShow = interesTotal + interesShow0 +interesShow1 + interesShow2 + interesShow3 + interesShow4 + interesShow5 + interesShow6 + interesShow7 + interesShow8 + interesShow9;
    },
    formattedNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
}
</script>
<style>
  :root {
    --bg: #08080e;
    --bg2: #0f0f18;
    --bg3: #14141e;
    --border: rgba(255,255,255,0.07);
    --border-bright: rgba(255,255,255,0.15);
    --text: #eeeef6;
    --muted: #6b6b80;
    --accent: #7c6af7;
    --accent2: #4ed8c0;
    --accent3: #f06fba;
  }

  body { background: var(--bg) !important; }

  .v-application { background: var(--bg) !important; font-family: 'Syne', sans-serif !important; }

  input {
    font-family: 'Syne', sans-serif !important;
    color: var(--text) !important;
    background-color: transparent !important;
  }

  .v-select .v-select__selection-text { font-family: 'Syne', sans-serif !important; color: var(--text) !important; }

  .monthly-payment-mount {
    font-family: 'Raleway', sans-serif !important;
    font-weight: 800 !important;
    font-size: 2rem !important;
    color: var(--text) !important;
    line-height: 1.1 !important;
  }

  .monthly-payment-title {
    font-family: 'Space Mono', monospace !important;
    text-transform: uppercase !important;
    font-weight: 400 !important;
    font-size: 11px !important;
    letter-spacing: 0.12em !important;
    color: var(--muted) !important;
    margin-bottom: 1rem !important;
    margin-top: 4px !important;
  }

  .monthly-payment-line {
    width: 32px !important;
    border-width: 2px !important;
    margin-bottom: 6px !important;
    margin-top: 12px !important;
    background: linear-gradient(90deg, var(--accent), var(--accent2)) !important;
    border-color: transparent !important;
    opacity: 1 !important;
  }

  .monthly-payment-line-title {
    width: 32px !important;
    border-width: 2px !important;
    margin-bottom: 20px !important;
    margin-top: 8px !important;
    background: linear-gradient(90deg, var(--accent), var(--accent2)) !important;
    border-color: transparent !important;
    opacity: 1 !important;
  }

  .titlepie, .titlecard {
    font-family: 'Raleway', sans-serif !important;
    text-transform: uppercase !important;
    font-weight: 800 !important;
    font-size: 12px !important;
    letter-spacing: 0.18em !important;
    color: var(--muted) !important;
    margin-bottom: -20px !important;
  }

  .v-card { background: var(--bg2) !important; border: 1px solid var(--border) !important; box-shadow: none !important; }

  .v-tabs { background: var(--bg3) !important; border-bottom: 1px solid var(--border) !important; }

  .v-tab {
    font-family: 'Space Mono', monospace !important;
    font-size: 11px !important;
    text-transform: uppercase !important;
    letter-spacing: 0.08em !important;
    color: var(--muted) !important;
  }

  .v-tab--selected { color: var(--accent2) !important; }

  .v-tab__slider {
    background: linear-gradient(90deg, var(--accent), var(--accent2)) !important;
    height: 2px !important;
  }

  .v-table { background: var(--bg2) !important; color: var(--text) !important; }

  .v-table thead tr th {
    font-family: 'Space Mono', monospace !important;
    font-size: 10px !important;
    text-transform: uppercase !important;
    letter-spacing: 0.08em !important;
    color: var(--muted) !important;
    background: var(--bg3) !important;
    border-bottom: 1px solid var(--border) !important;
  }

  .v-table tbody tr td {
    font-family: 'Syne', sans-serif !important;
    font-size: 13px !important;
    color: var(--text) !important;
    border-bottom: 1px solid var(--border) !important;
  }

  .v-table tbody tr:hover td { background: rgba(124,106,247,0.08) !important; }

  .v-table table tr:hover { background-color: rgba(124,106,247,0.08) !important; color: var(--text) !important; }

  .boton {
    width: 50% !important;
    margin: auto;
    background: linear-gradient(135deg, var(--accent), var(--accent2)) !important;
    color: white !important;
    font-family: 'Space Mono', monospace !important;
    font-size: 11px !important;
    text-transform: uppercase !important;
    letter-spacing: 0.1em !important;
    box-shadow: none !important;
    border-radius: 6px !important;
  }

  .boton:hover { opacity: 0.85; }

  .boton2 {
    background: var(--bg3) !important;
    color: var(--accent2) !important;
    border: 1px solid var(--border-bright) !important;
    box-shadow: none !important;
  }

  .boton2:hover { background: var(--accent) !important; color: white !important; }

  .botongroup { display: flex; justify-content: center; }

  .pegajoso { position: sticky !important; top: 45px !important; }

  .smol { width: 24% !important; margin: auto !important; }

  .botones { margin-top: 30px; }

  .calculator-investment { line-height: 0.5em; }

  .col-style { padding-bottom: 0 !important; padding-top: 0 !important; }

  .v-field__input { max-height: 44px !important; }

  .v-table--density-default > .v-table__wrapper > table > tbody > tr > td,
  .v-table--density-default > .v-table__wrapper > table > thead > tr > td,
  .v-table--density-default > .v-table__wrapper > table > tfoot > tr > td {
    height: 40px !important;
  }
</style>