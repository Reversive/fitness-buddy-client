<template>
  <div>
  <v-card
      color="#6F2DBD"
      class="ma-4 rounded-lg text-center"
      elevation="10"
      height="160"
      width="180">
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-col>
          <v-dialog
              v-model="dialog"
              persistent
              max-width="400px"
          >
            <template v-slot:activator="{ on }">
              <v-btn icon
                     class="white--text"
                     v-on="on"
              >
                <v-icon class="mr-2" color="white" size="30">mdi-plus-circle</v-icon><h3>CREATE</h3>
              </v-btn>
            </template>
            <CCreateExerciseDialog v-on:close-create-exercise-dialog="closeCreateExerciseDialog"/>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>

  </v-card>

  </div>
</template>

<script>
import CreateExerciseDialog from "./CreateExerciseDialog";

export default {
  name: "CreateExerciseCard",
  data: () => {
    return {
      dialog: false,
    }
  },
  components: {
    CCreateExerciseDialog : CreateExerciseDialog
  },
  methods: {
    closeCreateExerciseDialog(cancel) {
      this.$emit('createExerciseResult', cancel);
      this.dialog = false;
    }
  }
}
</script>

<style scoped>
.v-btn::before {
  background-color: transparent;
}
</style>