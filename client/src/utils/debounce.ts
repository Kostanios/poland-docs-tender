function debounce(fn: any, wait: number){
    let timer: number;
    return function(...args: any[]){
        if(timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(()=>{
            fn.apply(null, args);
        }, wait);
    }
}

export default debounce;
