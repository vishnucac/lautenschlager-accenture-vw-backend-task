import { Request, Response, Router } from "express";
import { body, validationResult } from 'express-validator';

import { CompanyData, CheckoutData } from "../models/checkout.models";
import { generateRandomID } from "../utilities/util";

const router = Router();

// create varible to store checkout data
let checkoutDataArray: {string?:CheckoutData} = {}

router.post("/checkout", body('name').isLength({ min: 2, max: 60 }), body('phone').isLength({ min: 2, max: 20 }), (req: Request & { body: CompanyData }, res: Response) => {
  const errors = validationResult(req);
  // Checking validations for name and phone
  if (!errors.isEmpty()) {
    // Return 400 if validation fails
    return res.status(400).json({ errors: errors.array() });
  }
  const data: CheckoutData = {
    id: generateRandomID(),
    companyData: req.body,
  }
  checkoutDataArray[data.id] = data;
  console.log(checkoutDataArray);
  
  const msg = {
    status: "200 OK",
    message: "Created new checkout with id as : " + data.id
  };
  res.json(msg);
});

router.put("/checkout/:id",
  body('firstName').isLength({ min: 2, max: 60 }),
  body('lastName').isLength({ min: 2, max: 20 }),
  body('zipCode').isLength({ min: 5, max: 5 }),
  body('mail').isEmail(),
  (req: Request & { body: CompanyData }, res: Response) => {
    if (!checkoutDataArray[req.params.id]) {
      return res.status(400).json({ error: "No data found for this given id : " +  req.params.id});
    }
    const errors = validationResult(req);
    // Checking validations for firstname, lastname, zipCode and mail
    if (!errors.isEmpty()) {
      // Return 400 if validation fails
      return res.status(400).json({ errors: errors.array() });
    }
    checkoutDataArray[req.params.id].customerData = req.body;
    const msg = {
      status: "200 OK",
    };
    res.json(msg);
  });

router.get("/checkout/:id", (req: Request, res: Response) => {
  if (!checkoutDataArray[req.params.id]) {
    return res.status(400).json({ error: "No data found for this given id : " +  req.params.id});
  }
  const msg = {
    status: "200 OK",
    data: checkoutDataArray[req.params.id],
  };
  res.json(msg);
});

export { router };
