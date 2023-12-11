// 实现brainFuck的解释器，js版
const LENGTH = 10000 // 限定内存长度

//初始化内存空间
const memory = []
for (let i = 0; i < LENGTH; i++) { memory[i] = 0 }

// 初始化循环栈
let loopStack = []

// 初始化 头指针
let head = LENGTH / 2


// 进行括号的判断
const isLegitimate = (str) => {
    let a = []
    arr = str.split('')

    // 使用栈来解决括号的合法问题
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "[") {
            a.push('[')
        }
        else if (arr[i] === "]") {
            if (a.length === 0) {
                // 如果遇到右]而栈为空，则直接返回false
                return false
            }
            a.pop()
        }
    }
    return a.length === 0
}

//定义解释器主函数
const main = (codeStr) => {
    if (!isLegitimate(codeStr)) {
        console.error("括号不合法！请检查代码")
        return 0
    }

    // 对代码进行拆解
    const codeList = codeStr.split("")


    aav = 0

    // 循环开始解释执行
    for (let index = 0; index < codeList.length; index++) {
        const element = codeList[index];

        // 根据代码进行不同操作
        switch (element) {
            case '+':
                memory[head]++
                break
            case "-":
                memory[head]--
                break
            case ">":
                if (head >= LENGTH - 1) {
                    console.error("内存溢出")
                    return 0
                } else {
                    head++
                }
                break
            case "<":
                if (head === 0) {
                    console.error("头指针最小为0")
                    return 0
                } else {
                    head--
                }
                break
            case "[":
                // 如果此处不在栈中，则加入栈中
                if (loopStack.length - 1 !== index) {
                    loopStack.push(index)
                }

                // 如果遇到[时，当前指针指向的内存地址的值为0，那么跳转到下一个]处  【【】】
                if (memory[head] === 0) {
                    let j = 0
                    while (j + index < codeList.length) {
                        if (codeList[j + index] == ']') {
                            index = j + index
                            break
                        }
                        j++
                    }
                }
                break

            case "]":

                let stackTop = loopStack[loopStack.length - 1]

                // 如果[时当前指针指向的内存地址的值不为0，那么跳转到下一个]处
                // 取出循环栈顶元素

                if (memory[head] !== 0) {
                    loopStack.pop()
                    loopStack
                    index = stackTop - 1
                }

                break

            case ".":
                process.stdout.write(String.fromCharCode(memory[head]), "")
                break

            default:
                break
        }


    }
}

// 用法，直接输入字符串
memory.fill(0)
main(`
++++++++++[>+++++++>++++++++++>+++>+<<<<-]
>++.>+.+++++++..+++.>++.<<+++++++++++++++.
>.+++.------.--------.>+.>.`)




