<template>
  <v-container>
  <v-card
      class="rounded-lg"
      elevation="8"
      width="100%"
      color="white"
  >
    <div class="mx-5 pt-1" v-if="this.identifier > 3">
      <span class="float-right" v-if="isDetail !== true">
        <v-btn class="ml-5" icon x-large @click="deleteCycleCard">
        <v-icon color="error" x-large>mdi-trash-can</v-icon>
      </v-btn></span></div>
    <v-slide-group
        class="pt-4 pl-4 pr-4 pb-0"
        active-class="success"
        show-arrows
    >

      <v-slide-item
          v-for="exercise in exercises"
          :key="exercise.id"
         >
        <CExerciseCard :isDetail="isDetail" :exercise-info="exercise" @deleteExerciseClicked="deleteExercise(exercise)" @editExerciseClicked="handleEditExercise(exercise)" class="clickable-cursor" :key="exercise.id"/>
      </v-slide-item>
      <v-slide-item v-if="isDetail !== true">
        <CAddExerciseCard v-on:addExerciseSuccess="addExerciseToCycleArray"/>
      </v-slide-item>
    </v-slide-group>
    <div class="white--text cycle-footer-bg">
      <h3 class="d-inline-block ml-3">CYCLE NAME:</h3>
      <v-text-field
          class="pa-4 d-inline-block mb-0"
          v-model="cycleName"
          v-if="this.isDetail !== true"
          clearable
          flat
          hide-details
          outlined
      />
      <v-text-field
          class="pa-4 d-inline-block mb-0"
          v-model="cycleName"
          v-if="this.isDetail === true"
          readonly
          flat
          hide-details
          outlined
      />
      <span class="pl-2 mt-4 float-right mr-5">
      <h3 class="d-inline-block mr-2">CYCLE REPETITIONS:</h3>
      <v-text-field
          class="reps d-inline-block"
          v-model="cycleRepetitions"
          outlined
          v-if="this.isDetail !== true"
          hide-details
          single-line
      />
        <v-text-field
            class="reps d-inline-block"
            v-model="cycleRepetitions"
            outlined
            readonly
            v-if="this.isDetail === true"
            hide-details
            single-line
        />
    </span>
    </div>
  </v-card>
    <v-snackbar v-model="exerciseSuccessSnackbar.visible" :color="exerciseSuccessSnackbar.color" :multi-line="exerciseSuccessSnackbar.mode === 'multi-line'" :timeout="exerciseSuccessSnackbar.timeout" :top="exerciseSuccessSnackbar.position === 'top'">
      <v-layout align-center pr-4>
        <v-icon class="pr-3" dark large>{{ exerciseSuccessSnackbar.icon }}</v-icon>
        <v-layout column>
          <div>
            <strong>{{ exerciseSuccessSnackbar.title }}</strong>
          </div>
          <div>{{ exerciseSuccessSnackbar.text }}</div>
        </v-layout>
      </v-layout>
      <v-btn v-if="exerciseSuccessSnackbar.timeout === 0" icon @click="exerciseSuccessSnackbar.visible = false">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-snackbar>

    <v-dialog
        v-model="editDialog"
        width="500"
        v-if="isDetail !== true"
    >
      <CEditExerciseDialog v-on:updateExercise="updateExercise" :key="counter"/>
    </v-dialog>

  </v-container>



</template>

<script>
import AddExerciseCard from "./AddExerciseCard";
import ExerciseCard from "./ExerciseCard"
import RoutineStore from "../stores/routineStore";
import EditExerciseDialog from "./EditExerciseDialog";
import EditStore from "../stores/editStore";
export default {
  name: "CycleCard",
  mounted() {
    if(this.cacheExercises !== undefined) this.exercises = this.cacheExercises;
  },
  data: () => {
    return {
      exercises : [],
      editDialog: false,
      counter: 0,
      exerciseSuccessSnackbar : {
        color: "success",
        icon: "mdi-check-circle",
        mode: "multi-line",
        position: "bot",
        timeout: 3500,
        title: "Success",
        text: null,
        visible: false
      }
    }
  },
  props: {
    identifier: Number,
    cacheExercises: [Array, Object],
    isDetail: Boolean
  },
  components: {
    CAddExerciseCard : AddExerciseCard,
    CExerciseCard : ExerciseCard,
    CEditExerciseDialog : EditExerciseDialog
  },
  methods: {
    addExerciseToCycleArray(payload) {
      this.exerciseSuccessSnackbar.visible = true;
      if(this.isExerciseAlreadyPresent(payload)) {
        this.exerciseSuccessSnackbar.icon = "mdi-close-circle";
        this.exerciseSuccessSnackbar.color = "error";
        this.exerciseSuccessSnackbar.title = "Error";
        this.exerciseSuccessSnackbar.text = "You can't add the same exercise in a cycle.";
        return;
      } else {
        this.exerciseSuccessSnackbar.icon = "mdi-check-circle";
        this.exerciseSuccessSnackbar.title = "Success";
        this.exerciseSuccessSnackbar.color = "success";
        this.exerciseSuccessSnackbar.text = "Exercise added successfully.";
      }
      this.exercises = this.getCycleExercises();
      this.getCycleExercises().push(payload);
    },
    async deleteCycleCard() {
      const result = await this.$confirm('Do you really want to delete this cycle?', { title: 'WARNING' })
      if(result) {
        this.$emit('cycleTrashClicked', this.identifier);
      }
    },
    isExerciseAlreadyPresent(payload) {
      let exercise = payload.exercise;
      return this.getCycleExercises().findIndex(e => e.exercise === exercise) >= 0;
    },
    getCycle() {
      let index = RoutineStore.cycles.findIndex(c => c.cycle.order === this.identifier);
      return RoutineStore.cycles[index];
    },
    getCycleExercises() {
      return this.getCycle().cycle.exercises;
    },
    async deleteExercise(exercise) {
      this.editDialog = false;
      const result = await this.$confirm('Do you really want to delete this exercise?', { title: 'WARNING' })
      if(result) {
        let exercises = this.getCycleExercises();
        console.log(exercise);
        let idx = exercises.findIndex(e => e.exercise.id === exercise.exercise.id);
        exercises.splice(idx, 1);
      }
    },
    updateExercise() {
      this.editDialog = false;
      let idx = this.getCycleExercises().findIndex(e => e.exercise.id === EditStore.currentExercise.exercise.id);
      this.getCycleExercises()[idx].duration = EditStore.currentExercise.duration;
      this.getCycleExercises()[idx].repetitions = EditStore.currentExercise.repetitions;
    },
    handleEditExercise(exercise) {
      this.counter++;
      EditStore.currentExercise = exercise;
      this.editDialog = true;
    }
  },
  computed : {
    cycleRepetitions: {
      get: function () {
        return this.getCycle().cycle.repetitions;
      },
      set: function (newValue) {
        this.getCycle().cycle.repetitions = newValue;
      }
    },
    cycleName: {
      get: function () {
        return this.getCycle().cycle.name;
      },
      set: function (newValue) {
        this.getCycle().cycle.name = newValue;
      }
    }
  }
}
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: white!important;
}
.v-text-field--outlined >>> label {
  color: white!important;
}
.v-text-field--outlined >>> input {
  color: white!important;
}

.reps {
  width: 45px!important;
}

.cycle-footer-bg {
  background-color: #6F2DBD;
}

.clickable-cursor {
  cursor: pointer;
}


</style>