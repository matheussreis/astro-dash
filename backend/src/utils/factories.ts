import FeedController from '../controllers/feed.js';
import FeedValidator from '../validators/feed.js';

export function makeFeedController() {
  const validator = new FeedValidator();
  return new FeedController(validator);
}
