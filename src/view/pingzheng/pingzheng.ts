import {queryPingZhengModelByIdApi} from './api/pingZhengApi';
import {useOpenAdd, useOpenEdit, useOpenShow} from '../../../pingzheng-plugin-v3/pingzheng';
import addApi from './/api/addApi';
export function openAddPingZheng({okApi,backApi}) {

    useOpenAdd({
        ...addApi,
        btnShowList:[
            ['ok','保存',okApi],
            ['okAndContinue','保存并继续',okApi],
            ['back','关闭',backApi]
        ],
        // fuZhuHeSuanApi,
        zhiDanRen: '机器人01'
    });
}
export async function openShowPingZheng({backApi}) {
    useOpenShow({
        // api:'',
        model: await queryPingZhengModelByIdApi({id:1},null),
        zhiDanRen: '机器人01'
    });
}
export async function openInsertPingZheng({okApi,backApi}) {
    useOpenAdd({
        ...addApi,
        btnShowList:[
            ['ok','确认插入',okApi],
            ['back','放弃插入',backApi]
        ],
        // fuZhuHeSuanApi,
        zhiDanRen: '机器人01'
    });
}
export async function openEditPingZheng({backApi}) {
    useOpenEdit({
        // api:'',
        model:  await queryPingZhengModelByIdApi({id:1},null),
        zhiDanRen: '机器人01'
    });
}
