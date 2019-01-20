export default function(a: string[], b: string[]) {
    if (a[0] === b[0]) {
        return 0;
    }
    if (a[0] === "multiply") {
        if (b[0] === "add") {
            return 1;
        }
    } else if (a[0] === "add") {
        if (b[0] === "multiply") {
            return -1;
        }
    }
    return 0;
}