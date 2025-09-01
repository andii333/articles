import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  private san = inject(DomSanitizer);

  transform(text: string, tokens: string[] = []): SafeHtml {
    if (!text || !tokens.length) return text;
    const pattern = tokens.map((t) => this.escape(t)).join('|');
    const re = new RegExp(`(${pattern})`, 'gi');
    const html = text.replace(re, '<mark>$1</mark>');
    return this.san.bypassSecurityTrustHtml(html);
  }

  private escape(s: string) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
