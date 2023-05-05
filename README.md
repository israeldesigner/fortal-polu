# nodejs-aulas

db.createUser({user: "root",pwd:"pass123",roles:[{role: "userAdminAnyDatabase", db: "admin" },"readWriteAnyDatabase"]});
db.grantRolesToUser('admin',[{ role: "root", db: "admin" }])
db.createUser({user: "citimbd",pwd:"0p9o8i7u",roles:[{role: "readWrite", db: "db_po" }]});

<div class="sidebar" id="sidebar">
  <div class="menuIcon"><%- include('icon-menu') %></div>
  <img
    src="./assets/img/icon-pref.png"
    class="toggleDesactive"
    style="margin-bottom: 20px; margin-left: -8px"
    width="45"
    alt="icon-pref"
  />
  <div class="d-flex my-3 justify-center">
    <img
      src="./assets/img/logoPref.png"
      width="200"
      alt="Logo Prefeitura de Fortaleza"
      style="margin-bottom: 20px"
      class="toggleActive"
    />
    <!-- <div>
          <a id="reset-darkmode" href="#" title="Clear Dark Mode Override"><small>(reset)</small></a></h1>
          <input type="checkbox" id="toggle-darkmode" />
          <label for="toggle-darkmode"><span>Toggle Light/Dark Mode</span></label>
        </div> -->
  </div>
  <!-- <h3 class="my-3 text-2xl">Legenda</h3> -->
  <h3 class="text-lg toggleActive"><b>Níveis</b></h3>
  <div class="card aside__card rounded-none sofia-font my-2 mb-eq">
    <div class="d-flex mb-eq">
      <img src="./assets/img/Boa.png" width="32" class="mr-eq" /> <strong>N1 - Bom</strong>
    </div>
    <div class="d-flex mb-eq">
      <img src="./assets/img/Moderada.png" width="32" class="mr-eq" />
      <strong>N2 - Moderado</strong>
    </div>
    <div class="d-flex mb-eq">
      <img src="./assets/img/ruim.png" width="32" class="mr-eq" /><strong>N3 - Ruim</strong>
    </div>
    <div class="d-flex mb-eq">
      <img src="./assets/img/Muito-ruim.png" width="32" class="mr-eq" /><strong
        >N4 - Muito ruim</strong
      >
    </div>
    <div class="d-flex mb-eq">
      <img src="./assets/img/pessima.png" width="32" class="mr-eq" /><strong>N5 - Péssima</strong>
    </div>
    <div class="d-flex mb-eq">
      <img src="./assets/img/Semponto.png" width="32" class="mr-eq" /><strong
        >Monitor a ser instalado</strong
      >
    </div>
  </div>

  <div class="d-flex mb-eq">
    <div class="logos-poluentes">
      <img src="./assets/img/extemp.png" width="22" class="mr-eq" alt="Temperatura" />
    </div>
    <h3 class="text-lg toggleActive"><b>Temperatura ambiente (ºC)</b></h3>
  </div>
  <div class="card aside__card rounded-md sofia-font mb-eq">
    <article class="toggleActive textTemp">
      <img id="soundTemp" src="./assets/img/sound_final.png" alt="icone sound" width="32" />
      <p class="textTemp">Temperatura do ar no ambiente medido.</p>
    </article>
  </div>
  <div class="d-flex mb-eq">
    <div class="logos-poluentes">
      <img src="./assets/img/umidade.png" width="30" class="mr-eq" alt="Temperatura" />
    </div>
    <h3 class="text-lg toggleActive"><b>Umidade relativa (%)</b></h3>
  </div>
  <div class="card aside__card rounded-md sofia-font mb-eq">
    <article class="toggleActive">
      Relação entre a quantidade de água existente no ar e a quantidade máxima que poderia haver na
      mesma temperatura.
    </article>
  </div>

  <h3 class="text-lg toggleActive"><b>Micro partículas</b></h3>
  <div class="card aside__card rounded-none sofia-font mb-eq">
    <div class="logos-poluentes">
      <img src="./assets/img/pm25.png" width="30" alt="pm2.5" />
    </div>
    <article class="toggleActive">
      Podem ser definidas de maneira simplificada como aquelas cujo diâmetro aerodinâmico é menor ou
      igual a 2,5 µm. or causa do seu tamanho diminuto, penetram profundamente no sistema
      respiratório, podendo atingir os alvéolos pulmonares.
      <h4 class="sofia-font text-base font-black text-lg">Escala</h4>
      <div class="d-flex my-2 aside__escala">
        <div class="progress-bar progressBoa">
          0
          <br />
          a
          <br />
          25
        </div>
        <div class="progress-bar progressModerada">
          25
          <br />
          a
          <br />
          50
        </div>
        <div class="progress-bar progressRuim">
          50 <br />
          a <br />
          75
        </div>
        <div class="progress-bar progressMruim">75 <br />a <br />125</div>
        <div class="progress-bar progressPessima">125 <br />a <br />300</div>
      </div>
    </article>
    <!-- <h3 class="text-xl"><b>PM<sub>10</sub></b></h3> -->
    <div class="logos-poluentes">
      <img src="./assets/img/pm10.png" width="30" alt="pm10" />
    </div>
    <article class="toggleActive">
      Podem ser definidas de maneira simplificada como aquelas cujo diâmetro aerodinâmico é menor ou
      igual a 10 µm. Dependendo da distribuição de tamanho na faixa de 0 a 10 µm, podem ficar
      retidas na parte superior do sistema respiratório ou penetrar mais profundamente, alcançando
      os alvéolos pulmonares.
      <h4 class="sofia-font text-base font-black text-lg">Escala</h4>
      <div class="d-flex my-2 aside__escala">
        <div class="progress-bar progressBoa">
          0
          <br />
          a
          <br />
          50
        </div>
        <div class="progress-bar progressModerada">
          50
          <br />
          a
          <br />
          100
        </div>
        <div class="progress-bar progressRuim">
          100 <br />
          a <br />
          150
        </div>
        <div class="progress-bar progressMruim">150 <br />a <br />250</div>
        <div class="progress-bar progressPessima">250 <br />a <br />600</div>
      </div>
    </article>
  </div>

  <div class="d-flex">
    <div class="logos-poluentes">
      <img src="./assets/img/co2.png" width="30" class="mr-eq" alt="Monóxido de carbono" />
    </div>
    <h3 class="text-lg toggleActive"><b>Monóxido de Carbono</b></h3>
  </div>
  <div class="card aside__card rounded-md sofia-font mb-eq">
    <article class="toggleActive">
      É um gás incolor e inodoro que resulta da queima incompleta de combustíveis de origem orgânica
      (combustíveis fósseis, biomassa etc.). Em geral é encontrado em maiores concentrações nas
      cidades, emitido principalmente por veículos automotores. Altas concentrações de CO são
      encontradas em áreas de intensa circulação de veículos.
      <h4 class="sofia-font text-base font-black text-lg">Escala</h4>
      <div class="d-flex my-2 aside__escala">
        <div class="progress-bar progressBoa">
          0
          <br />
          a
          <br />
          9
        </div>
        <div class="progress-bar progressModerada">
          9
          <br />
          a
          <br />
          11
        </div>
        <div class="progress-bar progressRuim">
          11 <br />
          a <br />
          13
        </div>
        <div class="progress-bar progressMruim">13 <br />a <br />15</div>
        <div class="progress-bar progressPessima">15 <br />a <br />50</div>
      </div>
    </article>
  </div>

  <div class="d-flex">
    <div class="logos-poluentes">
      <img src="./assets/img/o3.png" width="30" class="mr-eq" alt="Ozônio" />
    </div>
    <h3 class="text-lg toggleActive"><b>Ozônio</b></h3>
  </div>
  <div class="card aside__card rounded-none sofia-font mb-eq">
    <article class="toggleActive">
      Além de prejuízos à saúde, o ozônio pode causar danos à vegetação. É sempre bom ressaltar que
      o ozônio encontrado na faixa de ar próxima do solo, onde respiramos, chamado de “mau ozônio”,
      é tóxico. Entretanto, na estratosfera (cerca de 25 km de altitude) o ozônio tem a importante
      função de proteger a Terra, como um filtro, dos raios ultravioletas emitidos pelo Sol.
      <h4 class="sofia-font text-base font-black text-lg">Escala</h4>
      <div class="d-flex my-2 aside__escala">
        <div class="progress-bar progressBoa">
          0
          <br />
          a
          <br />
          100
        </div>
        <div class="progress-bar progressModerada">
          100
          <br />
          a
          <br />
          130
        </div>
        <div class="progress-bar progressRuim">
          130 <br />
          a <br />
          160
        </div>
        <div class="progress-bar progressMruim">160 <br />a <br />200</div>
        <div class="progress-bar progressPessima">200 <br />a <br />800</div>
      </div>
    </article>
  </div>

  <div class="d-flex">
    <div class="logos-poluentes">
      <img src="./assets/img/no2.png" width="30" class="mr-eq" alt="Dióxido de nitrogênio" />
    </div>
    <h3 class="text-lg toggleActive"><b>Dióxido de nitrogênio</b></h3>
  </div>
  <div class="card aside__card rounded-none sofia-font my-2 mb-eq">
    <article class="toggleActive">
      É formado durante processos de combustão. Em grandes cidades, os veículos geralmente são os
      principais responsáveis pela emissão dos óxidos de nitrogênio. O NO, sob a ação de luz solar
      se transforma em NO2, que tem papel importante na formação de oxidantes fotoquímicos como o
      ozônio. Dependendo das concentrações, o NO2 causa prejuízos à saúde.
      <h4 class="sofia-font text-base font-black text-lg">Escala</h4>
      <div class="d-flex my-2 aside__escala">
        <div class="progress-bar progressBoa">
          0
          <br />
          a
          <br />
          200
        </div>
        <div class="progress-bar progressModerada">
          200
          <br />
          a
          <br />
          240
        </div>
        <div class="progress-bar progressRuim">
          240 <br />
          a <br />
          320
        </div>
        <div class="progress-bar progressMruim">320 <br />a <br />1130</div>
        <div class="progress-bar progressPessima">1130 <br />a <br />3750</div>
      </div>
    </article>
  </div>
</div>
