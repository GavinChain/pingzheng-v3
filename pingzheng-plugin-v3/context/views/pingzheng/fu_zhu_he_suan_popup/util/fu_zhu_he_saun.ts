
export function toFuZhuHeSuanRender({instance, h, requireFuZhuList, row}) {

    const elSelectList = [];
    instance.abx = elSelectList;
    return h('el-form', {
        ref: 'elForm',
        attrs: {
            style: 'margin-bottom:0'
        },
        props: {
            labelPosition: 'left'
        }
    }, [
        ...requireFuZhuList
            .filter(select => row[select.columnName] != null)
            .map(select => {
                let selectValue = row[select.columnName];
                if (selectValue == null) {
                    selectValue = '';
                }


                const elSelect = h('el-select', {
                        ref: 'elSelect',
                        props: {
                            value: selectValue,
                            defaultFirstOption: true
                        },
                        on: {
                            'input': function(value) {
                                const currentElSelectIndex = elSelectList.indexOf(elSelect);
                                const nextElSelectIndex = currentElSelectIndex + 1;
                                if (elSelectList[nextElSelectIndex] != null) {
                                    elSelect.componentInstance.blur();

                                    setTimeout(() => {
                                        elSelectList[nextElSelectIndex].elm.click();
                                    }, 100);
                                } else {
                                    instance.ok();
                                }
                                // this.hello[select.name]=value
                                row[select.columnName] = value;
                            }
                        }
                    },
                    [
                        ...select.list.map(option => {
                            return h('el-option', {
                                props: option
                            });
                        })
                    ]);
                elSelectList.push(elSelect);
                return h('el-form-item', {
                    attrs: {
                        style: 'text-align:center',
                        class: 'fuzhuhesuan-form-item'
                    },
                    props: {
                        label: select.name + ':',
                        labelWidth: '75px'
                    }
                }, [
                    elSelect
                ]);
            }),
        h({
            template: `
                    <el-form-item style="text-align: center;margin-top:5px" class="fuzhuhesuan_form_item_bottom">
                        <el-button @click="$parent.$parent.ok()" type="primary">确认</el-button>
                        <el-button @click="$parent.$parent.$parent.showPopper=false">取消</el-button>
                    </el-form-item>
                `
        })
    ]);
}
