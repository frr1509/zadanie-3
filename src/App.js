import { useState } from "react";
import style from "./App.module.css";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "-", 0, "+", "C", "="];

export const App = () => {
    const [operand1, setOperand1] = useState("");
    const [operand2, setOperand2] = useState("");
    const [operator, setOperator] = useState("");
    const [result, setResult] = useState(null);

    const handleReset = () => {
        setOperand1("");
        setOperand2("");
        setOperator("");
        setResult(null)
    };
    const handleCalc = () => {
        switch (operator) {
            case "+":
                return setResult(Number(operand1) + Number(operand2));
            case "-":
                return setResult(Number(operand1) - Number(operand2));
        }
    };

    const handleSign = (sign) => {
        if (operand1 && operand2 && sign === "=") {
            setOperand2("");
            return handleCalc();
        }
        if (sign === "C") return handleReset();
        const isNum = typeof sign === "number";
        if (!operator && isNum || sign === '-') {
            setOperand1((prev) => prev + sign);
        } else if (operator && isNum) {
            setOperand2((prev) => prev + sign);
        }
        const isOperator = isNaN(sign);
        if (operand1 && isOperator) {
            setOperator(sign);
        }
        if (result) {
            setOperand1(result);
            setResult(null);
        }
    };

    const res = result || operand1 + operator + operand2;

    return (
        <div className={style.content}>
            <form>
                <input
                    className={style.input + ' ' + (result && style['result'])}
                    type="text"
                    value={res}
                    disabled
                ></input>
            </form>
            <div className={style.calc}>
                <ul className={style.btns}>
                    {numbers.map((item, id) => (
                        <button
                            onClick={() => handleSign(item)}
                            className={style.sign}
                            key={id}
                        >
                            {item}
                        </button>
                    ))}
                </ul>
            </div>
        </div>
    );
};
