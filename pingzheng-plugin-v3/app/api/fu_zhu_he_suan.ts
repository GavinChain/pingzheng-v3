import apiProcess from '../data/data';
import jquery from 'jquery'
const urlPath='ysd'


const {
  queryDeptListDataApi,
  queryPersonListDataApi,
  queryCustomerListDataApi,
  queryGYListDataApi,
  queryCHListDataApi,
  queryItemListDataApi
} = apiProcess();
export const queryDeptList = async () =>    await queryDeptListDataApi()
export const queryPersonList = async () =>   await queryPersonListDataApi()
export const queryCustomerList = async () =>  await queryCustomerListDataApi()
export const queryGYList = async () =>      await queryGYListDataApi()
export const queryCHList = async () =>      await queryCHListDataApi()
export const queryItemList = async () =>    await queryItemListDataApi()

