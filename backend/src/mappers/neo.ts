import type {
  CloseApproachEntry,
  DataMapper,
  NeoRawData,
} from '../types/index.js';
import type { Neo, NeoItem } from '../models/index.js';

type ApproachResult = Pick<
  NeoItem,
  'velocity' | 'missDistance' | 'orbitingBody'
>;

const FALLBACK_APPROACH: ApproachResult = Object.freeze({
  velocity: 0,
  missDistance: 0,
  orbitingBody: '',
});

export class NeoMapper implements DataMapper<Neo, NeoRawData> {
  protected getLatestApproach(
    approaches: CloseApproachEntry[],
  ): ApproachResult {
    const approach = approaches[0];

    if (!approach) {
      return FALLBACK_APPROACH;
    }

    return {
      velocity: parseFloat(approach.relative_velocity.kilometers_per_hour),
      missDistance: parseFloat(approach.miss_distance.kilometers),
      orbitingBody: approach.orbiting_body,
    };
  }

  mapTo(data: NeoRawData): Neo {
    return data.map((neo) => ({
      title: neo.name,
      isHazardous: neo.is_potentially_hazardous_asteroid,
      magnitude: neo.absolute_magnitude_h,
      diameter: {
        min: neo.estimated_diameter.kilometers.estimated_diameter_min,
        max: neo.estimated_diameter.kilometers.estimated_diameter_max,
      },
      ...this.getLatestApproach(neo.close_approach_data),
    }));
  }
}
