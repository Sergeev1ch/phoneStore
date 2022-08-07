import { $host } from './index';

export const addIMG = async (img) => {
  const formData = new FormData();
  formData.append("file", img);
  const {IMG} = await $host.post('items/postIMG', formData, {headers: {"Content-Type": "multipart/form-data"}});
  return {IMG}
};

export const createItem = async (brand, name, img, price) => {
  const {data} = await $host.post('items/create', {brand, name, img, price});
  return {data}
};

export const getAllItems = async () => {
  const {data}  = await $host.get('items/getAll');
  return {data};
};

export const getAllForBrand = async (brand) => {
  const { data } = await $host.get('items/getForBrand/' + brand);
  return {data};
};

export const getBrands = async () => {
  const { data } = await $host.get('items/getBrands/');
  return {data};
};
