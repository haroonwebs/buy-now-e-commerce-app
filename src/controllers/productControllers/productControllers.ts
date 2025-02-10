import { Request, Response } from "express";
import { AppDataSource } from "../../database/data-source";
import Joi from "joi";
import { ProdcutType } from "./productTypes";
import { Product } from "../../models/productsModel";
import { Company } from "../../models/companyModel";
import { Photo } from "../../models/porduct_photoModel";
import { Upload_On_Cloudinary } from "../../services/cloudinary";

const Product_Schema = Joi.object({
  name: Joi.string().min(5).max(50).required(),
  description: Joi.string().min(6).max(500),
  price: Joi.number(),
  companyId: Joi.any().required(),
});

export const Create_Product = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { error, value } = Product_Schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details.map((details) => details.message),
    });
  }

  const { name, description, price, companyId }: ProdcutType = value;

  let New_Product;
  try {
    const companyRepositery = AppDataSource.getRepository(Company);
    const Exist_Company = await companyRepositery.findOne({
      where: { id: companyId },
    });

    if (!Exist_Company) {
      return res.status(404).json({
        success: false,
        message:
          "Company againt this id do not exist. Please Create user company",
      });
    }

    const Photo_file = req.file;
    let Img_Url: string | undefined;

    if (Photo_file) {
      const Upload_Response = await Upload_On_Cloudinary(Photo_file.path);
      if (Upload_Response) {
        Img_Url = Upload_Response.url;
      }
    }

    const ProductRepositery = AppDataSource.getRepository(Product);
    const photoRepositery = AppDataSource.getRepository(Photo);

    const product_img = photoRepositery.create({ photo_url: Img_Url });
    await photoRepositery.save(product_img);

    New_Product = ProductRepositery.create({
      name,
      description,
      price,
      company: Exist_Company,
      photo: product_img,
    });
    if (!New_Product) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong while creating Product !",
      });
    }
    New_Product = await ProductRepositery.save(New_Product);
    return res.status(201).json({
      success: true,
      message: "Product Created Successfuly !",
      New_Product,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `internal server error : the error is ${error}`,
    });
  }
};

// controller to get all products

export const All_Products = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const pageNo = parseInt(req.query.pageNo as any);
    const productRepositery = AppDataSource.getRepository(Product);
    let products;
    let totalCount;
    if (pageNo) {
      const limit = 4;
      const skip = (pageNo - 1) * 4;
      [products, totalCount] = await productRepositery
        .createQueryBuilder("product")
        .innerJoinAndSelect("product.company", "company")
        .leftJoinAndSelect("product.photo", "img")
        .select([
          "product",
          "company.id",
          "company.name",
          "company.description",
          "img.photo_url",
        ])
        .take(limit)
        .skip(skip)
        .orderBy("product.id", "ASC")
        .getManyAndCount();
    } else {
      products = await productRepositery.find({
        relations: {
          company: true,
          photo: true,
        },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          company: {
            id: true,
            name: true,
          },
          photo: {
            photo_url: true,
          },
        },
        order: {
          id: "ASC",
        },
      });
    }

    if (!products) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: " Products",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server Error : the error is ! ${error}`,
    });
  }
};

// controller to get single product

export const Product_By_Id = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { productId } = req.params as any;
    if (!productId) {
      return res.status(404).json({
        success: false,
        message: "Product id not found, please provide valid ProductId",
      });
    }
    const productRepositery = AppDataSource.getRepository(Product);

    const product = await productRepositery.findOne({
      where: {
        id: productId,
      },
      relations: {
        company: true,
      },
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product agains this Id not found !",
      });
    }
    return res.status(200).json({
      success: true,
      message: " Product Fetched Successfuly",
      product,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `Internal server error : the error is ${error}`,
    });
  }
};

// api to delete a product product

export const Delete_Product = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { productId } = req.params as any;
    if (!productId) {
      return res.status(404).json({
        success: false,
        message: "Product id not found !",
      });
    }

    const result = await AppDataSource.getRepository(Product)
      .createQueryBuilder()
      .delete()
      .from(Product)
      .where("id = :productId", { productId })
      .execute();

    if (result.affected === 0) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Product Deleited successfuly",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `internal server error : the error is ${error}`,
    });
  }
};

// controller for update product

export const Update_Product = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { productId } = req.params as any;
    const Updated_Data = req.body as any;
    if (!productId) {
      return res.status(404).json({
        success: false,
        message: "Please Provide ProductId!",
      });
    }
    if (!Updated_Data) {
      return res.status(404).json({
        success: false,
        message: " Require fields to Update",
      });
    }

    const Update_Result = await AppDataSource.getRepository(Product)
      .createQueryBuilder()
      .update(Product)
      .set(Updated_Data)
      .where("id= :productId", { productId })
      .execute();
    if (Update_Result.affected === 0) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found!",
      });
    }

    const productRepo = AppDataSource.getRepository(Product);
    const Updated_Product = await productRepo.find({
      where: { id: productId },
      relations: {
        company: true,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Product Updated Successfuly",
      Updated_Product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error : the error is : ${error}`,
    });
  }
};
