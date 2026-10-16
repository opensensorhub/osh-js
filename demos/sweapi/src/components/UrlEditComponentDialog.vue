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
      >
        <v-text-field
            v-model="server.url"
            label="Fetch URL"
            required
        ></v-text-field>

        <v-text-field
            v-model="server.mqtt.url"
            label="MQTT URL"
            required
        ></v-text-field>

        <v-text-field
            v-model="server.mqtt.prefix"
            label="MQTT Topic prefix"
            required
        ></v-text-field>

        <v-checkbox
            v-model="server.tls"
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
  data() {
    return {
      dialog: false,
      server: Object.assign({},this.$store.state.server)
    }
  },
  methods: {
    save () {
      // use mutation to be synchronous
      this.$store.commit('setServer', this.server)
      this.$emit('updated-url', this.server);
    },
    cancel() {
      // restore old state
      this.server = Object.assign({},this.$store.state.server);
    },
  },
}
</script>

<style scoped>

</style>
