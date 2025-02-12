export type ProdcutType = {
  id: number;
  name: string;
  description: string;
  price: number;
  companyId: number;
  photo: {
    photo_url: string;
  };
  company: {
    id: number;
    name: string;
    description: string;
  };
};
