import { Request, Response } from "express";
import { AppDataSource } from "../../database/data-source";
import Joi from "joi";
import { Company } from "../../models/companyModel";
import { companyTypes } from "./companyTypes";

const Company_Schema = Joi.object({
  name: Joi.string().min(5).max(50).required(),
  description: Joi.string().min(6).max(500),
});

// controller to create products

export const Create_Company = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { error, value } = Company_Schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details.map((details) => details.message),
    });
  }

  const { name, description }: companyTypes = value;

  let New_Company;
  try {
    const CompanyRepositery = AppDataSource.getRepository(Company);

    const Existing_Company = await CompanyRepositery.findOne({
      where: { name: name },
    });

    if (Existing_Company) {
      return res.status(409).json({
        success: false,
        message: "Company with this name already exist !",
      });
    }

    New_Company = CompanyRepositery.create({
      name,
      description,
    });
    if (!New_Company) {
      return res.status(422).json({
        success: false,
        message:
          "SomeThing gose wrong while creating new Company. Please try again !",
      });
    }

    New_Company = await CompanyRepositery.save(New_Company);
    return res.status(201).json({
      success: false,
      message: " Your company is Registered now Successfuly ",
      New_Company,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `internal server error : the error is ${error}`,
    });
  }
};

// get registered companies

export const Get_Companes = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const companyRepo = AppDataSource.getRepository(Company);

    const companies = await companyRepo
      .createQueryBuilder("company")
      .innerJoinAndSelect("company.products", "products")
      .getMany();

    if (!companies) {
      return res.status(404).json({
        success: false,
        message: "No companies exist !",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Companies Fetched Successfuly",
      companies,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: the error is ${error}`,
    });
  }
};

// get single company

export const Get_Single_Company = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { companyId } = req.params as any;

    if (!companyId) {
      return res.status(404).json({
        success: false,
        message: "company Id not provided",
      });
    }

    const companyRepo = AppDataSource.getRepository(Company);
    const company = await companyRepo
      .createQueryBuilder("company")
      .where("company.id= :companyId", { companyId })
      .innerJoinAndSelect("company.products", "products")
      .getOne();
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company Not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Company Fetched Successful",
      company,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: the error is: ${error}`,
    });
  }
};

// update  detcompanysails

export const Update_Company = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { companyId } = req.params as any;
    const updatedFields: companyTypes = req.body;

    const companyRepo = AppDataSource.getRepository(Company);
    const Updated_Result = await companyRepo
      .createQueryBuilder()
      .update(Company)
      .set(updatedFields)
      .where("id= :companyId", { companyId })
      .execute();
    if (!Updated_Result.affected) {
      return res.status(404).json({
        success: false,
        message: "Something went wrong During Update !",
      });
    }

    const company = await companyRepo.find({
      where: {
        id: companyId,
      },
    });
    if (!company) {
      return res.status(200).json({
        success: false,
        message: "Company Not Updated!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Company Details Updated Successfully !",
      company,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error : ${error}`,
    });
  }
};

// delete controller to delete company

export const Delect_Company = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { companyId } = req.params as any;
    if (!companyId) {
      return res.status(404).json({
        success: false,
        message: "please provide company id to delete",
      });
    }
    const companyRepo = AppDataSource.getRepository(Company);
    const deleted_comapny = await companyRepo
      .createQueryBuilder()
      .delete()
      .where("id= :companyId", { companyId })
      .execute();
    if (deleted_comapny.affected === 0) {
      return res.status(409).json({
        success: false,
        message: "Some thing went wrong while deleting company!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Company Deleted Successfuly !",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error}`,
    });
  }
};
