<script setup lang="ts">
import DialogConfirm from '@/components/DialogConfirm.vue'
import type { DataTableHeaders } from '@/plugins/vuetify'
import { useRouter } from 'vue-router'
const router = useRouter()

definePage({
  meta: {
    icon: 'mdi-table',
    title: 'Device Table',
    drawerIndex: 3,
  },
})

const search = ref('')
const dialogDelete = ref<InstanceType<typeof DialogConfirm> | null>(null)
function showDialogDelete(name: string) {
  dialogDelete.value
    ?.open('Are you sure you want to delete this dessert?')
    .then(async (confirmed: boolean) => {
      if (confirmed) {
        try {
          const index = desserts.value!.findIndex((v) => v.id === name)
          desserts.value!.splice(index, 1)
          Notify.success('Deleted')
        } catch (e) {
          Notify.error(e)
        }
      }
    })
}

function jumpToPosition(item: any) {
  router.push({
    path: 'device-position',
    query: {
      id: item.id,
      position: item.status.position,
    },
  })
}

function timestampToDate(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleString()
}

const desserts = ref([
  {
    id: 'adsfb',
    status: {
      online: true,
      last_update: 1709110302,
      battery: 49,
      position: '31.405N, 121.489E',
      status: true,
      error: '',
    },
  },
  {
    id: 'hebac',
    status: {
      online: true,
      last_update: 1709110381,
      battery: 9,
      position: '39.900N, 116.391E',
      status: false,
      error: 'need charge',
    },
  },
  {
    id: 'eebaf',
    status: {
      online: false,
      last_update: 1709113381,
      battery: 99,
      position: '39.900N, 116.391E',
      status: true,
      error: '',
    },
  },
  {
    id: 'hheac',
    status: {
      online: true,
      last_update: 1709140381,
      battery: 33,
      position: '32.061N, 118.791E',
      status: true,
      error: '',
    },
  },
  {
    id: 'abdce',
    status: {
      online: true,
      last_update: 1709310381,
      battery: 70,
      position: '31.405N, 121.489E',
      status: true,
      error: '',
    },
  },
  {
    id: 'kekea',
    status: {
      online: true,
      last_update: 1709310381,
      battery: 97,
      position: '39.900N, 116.391E',
      status: true,
      error: '',
    },
  },
  {
    id: 'afsdb',
    status: {
      online: false,
      last_update: 1709410381,
      battery: 88,
      position: '32.061N, 118.791E',
      status: true,
      error: '',
    },
  },
  {
    id: 'ebaed',
    status: {
      online: true,
      last_update: 1709210381,
      battery: 25,
      position: '31.405N, 121.489E',
      status: true,
      error: '',
    },
  },
  {
    id: 'xinji',
    status: {
      online: true,
      last_update: 1709120381,
      battery: 50,
      position: '43.825N, 87.613E',
      status: true,
      error: '',
    },
  },
  {
    id: 'qifab',
    status: {
      online: false,
      last_update: 1709111381,
      battery: 88,
      position: '32.061N, 118.791E',
      status: true,
      error: '',
    },
  },
  {
    id: 'ebaed',
    status: {
      online: true,
      last_update: 1709110381,
      battery: 25,
      position: '31.405N, 121.489E',
      status: true,
      error: '',
    },
  },
  {
    id: 'xinji',
    status: {
      online: true,
      last_update: 1709110381,
      battery: 50,
      position: '43.825N, 87.613E',
      status: true,
      error: '',
    },
  },
])

const headers: DataTableHeaders = [
  { title: 'Device id', key: 'id' },
  { title: 'Online', key: 'status.online' },
  { title: 'Last update', key: 'status.last_update' },
  { title: 'Battery', key: 'status.battery' },
  { title: 'Position', key: 'status.position', align: 'center' },
  { title: 'Status', key: 'status.status' },
  { title: 'Actions', key: 'actions', sortable: false },
]
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <teleport to="#app-bar">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              density="compact"
              class="mr-2 d-none d-sm-block"
              rounded="xl"
              flat
              variant="solo"
              style="width: 250px"
            ></v-text-field>
          </teleport>
          <v-data-table
            :headers="headers"
            :items="desserts"
            item-value="name"
            :search="search"
          >
            <!-- online -->
            <template #item.status.online="{ item }">
              <v-icon
                v-if="item.status.online"
                icon="mdi-cloud"
                color="success"
              ></v-icon>
              <v-icon v-else icon="mdi-cloud-off" color="error"></v-icon>
            </template>

            <!-- last update -->
            <template #item.status.last_update="{ item }">
              {{ timestampToDate(item.status.last_update) }}
            </template>

            <!-- battery -->
            <template #item.status.battery="{ item }">
              <v-icon
                v-if="item.status.battery > 95"
                icon="mdi-battery"
                color="green"
              ></v-icon>
              <v-icon
                v-else-if="item.status.battery > 85"
                icon="mdi-battery-90"
                color="green"
              ></v-icon>
              <v-icon
                v-else-if="item.status.battery > 75"
                icon="mdi-battery-80"
                color="green"
              ></v-icon>
              <v-icon
                v-else-if="item.status.battery > 65"
                icon="mdi-battery-70"
              ></v-icon>
              <v-icon
                v-else-if="item.status.battery > 55"
                icon="mdi-battery-60"
              ></v-icon>
              <v-icon
                v-else-if="item.status.battery > 45"
                icon="mdi-battery-50"
              ></v-icon>
              <v-icon
                v-else-if="item.status.battery > 35"
                icon="mdi-battery-40"
              ></v-icon>
              <v-icon
                v-else-if="item.status.battery > 25"
                icon="mdi-battery-30"
              ></v-icon>
              <v-icon
                v-else-if="item.status.battery > 15"
                icon="mdi-battery-20"
                color="red"
              ></v-icon>
              <v-icon
                v-else-if="item.status.battery > 5"
                icon="mdi-battery-10"
                color="red"
              ></v-icon>
              <v-icon v-else icon="mdi-battery-outline" color="red"></v-icon>
              {{ item.status.battery }}%
            </template>

            <!-- position -->
            <template #item.status.position="{ item }">
              <v-btn @click="jumpToPosition(item)">
                {{ item.status.position }}
              </v-btn>
            </template>

            <!-- status -->
            <template #item.status.status="{ item }">
              <v-chip v-if="item.status.status" color="green">OK</v-chip>
              <v-chip v-else color="red"> {{ item.status.error }} </v-chip>
            </template>

            <!-- action -->
            <template #item.actions="{ item }">
              <v-defaults-provider
                :defaults="{
                  VBtn: {
                    size: 20,
                    rounded: 'sm',
                    variant: 'text',
                    class: 'ml-1',
                    color: '',
                  },
                  VIcon: {
                    size: 20,
                  },
                }"
              >
                <v-tooltip location="top">
                  <template #activator="{ props }">
                    <v-btn
                      icon="mdi-delete-outline"
                      v-bind="props"
                      @click.stop="showDialogDelete(item.id)"
                    />
                  </template>
                  <span>Delete</span>
                </v-tooltip>
              </v-defaults-provider>
            </template>
          </v-data-table>
          <DialogConfirm ref="dialogDelete" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
