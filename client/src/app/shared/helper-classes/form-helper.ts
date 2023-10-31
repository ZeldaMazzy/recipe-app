export class FormHelper {
    public static getWarningColor(currentNumber: number, maxNumber: number): string {
        if(currentNumber >= maxNumber) {
            return 'red';
        }
        else if(currentNumber / maxNumber > 0.85) {
            return 'goldenrod';
        }
        return '';
    }
}