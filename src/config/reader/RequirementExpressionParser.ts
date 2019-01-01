export default class RequirementExpressionParser {
    public parse(expression: string): object {
        return expression.split(",").map((s: string) => s.trim());
    }
}
