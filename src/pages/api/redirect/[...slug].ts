// pages/api/redirect/[...slug].ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';
import Redirect from '../../../../models/Redirects';

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;
  const fullPath = Array.isArray(slug) ? `/${slug.join('/')}` : `/${slug}`;
  console.log('Requested fullPath:', fullPath);

  try {
    const latestRedirect = await Redirect.findOne().sort({ _id: -1 });
    console.log('Latest redirect:', latestRedirect);

    const redirects = await Redirect.find({}, { fromUrl: 1, toUrl: 1, _id: 0 });
    const allSlugs = redirects.map(doc => doc.fromUrl);
    console.log('All slugs:', allSlugs);

    if (fullPath === '/' && latestRedirect) {
      res.status(200).json({ toUrl: latestRedirect.toUrl });
    } else if (allSlugs.includes(fullPath)) {
      res.status(200).json({ toUrl: latestRedirect.toUrl });
    } else if (fullPath === latestRedirect.toUrl) {
      res.status(200).json({ toUrl: latestRedirect.toUrl });
    } else {
      res.status(404).json({ message: 'Redirect not found' });
    }
  } catch (error) {
    console.error('Error processing redirect:', error);
    res.status(500).json({ message: 'Error processing redirect', error: error.message });
  }
};
