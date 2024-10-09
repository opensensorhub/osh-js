<template>

  <div id="app">
  <div id="popup"></div>
    <body>
    <div class="flex-container">

        <div id="site-selection" class="flex-child">
            <label for="sites">Site:</label>
            <select name="sites" id="sites" class="select">
                <option value="KAMX">KAMX</option>
                <option value="KTBW">KTBW</option>
                <option value="KMLB">KMLB</option>
          </select>
        </div>

        <div id="elev-selection" class="flex-child">
            <label for="elevations">Elevations:</label>
            <select name="elevations" id="elevations" class="select">
                <option value="1">0.5</option>
                <option value="0">ALL</option>
          </select>
        </div>

        <div id="time-label" class="flex-child">
            <label id="product-time">Product Time: -----</label>
        </div>
    </div>

    <div id="cesium-container"></div>
    <div class="footer">
        <TimeController
            @event='onControlEvent'
            :skipTimeStep="'120s'"
            :dataSource="nexradSource"
            :trackRealtime="'00:01:00'"
            v-if="nexradSource"
        ></TimeController>
    </div>
  </body>
  </div>

</template>

<script src="./script.js">



</script>

<style>

    .flex-container {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        align-content: stretch;
    }

    .flex-child {
        flex: 1;
        display: flex;
        border: 5px solid rgb(8, 10, 83);
        justify-content: center;
        padding: 15px;
        background-color: lightgray ;
        font-size: 22px;
    }

    label {
        margin-right: 12px;
    }

    #cesium-container {
        height: 77%;
    }

    .select {
        padding: 5px;
        border: 2px solid #000000;
        background-color: white;
        font-size: 18px;
        appearance: menulist;
    }

</style>
