<script lang="ts">
  import type { Snippet } from "svelte";
  import '../styles/app.css'
	import { page } from '$app/stores';
  
  const favicon = '🔮'

  interface Props {
    id: string;
    children: Snippet;
  }

  const { id, children }: Props = $props();
</script>


<svelte:head>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>{favicon}</text></svg>">
  <title>Alphabet WiZard</title>
</svelte:head>

{@render children()}
