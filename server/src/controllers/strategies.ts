import { Request, Response } from 'express'
import { BollingerBandsAnalyzer } from '../strategies/BollBands'
import { RSIAnalyzer } from '../strategies/RSIAnalyzer';

interface BollBandsRequestBody {
  product_id: string;
  interval: string;
  standardDeviation: string;
}

interface RSIRequestBody {
  product_id: string;
  interval: string;
}

export const startBollBands = async (req: Request, res: Response) => {
  try {
    const { product_id, interval, standardDeviation }: BollBandsRequestBody =
      req.body;
    BollingerBandsAnalyzer.start(product_id, Number(interval));
    res.status(200).send("Strategy started succsessfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong. Please try again later.");
  }
}

export const stopBollBands = async (req: Request, res: Response) => {
  try {
    const product_id: string = req.body.product_id;
    BollingerBandsAnalyzer.stop(product_id);
    res.status(200).send("Strategy stopped succsessfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong. Please try again later.");
  }
}

export const startRSI = async (req: Request, res: Response) => {
  try {
    const { product_id, interval }: RSIRequestBody = req.body;
    RSIAnalyzer.start(product_id, Number(interval));
    res.status(200).send("Strategy started succsessfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong. Please try again later.");
  }
}

export const stopRSI = async (req: Request, res: Response) => {
  try {
    const product_id: string = req.body.product_id;
    RSIAnalyzer.stop(product_id);
    res.status(200).send("Strategy stopped succsessfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong. Please try again later.");
  }
}



