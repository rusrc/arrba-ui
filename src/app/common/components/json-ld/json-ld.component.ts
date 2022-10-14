import { Component, OnInit, Input } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-json-ld',
  templateUrl: './json-ld.component.html',
  styles: []
})
export class JsonLdComponent implements OnInit {

  @Input() json: any;
  jsonLD: SafeHtml;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const json = this.json || {
      '@context': 'http://schema.org',
      '@type': 'Organization',
      'url': 'https://google.com',
      'name': 'Google',
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+1-000-000-0000',
        'contactType': 'Customer service'
      }
    };

    this.jsonLD = this.getSafeHTML(json);
  }

  getSafeHTML(value: {}) {
    // If value convert to JSON and escape / to prevent script tag in JSON
    const json = value ? JSON.stringify(value, null, 2).replace(/\//g, '\\/') : '';
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
