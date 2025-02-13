export type ProdcutType = {
  id: number;
  name: string;
  description: string;
  price: number;
  companyId: number;
  created_at: Date;
  photo: {
    photo_url: string;
  };
  company: {
    id: number;
    name: string;
    description: string;
    created_at: Date;
  };
};
