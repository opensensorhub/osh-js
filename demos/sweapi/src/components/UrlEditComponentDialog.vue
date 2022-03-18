<template>
  <v-dialog
      v-model="dialog"
      persistent
      max-width="450"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          class="mx-4"
          fab
          dark
          small
          color="cyan"
          v-bind="attrs"
          v-on="on"
      >
        <v-icon dark>
          mdi-pencil
        </v-icon>
      </v-btn>
    </template>
    <v-card
        class="mx-auto"
        outlined
    >
      <v-card-title class="text-h5">
        Server properties
      </v-card-title>
      <v-divider></v-divider>
      <v-spacer></v-spacer>
      <v-card-text
        class="mt-8"
      >
      <v-form
          ref="form"
          :key="key"
      >
        <v-text-field
            label="Fetch URL"
            required
            v-model="fetch"
        ></v-text-field>

        <v-text-field
            v-model="mqtt"
            label="MQTT URL"
            required
        ></v-text-field>

        <v-text-field
            v-model="mqttPre"
            label="MQTT Topic prefix"
            required
        ></v-text-field>

        <v-checkbox
            v-model="tls"
            label="tls"
            required
        ></v-checkbox>
      </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            text
            @click="dialog = false;cancel()"
        >
          Cancel
        </v-btn>
        <v-btn
            color="primary"
            text
            @click="dialog = false;save()"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "UrlEditComponentDialog",
  props: [
    'fetchUrl','mqttUrl','tlsUrl', 'mqttPrefix'
  ],
  data() {
    return {
      dialog: false,
      tls: this.tlsUrl,
      fetch: this.fetchUrl,
      mqtt: this.mqttUrl,
      mqttPre: this.mqttPrefix,
      key:0
    }
  },
  mounted() {
  },
  methods: {
    save () {
      this.$emit('updated-url', {
        mqtt: this.mqtt,
        fetch: this.fetch,
        tls: this.tls,
        mqttPrefix: this.mqttPre,
      });
    },
    cancel() {
      // restore initial value
      this.fetch = this.fetchUrl;
      this.mqtt = this.mqttUrl;
      this.tls = this.tlsUrl;
      this.mqttPre = this.mqttPrefix;
      this.key++;
    },
  },
}
</script>

<style scoped>

</style>
