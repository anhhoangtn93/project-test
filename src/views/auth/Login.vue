<template>
    <dynamic-layout name="login">
        <v-row justify="center" class="mt-10">
            <v-col md="8" sm="12" lg="4">
                <v-form>
                    <v-card>
                        <v-card-title class="text-center">
                            {{ $t("login-dialog-title") }}
                        </v-card-title>
                        <v-card-text class="pb-0">
                            <label>{{ $t('email-label') }}</label>
                            <v-text-field name="email" variant="outlined"  density="compact" class="mt-2" 
                                placeholder="user@email.com"
                                v-model="email" @change="v$.email.$touch" @blur="v$.email.$touch"
                                :error-messages="v$.email.$errors.map((e) => e.$message)" append-inner-icon="mdi-email"/>

                                <label>{{ $t('password-label') }}</label>
                            <v-text-field name="password" type="password" variant="outlined" :placeholder="$t('password-label')" density="compact" class="mt-2"
                                v-model="password" @change="v$.password.$touch" @blur="v$.password.$touch"
                                :error-messages="v$.password.$errors.map((e) => e.$message)" append-inner-icon="mdi-lock" hide-details/>
                            <v-checkbox :label="$t('remember-label')" hide-details></v-checkbox>
                        </v-card-text>

                        <v-card-actions class="pa-4 pt-0">
                            <v-spacer />
                            <v-btn variant="elevated" color="blue" @click="submit()">{{ $t("login-btn") }}</v-btn>
                        </v-card-actions>

                    </v-card>

                    <v-snackbar v-model="showError">
                        {{ errors }}
                        <!-- <template v-slot:action="{ attrs }">
                        <v-btn color="pink" text v-bind="attrs" @click="showError = false">Close</v-btn>
                    </template> -->
                    </v-snackbar>

                </v-form>
            </v-col>
        </v-row>

    </dynamic-layout>
</template>

<script>
import { mapActions } from "vuex";

import DynamicLayout from "@/views/layouts/DynamicLayout";
import { reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";

export default {
    name: "Login",
    components: { DynamicLayout },

    // setup vuelidate
    setup: () => ({ v$: useVuelidate() }),
    // define validation rules on each data field
    validations() {
        return {
            email: { required, email },
            password: { required },
        };
    },

    data() {
        return {
            email: "",
            password: "",

            showError: false,
            errors: "",

        };
    },
    methods: {
        ...mapActions({
            login: "auth/login",
        }),

        async submit() {
            // validate form
            const result = await this.v$.$validate()
            if (!result) {
                // notify user form is invalid
                return
            }
            // create form data object, used to post form
            const formData = new FormData()
            formData.append('email', this.email)
            formData.append('password', this.password)

            try {
                let result = await this.login(formData);
                if (result.success) {
                    this.$router.push("/");
                    this.showError = false;
                    return;
                } else {
                    this.errors = result.errors;
                }
            } catch (error) {
                console.log(error)
                this.showError = true;
            }
            this.showError = true;
        },
    },
};
</script>