<template>
    <v-row justify="center">
        <v-col md="8" sm="12" lg="5">
            <v-card elevation="0">
                <v-card-title>
                    <label>Register your account</label>
                </v-card-title>
                <v-card-text>
                    <form @submit.prevent="submit">
                        <v-text-field v-model="form.full_name" placeholder="Your full name" variant="outlined"
                            label="Full name" prepend-inner-icon="mdi-account-box" />
                        <v-text-field v-model="form.username" required placeholder="customer@vinnet.vn"
                            variant="outlined" label="Username" prepend-inner-icon="mdi-account" />
                        <v-text-field v-model="form.password" required type="password" label="Password"
                            variant="outlined" prepend-inner-icon="mdi-lock" />
                        <v-row>
                            <v-col>
                                <v-expansion-panels accordion>
                                    <v-expansion-panel>
                                        <v-expansion-panel-title>
                                            Enterprise account
                                        </v-expansion-panel-title>
                                        <v-expansion-panel-text>
                                            <v-text-field v-model="form.company_name" required hide-details="auto"
                                                label="Company name" placeholder="Company name" variant="outlined"
                                                prepend-inner-icon="mdi-domain" />
                                        </v-expansion-panel-text>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="d-flex flex-column">
                                <v-btn color="primary" type="submit">Register</v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                Have an account already?
                                <router-link :to="{ name: 'login' }">Login</router-link>
                            </v-col>
                        </v-row>

                    </form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>

</template>

<script>
import { mapActions } from "vuex";
export default {
    components: {},
    data() {
        return {
            form: {
                username: "",
                full_name: "",
                password: "",
                company_name: "",
            },

            showError: false
        };
    },
    methods: {
        ...mapActions({
            register: 'auth/register'
        }),
        async submit() {
            try {
                await this.register(this.form);
                // this.$router.push("/posts");
                this.showError = false
            } catch (error) {
                this.showError = true
            }
        },
    },
};
</script>