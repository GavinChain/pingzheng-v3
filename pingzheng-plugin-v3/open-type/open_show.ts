
export default async function({api,model,zhiDanRen}:any) {
    const useShowJustEditor =(await import( './editor/show_just')).default;

    // @ts-ignore
    return useShowJustEditor({model});
}
