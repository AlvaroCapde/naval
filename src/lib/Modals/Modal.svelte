<script>
	import { createEventDispatcher, onMount } from 'svelte';

	export let show;
	export let isClosable = true;
	export let closeOnEsc = true;
	export let closeOnClickAway = true;
	export let customWarn = false;

	export let size;

	let open = false;
	let container;
	let options;
	let styleClass;
	let placeholderElementExternal;
	export let warnBeforeClose = false;
	let dispatcher = createEventDispatcher();

	$: show ? onOpen() : onClose();

	function onOpen() {
		if (open) {
			return;
		}
		open = true;
		show = true;
		focusOnContainer();
		dispatcher('open');
	}
	function attemptClose() {
		if (customWarn) {
			dispatcher('customWarn');
		} else {
			actuallyClose();
		}
	}
	function onClose() {
		if (!open) {
			return;
		}
		open = false;
		show = false;
		dispatcher('close');
	}
	function actuallyClose() {
		open = false;
		show = false;
		dispatcher('close');
	}

	function focusOnContainer() {
		if (!container) {
			setTimeout(focusOnContainer, 10);
			return;
		}

		let items = Array.from(container.querySelectorAll(`[autofocus]`));
		items.length ? items[0].focus() : container.focus();
	}

	function computeClass() {
		let sizeMap = [
			{ size: 'sm', value: 'sm:max-w-sm' },
			{ size: 'md', value: 'sm:max-w-md' },
			{ size: 'lg', value: 'sm:max-w-lg' },
			{ size: 'xl', value: 'sm:max-w-xl' },
			{ size: '2xl', value: 'sm:max-w-2xl' },
			{ size: '3xl', value: 'sm:max-w-3xl' },
			{ size: '4xl', value: 'sm:max-w-4xl' },
			{ size: '5xl', value: 'sm:max-w-5xl' },
			{ size: '6xl', value: 'sm:max-w-6xl' },
			{ size: '7xl', value: 'sm:max-w-7xl' }
		];
		let defaultClasses = [
			'inline-block', //
			'align-bottom',
			'text-left',
			'overflow-hidden',
			'transform',
			'transition-all',
			'sm:my-8',
			'sm:align-middle',
			'bg-white',
			'rounded',
			'shadow-xl',
			'w-full'
		];
		const sizeClass = sizeMap[sizeMap.findIndex((item) => item.size === size)].value;
		defaultClasses.push(sizeClass);

		const { class: classProperty } = $$props;
		const givenClasses = classProperty?.split(' ') ?? [];

		return [...new Set([...defaultClasses, ...givenClasses])].join(' ');
	}

	function onClickAway() {
		if (!closeOnClickAway) return;
		onClose();
	}

	onMount(async () => {
		window.document.addEventListener('keydown', (event) => {
			if (!closeOnEsc) return;
			const { key } = event;
			if (!open || key !== 'Escape') {
				return;
			}
			setTimeout(() => {
				if (event.defaultPrevented) return;
				onClose();
			}, 50);
		});
		styleClass = computeClass();
	});
</script>

<div bind:this={placeholderElementExternal} on:confirmed={actuallyClose} />
{#if open}
	<div class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" aria-modal="true">
		<div
			class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
		>
			<div
				class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
				on:click={onClickAway}
				aria-hidden="true"
			/>
			<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
				>&#8203;</span
			>
			<div
				tabindex="-1"
				bind:this={container}
				class={`${styleClass} outline-none focus:outline-none`}
			>
				<div
					class="flex flex-row justify-between p-6 bg-white border-b border-blue-gray-200 rounded-tl-lg rounded-tr-lg"
				>
					<p class="font-semibold text-gray-800">
						<slot name="title" />
					</p>
					{#if isClosable}
						<button
							type="button"
							class="bg-white rounded-md text-blue-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-text-primary-200"
							on:click={attemptClose}
						>
							<span class="sr-only">Close</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					{/if}
				</div>
				<div class="max-h-[calc(100vh-9rem)] overflow-y-auto">
					<slot />
				</div>
			</div>
		</div>
	</div>
{/if}
