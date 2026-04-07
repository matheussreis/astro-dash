export interface DataMapper<T, MappingDataSource = any> {
  mapTo(data: MappingDataSource): T;
}

export interface NeoRawDataItem {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
    meters: { estimated_diameter_min: number; estimated_diameter_max: number };
    miles: { estimated_diameter_min: number; estimated_diameter_max: number };
    feet: { estimated_diameter_min: number; estimated_diameter_max: number };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    close_approach_date: string;
    relative_velocity: { kilometers_per_hour: string; miles_per_hour: string };
    miss_distance: { kilometers: string; miles: string };
    orbiting_body: string;
  }>;
}

export type NeoRawData = NeoRawDataItem[];

export type CloseApproachEntry = NeoRawDataItem['close_approach_data'][number];
