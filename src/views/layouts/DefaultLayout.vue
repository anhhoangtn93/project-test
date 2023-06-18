<template>
    <v-app class="default-layout">
        <v-system-bar>
            <v-icon icon="mdi-email" class="mx-1"></v-icon>
            <span class="font-weight-bold">biz@vinnet.vn</span>
            <v-icon icon="mdi-phone" class="mx-1"></v-icon>
            <span class="font-weight-bold">1900.0122</span>
        </v-system-bar>
        <v-app-bar elevation="1" app color="blue">
            <template #prepend>
                <v-img :src="require(`@/assets/vinnet-logo.png`)" style="width:120px" />
            </template>
            <template #append>
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" prepend-icon="mdi-account-circle">
                            {{ currentUser.name }}
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item title="Thông tin tài khoản" prepend-icon="mdi-account-circle" />
                        <v-list-item title="Đổi mật khẩu" prepend-icon="mdi-lock" />
                        <v-divider/>
                        <v-list-item title="Đăng xuất" prepend-icon="mdi-exit-app" @click.prevent="logout()"/>
                    </v-list>
                </v-menu>
            </template>

            <v-toolbar-title>SMS Gateway</v-toolbar-title>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" :rail="rail" expand-on-hover app>
            <!-- menu region -->
            <v-list density="compact" nav>
                <v-list-item type="subheader" title="Quản lý" />
                <v-list-item title="Quản lý tài khoản" prepend-icon="mdi-account" :to="{name: 'home'}"/>
                <v-list-item title="Quản lý công ty" prepend-icon="mdi-factory"  :to="{name: 'dashboard'}"/>                

                <v-divider />
                <v-list-group>
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props" prepend-icon="mdi-pencil" title="Đơn hàng"></v-list-item>
                    </template>
                    <v-list-item title="Quản lý tài khoản" />
                    <v-list-item title="Quản lý công ty" />
                    <v-list-item title="Quản lý khách hàng" />
                </v-list-group>
                <v-list-group>
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props" prepend-icon="mdi-pencil" title="Thống kê"></v-list-item>
                    </template>
                    <v-list-item title="Quản lý tài khoản" />
                    <v-list-item title="Quản lý công ty" />
                    <v-list-item title="Quản lý khách hàng" />
                </v-list-group>
                <v-list-group>
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props" prepend-icon="mdi-pencil" title="Công cụ"></v-list-item>
                    </template>
                    <v-list-item title="Quản lý tài khoản" />
                    <v-list-item title="Quản lý công ty" />
                    <v-list-item title="Quản lý khách hàng" />
                </v-list-group>
                <v-divider />
                <v-list-item type="subheader" title="Công cụ" />
                <v-list-item title="Quản lý khách hàng" prepend-icon="mdi-account" />
            </v-list>
            <template #append>
                <v-divider />
                <div class="text-medium-emphasis text-caption py-2 px-3 d-flex align-center" style="overflow:hidden;">
                    <div class="d-inline-flex align-center"><i
                            class="v-icon notranslate v-theme--light v-icon--size-default v-icon--start"
                            aria-hidden="true"><svg class="v-icon__svg" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24" role="img" aria-hidden="true">
                                <path
                                    d="M17.63,5.84C17.27,5.33 16.67,5 16,5H5A2,2 0 0,0 3,7V17A2,2 0 0,0 5,19H16C16.67,19 17.27,18.66 17.63,18.15L22,12L17.63,5.84Z">
                                </path>
                            </svg></i> Latest release</div><a
                        class="v-btn v-theme--light v-btn--density-compact v-btn--size-default v-btn--variant-text text-none px-2 ms-auto"
                        href="/en/getting-started/release-notes/"><span class="v-btn__overlay"></span><span
                            class="v-btn__underlay"></span><!----><span class="v-btn__content" data-no-activator=""> v1.0.0
                            <i class="v-icon notranslate v-theme--light v-icon--end" aria-hidden="true"><svg
                                    class="v-icon__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img"
                                    aria-hidden="true">
                                    <path
                                        d="M20,3H5A2,2 0 0,0 3,5V11H7V9L11,12L7,15V13H3V19A2,2 0 0,0 5,21H20A2,2 0 0,0 22,19V5A2,2 0 0,0 20,3M17,17H13V15H17V17M20,13H13V11H20V13M20,9H13V7H20V9M3,13H0V11H3V13Z">
                                    </path>
                                </svg></i></span><!----><!----></a>
                </div>
            </template>
        </v-navigation-drawer>

        <v-main>
            <v-container fluid>
                <slot />
            </v-container>
        </v-main>

    </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: `DefaultLayout`,

    data: () => ({
        drawer: true,
        popupMenu: false,
        menus: [
            {
                title: "Menu 1", icon: "mdi-account-circle", props: {
                    prependIcon: "mdi-account-circle",
                },
                children: [
                    { title: "Menu 1", icon: "mdi-account-circle" },
                    { title: "Menu 2", icon: "mdi-account-circle" },
                ]
            },
            { title: "Menu 2", props: { prependIcon: "mdi-home-circle" } },
        ],
        subMenus: [],
        rail: true,
        appTitle: null,
    }),

    methods: {
        ...mapActions({
            logout: "auth/logout",
            setPage: "navigation/setPage",
        }),
        openSubMenu(children) {
            console.log('open submenu', children)
            if (children) {
                this.rail = true
                this.subMenus = children
                this.popupMenu = true
            }
        }
    },
    computed: {
        ...mapGetters({
            currentUser: "auth/currentUser",
            currentPage: "navigation/currentPage",
        }),
    },
};
</script>