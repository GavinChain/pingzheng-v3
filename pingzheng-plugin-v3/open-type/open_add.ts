import AddEditor from './editor/add-editor'
export default async function({
                                  fuZhuHeSuanApiList,
                                  getFuZhuHeSuanColumnsNameApi,
                                  uZhuHeSuanApiList,
                                  typeListApi,
                                  numApi,
                                  zhiDanRen,
                                  zhaiyaoApi,
                                  kuaiJiKeMuApi,
                                  okApi,
                                  backApi,
                                  queryVoucherDefaultDateApi
                              }: any) {
    const date = await queryVoucherDefaultDateApi();

    AddEditor({
        getFuZhuHeSuanColumnsNameApi,
        fuZhuHeSuanApiList,
        zhaiyaoApi,
        kuaiJiKeMuApi,
        okApi(pingZhengModel, apiData, instance) {
            console.log('pingZhengModel', pingZhengModel, '\napiData', apiData);
        },
        backApi,
        model: {
            options: {
                title: '新增凭证'
            },
            props: {
                pingZhengFrom: '0',
                pingZhengNumOfMonth: await numApi({year: '2020', month: 10}),
                date,
                type: (await typeListApi({year: '2020', month: 10}))[0],
                danJuNum: '0',
                zdr: zhiDanRen
            },
            rows: [
                {
                    'zhaiYao': '',
                    'kuaiJiKeMuCode': '',
                    'kuaiJiKeMuText': '',
                    'jieMoney': '0.00',
                    'daiMoney': '0.00',
                    'kuaiJiKeMuPath': ''
                }, {
                    'zhaiYao': '',
                    'kuaiJiKeMuCode': '',
                    'kuaiJiKeMuText': '',
                    'jieMoney': '0.00',
                    'daiMoney': '0.00',
                    'kuaiJiKeMuPath': ''
                }, {
                    'zhaiYao': '',
                    'kuaiJiKeMuCode': '',
                    'kuaiJiKeMuText': '',
                    'jieMoney': '0.00',
                    'daiMoney': '0.00',
                    'kuaiJiKeMuPath': ''
                },
                {
                    'zhaiYao': '',
                    'kuaiJiKeMuCode': '',
                    'kuaiJiKeMuText': '',
                    'jieMoney': '0.00',
                    'daiMoney': '0.00',
                    'kuaiJiKeMuPath': ''
                }
            ],
            rowsFuZhuHeSuan: []
        },


    });


}
