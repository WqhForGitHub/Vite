import { LitElement, html, css } from 'lit'

export class MyCounter extends LitElement {
  static properties = {
    count: { type: Number },
  }

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      font-family: sans-serif;
    }
    button {
      padding: 0.5rem 1rem;
      background: #324fff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `

  constructor() {
    super()
    this.count = 0
  }

  render() {
    return html`
      <h2>Lit Counter</h2>
      <button @click=${() => this.count++}>count: ${this.count}</button>
    `
  }
}

customElements.define('my-counter', MyCounter)
