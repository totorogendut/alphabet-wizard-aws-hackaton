import { game } from "$lib/game.svelte";
import type { ResourcesData } from "./main.svelte";

export type ResourcesKey = keyof typeof game.resources;
export function getResourceIcon(name: string) {
  if (!(name in game.resources)) return "";
  return game.resources[name as ResourcesKey].icon || "";
}
