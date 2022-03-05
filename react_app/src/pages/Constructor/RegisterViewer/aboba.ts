function getSavings() {
    //returns savings
    }

function concedeMortgage(homeValue: number): boolean {
    const savings: any = getSavings();
    return savings / homeValue > 0.2;
  }

export function func(str: number): string{
    return str.toString();
}