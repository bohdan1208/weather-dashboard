import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: number | undefined): number | undefined {
    if (!value) return;

    return Math.trunc(value);
  }
}
