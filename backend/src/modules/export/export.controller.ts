import { Request, Response } from 'express';

export const exportCsv = (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/csv');
  res.send('metric,value\nfollowers,1200');
};

export const exportPdf = (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/pdf');
  res.send('PDF generation placeholder');
};
