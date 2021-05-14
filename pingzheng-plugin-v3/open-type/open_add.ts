
export default async function({
                                  btnShowList={},
                                  fuZhuHeSuanApiList,
                                  getFuZhuHeSuanColumnsNameApi,
                                  typeListApi,
                                  numApi,
                                  zhiDanRen,
                                  zhaiyaoApi,
                                  kuaiJiKeMuApi,
                                  backApi,
                                  queryVoucherDefaultDateApi
                              }: any) {
    const  AddEditor=(await  import( './editor/add')).default
    const date = await queryVoucherDefaultDateApi();
    // @ts-ignore
    AddEditor({
        btnShowList,
        getFuZhuHeSuanColumnsNameApi,
        fuZhuHeSuanApiList,
        zhaiyaoApi,
        kuaiJiKeMuApi,
        backApi,
        requstModel: {
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
