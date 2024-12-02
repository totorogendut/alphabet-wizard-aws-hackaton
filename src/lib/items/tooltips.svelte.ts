export const itemTooltip = $state<{
  anchor: string;
  item: Item | null;
}>({ anchor: "", item: null });
export function resetItemTooltip() {
  itemTooltip.anchor = "";
  itemTooltip.item = null;
}
