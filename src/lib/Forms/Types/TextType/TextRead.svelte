<script lang="js">
  export let input;
  export let value = undefined;
</script>

<div class="flex font-sweet" class:justify-between={input?.label}>
  <div class="base-input-label text-gray-500">
    {#if input.label}
      {input.label}
    {/if}
  </div>
  <div class="w-1/2 font-bold">
    {value}
  </div>
</div>
