export default class RequirementExpressionParser {
    parse(expression: string): object {
        return expression.split(",").map(s => s.trim())
    }
}