<template>
    <v-data-table v-model:page="page" :headers="headers" :items="dataTable" :items-per-page="itemsPerPage"
        :sort-by="[{ key: 'stt', order: 'asc' }]" class="elevation-1 pb-3">
        <template v-slot:top>
            <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                    <v-card-text>
                        <v-container>
                            <label for="editThueBao">Số thuê bao</label><span class="text-red">*</span>
                            <input class="border w-100 pa-2 mt-2" id="brand-name" type="text"
                                v-model="editedItem.soThueBao">
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="text-none" variant="outlined" @click="save" size="small">Lưu</v-btn>
                        <v-btn class="text-none" variant="outlined" @click="close" size="small">Hủy</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                    <v-card-text>
                        Bạn muốn xóa hàng này không?
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="text-none" variant="outlined" @click="deleteItemConfirm" size="small">Xóa</v-btn>
                        <v-btn class="text-none" variant="outlined" @click="closeDelete" size="small">Hủy</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon size="small" :color="'#04AA6D'" class="me-2" @click="editItem(item.raw)">
                mdi-pencil
            </v-icon>
            <v-icon size="small" @click="deleteItem(item.raw)">
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
                Reset
            </v-btn>
        </template>
        <template v-slot:[`item.nhaMang`]="{ item }">
            <v-chip :color="getColor(item.columns.nhaMang)">
                {{ item.columns.nhaMang }}
            </v-chip>
        </template>
        <template v-slot:[`item.trangThai`]="{ item }">
            <v-chip :color="getColor(item.columns.nhaMang)">
                {{ item.columns.trangThai }}
            </v-chip>
        </template>
        <template v-slot:bottom>
            <v-row class="d-flex pa-3 align-center">
                <v-col :cols="cols[0]"><span class="text-red">Số thuê bao lỗi : {{ incorrectNumberCount() }}</span></v-col>
                <v-col :cols="cols[1]" class="d-flex justify-center  align-center">
                    <v-col cols="6" class="pa-0">Hiển thị</v-col>
                    <v-col cols="6" class="pa-0"><v-select v-model="itemsPerPage" :items="perPageValues" variant="solo"
                            density="compact" hide-details></v-select></v-col>
                </v-col>
                <v-col :cols="cols[2]">
                    <v-pagination v-model="page" :length="pageCount" :total-visible="3" variant="elevated" :size="'default'"
                        density="compact">
                        <template v-slot:prev>
                            <v-btn class="text-none" size="small" @click="prevPage()">Lùi</v-btn>
                        </template>
                        <template v-slot:next>
                            <v-btn class="text-none" size="small" @click="nextPage()">Tiếp</v-btn>
                        </template>
                    </v-pagination>
                </v-col>

            </v-row>

        </template>

    </v-data-table>
</template>
<script>
export default {
    data: () => ({
        viettelPhoneNumber: /^(0|84)(32|33|34|35|36|37|38|39|96|97|98|86)+([0-9]{6,7})/s,
        vinaPhoneNumber: /^(0|84)(88|91|94|81|82|83|84|85)+([0-9]{6,7})/s,
        dialog: false,
        dialogDelete: false,
        incorrectPhoneNumbers: 0,
        headers: [
            {
                title: 'STT',
                align: 'start',
                sortable: false,
                key: 'stt',
            },
            { title: 'Số thuê bao', key: 'soThueBao' },
            { title: 'Nhà mạng', key: 'nhaMang' },
            { title: 'Trạng thái', key: 'trangThai' },
            { title: 'Sửa', key: 'actions', sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
            stt: '',
            soThueBao: 0,
            nhaMang: 0,
            trangThai: 0,
        },
        defaultItem: {
            stt: '',
            soThueBao: 0,
            nhaMang: 0,
            trangThai: 0,
        },
        perPageValues: [
            { value: 5, title: '5' },
            { value: 10, title: '10' },
            { value: 15, title: '15' },
            { value: 20, title: '20' },
            { value: -1, title: 'All' }
        ],
        itemsPerPage: 5,
        page: 1,
        listNumber: ['0385623548', '000000000', '0385653431', '0213', '081566223', '28346', '09834536223', '84231453421', '4653456', '00000', '111111111', '345612341', '657578', '0385623548', '000000000', '0385653431', '0213', '081566223', '28346', '09834536223', '84231453421', '4653456', '00000', '111111111', '345612341', '657578'],
        dataTable: []
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        pageCount() {
            return Math.ceil(this.listNumber.length / this.itemsPerPage)
        },
        cols() {
            const { xl, lg } = this.$vuetify.display
            return xl ? [3, 3, 6] : lg ? [12, 4, 8] : [12, 12, 12]
        }
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.mockData();
        this.incorrectNumberCount();
    },

    methods: {
        incorrectNumberCount() {
            let result = 0;
            this.dataTable.forEach(item => {
                if (item.correctPhoneNumber === false) {
                    result++
                }
            });
            return result;
        },
        prevPage() {
            this.page && this.page > 1 ? this.page-- : this.page = 1;
        },
        nextPage() {
            if (this.page && this.page < this.pageCount) {
                this.page++;
            }
        },
        getColor(value) {
            let color = '#f24646';
            if (value === 'Viettel' || value === 'Vina Phone') {
                color = '#04AA6D';
            }
            return color;
        },
        mockData() {
            this.dataTable = this.listNumber.map((item, index) => {
                let telecomOperator = "Không xác định";
                let status = 'Sai thuê bao';
                let correct = false;
                if (item.match(this.viettelPhoneNumber)) {
                    telecomOperator = "Viettel";
                    status = 'Xác nhận';
                    correct = true
                } else if (item.match(this.vinaPhoneNumber)) {
                    telecomOperator = "Vina Phone";
                    status = 'Xác nhận';
                    correct = true
                }
                let result = {
                    stt: index + 1,
                    soThueBao: item,
                    nhaMang: telecomOperator,
                    trangThai: status,
                    correctPhoneNumber: correct
                }
                return result;

            })
        },
        checkPhoneNumber(index) {
            if (this.dataTable) {
                if (this.dataTable[index].soThueBao.match(this.viettelPhoneNumber)) {
                    this.dataTable[index].nhaMang = 'Viettel';
                    this.dataTable[index].trangThai = 'Xác nhận';
                    this.dataTable[index].correctPhoneNumber = true;
                } else if (this.dataTable[index].soThueBao.match(this.vinaPhoneNumber)) {
                    this.dataTable[index].nhaMang = 'Vina Phone';
                    this.dataTable[index].trangThai = 'Xác nhận';
                    this.dataTable[index].correctPhoneNumber = true;

                } else {
                    this.dataTable[index].nhaMang = 'Không xác định';
                    this.dataTable[index].trangThai = 'Sai thuê bao';
                    this.dataTable[index].correctPhoneNumber = false;
                }
                this.incorrectNumberCount();
            }
        },

        editItem(item) {
            this.editedIndex = this.dataTable.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.dataTable.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.dataTable.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.dataTable[this.editedIndex], this.editedItem)
                this.checkPhoneNumber(this.editedIndex);
            } else {
                this.dataTable.push(this.editedItem);
                this.checkPhoneNumber(this.editedIndex);
            }
            this.close()
        },
    },
}
</script>
<style></style>