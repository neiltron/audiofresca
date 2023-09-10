import { derived, writable } from "svelte/store";

type Sprite = {
  start: number,
  end: number,
}

type SpriteDefinition = {
  resources: string[],
  spritemap: { [key: string]: Sprite },
};

export const spriteDefinition = writable<SpriteDefinition>({ resources: [], spritemap: {} });

export const spriteData = derived(spriteDefinition, ($spriteDefinition) => {
  return new Blob([JSON.stringify($spriteDefinition)], { type: 'application/json' });
});

export const howlerJSON = derived(spriteDefinition, ($spriteDefinition) => {
  const json = {
    src: ['audio.mp3', 'audio.ogg'],
    sprite: $spriteDefinition.resources.map((resource) => {
      return {
        [resource]: [$spriteDefinition.spritemap[resource].start, $spriteDefinition.spritemap[resource].end - $spriteDefinition.spritemap[resource].start]
      }
    }).reduce((acc, val) => {
      return { ...acc, ...val };
    }, {})
  };

  return new Blob([JSON.stringify(json)], { type: 'application/json' });
});