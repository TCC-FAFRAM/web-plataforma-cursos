export interface DropdownDTO {
    label: string,
    value: string,
}

export function convertDropdownList(arr: any[], fields: string[]): DropdownDTO[] {
    return arr.map((item) => ({
      label: item[fields[0]],
      value: item[fields[1]]
    }));
  }