<template>

  <v-card
      color="#6F2DBD"
      class="ma-4 rounded-lg justify-center text-center"
      elevation="10"
      height="225"
      width="225"
  > <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-col>
          <v-dialog max-width="70%" v-model="dialog" >
            <template v-slot:activator="{on}">
              <v-btn icon
                     v-on="on"
                     class="white--text"
              >
                <v-icon class="mr-2" color="white" size="30">mdi-plus-circle</v-icon><h3>ADD EXERCISE</h3>
              </v-btn>
            </template>
            <CAddExerciseDialog v-on:close-dialog="closeDialog" v-on:exerciseAddedSuccessfully="sendExerciseToFather" :key="renderKey"/>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </v-card>

</template>

<script>
import AddExerciseDialog from "./AddExerciseDialog";
export default {
name: "AddExerciseCard",
  components: {
  CAddExerciseDialog : AddExerciseDialog
  },
  data: () => {
    return {
      dialog: false,
      renderKey: 0,
      exerciseCount: 1

    }
  },
  methods: {
    closeDialog() {
      this.dialog = false;
      this.renderKey++;
    },
    sendExerciseToFather(payload) {
      payload['order'] = this.exerciseCount++;
      this.$emit('addExerciseSuccess', payload);
    }
  }
}
</script>

<style scoped>

.v-btn::before {
  background-color: transparent;
}

</style>