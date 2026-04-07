export type Neo = NeoItem[];

export interface NeoItem {
  title: string;
  isHazardous: boolean;
  magnitude: number;
  velocity: number;
  diameter: {
    min: number;
    max: number;
  };
  missDistance: number;
  orbitingBody: string;
}
