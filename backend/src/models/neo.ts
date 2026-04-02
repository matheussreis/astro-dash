export interface Neo {
  items: NeoItem[];
}

export interface NeoItem {
  name: string;
  isHazardous: boolean;
  absoluteMagnitude: number;
  velocity: number;
  diameter: {
    min: number;
    max: number;
  };
  missDistance: number;
  orbitingBody: string;
}
