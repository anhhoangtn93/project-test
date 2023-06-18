<template>
    <v-row justify="center" class="mt-2">
        <v-col md="8" sm="12" lg="5">
            <v-card elevation="0">
                <v-card-text>
                    <v-img :src="require(`@/assets/vinnet-logo.png`)" max-width="150" />
                    <v-observer v-slot="{ handleSubmit }">
                        <v-form @submit.prevent="handleSubmit(submit)" class="mt-10">                            
                            <v-provider rules="required|email" v-slot="{ errors }" :name="$t('login.username')" v-if="!showSuccess">
                                <v-text-field v-model="form.email" required placeholder="customer@vinnet.vn"
                                    variant="outlined" :label="$t('login.username')" prepend-inner-icon="mdi-email" :error-messages="errors"/>
                            </v-provider>
                            <v-row v-if="!showSuccess">
                                <v-col class="d-flex flex-column">
                                    <v-btn color="primary" type="submit" v-text="$t('message.confirm')"/>
                                </v-col>
                            </v-row>
                            <v-alert
                                v-model="showSuccess"
                                color="primary"
                                dark
                                transition="scale-transition"
                                >
                                {{ $t('message.check_email') }}
                            </v-alert>
                            <v-row>
                                <v-col>
                                    Quay lại 
                                    <router-link :to="{ name: 'login' }">Đăng nhập</router-link>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-observer>
                </v-card-text>
                <v-snackbar v-model="showError">
                    {{ errors }}
            </v-snackbar>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { mapActions } from "vuex";
import i18n from '@/i18n';

export default {
    name: "ForgotPassword",
    components: {},
    data(){
        return {
            form: {
                email:"",
            },
            showError: false,
            showSuccess: false,
            errors: "",
        }
    },
    methods: {
        ...mapActions({
            resetPassword: 'auth/resetPassword'
        }),

        async submit() {
            try {
                let result = await this.resetPassword(this.form.email);
                if (result.success) {
                    this.showSuccess = true
                    return
                } else {
                    this.errors = result.errors
                }
            } catch (error) {
                this.showError = true
            }
            this.showError  = true
        },
    }
}
</script>