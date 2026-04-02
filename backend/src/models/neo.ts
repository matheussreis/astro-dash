export interface Neo {
  items: NeoItem[];
}

export interface NeoItem {
  name: string;
  is_hazardous: boolean;
  absolute_magnitude: number;
  velocity: number;
  diameter: {
    min: number;
    max: number;
  };
  missDistance: number;
  orbitingBody: string;
}
