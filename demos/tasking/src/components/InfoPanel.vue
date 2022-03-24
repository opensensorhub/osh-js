<template>
  <v-card class="inspire">
    <div class="variant-title">UAV Infos</div>
    <v-divider></v-divider>
    <div id="infos">
      <table class="table-info">
        <tr>
          <td>
            <div>
              <b>
                <pre>UAV Location</pre>
              </b>
              <p></p>
              <pre id="text_loc" class="textLocation">{{ textLocation }}</pre>
              <p>&nbsp;</p>
              <!--b>
                <pre>UAV Attitude</pre>
              </b>
              <p></p>
              <pre id="text_att">{{ textAttitude }}</pre>
              <p>&nbsp;</p>
              <b>
                <pre>Gimbal Orientation</pre>
              </b>
              <p></p>
              <pre id="text_gimbal">{{ textGimbal }}</pre>
              <p>&nbsp;</p-->
              <b>
                <pre>Status Info</pre>
              </b>
              <p></p>
              <pre id="text_status" class="textStatus">{{ textStatus }}</pre>
              <p>&nbsp;</p>
              <b>
                <pre>Commands ACK</pre>
              </b>
              <p></p>
              <div class="textCommands">
                <p v-for="[key, value] in commands" >
                  {{ value.type}}: {{ value.status}}
                </p>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div>
    </div>
  </v-card>
</template>

<script>

import ControlFilter from "../../../../source/core/sweapi/control/ControlFilter";
import {EventType} from "../../../../source/core/event/EventType";

export default {
  name: "InfoPanel",
  components: {},
  mounted() {
    this.init();
  },
  data() {
    return {
      textCommands: 'Waiting for first command...',
      textStatus: 'Waiting for first data packet...',
      textGimbal: 'Waiting for first data packet...',
      textAttitude: 'Waiting for first data packet...',
      textLocation: 'Waiting for first data packet...',
      commands: new Map()
    }
  },
  props: [
    'droneLocationDataSource', 'control'
  ],
  methods: {
    init() {
      this.droneLocationDataSource.subscribe(message => {
        const values = message.values;
        for (let obs of values) {
          this.textLocation = JSON.stringify(obs, null, 2);
        }
      }, [EventType.DATA]);

      this.control.streamStatus(new ControlFilter({}), async (message) => {
        const statusStr = String.fromCharCode.apply(null, new Uint8Array(message));
        const status = JSON.parse(statusStr);
        this.textStatus = status;

        const command = await this.control.getCommandById(status['command@id']);

        this.commands.set(command.properties.id, {
          type : Object.keys(command.properties.params)[0],
          status: command.properties.status
        });
      });
    }
  }
};
</script>
<style scoped>
.inspire {
  position: absolute;
  top: calc(10%);
  right: 0;
  z-index: 10;
  border-radius: 4px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23) !important;
  background-color: #363636 !important;
  caret-color: rgba(0, 0, 0, 0);
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -ms-user-select: none;
  opacity: 75%;
  width: 495px;
  height: 80%;
}

.inspire > aside {
  min-width: 20px;
  width: unset !important;
  max-width: 66px;
  padding-right: 5px;
}

.variant-title {
  color: white;
  padding: 10px;
  text-align: center;
  vertical-align: middle;
}

.table-info pre, .table-info div {
  overflow: auto;
  color: white;
  padding: 5px;
}

.textLocation {
  height: 230px;
}

.textStatus {
  height: 155px;
  white-space: pre-wrap;
  word-break: keep-all;
  overflow: auto;
}

.textCommands {
  max-height: 170px;
  overflow: auto;
}

.textCommands p {
  line-height: 22px;
  margin-left: 5px;
}
</style>
