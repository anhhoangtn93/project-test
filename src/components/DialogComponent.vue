<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent no-click-animation width="80vw">
            <v-card>
                <v-card-title class="text-h5">
                    Tạo mới
                </v-card-title>
                <v-container>
                    <div class="new-campaign py-3">
                        <v-row no-gutters>
                            <v-col cols="6" class="px-4">
                                <div><label for="campaign-name">Tên Campaign</label><span class="text-red">*</span>
                                    <div class="mt-2"><input class="border w-100 pa-2" id="campaign-name" type="text"></div>
                                </div>
                            </v-col>
                            <v-col cols="6" class="px-4">
                                <div><label for="brand-name">BrandName</label><span class="text-red">*</span>
                                    <div class="mt-2"><input class="border w-100 pa-2" id="brand-name" type="text"></div>
                                </div>
                            </v-col>
                        </v-row>

                        <v-row no-gutters class="mt-2">
                            <v-col cols="6" class="px-4">
                                <div><label for="field">Lĩnh vực</label>
                                    <div class="mt-2"><input class="border w-100 pa-2 input-disabled" id="field" type="text"
                                            disabled></div>
                                </div>
                            </v-col>
                            <v-col cols="6" class="px-4">
                                <div><label for="smg-type">Loại tin nhắn</label>
                                    <div class="mt-2"><input class="border w-100 pa-2 input-disabled" id="smg-type"
                                            type="text" disabled></div>
                                </div>
                            </v-col>
                        </v-row>

                        <v-row no-gutters class="mt-2">
                            <v-col cols="6" class="px-4">
                                <div><label for="telecom-operator">Nhà mạng</label>
                                    <div class="mt-2"><input class="border w-100 pa-2 input-disabled" id="telecom-operator"
                                            type="text" disabled></div>
                                </div>
                            </v-col>
                            <v-col cols="6" class="px-4">
                                <div><label for="sending-time">Thời gian gửi tin</label><span class="text-red">*</span>
                                    <div class="mt-2"><input class="border w-100 pa-2" id="sending-time" type="text"></div>
                                </div>
                            </v-col>
                        </v-row>

                        <v-row no-gutters class="mt-2">
                            <v-col cols="6" class="px-4">
                                <div class="d-flex justify-start align-center mt-2">
                                    <div> <label for="msg-content">Nội dung tin nhắn</label><span class="text-red">*</span>
                                    </div>
                                    <div class="pl-3"><v-btn class="text-none" size="small">Tin mẫu</v-btn></div>
                                </div>
                            </v-col>
                            <v-col cols="6" class="px-4">

                                <div class="d-flex flex-row justify-start align-center">
                                    <div> <label for="msg-content">Chọn thuê bao</label><span class="text-red">*</span>
                                    </div>
                                    <div class="pl-3"><v-btn class="text-none" size="small">Chọn tệp</v-btn></div>
                                </div>
                                <div class="description">(Tệp thuê bao phải giống trong mẫu của hệ thống: <a
                                        class="description" href="#">Mẫu danh sách</a>)</div>

                            </v-col>
                        </v-row>

                        <v-row no-gutters class="mt-2">
                            <v-col cols="6" class="px-4">
                                <div class="wrap-textarea">
                                    <textarea id="msg-content" class="border w-100 pa-2 mt-2" rows="10"></textarea>
                                    <div><span class="characters">(160/1)</span></div>
                                </div>

                            </v-col>
                            <v-col cols="6" class="px-4">
                                <div class="mt-2">
                                    <data-table-component></data-table-component>
                                </div>

                            </v-col>
                        </v-row>
                    </div>
                </v-container>
                <v-card-actions>
                    <v-container class="d-flex flex-row align-center">
                        <div>
                            <div class="text-red">Tổng số tin nhắn của Campaign: 0</div>
                            <div class="text-red">Tổng số tin nhắn có thể sử dụng: 0</div>
                        </div>
                        <v-spacer></v-spacer>
                        <v-btn class="text-none" variant="outlined" @click="setShowModal()" size="small">Tiếp (2/3)</v-btn>
                        <v-btn class="text-none" variant="outlined" @click="setShowModal()" size="small">Quay lại</v-btn>
                    </v-container>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
  
<script>
import { mapActions, mapState } from 'vuex';
import DataTableComponent from '@/components/DataTableComponent.vue';

export default {
    components: {
        DataTableComponent
    },
    computed: {
        ...mapState("modal", {
            isShowModal: state => state.isShowModal
        })
    },
    data() {
        return {
            ...mapActions({
                setShowModal: "modal/setShowModal",
            }),
            dialog: false,
        }
    },
    watch: {
        isShowModal(newVal) {
            this.dialog = newVal;
        }
    }
}
</script>
<style scoped>
* {
    font-size: 0.9rem;
}

.new-campaign {
    border: 1px solid #e6e6e6
}

.input-disabled {
    background-color: #ccc;
}

#msg-content {
    resize: none;
}

.wrap-textarea {
    position: relative;
}

.characters {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    color: #ccc;
}

.description {
    color: #04AA6D;
}
</style>