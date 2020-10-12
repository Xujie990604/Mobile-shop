// 防抖函数
export function debounce(func, delay) {
    let timer = null;
    return function () {
        const args = arguments;
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}