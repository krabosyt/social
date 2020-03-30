import * as express from 'express';
import Profile, { IProfile } from '../models/profile.schema';

const router = express.Router();

interface ExtendedResponse extends express.Response {
  profile: IProfile;
}

async function getProfile(
  req: express.Request,
  res: ExtendedResponse,
  next: express.NextFunction
) {
  let profile;
  try {
    profile = await Profile.findById(req.params.id);
    if (profile === null) {
      return res.status(404).json({ message: 'cannot find profile' });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
  res.profile = profile;
  next();
}

router.get(
  '/profile/:id',
  getProfile,
  (req: express.Request, res: ExtendedResponse) => {
    res.json(res.profile);
  }
);

router.post('/profile', async (req, res) => {
  const profile: IProfile = new Profile(req.body);
  try {
    const newProfile = await profile.save();
    res.send(newProfile);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

export default router;
