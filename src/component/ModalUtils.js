/**
 * 组装参数
 */
export const getParameter = (data = {}, parameter = {}, isCommonUrl = false) => {
    let pm = null;
    if (isCommonUrl) {
        pm = {
            ...parameter,
            data: data
        }
    } else {
        pm = {
            ...parameter,
            ...data
        }
    }
    return pm;
}

