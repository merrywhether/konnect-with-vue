<script lang="ts" setup>
import { ref, watch } from 'vue'
import { CoreBox, CoreButton, CoreText } from '#core'
import { BaseModal } from '#modals'
import type { CreateServicePayload, ServiceType } from '#types'
import { useServicesStore } from '@/stores/services'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
  created: [id: string]
}>()

const store = useServicesStore()

const name = ref('')
const description = ref('')
const type = ref<ServiceType>('REST')
const configured = ref(false)
const published = ref(false)
const submitting = ref(false)
const errorMsg = ref('')

// published requires configured — keep in sync
watch(published, (val) => {
  if (val) configured.value = true
})
watch(configured, (val) => {
  if (!val) published.value = false
})

watch(
  () => props.open,
  (val) => {
    if (val) {
      name.value = ''
      description.value = ''
      type.value = 'REST'
      configured.value = false
      published.value = false
      errorMsg.value = ''
    }
  },
)

async function handleSubmit() {
  if (!name.value.trim()) {
    errorMsg.value = 'Name is required'
    return
  }

  submitting.value = true
  errorMsg.value = ''

  try {
    const payload: CreateServicePayload = {
      name: name.value.trim(),
      description: description.value.trim(),
      type: type.value,
      configured: configured.value,
      published: published.value,
    }
    const service = await store.createService(payload)
    emit('created', service.id)
  } catch (err) {
    errorMsg.value = (err as Error).message
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <BaseModal
    labelled-by="create-service-title"
    :open="open"
    width="480px"
    @close="emit('close')"
  >
    <template #title>
      <CoreText
        id="create-service-title"
        as="h2"
        color="textPrimary"
        size="xl"
        weight="semibold"
      >
        Create Service Package
      </CoreText>
    </template>

    <CoreBox
      id="create-service-form"
      as="form"
      class="create-modal"
      direction="column"
      display="flex"
      gap="base"
      @keydown.ctrl.enter.prevent="handleSubmit"
      @keydown.meta.enter.prevent="handleSubmit"
      @submit.prevent="handleSubmit"
    >
      <CoreBox
        direction="column"
        display="flex"
        gap="6px"
      >
        <CoreText
          as="label"
          for="service-name"
          size="sm"
          weight="medium"
        >
          Name *
        </CoreText>
        <input
          id="service-name"
          v-model="name"
          autofocus
          class="form-input"
          placeholder="Enter service name"
          type="text"
        >
      </CoreBox>

      <CoreBox
        direction="column"
        display="flex"
        gap="6px"
      >
        <CoreText
          as="label"
          for="service-desc"
          size="sm"
          weight="medium"
        >
          Description
        </CoreText>
        <textarea
          id="service-desc"
          v-model="description"
          class="form-input form-textarea"
          placeholder="Describe this service"
          rows="3"
        />
      </CoreBox>

      <CoreBox
        direction="column"
        display="flex"
        gap="6px"
      >
        <CoreText
          as="label"
          for="service-type"
          size="sm"
          weight="medium"
        >
          Type
        </CoreText>
        <select
          id="service-type"
          v-model="type"
          class="form-input"
        >
          <option value="REST">
            REST
          </option>
          <option value="HTTP">
            HTTP
          </option>
        </select>
      </CoreBox>

      <CoreBox
        direction="column"
        display="flex"
        gap="sm"
      >
        <label class="checkbox-row">
          <input
            v-model="configured"
            type="checkbox"
          >
          <CoreBox
            direction="column"
            display="flex"
            gap="2px"
          >
            <CoreText
              size="sm"
              weight="medium"
            >
              Configured
            </CoreText>
            <CoreText
              color="textSecondary"
              size="xs"
            >
              Connected to a runtime instance
            </CoreText>
          </CoreBox>
        </label>

        <label class="checkbox-row">
          <input
            v-model="published"
            type="checkbox"
          >
          <CoreBox
            direction="column"
            display="flex"
            gap="2px"
          >
            <CoreText
              size="sm"
              weight="medium"
            >
              Published to portal
            </CoreText>
            <CoreText
              color="textSecondary"
              size="xs"
            >
              Visible to developers in the service portal
            </CoreText>
          </CoreBox>
        </label>
      </CoreBox>

      <CoreText
        v-if="errorMsg"
        as="p"
        color="statusError"
        size="xs"
      >
        {{ errorMsg }}
      </CoreText>
    </CoreBox>

    <template #actions>
      <CoreButton
        variant="secondary"
        @click="emit('close')"
      >
        Cancel
      </CoreButton>
      <CoreButton
        :disabled="submitting"
        form="create-service-form"
        type="submit"
      >
        {{ submitting ? "Creating..." : "Create" }}
      </CoreButton>
    </template>
  </BaseModal>
</template>

<style lang="scss" scoped>
.create-modal {
    width: 100%;
}

.form-input {
    background: var(--color-bg-primary);
    border: 1px solid var(--color-border-primary);
    border-radius: var(--radius-sm);
    color: var(--color-text-primary);
    font-family: var(--font-family);
    font-size: var(--font-size-base);
    outline: none;
    padding: 10px var(--spacing-md);
    transition: border-color 0.15s ease;

    &:focus {
        border-color: var(--color-link-primary);
    }
}

.form-textarea {
    resize: vertical;
}

.checkbox-row {
    align-items: flex-start;
    cursor: pointer;
    display: flex;
    gap: var(--spacing-sm);

    input[type="checkbox"] {
        accent-color: var(--color-link-primary);
        flex-shrink: 0;
        height: 16px;
        margin-top: 2px;
        width: 16px;
    }
}
</style>
