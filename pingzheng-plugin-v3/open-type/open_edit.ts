
export default async function({api,model,zhiDanRen}:any) {
    const useEditJustEditor =(await import( './editor/edit_just')).default;

    // @ts-ignore
    return useEditJustEditor({model});
}
