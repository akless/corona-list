/**
 * @overview HTML templates of ccm component for quick questions
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 */

import { html } from 'https://unpkg.com/lit-html';

export const input = ( onConfirm, onCancel ) => html`
  <table>
    <tr>
      <td><label>Email:</label></td>
      <td><input type="email" name="email"></td>
    </tr>
    <tr>
      <td><label>Tel:</label></td>
      <td><input type="tel" name="tel"></td>
    </tr>
  </table>
  <button @click=${onConfirm}>CONFIRM</button>
  <button @click="${onCancel}">CANCEL</button>
`;

export const qrcode = onClick => html`
  <div id="qrcode"></div>
  <button @click="${onClick}">EDIT</button>
`;

export const table = ( timestamp, secret ) => html`
  <table border="1">
    <tr>
      <th>Timestamp</th>
      <th>Guest Secret</th>
    </tr>
    <tr>
      <td>${timestamp}</td>
      <td>${secret}</td>
    </tr>
  </table>
`;
