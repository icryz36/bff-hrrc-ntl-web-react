export type TCreateExamplePayload = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type TCreateExampleResponse = {
  id: string;
  success: boolean;
  code: string;
};

export type TGetExampleResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createBy: string;
  createAt: string;
};
