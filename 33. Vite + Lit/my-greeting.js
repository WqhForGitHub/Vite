import { LitElement, html, css } from 'lit'

export class MyGreeting extends LitElement {
  static properties = {
    name: { type: String },
  }

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      font-family: sans-serif;
    }
    p {
      color: #324fff;
    }
  `

  render() {
    return html`<p>Hello, ${this.name}! 这是一个 Web Component。</p>`
  }
}

customElements.define('my-greeting', MyGreeting)
